import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";

const ElegirImagenes = () => {
  const navigate = useNavigate();
  return (
    <div className="elegirTipoContainer">
      <div className="container">
        <Breadcrumbs links={["MI TIENDA", "PRODUCTOS"]} />
        <span className="title">IMAGENES</span>
        <div className="subTypeSection"></div>
        <div className="buttonContainer">
          <button
            onClick={() => {
              navigate(`/MiTienda/IMAGENES`);
            }}
          >
            IR A CARACTERÍSTICAS
          </button>
        </div>
        <div className="returnLink" onClick={() => navigate(`/MiTienda/TIPO`)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A SUBCATEGORÍA</p>
        </div>
      </div>
    </div>
  );
};

export default ElegirImagenes;
