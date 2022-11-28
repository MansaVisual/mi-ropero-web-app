import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import leftArrow from "../../assets/img/leftArrow.png";
import TiendaCalif from "../../assets/img/TiendaCalif.svg";
import TiendaDatos from "../../assets/img/TiendaDatos.svg";
import TiendaMensajes from "../../assets/img/TiendaMensajes.svg";
import TiendaOfertas from "../../assets/img/TiendaOfertas.svg";
import TiendaProductos from "../../assets/img/TiendaProductos.svg";
import TiendaTransfer from "../../assets/img/TiendaTransfer.png";
import TiendaVentas from "../../assets/img/TiendaVentas.svg";
import TiendaBanner from "../TiendaBanner/TiendaBanner";

const MiTienda = () => {
  const navigate = useNavigate();
  const sections = [
    {
      name: "DATOS DE LA TIENDA",
      icon: TiendaDatos,
    },
    {
      name: "PRODUCTOS",
      icon: TiendaProductos,
    },
    {
      name: "VENTAS",
      icon: TiendaVentas,
    },
    {
      name: "OFERTAS RECIBIDAS",
      icon: TiendaOfertas,
    },
    {
      name: "MENSAJES",
      icon: TiendaMensajes,
    },
    {
      name: "CALIFICACIONES",
      icon: TiendaCalif,
    },

    {
      name: "TRANSFERENCIAS",
      icon: TiendaTransfer,
    },
  ];

  return (
    <div className="miTiendaContainer">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="container">
          <div className="tiendaSections">
            {sections.map((section) => {
              return (
                <div
                  className="section"
                  onClick={() => navigate(`/Mi&Tienda/${section.name}`)}
                >
                  <div className="imgBox">
                    <img src={section.icon} alt="icon" />
                    <p className="sectionTitleMobile">{section.name}</p>
                  </div>
                  <p className="sectionTitle">{section.name}</p>
                </div>
              );
            })}
          </div>
          <div className="returnLink" onClick={() => navigate(`/`)}>
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A INICIO</p>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default MiTienda;
