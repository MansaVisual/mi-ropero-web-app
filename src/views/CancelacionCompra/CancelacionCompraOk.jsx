import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import whatsappLogo from "../../assets/img/whatsappLogo.png";
import ready from "../../assets/img/ready.png";

const CancelacionCompraOk = () => {
  const navigate = useNavigate();

  return (
    <div className="cancelacionPageOk">
      <div className="cancelacionBody">
        <Breadcrumbs links={["SOLICITUD DE CANCELACION DE COMPRA"]} />
        <div className="successMessage">
          <p className="title">SOLICITUD DE CANCELACION DE COMPRA</p>
          <img src={ready} alt="ready" />
          <p className="message">
            Tu pedido de cancelación ingresó correctamente a nuestro sistema.
          </p>
          <div>
            <img src={whatsappLogo} alt="whatsappLogo" />
            <p>
              A la brevedad nos pondremos en contacto para dar curso y solución
              a tu reclamo
            </p>
          </div>
        </div>
        <div className="returnLink" onClick={() => navigate(`/`)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A INICIO</p>
        </div>
      </div>
    </div>
  );
};

export default CancelacionCompraOk;
