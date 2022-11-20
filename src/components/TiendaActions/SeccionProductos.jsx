import React, { useEffect,useContext } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import tienda from "../../assets/img/tienda.png";
import { Button } from "@mui/material";
import leftArrow from "../../assets/img/leftArrow.png";
import SeccionProductosCon from "./SeccionProductosCon";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";

const SeccionProductos = () => {
  const navigate = useNavigate();
  const { tiendaData } = useContext(UseMiTiendaContext);

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const prod = [
    {
      prodName: "facu",
    },
  ];

  return (
    <>
      {tiendaData.length > 0 ? (
        <SeccionProductosCon />
      ) : (
        <div className="seccionProductos">
          <div className="breadcumbs">
            <Breadcrumbs links={pathnames} />
          </div>
          <div className="contenedorInfo">
            <p className="title">¡ABRÍ TU TIENDA!</p>
            <p className="text">
              Publica tu primer producto para habilitar tu tienda en Mi Ropero
            </p>
            <img src={tienda} alt="TIENDA" />
            <Button
              className="agregarProd"
              onClick={() => navigate(`/MiTienda/CATEGORIA`)}
            >
              AGREGAR PRODUCTO
            </Button>
          </div>
          <div className="returnLink" onClick={() => navigate(`/perfil`)}>
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A INICIO</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SeccionProductos;
