import React, { useContext, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { Radio } from "@mui/material";
import { UseProdsContext } from "../../context/ProdsContext";
import { apiFetch } from "../../apiFetch/apiFetch";

const ElegirTipo = ({ form, setForm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { categorias } = useContext(UseProdsContext);

  useEffect(() => {
    if (!form.categoriaId && !form.prodEditar) {
      navigate(`/Mi&Tienda/CATEGORIA`);
      return;
    }
    if (form.editarProd !== undefined && form.editarProd) {
      const idCaracteristica = form.prodEditar.caracteristicas.split(",");
      const caractObj = {};
      const dir = new FormData();
      dir.append("idcategoria", form.categoriaId);
      apiFetch(dir, "categorias", "get").then((res) => {
        console.log(res);
        for (let i = 0; i < res.result[0].caracteristicas.length; i++) {
          for (let i = 0; i < idCaracteristica.length; i++) {
            var fields = idCaracteristica[i].split(":");
            var id = fields[0];
            if (res.result[0].caracteristicas[i].idcaracteristica === id) {
              let obj = res.result[0].caracteristicas[i].nombre;
              caractObj[obj] = [idCaracteristica[i]];
            }
          }
        }
      });
      console.log(caractObj);
      for (const i in categorias) {
        console.log(categorias[i]);
        if (categorias[i].idcategoria === form.prodEditar.idcategoria) {
          setForm((prevState) => ({
            ...prevState,
            editarProd: false,
            categoriaId: categorias[i].idcategoriapadre,
            tipoId: categorias[i].idcategoria,
            tipoNombre: categorias[i].nombre,
            caracteristicas: form.prodEditar.caracteristicas,
            idCaracteristica: idCaracteristica,
            idCaracteristicaOld: "",
            titulo: form.prodEditar.nombre,
            precio: form.prodEditar.precio,
            descripcion: form.prodEditar.descripcion,
          }));
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(form);

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
            IR A IMÁGENES
          </button>
        </div>
        {form.prodEditar === undefined && (
          <div
            className="returnLink"
            onClick={() => navigate(`/Mi&Tienda/CATEGORIA`)}
          >
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A MI CATEGORIA</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElegirTipo;
