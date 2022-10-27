import React, { useState, useContext } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
// import FacebookIcon from '@mui/icons-material/Facebook';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RestorePopUp from "./RestorePopUp";
import { UseLoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Loader from "../Loader/Loader";
import FacebookButton from "../FacebookButton/FacebookButton";
import AppleButton from "../AppleButton/AppleButton";

const BoxLogin = () => {
  const navigate = useNavigate();
  const { LoginAPI } = useContext(UseLoginContext);

  const [showPassword, setShowPassword] = useState(false);
  const [restorePassword, setRestorePassword] = useState(false);

  const [campoObligatorio, setCampoObligatorio] = useState(false);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);

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
    await LoginAPI(loginUser, "clientes", "login").then((res) => {
      setLoad(false);
      if (res.status === "success") {
        localStorage.setItem("idClienteMiRopero", res.result.idcliente);
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
        window.location.replace("https://mi-ropero-web-app.vercel.app/");
      } else {
        setError(true);
      }
    });
  };

  return (
    <>
      <div className="boxLoginContainer">
        <p className="title">Continuar con Google o Facebook</p>
        <div className="buttonWrapper">
          {/* <Button className='botonGoogle'>
            INGRESAR CON GOOGLE <i className='googleIcon'></i>
          </Button> */}
          <AppleButton />
          <FacebookButton />
        </div>

        <p className="title">Continuar con tu email</p>

        {error && (
          <div className="errorBoxContainer">
            <div className="errorBox">
              <CancelOutlinedIcon color="secondary" className="cruz" />
              <p>Usuario o contraseña incorrecta.</p>
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
              Dirección de correo electrónico *
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
              Contraseña *
            </p>
            <TextField
              color={error || campoObligatorio ? "secondary" : "primary"}
              className="input"
              size="small"
              placeholder={
                showPassword ? "contraseña" : "● ● ● ● ● ● ● ● ● ● ●"
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
              className="olvidoContraseña"
            >
              Olvidé mi contraseña
            </p>
          </div>
        </div>
        <div className="buttonContainer">
          {load ? (
            <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}>
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
