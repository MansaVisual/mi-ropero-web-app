import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from "../../assets/img/isologo.png";
import { UsePerfilContext } from "../../context/PerfilContext";
import Loader from "../Loader/Loader";

const PopUpBorrarOferta = ({ setBorrarOferta, ofertaId, userLog }) => {
  const { PerfilAPI } = useContext(UsePerfilContext);
  const [loading, setLoading] = useState(false);

  const borrar = () => {
    setLoading(true);
    const dir = new FormData();
    dir.append("idcliente", userLog);
    dir.append("idoferta", ofertaId);
    PerfilAPI(dir, "ofertas", "cancel").then((res) => {
      console.log(res);
      if (res.status === "success") {
        setBorrarOferta(false);
      }
    });
  };

  return (
    <div className="PopUpPerfil">
      <div className="fondoPopUp" onClick={() => setBorrarOferta(false)}></div>
      <div className="popUp">
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">¿Seguro querés cancelar la oferta?</p>
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
                <Button
                  onClick={() => setBorrarOferta(false)}
                  className="volver"
                >
                  CANCELAR
                </Button>
                <Button className="recordar" onClick={() => borrar()}>
                  CANCELAR OFERTA
                </Button>
              </>
            )}
          </div>
          <img
            onClick={() => setBorrarOferta(false)}
            src={cruz}
            alt="CRUZ"
            className="cruz"
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpBorrarOferta;
