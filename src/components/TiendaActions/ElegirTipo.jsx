import React, { useContext, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { Radio } from "@mui/material";
import { UseProdsContext } from "../../context/ProdsContext";

const ElegirTipo = ({ form, setForm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { categorias } = useContext(UseProdsContext);

  useEffect(() => {
    if (!form.categoriaId) {
      navigate(`/Mi&Tienda/CATEGORIA`);
      return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="elegirTipoContainer">
      <div className="container">
        <Breadcrumbs links={pathnames} />
        <span className="title">ROPA</span>
        <span className="subtitle">¿Cuál es la subcategoría del producto?</span>
        <div className="subTypeSection">
          {form.categoriaId !== null && (
            <>
              {categorias.map((cat, i) => {
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
                            caracteristicas: [],
                            idCaracteristica: [],
                            idCaracteristicaOld: [],
                          }))
                        }
                      >
                        <Radio
                          checked={form.tipoId === cat.idcategoria}
                          className="radio"
                          name="radioButton"
                          id={`radioButton-${i}`}
                        />
                        <label
                          for={`radioButton-${i}`}
                          className={
                            form.tipoId === cat.idcategoria
                              ? "selected"
                              : "notSelected"
                          }
                        >
                          {cat.nombre}
                        </label>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </>
          )}
        </div>
        <div className="buttonContainer">
          <button
            onClick={() => {
              navigate(`/Mi&Tienda/IMAGENES`);
            }}
            disabled={form.tipoId ? false : true}
            style={{
              backgroundColor: form.tipoId ? "#443988" : "#857db3",
            }}
          >
            AGREGAR IMÁGENES
          </button>
        </div>
        {form.prodEditar === undefined && (
          <div
            className="returnLink"
          >
            <img src={leftArrow} alt="leftArrow" />
            <p onClick={() => navigate(`/Mi&Tienda/CATEGORIA`)}>VOLVER A MI CATEGORIA</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElegirTipo;
