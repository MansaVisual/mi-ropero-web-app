import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import {
  Box,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import PopUpDescProd from "./PopUpDescProd";

const DetallesProd = ({ setForm }) => {
  const navigate = useNavigate();

  const [habilitado, setHabilitado] = useState(false);
  const [detalles, setDetalles] = useState({
    title: "",
    precio: 0,
    descripcion: "",
  });
  const [openDescPopUp, setOpenDescPopUp] = useState(false);

  const handleChange = () => {
    setDetalles({
      title: document.getElementById("titulo").value,
      precio: document.getElementById("precio").value,
      descripcion: document.getElementById("descripcion").value,
    });
  };

  useEffect(() => {
    if (
      detalles.title !== "" &&
      detalles.precio !== 0 &&
      detalles.descripcion !== ""
    ) {
      setHabilitado(true);
    }
  }, [detalles]);

  const handleSubmit = () => {
    setForm((prevState) => ({
      ...prevState,
      titulo: detalles.title,
      precio: detalles.precio,
      descripcion: detalles.descripcion,
    }));
    navigate(`/MiTienda/CONTACTO`);
  };

  return (
    <Grid className="gridContainer">
      <div className="detallesProdContainer">
        <div className="container">
          <Breadcrumbs links={["MI TIENDA", "DETALLES"]} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <span className="title">DETALLES</span>
            <span className="titleRight" onClick={() => setOpenDescPopUp(true)}>
              CREAR DESCUENTO PARA PRODUCTO
            </span>
          </Box>
          <div className="firstLine" style={{ marginTop: "24px" }}>
            <div className="margenInput margenInputEspecial">
              <InputLabel className="labelForm" id="labelNombreApellido">
                Título *
              </InputLabel>
              <OutlinedInput
                placeholder="Ingresar título de la publicación"
                size="small"
                className={`inputForm`}
                id="titulo"
                onChangeCapture={() => {
                  handleChange();
                }}
              ></OutlinedInput>
            </div>
            <div className="margenInput">
              <InputLabel className="labelForm" id="labelTelefono">
                Precio de venta *
              </InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                placeholder="Ingresar precio de venta del producto"
                size="small"
                className={`inputForm`}
                id="precio"
                onChangeCapture={() => {
                  handleChange();
                }}
                type="number"
              ></OutlinedInput>
            </div>
          </div>
          <div
            className="firstLine"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="contenedorTextarea">
              <InputLabel className="labelForm" sx={{ marginBottom: "12px" }}>
                Descripción *
              </InputLabel>
              <TextField
                multiline
                rows={4}
                placeholder="Ingresar descripción del producto"
                size="small"
                className="inputForm textarea"
                id="descripcion"
                onChangeCapture={() => {
                  handleChange();
                }}
                inputProps={{ maxLength: 100 }}
              ></TextField>
            </div>
          </div>
          <div className="buttonContainer">
            <button
              onClick={
                habilitado
                  ? () => {
                      handleSubmit();
                    }
                  : null
              }
              disabled={habilitado ? false : true}
              style={{
                backgroundColor: habilitado ? "#443988" : "#857db3",
              }}
            >
              IR A MODO DE CONTACTO
            </button>
          </div>
          <div
            className="returnLink"
            onClick={() => navigate(`/MiTienda/CARACTERÍSTICAS`)}
          >
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A CARACTERÍSTICAS</p>
          </div>
        </div>
        {openDescPopUp && (
          <PopUpDescProd
            setOpenMessagePop={setOpenDescPopUp}
            descripcion={"La tienda se encuentra pausada en este momento."}
          />
        )}
      </div>
    </Grid>
  );
};

export default DetallesProd;
