import React, { useState } from "react";
import { Button } from "@mui/material";
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from "../../assets/img/isologo.png";
import Loader from "../Loader/Loader";
import { apiFetch } from "../../apiFetch/apiFetch";

const PopUpBorrarMsj = ({ setBorrarMsj, mensajeId, setMensajesFiltrados }) => {
  const [loading, setLoading] = useState(false);

  const borrarMensaje = () => {
    setLoading(true);
    const dir = new FormData();
    dir.append("idmensaje", mensajeId);
    apiFetch(dir, "mensajes", "delete").then((res) => {
      if (res.status === "success") {
        setBorrarMsj(false);
        setMensajesFiltrados((prevState) =>
          prevState.filter((msg) => msg.idmensaje !== mensajeId)
        );
      }
    });
  };

  return (
    <div className="PopUpPerfil">
      <div className="fondoPopUp" onClick={() => setBorrarMsj(false)}></div>
      <div className="popUp">
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">¿Seguro querés eliminar el mensaje?</p>
          <p className="popUpDescription">
            Se perderán todos los datos y no podrán ser recuperados luego.
          </p>
          <div className="buttonContainer">
            {loading ? (
              <div style={{ marginTop: "16px" }}>
                <Loader spin={"spinnerM"} />
              </div>
            ) : (
              <>
                <Button onClick={() => setBorrarMsj(false)} className="volver">
                  CANCELAR
                </Button>
                <Button className="recordar" onClick={() => borrarMensaje()}>
                  ELIMINAR MENSAJE
                </Button>
              </>
            )}
          </div>
          <img
            onClick={() => setBorrarMsj(false)}
            src={cruz}
            alt="CRUZ"
            className="cruz"
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpBorrarMsj;
