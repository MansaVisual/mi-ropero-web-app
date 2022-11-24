import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";

const Sumario = ({ form }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { infoUser, userLog } = useContext(UseLoginContext);
  const { tiendaData } = useContext(UseMiTiendaContext);

  if (!form.categoriaId) {
    navigate(`/MiTienda/CATEGORIA`);
    return;
  }

  console.log(form, infoUser);

  const handleSubmit = () => {
    const prod = new FormData();
    prod.append("idcategoria", form.tipoId);
    prod.append("caracteristicas", form.idCaracteristica);
    prod.append("nombre", form.detalles.titulo);
    prod.append("descripcion", form.detalles.descripcion);
    prod.append("precio", form.detalles.precio);
    prod.append("cantidad", 1);
    if (form.crearTienda) {
      const { direccion } = form;
      const formData = new FormData();
      formData.append("idcliente", userLog);
      formData.append("telefono", form.telefono);
      formData.append("nombre", `El Ropero De ${infoUser.nombre}`);
      formData.append("descripcion", "");
      formData.append("provincia", direccion.provincia);
      formData.append("localidad", direccion.localidad);
      formData.append("color_principal", "");
      formData.append("color_secundario", "");
      formData.append("idprovincia", direccion.idprovincia);
      formData.append("idlocalidad", direccion.idlocalidad);
      formData.append("codigo_postal", direccion.codigo_postal);
      formData.append("calle", direccion.calle);
      formData.append("numero", direccion.numero);
      formData.append("piso", direccion.piso);
      formData.append("departamento", direccion.departamento);
      formData.append("entre_calle_1", direccion.entre_calle_1);
      formData.append("entre_calle_2", direccion.entre_calle_2);
      formData.append("informacion_adicional", direccion.informacion_adicional);
      formData.append("normalized", direccion.raw_data);
      console.log(Object.fromEntries(formData));
      console.log(Object.fromEntries(prod));
      apiFetch(formData, "tiendas", "insert").then((tiendaRes) => {
        console.log(tiendaRes.result);
        const tienda = new FormData();
        tienda.append("idcliente", Number(userLog));
        apiFetch(tienda, "tiendas", "list").then((resIdTienda) => {
          if (resIdTienda.status === "success") {
            prod.append("idtienda", resIdTienda.result[0].idtienda);
            apiFetch(prod, "productos", "insert").then(async (prodRes) => {
              if (prodRes.status === "success") {
                const img = new FormData();
                for (const i in form.imagenes) {
                  img.append("idtienda", resIdTienda.result[0].idtienda);
                  img.append("idproducto", prodRes.result.idproducto);
                  img.append("image", form.imagenes[i]);
                  await insertImg(img);
                }
              }
            });
          } else {
            console.log(tiendaRes);
          }
        });
      });
    } else {
      prod.append("idtienda", tiendaData.idtienda);
      apiFetch(prod, "productos", "insert").then(async (res) => {
        console.log(res.result);
        if (res.status === "success") {
          const img = new FormData();
          for (const i in form.imagenes) {
            img.append("idtienda", tiendaData.idtienda);
            img.append("idproducto", res.result.idproducto);
            img.append("image", form.imagenes[i]);
            await insertImg(img);
          }
        } else {
          console.log(res);
        }
      });
    }
  };

  const insertImg = async (prod) => {
    apiFetch(prod, "productos", "insert_image").then((res) => {
      console.log(res);
      return res;
    });
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
              <span
                onClick={() =>
                  window.open("https://www.miropero.ar/terminos&y&condiciones")
                }
              >
                términos y condiciones
              </span>{" "}
              de Mi Ropero.
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
