import React, { useState, useEffect, useContext } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Loader from "../Loader/Loader";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseLoginContext } from "../../context/LoginContext";
import Swal from "sweetalert2";

const PopUpRespOferta = ({ setOpenPopUp }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="PopUpMensajePP">
      <div className="fondoPopUp" onClick={() => setOpenPopUp(false)}></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            setOpenPopUp(false);
          }}
        />
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">RESPONDER OFERTAS</p>
          <p
            /* className={`popUpDescription ${errorMonto ? clase2 : ""}`} */
            style={{ marginTop: "8px" }}
          >
            {/*  {errorMonto
              ? `Monto Mín: $100 / Máx: $${saldoCuenta}`
              : "Ingresá estos datos para poder transferir tu dinero."} */}
          </p>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelCBU">
                Respuesta al comprador
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Recordá que no podés enviar datos de contacto."
                id="respuesta"
                /*    type="text" */
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
                {!loading && (
                  <Button
                    onClick={() => setOpenPopUp(false)}
                    className="volver"
                  >
                    CANCELAR
                  </Button>
                )}
                <Button className={true ? "mensajeDisabled" : "recordar"}>
                  SOLICITAR
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpRespOferta;
