import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";

const Sumario = ({ form }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { infoUser } = useContext(UseLoginContext);

  if (!form.categoriaId) {
    navigate(`/MiTienda/CATEGORIA`);
    return;
  }

  console.log(form);

  const handleSubmit = () => {
    if (form.crearTienda) {
      const formData = new FormData();
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
      formData.append("");
    }
  };

  return (
    <Grid className="gridContainer">
      <div className="sumarioContainer">
        <div className="container">
          <Breadcrumbs links={pathnames} />
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
                  {Object.keys(form.imagenes).map((key, i) => {
                    if (!form.imagenes[key]) {
                      return null;
                    }
                    return (
                      <img key={i} src={form.imagenes[key]} alt="formImg" />
                    );
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
                        <span>
                          {form.caracteristicas[key].length === 0
                            ? "No especificado"
                            : form.caracteristicas[key].join(", ")}
                        </span>
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
            <Button onClick={() => handleSubmit()}>PUBLICAR</Button>
            <p>
              Al oprimir PUBLICAR se aceptan los{" "}
              <span>términos y condiciones</span> de Mi Ropero.
            </p>
          </div>
          <div
            className="returnLink"
            onClick={() => {
              form.crearTienda
                ? navigate(`/MiTienda/DETALLES`)
                : navigate(`/MiTienda/CONTACTO`);
            }}
          >
            <img src={leftArrow} alt="leftArrow" />
            <p>
              {form.crearTienda ? "VOLVER A DETALLES" : "VOLVER A CONTACTO"}
            </p>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Sumario;
