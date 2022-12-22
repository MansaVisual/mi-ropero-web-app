import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { Box, Grid, InputLabel, OutlinedInput, TextField } from "@mui/material";
import PopUpDescProd from "./PopUpDescuento";
import { NumericFormat } from "react-number-format";

const DetallesProd = ({ form, setForm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [habilitado, setHabilitado] = useState(false);
  const [detalles, setDetalles] = useState({
    titulo: "",
    precio: 0,
    descripcion: "",
  });
  const [openDescPopUp, setOpenDescPopUp] = useState(false);

  const handleChange = (e, detalle) => {
    if (detalle === "precio") {
      setDetalles((prevState) => {
        return {
          ...prevState,
          [detalle]: Number(e),
        };
      });
    } else {
      setDetalles((prevState) => {
        return {
          ...prevState,
          [detalle]: e.target.value,
        };
      });
    }
  };


  useEffect(() => {
    if (!form.categoriaId) {
      navigate(`/Mi&Tienda/CATEGORIA`);
      return;
    }
    if (form.prodEditar) {
      setDetalles({
        titulo: form.prodEditar.nombre,
        precio: Math.floor(form.prodEditar.precio),
        descripcion: form.prodEditar.descripcion,
      });
      return;
    } else {
      if (form.detalles.titulo !== "") {
        setDetalles({
          titulo: form.detalles.titulo,
          precio: form.detalles.precio,
          descripcion: form.detalles.descripcion,
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      detalles.titulo !== "" &&
      detalles.precio !== 0 &&
      detalles.descripcion !== ""
    ) {
      setHabilitado(true);
    }
  }, [detalles]);

  const handleSubmit = () => {
    setForm((prevState) => ({
      ...prevState,
      detalles,
    }));
    if (form.crearTienda) {
      navigate(`/Mi&Tienda/CONTACTO`);
    } else {
      navigate(`/Mi&Tienda/SUMARIO`);
    }
  };

  return (
    <Grid className="gridContainer">
      <div className="detallesProdContainer">
        <div className="container">
          <Breadcrumbs links={pathnames} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <span className="title">DETALLES</span>
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
                value={detalles.titulo}
                onChangeCapture={(e) => handleChange(e, "titulo")}
              ></OutlinedInput>
            </div>
            <div className="margenInput">
              <InputLabel className="labelForm" id="labelTelefono">
                Precio de venta *
              </InputLabel>
              <NumericFormat
                customInput={TextField}
                className={`inputForm`}
                placeholder="Ingresar precio de venta del producto"
                value={detalles.precio===0?null:detalles.precio}
                onValueChange={(values) => {
                  handleChange(values.value, "precio");
                }}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"$"}
              />
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
                value={detalles.descripcion}
                onChangeCapture={(e) => handleChange(e, "descripcion")}
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
              {form.crearTienda ? "CONTINUAR A MODO DE CONTACTO" : "CONTINUAR A SUMARIO"}
            </button>
          </div>
          <div
            className="returnLink"
            
          >
            <img src={leftArrow} alt="leftArrow" />
            <p onClick={() => navigate(`/Mi&Tienda/CARACTERISTICAS`)}>VOLVER A CARACTERÍSTICAS</p>
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
