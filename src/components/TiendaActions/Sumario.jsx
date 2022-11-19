import React from "react";
import { Grid } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import foto from "../../assets/img/fotoProd.png";
import { useNavigate } from "react-router-dom";

const Sumario = () => {
  const navigate = useNavigate();

  const sumario = {
    categoria: "ROPA / Remeras",
    imagenes: [foto, foto, foto],
    caracteristicas: {
      genero: "unisex",
      talle: "L",
      color: "rojo",
      marca: "adidas",
      condicion: "nuevo",
      tipoTela: "silver",
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
                <p>{sumario.categoria}</p>
                <button>MODIFICAR</button>
              </div>
            </div>
            <div className="subSection">
              <p className="title">Imágenes / Video</p>
              <div className="infoImagenes">
                <div>
                  {sumario.imagenes.map((img, i) => {
                    return <img src={img} alt="productImg" />;
                  })}
                </div>
                <button>MODIFICAR</button>
              </div>
            </div>
            <div className="subSection">
              <p className="title">Características</p>
              <div className="infoCaract">
                <div>
                  {Object.keys(sumario.caracteristicas).map((key, index) => {
                    return (
                      <div key={index}>
                        <p>{key}:</p>
                        <span>{sumario.caracteristicas[key]}</span>
                      </div>
                    );
                  })}
                </div>
                <button>MODIFICAR</button>
              </div>
            </div>
            <div className="subSection">
              <p className="title">Detalle</p>
              <div className="infoDetalle">
                <div>
                  {Object.keys(sumario.detalle).map((key, index) => {
                    return (
                      <div key={index}>
                        <p>{key}:</p>
                        <span>{sumario.detalle[key]}</span>
                      </div>
                    );
                  })}
                </div>
                <button>MODIFICAR</button>
              </div>
            </div>
            <div className="subSection">
              <p className="title">Descuento</p>
              <div className="discount">
                <p className="title">ESTE PRODUCTO ESTÁ EN OFERTA</p>
                <p className="data">
                  Tiene un descuento del 10% y vence el 21/09/2022 a las 12:59
                  hs. Hasta ese entonces, las modificaciones que realices en el
                  precio no será publicadas,
                </p>
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
