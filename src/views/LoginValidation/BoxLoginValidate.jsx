import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiFetch } from "../../apiFetch/apiFetch";
import Loader from "../../components/Loader/Loader";

const BoxLoginValidate = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [load, setLoad] = useState(false);

  const redirectUrl = localStorage.getItem("redirectUrl");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    if (JSON.parse(localStorage.getItem("sendCodMiRopero")) !== null) {
      setUser(JSON.parse(localStorage.getItem("sendCodMiRopero")));
    } else {
      navigate("/login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = () => {
    const cod = document.getElementById("codValidacion").value;
    if (cod.length === 4) {
      setLoad(true);
      const loginUser = new FormData();
      loginUser.append("idcliente", Number(user.id));
      loginUser.append("codigo", String(cod));
      apiFetch(loginUser, "clientes", "validate_set").then((res) => {
        if (res.status === "success") {
          setLoad(false);
          localStorage.setItem("idClienteMiRopero", user.id);
          if (redirectUrl !== "" && redirectUrl!== null) {
            localStorage.setItem("redirectUrl", "");
            window.location.replace(
              `https://www.miropero.ar/${redirectUrl}`
            );
          } else {
            window.location.replace("https://www.miropero.ar/");
          }
        } else {
          setLoad(false);
          document.getElementById("codValidacion").value = "";
          Swal.fire({
            title: "ERROR AL ENVIAR EL CÓDIGO",
            text: "No se pudo enviar el código. Volvé a intentarlo",
            icon: "error",
            confirmButtonText: "ACEPTAR",
          });
        }
      });
    }
  };

  const handleSendMail = () => {
    setLoad(true);
    const loginUser = new FormData();
    loginUser.append("idcliente", user.id);
    apiFetch(loginUser, "clientes", "validate_send").then((res) => {
      if (res.status === "success") {
        setLoad(false);
        Swal.fire({
          title: "CÓDIGO ENVIADO",
          text: "Revisá tu correo electrónico",
          icon: "info",
          confirmButtonText: "ACEPTAR",
        });
      } else {
        setLoad(false);
        Swal.fire({
          title: "OCURRIÓ UN ERROR",
          text: "No se pudo enviar el código. Volvé a intentarlo",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
  };

  return (
    <>
      {user !== "" && (
        <div className="boxValidateContainer">
          <p className="validateTitle">VALIDÁ TU CUENTA</p>
          <p className="descriptionText">
            Te mandamos un código a la dirección de email {user.mail} para que
            valides tu cuenta
          </p>
          {load && <Loader spin={"spinnerG"} />}
          <div className="inputBox">
            <p className="labelInput">Código de validación</p>
            <TextField
              color="primary"
              className="input"
              size="small"
              placeholder="● ● ● ●"
              id="codValidacion"
              disabled={load ? true : false}
              onChangeCapture={() => handleChange()}
              inputProps={{
                maxLength: 4,
              }}
            />
          </div>
          <p
            className="resendText"
            style={{ cursor: "pointer" }}
            onClick={!load ? () => handleSendMail() : null}
          >
            Reenviar email de validación.
          </p>
        </div>
      )}
    </>
  );
};

export default BoxLoginValidate;
