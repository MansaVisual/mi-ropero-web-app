import React, { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

const Sumario = ({ form }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { infoUser, userLog } = useContext(UseLoginContext);
  const { tiendaData } = useContext(UseMiTiendaContext);
  const [loading, setLoading] = useState(false);

  if (!form.categoriaId) {
    navigate(`/Mi&Tienda/CATEGORIA`);
    return;
  }

  console.log(form, infoUser);

  const handleSubmit = () => {
    setLoading(true);
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
              console.log(prodRes);
              if (prodRes.status === "success") {
                const img = new FormData();
                img.append("idtienda", Number(resIdTienda.result[0].idtienda));
                img.append("idproducto", Number(prodRes.result.idproducto));
                for (const i in form.imagenes) {
                  console.log(form.imagenes[i]);
                  if (form.imagenes[i] !== null) {
                    const img = new FormData();
                    img.append(
                      "idtienda",
                      Number(resIdTienda.result[0].idtienda)
                    );
                    img.append("idproducto", Number(prodRes.result.idproducto));
                    /* let file = await new File([form.imagenes[i]], form.imgName[i], {type: form.imgType[i], lastModified: Date.now()})
                    console.log(file)  */
                    img.append("image", form.imagenes[i]);
                    await insertImg(img);
                  }
                }
                console.log(form.video);
                if (form.video) {
                  const vid = new FormData();
                  vid.append(
                    "idtienda",
                    Number(resIdTienda.result[0].idtienda)
                  );
                  vid.append("idproducto", Number(prodRes.result.idproducto));
                  vid.append("video", form.video);
                  await apiFetch(vid, "productos", "insert_video").then(
                    (vidRes) => {
                      console.log(vidRes);
                    }
                  );
                }
                setLoading(false);
                Swal.fire({
                  title: "PRODUCTO CARGADO EXITOSAMENTE",
                  icon: "success",
                  confirmButtonText: "CONTINUAR",
                }).then((res) => {
                  window.location.replace(
                    "https://www.miropero.ar/Mi&Tienda/PRODUCTOS"
                  );
                });
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
          for (const i in form.imagenes) {
            if (form.imagenes[i] !== null) {
              const img = new FormData();
              img.append("idtienda", Number(tiendaData.idtienda));
              img.append("idproducto", Number(res.result.idproducto));
              img.append("image", form.imagenes[i]);
              await insertImg(img);
            }
          }
          if (form.video) {
            const vid = new FormData();
            vid.append("idtienda", Number(tiendaData.idtienda));
            vid.append("idproducto", Number(res.result.idproducto));
            vid.append("video", form.video);
            console.log(Object.fromEntries(vid));
            await apiFetch(vid, "productos", "insert_video").then((vidRes) => {
              console.log(vidRes);
            });
          }
          setLoading(false);
          Swal.fire({
            title: "PRODUCTO CARGADO EXITOSAMENTE",
            icon: "success",
            confirmButtonText: "CONTINUAR",
          }).then((res) => {
            window.location.replace(
              "https://www.miropero.ar/Mi&Tienda/PRODUCTOS"
            );
          });
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
    <div className="sumarioContainer">
      <div className="container">
        <Breadcrumbs links={pathnames} />
        <span className="title">SUMARIO</span>
        <span className="subtitle">Revisá los datos y publicá tu producto</span>
        <div className="detailSection">
          <div className="subSection">
            <p className="title">Categoría</p>
            <div className="infoCat">
              <p>{`${form.categoriaNombre} / ${form.tipoNombre}`}</p>
              <button onClick={() => navigate(`/Mi&Tienda/CATEGORIA`)}>
                MODIFICAR
              </button>
            </div>
          </div>
          <div className="subSection">
            <p className="title">Imágenes</p>
            <div className="infoImagenes">
              <div>
                {Object.keys(form.imagenesPreview).map((key, i) => {
                  console.log(form.imagenesPreview[key]);
                  if (!form.imagenesPreview[key]) {
                    return null;
                  }
                  return (
                    <img
                      key={i}
                      src={form.imagenesPreview[key]}
                      alt="formImg"
                    />
                  );
                })}
              </div>
              <button onClick={() => navigate(`/Mi&Tienda/IMAGENES`)}>
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
              <button onClick={() => navigate(`/Mi&Tienda/CARACTERISTICAS`)}>
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
              <button onClick={() => navigate(`/Mi&Tienda/DETALLES`)}>
                MODIFICAR
              </button>
            </div>
          </div>
        </div>
        <div className="bottomContainer">
          {loading ? (
            <Loader spin={"spinnerM"} />
          ) : (
            <Button onClick={() => handleSubmit()}>PUBLICAR</Button>
          )}
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
              ? navigate(`/Mi&Tienda/DETALLES`)
              : navigate(`/Mi&Tienda/CONTACTO`);
          }}
        >
          <img src={leftArrow} alt="leftArrow" />
          <p>{form.crearTienda ? "VOLVER A DETALLES" : "VOLVER A CONTACTO"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sumario;
