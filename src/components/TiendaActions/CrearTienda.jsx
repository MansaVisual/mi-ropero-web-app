import React, { useEffect, useContext } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import tienda from "../../assets/img/tienda.png";
import { Button } from "@mui/material";
import leftArrow from "../../assets/img/leftArrow.png";
import SeccionProductosCon from "./SeccionProductos";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";

const CrearTienda = ({ setForm }) => {
  const navigate = useNavigate();
  const { tiendaData, setTiendaData, productos } =
    useContext(UseMiTiendaContext);

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    setForm((prevState) => ({
      ...prevState,
      crearTienda: true,
    }));
    setTiendaData([""]);
    navigate(`/Mi&Tienda/CATEGORIA`);
  };

  return (
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
        <Button className="agregarProd" onClick={() => handleClick()}>
          AGREGAR PRODUCTO
        </Button>
      </div>
      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A PERFIL</p>
      </div>
    </div>
  );
};

export default CrearTienda;
