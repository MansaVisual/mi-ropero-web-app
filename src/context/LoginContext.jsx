import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const UseLoginContext = createContext();

export const LoginContext = ({ children }) => {
  const [userLog, setUserLog] = useState("");
  const [infoUser, setInfoUser] = useState([]);
  const [notis, setNotis] = useState([]);
  const [buscandoNotis, setBuscandoNotis] = useState(true);

  useEffect(() => {
    const res = localStorage.getItem("idClienteMiRopero");
    if (res !== null && userLog === "") {
      setUserLog(res);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const LoginAPI = async (data, clase, metodo) => {
    let resFinal = "";
    const res = localStorage.getItem("idClienteMiRopero");
    if (res !== null && userLog !== "") {
      setUserLog(res);
    }

    await fetch(
      `https://soap.miropero.pupila.biz/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        resFinal = data;
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return resFinal;
  };

  const loginStorage = async () => {
    const res = await localStorage.getItem("idClienteMiRopero");
    return res;
  };

  useEffect(() => {
    if (userLog !== "") {
      setBuscandoNotis(true);
      const user = new FormData();
      user.append("idcliente", userLog);
      LoginAPI(user, "clientes", "get").then((res) => {
        if (res.status === "success") {
          setInfoUser(res.result);
        } else if (res.status === "error") {
          reBuscarInfo();
        }
      });

      const notis = new FormData();
      notis.append("bypage", 9);
      notis.append("page", 0);
      notis.append("estado", 3);
      notis.append("idcliente", 36);

      LoginAPI(notis, "pushs", "all").then((res) => {
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
      LoginAPI(user, "clientes", "get").then((res) => {
        if (res.status === "success") {
          setInfoUser(res.result);
        } else {
          reBuscarInfo();
        }
      });
    }
  };

  const FacebookLogin = (loginData) => {
    const log = new FormData();
    log.append("social_login_type", 1);
    log.append("social_login_id", loginData.id);
    LoginAPI(log, "clientes", "login_social").then((res) => {
      if (res.status === "success") {
        setInfoUser(res.result);
        localStorage.setItem("idClienteMiRopero", res.result.idcliente);
        window.location.replace("https://mi-ropero-web-app.vercel.app/");
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
    LoginAPI(log, "clientes", "insert_social").then((res) => {
      if (res.status === "success") {
        FacebookLogin(loginData);
      } else if (res.status === "error") {
        Swal.fire({
          title: "OCURRIÓ UN ERROR",
          text: "Volvé a intentarlo",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
  };

  const AppleLogin = ({ data }) => {
    const log = new FormData();
    log.append("social_login_type", 3);
    log.append("social_login_id", data.authorization.id_token);
    LoginAPI(log, "clientes", "login_social").then((res) => {
      if (res.status === "success") {
        setInfoUser(res.result);
        localStorage.setItem("idClienteMiRopero", res.result.idcliente);
        window.location.replace("https://mi-ropero-web-app.vercel.app/");
      } else if (res.status === "error") {
        if (res.result === "El social_login_id y/o social_login no existen") {
          AppleRegister(data);
        }
      }
    });
  };

  const AppleRegister = (data) => {
    const log = new FormData();
    log.append("social_login_type", 3);
    log.append("social_login_id", data.authorization.id_token);
    log.append("nombre", data.user.name.firstName);
    log.append("email", data.user.email);
    log.append("apellido", data.user.lastName);
    LoginAPI(log, "clientes", "insert_social").then((res) => {
      if (res.status === "success") {
        FacebookLogin(data);
      } else if (res.status === "error") {
        Swal.fire({
          title: "OCURRIÓ UN ERROR",
          text: "Volvé a intentarlo",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
  };

  return (
    <UseLoginContext.Provider
      value={{
        LoginAPI,
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
