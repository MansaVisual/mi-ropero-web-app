import React from "react";
import { Grid } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import foto from "../../assets/img/fotoProd.png";
import { useNavigate } from "react-router-dom";

const Sumario = ({ form }) => {
  const navigate = useNavigate();

  console.log(form);

  const sumario = {
    categoria: "ROPA / Remeras",
    imagenes: [foto, foto, foto],
    caracteristicas: {
      genero: ["unisex"],
      talle: ["unisex"],
      color: ["unisex"],
      marca: ["adidas", "puma", "reebok"],
      condicion: ["unisex"],
      tipoTela: ["unisex"],
    },
    detalle: {
      titulo: "Remera nevada manga corta Rolling Stones",
      precio: "$4500",
      descripcion:
        "Remera casi nueva nevada, tela gruesa con estampa de Rolling Stones ideal media estación.",
    },
  };
  return (
    <Grid className="gridContainer">
      <div className="sumarioContainer">
        <div className="container">
          <Breadcrumbs links={["MI TIENDA", "SUMARIO"]} />
          <span className="title">SUMARIO</span>
          <span className="subtitle">
            Revisá los datos y publicá tu producto
          </span>
          <div className="detailSection">
            <div className="subSection">
              <p className="title">Categoría</p>
              <div className="infoCat">
                <p>{`${form.categoriaNombre} / ${form.tipoNombre}`}</p>
                <button onClick={() => navigate(`/MiTienda/CATEGORIA`)}>
                  MODIFICAR
                </button>
              </div>
            </div>
            <div className="subSection">
              <p className="title">Imágenes</p>
              <div className="infoImagenes">
                <div>
                  {form.imagenes.map((img, i) => {
                    return <img key={i} src={img} alt="productImg" />;
                  })}
                </div>
                <button onClick={() => navigate(`/MiTienda/IMAGENES`)}>
                  MODIFICAR
                </button>
              </div>
            </div>
            <div className="subSection">
              <p className="title">Características</p>
              <div className="infoCaract">
                <div>
                  {Object.keys(form.caracteristicas).map((key, index) => {
                    return (
                      <div key={index}>
                        <p>{key}:</p>
                        <span>{form.caracteristicas[key].join(", ")}</span>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => navigate(`/MiTienda/CARACTERISTICAS`)}>
                  MODIFICAR
                </button>
              </div>
            </div>
            <div className="subSection">
              <p className="title">Detalle</p>
              <div className="infoDetalle">
                <div>
                  {Object.keys(form.detalles).map((key, index) => {
                    return (
                      <div key={index}>
                        <p>{key}:</p>
                        <span>{form.detalles[key]}</span>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => navigate(`/MiTienda/DETALLES`)}>
                  MODIFICAR
                </button>
              </div>
            </div>
          </div>
          <div className="bottomContainer">
            <button>PUBLICAR</button>
            <p>
              Al oprimir PUBLICAR se aceptan los{" "}
              <span>términos y condiciones</span> de Mi Ropero.
            </p>
          </div>
          <div
            className="returnLink"
            onClick={() => navigate(`/MiTienda/CONTACTO`)}
          >
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A CONTACTO</p>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Sumario;
