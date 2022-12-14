import React, { useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RestorePopUp from "./RestorePopUp";
import { useNavigate, useParams } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Loader from "../Loader/Loader";
import FacebookButton from "../FacebookButton/FacebookButton";
import AppleButton from "../AppleButton/AppleButton";
import { apiFetch } from "../../apiFetch/apiFetch";

const BoxLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [restorePassword, setRestorePassword] = useState(false);
  const { redireccionCompra } = useParams();

  const [campoObligatorio, setCampoObligatorio] = useState(false);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);

  const redirectUrl = localStorage.getItem("redirectUrl");
  const returnTienda = localStorage.getItem("returnVenderMR")

  const handleLogin = async () => {
    setLoad(true);
    if (
      document.getElementById("email").value === "" ||
      document.getElementById("password").value === ""
    ) {
      setCampoObligatorio(true);
      setLoad(false);
      return;
    }
    const loginUser = new FormData();
    loginUser.append("email", document.getElementById("email").value);
    loginUser.append("clave", document.getElementById("password").value);
    await apiFetch(loginUser, "clientes", "login").then((res) => {
      setLoad(false);
      if (res.status === "success") {

        if (redireccionCompra !== undefined) {
          window.location.replace(
            `https://www.miropero.ar${redireccionCompra}`
          );
        }
        localStorage.setItem("idClienteMiRopero", res.result.idcliente);
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
        if(returnTienda !== undefined){
          window.location.replace(
            `https://www.miropero.ar/Mi&Tienda`
          );
        } else if (redirectUrl) {
          localStorage.setItem("redirectUrl", "");
          window.location.replace(`https://www.miropero.ar${redirectUrl}`);
        } else {
          window.location.replace("https://www.miropero.ar");
        }
      } else {
        setError(true);
      }
    });
  };

  return (
    <>
      <div className="boxLoginContainer">
        <p className="title">Continuar con Apple o Facebook</p>
        <div className="buttonWrapper">
          <AppleButton />
          <FacebookButton />
        </div>
        <p className="title">Continuar con tu email</p>
        {error && (
          <div className="errorBoxContainer">
            <div className="errorBox">
              <CancelOutlinedIcon color="secondary" className="cruz" />
              <p>Usuario o contrase??a incorrecta.</p>
            </div>
          </div>
        )}
        {campoObligatorio && (
          <div className="errorBoxContainer">
            <div className="errorBox">
              <CancelOutlinedIcon color="secondary" className="cruz" />
              <p>Debe completar los campos.</p>
            </div>
          </div>
        )}

        <div className="inputContainer">
          <div className="inputBox">
            <p
              className="labelInput"
              style={{ color: (error || campoObligatorio) && "#FF3F20" }}
            >
              Direcci??n de correo electr??nico *
            </p>
            <TextField
              color={error || campoObligatorio ? "secondary" : "primary"}
              className="input"
              size="small"
              placeholder="sabrinagodoy@gmail.com"
              disabled={load ? true : false}
              id="email"
              onChangeCapture={() => {
                setError(false);
                setCampoObligatorio(false);
              }}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: (error || campoObligatorio) && "#FF3F20",
                  },
                },
              }}
              InputProps={{
                style: {
                  fontSize: 15,
                  border: (error || campoObligatorio) && "1px solid #FF3F20",
                },
              }}
            />
          </div>
          <div className="inputBox">
            <p
              className="labelInput"
              style={{ color: (error || campoObligatorio) && "#FF3F20" }}
            >
              Contrase??a *
            </p>
            <TextField
              color={error || campoObligatorio ? "secondary" : "primary"}
              className="input"
              size="small"
              placeholder={
                showPassword ? "contrase??a" : "??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???"
              }
              id="password"
              type={showPassword ? "text" : "password"}
              disabled={load ? true : false}
              onChangeCapture={() => {
                setError(false);
                setCampoObligatorio(false);
              }}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: (error || campoObligatorio) && "#FF3F20",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <Visibility
                        sx={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </InputAdornment>
                ),
                style: {
                  fontSize: 15,
                  border: (error || campoObligatorio) && "1px solid #FF3F20",
                },
              }}
            />
            <p
              onClick={() => setRestorePassword(true)}
              className="olvidoContrase??a"
            >
              Olvid?? mi contrase??a
            </p>
          </div>
        </div>
        <div className="buttonContainer">
          {load ? (
            <div
              style={{
                marginTop: "24px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Loader spin={"spinnerM"} />
            </div>
          ) : (
            <Button
              className="botonIngresar"
              onClick={load ? null : () => handleLogin()}
            >
              INGRESAR
            </Button>
          )}
          <Button
            className="botonRegistrate"
            onClick={
              load
                ? null
                : () => {
                    window.scrollTo({
                      top: 0,
                      behavior: "auto",
                    });
                    navigate("/registro");
                  }
            }
          >
            REGISTRATE
          </Button>
        </div>
      </div>
      {restorePassword && (
        <RestorePopUp setRestorePassword={setRestorePassword} />
      )}
    </>
  );
};

export default BoxLogin;
