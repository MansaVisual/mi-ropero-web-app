import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from "../../assets/img/isologo.png";
import { UsePerfilContext } from "../../context/PerfilContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const PopUpEliminar = ({ setDeleteAccount, idCliente }) => {
  const { PerfilAPI } = useContext(UsePerfilContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const borrarCuenta = () => {
    setLoading(true);
    const dir = new FormData();
    dir.append("idcliente", idCliente);
    PerfilAPI(dir, "clientes", "delete").then((res) => {
      console.log(idCliente);
      console.log(res);
      if (res.status === "success") {
        setDeleteAccount(false);
        navigate("/");
      }
    });
  };
  return (
    <div className="PopUpPerfil">
      <div className="fondoPopUp" onClick={() => setDeleteAccount(false)}></div>
      <div className="popUp">
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">¿Seguro querés eliminar tu cuenta?</p>
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
                  onClick={() => setDeleteAccount(false)}
                  className="volver"
                >
                  CANCELAR
                </Button>
                <Button onClick={() => borrarCuenta()} className="recordar">
                  ELIMINAR CUENTA
                </Button>
              </>
            )}
          </div>
          <img
            onClick={() => setDeleteAccount(false)}
            src={cruz}
            alt="CRUZ"
            className="cruz"
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpEliminar;
