import React, { useState } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Loader from "../Loader/Loader";

const PopUpTransferencia = ({ setTransfPopUp }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);
  const [fin, setFin] = useState(false);
  return (
    <div className="PopUpMensajePP">
      <div className="fondoPopUp" onClick={() => setTransfPopUp(false)}></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            setTransfPopUp(false);
          }}
        />
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">SOLICITUD DE TRANSFERENCIA</p>
          <p className="popUpDescription" style={{ marginTop: "8px" }}>
            Ingresá estos datos para poder transferir tu dinero.
          </p>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelCBU">
                CBU de la cuenta
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Ingresar CBU. Solo números"
                id="CBU"
                /* defaultValue={infoUser.nombre}
                onFocus={(e) => onFocus(e, clase, clase2, "labelNombre")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
              />
            </div>
            <div className="inputBox">
              <p className="labelInput" id="labelAlias">
                ALIAS de la cuenta
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Ingresar alias completo "
                id="alias"
                /* onFocus={(e) => onFocus(e, clase, clase2, "labelApellido")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }} */
                /* sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
              />
            </div>
          </div>
          <div className="inputContainer">
            <div className="inputBox fullName">
              <p className="labelInput" id="labelNombreCompleto">
                Nombre y apellido del titular de la cuenta
              </p>
              <TextField
                color="primary"
                className="input"
                size="small"
                placeholder="Ingresar nombres y apellido completo"
                id="nombreCompleto"
                /* defaultValue={infoUser.nombre}
                onFocus={(e) => onFocus(e, clase, clase2, "labelNombre")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
              />
            </div>
          </div>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelCUIT">
                CUIT o CUIL
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Ingresar CUIT o CUIL. Solo números."
                id="CUIT"
                /* defaultValue={infoUser.nombre}
                onFocus={(e) => onFocus(e, clase, clase2, "labelNombre")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
              />
            </div>
            <div className="inputBox">
              <p className="labelInput" id="labelMonto">
                Monto Mín: $100 / Máx: $3071,02
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="$   Ingresar solo números."
                id="monto"
                /* onFocus={(e) => onFocus(e, clase, clase2, "labelApellido")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }} */
                /* sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
              />
            </div>
          </div>
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
                {!loading && !fin && (
                  <Button
                    onClick={() => setTransfPopUp(false)}
                    className="volver"
                  >
                    CANCELAR
                  </Button>
                )}
                {!fin ? (
                  <Button
                    /*     disabled={message === "" ? true : false} */
                    className={message === "" ? "mensajeDisabled" : "recordar"}
                    /*   onClick={() => submit()} */
                  >
                    SOLICITAR
                  </Button>
                ) : (
                  <Button
                    /*    disabled={message === "" ? true : false} */
                    className={"recordar"}
                    /*   onClick={() => setOpenMessagePop(false) } */
                  >
                    LISTO
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpTransferencia;
