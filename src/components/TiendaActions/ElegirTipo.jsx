import React, { useContext, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { Radio } from "@mui/material";
import { UseProdsContext } from "../../context/ProdsContext";

const ElegirTipo = ({ form, setForm }) => {
  const navigate = useNavigate();
  const { categorias } = useContext(UseProdsContext);

  console.log(form.categoriaId);

  if (!form.categoriaId) {
    navigate(`/MiTienda/CATEGORIA`);
    return;
  }

  return (
    <div className="elegirTipoContainer">
      <div className="container">
        <Breadcrumbs links={["MI TIENDA", "PRODUCTOS"]} />
        <span className="title">ROPA</span>
        <span className="subtitle">¿Cuál es la subcategoría del producto?</span>
        <div className="subTypeSection">
          {categorias.map((cat, i) => {
            console.log(cat, form);
            return (
              <Fragment key={i}>
                {cat.idcategoriapadre === form.categoriaId.toString() && (
                  <div
                    className="subType"
                    onClick={() =>
                      setForm((prevState) => ({
                        ...prevState,
                        tipoId: cat.idcategoria,
                        tipoNombre: cat.nombre,
                      }))
                    }
                  >
                    <Radio
                      checked={form.tipoId === cat.idcategoria}
                      className="radio"
                      name="radioButton"
                    />
                    <span
                      className={
                        form.tipoId === cat.idcategoria
                          ? "selected"
                          : "notSelected"
                      }
                    >
                      {cat.nombre}
                    </span>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="buttonContainer">
          <button
            onClick={() => {
              navigate(`/MiTienda/IMAGENES`);
            }}
            disabled={form.tipoId ? false : true}
            style={{
              backgroundColor: form.tipoId ? "#443988" : "#857db3",
            }}
          >
            IR A IMÁGENES
          </button>
        </div>
        <div
          className="returnLink"
          onClick={() => navigate(`/MiTienda/CATEGORIA`)}
        >
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A MI CATEGORIA</p>
        </div>
      </div>
    </div>
  );
};

export default ElegirTipo;
