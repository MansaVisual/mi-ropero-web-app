import React, { useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Loader from "../Loader/Loader";
import { apiFetch } from "../../apiFetch/apiFetch";

const BoxRegister = () => {
  const navigate = useNavigate();
  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [errorPass, setErrorPass] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassLength, setErrorPassLength] = useState(false);
  const [campoObligatorio, setCampoObligatorio] = useState(false);
  const [errorNewMail, setErrorNewMail] = useState(false);
  const [load, setLoad] = useState(false);

  const handleRegistrar = async () => {


    setErrorPass(false);
    setCampoObligatorio(false);
    setLoad(true);
    if (
      document.getElementById("nombre").value === "" ||
      document.getElementById("apellido").value === "" ||
      document.getElementById("email").value === "" ||
      document.getElementById("password").value === "" ||
      document.getElementById("password2").value === ""
    ) {
      setCampoObligatorio(true);
      scrollTop();
      setLoad(false);
      return;
    }
    if (
      document.getElementById("password").value !==
      document.getElementById("password2").value
    ) {
      setErrorPass(true);
      scrollTop();
      setLoad(false);
      return;
    } else if (
      document.getElementById("password").value.length < 7 ||
      document.getElementById("password2").value.length < 7
    ) {
      setErrorPassLength(true);
      scrollTop();
      setLoad(false);
      return;
    }
    if (emailRegex.test(document.getElementById("email").value)) {
    } else {
      setErrorMail(true);
      scrollTop();
      setLoad(false);
      return;
    }

    const loginUser = new FormData();
    loginUser.append("email", document.getElementById("email").value);
    loginUser.append("clave", document.getElementById("password").value);
    loginUser.append("nombre", document.getElementById("nombre").value);
    loginUser.append("apellido", document.getElementById("apellido").value);
    await apiFetch(loginUser, "clientes", "insert").then(async (res) => {
      if (res.status === "success") {
        const validateCod = new FormData();
        validateCod.append("idcliente", res.result.idcliente);
        localStorage.setItem(
          "sendCodMiRopero",
          JSON.stringify({ id: res.result.idcliente, mail: res.result.email })
        );
        await apiFetch(validateCod, "clientes", "validate_send").then((res) => {
          setLoad(false);
          scrollTop();
          navigate("/validacionLogin");
        });
      } else {
        if (res.result === "El email ya se encuentra registrado") {
          setErrorNewMail(true);
          setLoad(false);
          scrollTop();
        }
      }
    });
  };

  const scrollTop = (param) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="boxRegisterContainer">
      <div className="titleContainer">
        <p className="registerTitle">REGISTRATE</p>
      </div>
      {campoObligatorio && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>Debe completar los campos.</p>
          </div>
        </div>
      )}
      {errorPass && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>Las contraseñas no coinciden.</p>
          </div>
        </div>
      )}
      {errorNewMail && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>El mail ya se encuentra en uso.</p>
          </div>
        </div>
      )}
      {errorMail && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>El mail no es correcto.</p>
          </div>
        </div>
      )}
      {errorPassLength && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>La contraseña debe tener al menos 7 caracteres.</p>
          </div>
        </div>
      )}

      <div className="inputContainer">
        <div className="inputBox">
          <p
            className="labelInput"
            style={{
              color:
                campoObligatorio &&
                document.getElementById("nombre").value === "" &&
                "#FF3F20",
            }}
          >
            Nombre *
          </p>
          <TextField
            color={
              campoObligatorio && document.getElementById("nombre").value === ""
                ? "secondary"
                : "primary"
            }
            className="input"
            size="small"
            placeholder="Sabrina"
            id="nombre"
            onChangeCapture={() => setCampoObligatorio(false)}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor:
                    campoObligatorio &&
                    document.getElementById("nombre").value === "" &&
                    "#FF3F20",
                },
              },
            }}
            inputProps={{
              style: {
                border:
                  campoObligatorio &&
                  document.getElementById("nombre").value === "" &&
                  "1px solid #FF3F20",
              },
            }}
          />
        </div>
        <div className="inputBox2">
          <p
            className="labelInput"
            style={{
              color:
                campoObligatorio &&
                document.getElementById("apellido").value === "" &&
                "#FF3F20",
            }}
          >
            Apellido *
          </p>

          <TextField
            color={
              campoObligatorio &&
              document.getElementById("apellido").value === ""
                ? "secondary"
                : "primary"
            }
            className="input"
            size="small"
            placeholder="Godoy"
            id="apellido"
            onChangeCapture={() => setCampoObligatorio(false)}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor:
                    campoObligatorio &&
                    document.getElementById("apellido").value === "" &&
                    "#FF3F20",
                },
              },
            }}
            inputProps={{
              style: {
                border:
                  campoObligatorio &&
                  document.getElementById("apellido").value === "" &&
                  "1px solid #FF3F20",
              },
            }}
          />
        </div>
      </div>
      <div className="inputContainer">
        <div className="inputBox">
          <p
            className="labelInput"
            style={{
              color:
                ((campoObligatorio &&
                  document.getElementById("email").value === "") ||
                  errorNewMail ||
                  errorMail) &&
                "#FF3F20",
            }}
          >
            Dirección de correo electrónico *
          </p>
          <TextField
            color={
              (campoObligatorio &&
                document.getElementById("email").value === "") ||
              errorNewMail ||
              errorMail
                ? "secondary"
                : "primary"
            }
            className="input"
            size="small"
            placeholder="nombre@dominio.com"
            id="email"
            onChangeCapture={() => {
              setCampoObligatorio(false);
              setErrorNewMail(false);
              setErrorMail(false);
            }}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor:
                    ((campoObligatorio &&
                      document.getElementById("email").value === "") ||
                      errorNewMail ||
                      errorMail) &&
                    "#FF3F20",
                },
              },
            }}
            inputProps={{
              style: {
                border:
                  ((campoObligatorio &&
                    document.getElementById("email").value === "") ||
                    errorNewMail ||
                    errorMail) &&
                  "1px solid #FF3F20",
              },
            }}
          />
        </div>
        <div className="inputBox"></div>
      </div>
      <div className="inputContainer">
        <div className="inputBox">
          <p
            className="labelInput"
            style={{
              color:
                ((campoObligatorio &&
                  document.getElementById("password").value === "") ||
                  errorPass ||
                  errorPassLength) &&
                "#FF3F20",
            }}
          >
            Contraseña *
          </p>
          <TextField
            color={
              (campoObligatorio &&
                document.getElementById("password").value === "") ||
              errorPass ||
              errorPassLength
                ? "secondary"
                : "primary"
            }
            className="passwordInput"
            size="small"
            placeholder={showPassword ? "contraseña" : "● ● ● ● ● ● ● ● ● ● ●"}
            type={showPassword ? "text" : "password"}
            id="password"
            onChangeCapture={() => {
              setCampoObligatorio(false);
              setErrorPass(false);
              setErrorPassLength(false);
            }}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor:
                    ((campoObligatorio &&
                      document.getElementById("password").value === "") ||
                      errorPass ||
                      errorPassLength) &&
                    "#FF3F20",
                },
              },
            }}
            InputProps={{
              minLength: 7,
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
                border:
                  ((campoObligatorio &&
                    document.getElementById("password").value === "") ||
                    errorPass ||
                    errorPassLength) &&
                  "1px solid #FF3F20",
              },
            }}
          />
        </div>
        <div className="inputBox2">
          <p
            className="labelInput"
            style={{
              color:
                ((campoObligatorio &&
                  document.getElementById("password").value === "") ||
                  errorPass ||
                  errorPassLength) &&
                "#FF3F20",
            }}
          >
            Confirmar contraseña *
          </p>
          <TextField
            color={
              (campoObligatorio &&
                document.getElementById("password2").value === "") ||
              errorPass ||
              errorPassLength
                ? "secondary"
                : "primary"
            }
            className="passwordInput"
            size="small"
            placeholder={showPassword2 ? "contraseña" : "● ● ● ● ● ● ● ● ● ● ●"}
            id="password2"
            onChangeCapture={() => {
              setCampoObligatorio(false);
              setErrorPass(false);
              setErrorPassLength(false);
            }}
            type={showPassword2 ? "text" : "password"}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor:
                    ((campoObligatorio &&
                      document.getElementById("password2").value === "") ||
                      errorPass ||
                      errorPassLength) &&
                    "#FF3F20",
                },
              },
            }}
            InputProps={{
              minLength: 7,
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword2 ? (
                    <Visibility
                      sx={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => setShowPassword2(!showPassword2)}
                    />
                  ) : (
                    <VisibilityOff
                      sx={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => setShowPassword2(!showPassword2)}
                    />
                  )}
                </InputAdornment>
              ),
              style: {
                fontSize: 15,
                border:
                  ((campoObligatorio &&
                    document.getElementById("password2").value === "") ||
                    errorPass ||
                    errorPassLength) &&
                  "1px solid #FF3F20",
              },
            }}
          />
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
          <>
            <Button
              className="left-button"
              onClick={load ? null : () => navigate("/login")}
            >
              VOLVER
            </Button>
            <Button
              className="right-button"
              onClick={load ? null : () => handleRegistrar()}
            >
              REGISTRATE
            </Button>
          </>
        )}
      </div>
      <p className="bottomText">
        Al hacer clic en el botón “registráte” aceptas los{" "}
        <span
          className="spanLink"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "auto",
            });
            navigate("/terminos&y&condiciones")
          }}
        >
          términos y condiciones
        </span>{" "}
        de uso de la plataforma Mi Ropero y nuestras {" "}
        <span
          className="spanLink"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "auto",
            });
            navigate("/politica&de&privacidad")
          }}
        >
          políticas de privacidad
        </span>{" "}
        .
      </p>
    </div>
  );
};

export default BoxRegister;
