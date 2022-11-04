import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";

const CancelacionCompraOk = () => {
  const navigate = useNavigate();

  return (
    <div className="cancelacionPageOk">
      <div className="cancelacionBody">
        <Breadcrumbs links={["SOLICITUD DE CANCELACION DE COMPRA"]} />
        <div className="successMessage">
          <p className="title">SOLICITUD DE CANCELACION DE COMPRA</p>
        </div>
        <div className="returnLink" onClick={() => navigate(`/`)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A MI PERFIL</p>
        </div>
      </div>
    </div>
  );
};

export default CancelacionCompraOk;
