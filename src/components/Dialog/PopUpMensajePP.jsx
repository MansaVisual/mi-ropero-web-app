import React, { useState, useContext,useEffect } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Loader from "../Loader/Loader";
import { UseLoginContext } from "../../context/LoginContext";
import Swal from "sweetalert2";
import { apiFetch } from "../../apiFetch/apiFetch";

const PopUpMensajePP = ({ setOpenMessagePop, prod,descripcion }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { userLog } = useContext(UseLoginContext);
  const [error, setError] = useState(false);
  const [aparece, setAparece] = useState(true);

  useEffect(() => {
    if(descripcion!==undefined){
      setMessage("¡HOLA! ¿El producto está disponible?")
    }
  }, []);

  const submit = () => {
    setLoading(true);
    if (message === "") {
      setError(true);
      setLoading(false);
      return;
    }
    const mensaje = new FormData();
    mensaje.append("idcliente", userLog);
    mensaje.append("idproducto", prod.idproducto);
    mensaje.append("mensaje", message);
    apiFetch(mensaje, "mensajes", "insert").then((res) => {
      if (res.status === "success") {
        setTimeout(() => {
          setLoading(false);
          setOpenMessagePop(false);
          Swal.fire({
            title: "MENSAJE ENVIADO",
            icon: "success",
            confirmButtonText: "ACEPTAR",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
          setAparece(false);
          Swal.fire({
            title: "MENSAJE NO ENVIADO",
            text: "Ocurrió un error. Vuelva a intentarlo",
            icon: "error",
            confirmButtonText: "ACEPTAR",
          }).then(() => setAparece(true));
        }, 1000);
      }
    });
  };

  return (
    <div
      className="PopUpMensajePP"
      style={{ display: aparece ? "flex" : "none" }}
    >
      <div
        className="fondoPopUp"
        onClick={() => setOpenMessagePop(false)}
      ></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            setOpenMessagePop(false);
          }}
        />
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">
            {error ? "¡ERROR!" : descripcion===undefined?"¡ENVIÁ UN MENSAJE!":"¡Oops! Ropero sin actividad"}
          </p>
          <p className="popUpDescription">
            {descripcion===undefined?
            "Sacate todas las dudas que tengas escribiéndole al vendedor/a. Recordá que no podés ingresar información de contacto como direcciones de email, números de teléfono, etc."
            :
            descripcion}
          </p>
          <p className="popUpTitle">Tu mensaje para el vendedor/a</p>

          <TextField
            multiline
            rows={4}
            className="textArea"
            size="small"
            placeholder="Ingresar Mensaje"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError(false);
            }}
            inputProps={{ maxLength: 220 }}
            sx={{
              width: "100%",
              border: error && "1px solid #ff3f20 !important",
              borderRadius: error && "4px",
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: error && "#FF3F20",
                },
              },
            }}
          />
          <div className="buttonContainer">
            {loading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <Loader spin={"spinnerM"} />
              </div>
            ) : (
              <>
                <Button
                  onClick={() => setOpenMessagePop(false)}
                  className="volver"
                >
                  CANCELAR
                </Button>
                <Button
                  disabled={message === "" ? true : false}
                  className={message === "" ? "mensajeDisabled" : "recordar"}
                  onClick={() => submit()}
                >
                  ENVIAR MENSAJE
                </Button>
              </>
            )}
          </div>
          {/* <img
            onClick={() => setOpenMessagePop(false)}
            src={cruz}
            alt="CRUZ"
            className="cruz"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default PopUpMensajePP;
