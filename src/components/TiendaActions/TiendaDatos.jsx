import React, { useState } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

const TiendaDatos = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    descripcion: "",
    domicilio: "",
  });
  return (
    <div className="miTiendaDatos">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="container">
          <p className="title">DATOS</p>
          <div className="formulario">
            <div className="inputContainer">
              <div className="inputBox">
                <p className="labelInput" id="labelNombre">
                  Nombre *
                </p>
                <TextField
                  className="input"
                  placeholder="El Ropero de Sandra"
                  id="nombre"
                />
              </div>
              <div className="inputBox">
                <p className="labelInput" id="labelApellido">
                  Teléfono *
                </p>
                <TextField
                  className="input"
                  placeholder="+54  011 - 4417 - 8005"
                  type="number"
                  id="telefono"
                />
              </div>
            </div>
            <div className="inputContainer">
              <div className="textAreaBox">
                <span className="label1">Descripción *</span>
                <TextField
                  multiline
                  rows={4}
                  id="infoAdicional"
                  color="primary"
                  className="textArea"
                  size="small"
                  placeholder="Reducir, reciclar, reutilizar como bandera!"
                  inputProps={{ maxLength: 50 }}
                />
              </div>
            </div>
            <div className="address">
              <span>Domicilio de entrega</span>
              <div className="description">
                <p>
                  Cuenca 3440. CABA Comuna 11 (C1417). entre Francisco Beiró y
                  José P. Varela. Puerta violeta. Tocar fuerte el timbre.
                </p>
                <button>MODIFICAR</button>
              </div>
            </div>
          </div>
          <div className="buttonContainer">
            <button>GUARDAR CAMBIOS</button>
          </div>
          <div className="returnLink" onClick={() => navigate(`/MiTienda`)}>
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A MI TIENDA</p>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default TiendaDatos;
