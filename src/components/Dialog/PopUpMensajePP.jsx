import React, { useState, useContext } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Loader from "../Loader/Loader";
import { UseProdsContext } from "../../context/ProdsContext";
import { UseLoginContext } from "../../context/LoginContext";

const PopUpMensajePP = ({ openMessagePop, setOpenMessagePop, prod }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { ProdAPI } = useContext(UseProdsContext);
  const { userLog } = useContext(UseLoginContext);
  const [error, setError] = useState(false);

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
    ProdAPI(mensaje, "mensajes", "insert").then((res) => {
      if (res.status === "success") {
        setTimeout(() => {
          setLoading(false);
          setOpenMessagePop(false);
          alert("MENSAJE ENVIADO");
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
          alert("MENSAJE NO ENVIADO");
        }, 1000);
      }
    });
  };

  return (
    <div className="PopUpMensajePP">
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
            {error ? "¡ERROR!" : "¡ENVIÁ UN MENSAJE!"}
          </p>
          <p className="popUpDescription">
            Sacate todas las dudas que tengas escribiéndole al vendedor/a.
            Recordá que no podés ingresar información de contacto como
            direcciones de email, números de teléfono, etc.
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
              <div style={{ marginTop: "16px" }}>
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
                <Button className="recordar" onClick={() => submit()}>
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
