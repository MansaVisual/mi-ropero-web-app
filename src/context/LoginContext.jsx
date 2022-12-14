import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { apiFetch } from "../apiFetch/apiFetch";

export const UseLoginContext = createContext();

export const LoginContext = ({ children }) => {
  const [userLog, setUserLog] = useState("");
  const [infoUser, setInfoUser] = useState([]);
  const [notis, setNotis] = useState([]);
  const [buscandoNotis, setBuscandoNotis] = useState(true);

  const redirectUrl = localStorage.getItem("redirectUrl");

  useEffect(() => {
    const res = localStorage.getItem("idClienteMiRopero");
    if (res !== null && userLog === "") {
      setUserLog(res);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loginStorage = async () => {
    const res = await localStorage.getItem("idClienteMiRopero");
    return res;
  };

  useEffect(() => {
    if (userLog !== "") {
      setBuscandoNotis(true);
      const user = new FormData();
      user.append("idcliente", userLog);
      apiFetch(user, "clientes", "get").then((res) => {
        if (res.status === "success") {
          setInfoUser(res.result);
        } else if (res.status === "error") {
          reBuscarInfo();
        }
      });

      const notis = new FormData();
      notis.append("bypage", 7);
      notis.append("page", 0);
      notis.append("estado", 1);
      notis.append("idcliente", userLog);

      apiFetch(notis, "pushs", "all").then((res) => {
        setBuscandoNotis(false);
        if (res.status === "success") {
          setNotis(res.result);
        }
      });
    }
  }, [userLog]); // eslint-disable-line react-hooks/exhaustive-deps

  const reBuscarInfo = () => {
    if (userLog !== "") {
      const user = new FormData();
      user.append("idcliente", userLog);
      apiFetch(user, "clientes", "get").then((res) => {
        if (res.status === "success") {
          setInfoUser(res.result);
        } else {
          // reBuscarInfo();
        }
      });
    }
  };

  const FacebookLogin = (loginData) => {
    const log = new FormData();
    log.append("social_login_type", 1);
    log.append("social_login_id", loginData.id);

    apiFetch(log, "clientes", "login_social").then((res) => {
      if (res.status === "success") {
        setInfoUser(res.result);
        localStorage.setItem("idClienteMiRopero", res.result.idcliente);
        if (redirectUrl) {
          localStorage.setItem("redirectUrl", "");
          window.location.replace(`https://www.miropero.ar/${redirectUrl}`);
        } else {
          window.location.replace("https://www.miropero.ar");
        }
      } else if (res.status === "error") {
        if (res.result === "El social_login_id y/o social_login no existen") {
          FacebookRegister(loginData);
        }
      }
    });
  };

  const FacebookRegister = (loginData) => {
    const log = new FormData();
    log.append("social_login_type", 1);
    log.append("social_login_id", loginData.id);
    log.append("nombre", loginData.first_name);
    log.append("email", loginData.email);
    log.append("apellido", loginData.last_name);
    log.append("avatar", loginData.picture.data.url);
    apiFetch(log, "clientes", "insert_social").then((res) => {
      if (res.status === "success") {
        FacebookLogin(loginData);
      } else if (res.status === "error") {
        Swal.fire({
          title: "OCURRI?? UN ERROR",
          text: "Volv?? a intentarlo",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
  };

  const AppleLogin = (data) => {
    const decoded = jwt_decode(data.authorization.id_token);

    const log = new FormData();
    log.append("social_login_type", 3);
    log.append("social_login_id", decoded.sub);
    apiFetch(log, "clientes", "login_social").then((res) => {
      if (res.status === "success") {
        setInfoUser(res.result);
        localStorage.setItem("idClienteMiRopero", res.result.idcliente);
        if (redirectUrl && redirectUrl !== "") {
          localStorage.setItem("redirectUrl", "");
          window.location.replace(`https://www.miropero.ar/${redirectUrl}`);
        } else {
          window.location.replace("https://www.miropero.ar");
        }
      } else if (res.status === "error") {
        if (res.result === "El social_login_id y/o social_login no existen") {
          AppleRegister(data);
        }
      }
    });
  };

  const AppleRegister = (data) => {
    const decoded = jwt_decode(data.authorization.id_token);

    const log = new FormData();
    log.append("social_login_type", 3);
    log.append("social_login_id", decoded.sub);
    log.append("nombre", data.user.name.firstName);
    log.append("email", data.user.email);
    log.append("apellido", data.user.name.lastName);

    apiFetch(log, "clientes", "insert_social").then((res) => {
      if (res.status === "success") {
        AppleLogin(data);
      } else if (res.status === "error") {
        Swal.fire({
          title: "OCURRI?? UN ERROR",
          text: "Volv?? a intentarlo",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
  };

  return (
    <UseLoginContext.Provider
      value={{
        loginStorage,
        userLog,
        setUserLog,
        infoUser,
        FacebookLogin,
        reBuscarInfo,
        notis,
        buscandoNotis,
        AppleLogin,
      }}
    >
      {children}
    </UseLoginContext.Provider>
  );
};
