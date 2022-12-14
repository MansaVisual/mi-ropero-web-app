import React, { useContext, useState } from "react";
import { Button, useMediaQuery } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import editIcon from "../../assets/img/editIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import videoLogo from "../../assets/img/bx-video.svg"
import theme from "../../styles/theme";

const Sumario = ({ form }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { infoUser, userLog } = useContext(UseLoginContext);
  const { tiendaData } = useContext(UseMiTiendaContext);
  const [loading, setLoading] = useState(false);

  if (!form.categoriaId) {
    navigate(`/Mi&Tienda/CATEGORIA`);
    return;
  }

  const handleSubmit = () => {
    let mensajeFinal=""
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

      apiFetch(formData, "tiendas", "insert").then((tiendaRes) => {
        const tienda = new FormData();
        tienda.append("idcliente", Number(userLog));
        apiFetch(tienda, "tiendas", "list").then((resIdTienda) => {
          if (resIdTienda.status === "success") {
            prod.append("idtienda", resIdTienda.result[0].idtienda);
            apiFetch(prod, "productos", "insert").then(async (prodRes) => {
              if (prodRes.status === "success") {
                const img = new FormData();
                img.append("idtienda", Number(resIdTienda.result[0].idtienda));
                img.append("idproducto", Number(prodRes.result.idproducto));
                for (const i in form.imagenes) {
                  if (form.imagenes[i] !== null) {
                    const img = new FormData();
                    img.append(
                      "idtienda",
                      Number(resIdTienda.result[0].idtienda)
                    );
                    img.append("idproducto", Number(prodRes.result.idproducto));
                    img.append("image", form.imagenes[i]);
                    await insertImg(img);
                  }
                }
                if(form.tipoNombre==="Ropa interior" || form.tipoNombre==="Trajes de ba??o"){
                  mensajeFinal = "El producto esta en revisi??n por la categoria seleccionada."
                }
                if (form.video) {
                  mensajeFinal = "El producto esta en revisi??n porque contiene un video."
                  const vid = new FormData();
                  vid.append(
                    "idtienda",
                    Number(resIdTienda.result[0].idtienda)
                  );
                  vid.append("idproducto", Number(prodRes.result.idproducto));
                  vid.append("video", form.video);
                  await apiFetch(vid, "productos", "insert_video")
                }
                setLoading(false);
                Swal.fire({
                  title:"PRODUCTO CARGADO EXITOSAMENTE",
                  text:mensajeFinal===""?null:mensajeFinal,
                  icon: "success",
                  confirmButtonText: "VER MIS PRODUCTOS",
                }).then((res) => {
                  window.location.replace(
                    "https://www.miropero.ar/Mi&Tienda/PRODUCTOS"
                  );
                });
              }
            });
          }
        });
      });
    } else {
      if (form.prodEditar) {
        prod.append("idproducto", form.prodEditar.idproducto);
      }
      prod.append("idtienda", tiendaData.idtienda);
      apiFetch(prod, "productos", form.prodEditar ? "update" : "insert").then(
        async (res) => {
          if (res.status === "success") {
            for (const i in form.imagenes) {
              if (form.imagenes[i] !== null) {
                const img = new FormData();
                img.append("idtienda", Number(tiendaData.idtienda));
                img.append(
                  "idproducto",
                  Number(
                    form.prodEditar
                      ? form.prodEditar.idproducto
                      : res.result.idproducto
                  )
                );
                img.append("image", form.imagenes[i]);
                await insertImg(img);
              }
            }
            for (const i in form.imagenesEditar) {
              if (form.imagenesEditar[i] !== null) {
                const img = new FormData();
                img.append("idtienda", Number(tiendaData.idtienda));
                img.append(
                  "idproducto",
                  Number(
                    form.prodEditar
                      ? form.prodEditar.idproducto
                      : res.result.idproducto
                  )
                );
                img.append("image", form.imagenesEditar[i].img);
                img.append("idproductoimagen", form.imagenesEditar[i].id);
                await editarImg(img);
              }
            }
            for (const i in form.imagenesBorrar) {
              if (form.imagenesBorrar[i] !== null) {
                const img = new FormData();
                img.append("idtienda", Number(tiendaData.idtienda));
                img.append(
                  "idproducto",
                  Number(
                    form.prodEditar
                      ? form.prodEditar.idproducto
                      : res.result.idproducto
                  )
                );
                img.append("image", form.imagenesBorrar[i].nombre);
                img.append("idproductoimagen", form.imagenesBorrar[i].id);
                await borrarImg(img);
              }
            }
            if(form.tipoNombre==="Ropa interior" || form.tipoNombre==="Trajes de ba??o"){
              mensajeFinal = "El producto esta en revisi??n por la categoria seleccionada."
            }
            if (form.video) {
              if (form.videoApi && form.cambioVideo) {
                const vidApi = new FormData();
                vidApi.append("idtienda", Number(tiendaData.idtienda));
                vidApi.append("idproducto", Number(form.prodEditar.idproducto));
                vidApi.append(
                  "idproductoimagen",
                  form.videoApi.idproductoimagen
                  );
                  await apiFetch(vidApi, "productos", "delete_image")
                }
              mensajeFinal = "El producto esta en revisi??n porque contiene un video."
              const vid = new FormData();
              vid.append("idtienda", Number(tiendaData.idtienda));
              vid.append(
                "idproducto",
                Number(
                  form.prodEditar
                    ? form.prodEditar.idproducto
                    : res.result.idproducto
                )
              );
              vid.append("video", form.video);
              await apiFetch(vid, "productos", "insert_video")
            }
            setLoading(false);
            Swal.fire({
              title: form.prodEditar?"PRODUCTO EDITADO EXITOSAMENTE":"PRODUCTO CARGADO EXITOSAMENTE",
              text:mensajeFinal===""?null:mensajeFinal,
              customClass: {
                container:"popUpProdAlert",
                cancelButton:"popUpButtons",
                confirmButton:"popUpButtons2"
              },
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "VER MIS PRODUCTOS",
              cancelButtonText: "CARGAR OTRO PRODUCTO",
            }).then((res) => {
              if(!res.isConfirmed){
                window.location.replace(
                  "https://www.miropero.ar/Mi&Tienda/CATEGORIA"
                );
              }else{
                window.location.replace(
                  "https://www.miropero.ar/Mi&Tienda/PRODUCTOS"
                );
              }
            });
          }
        }
      );
    }
  };

  const insertImg = async (prod) => {
    await apiFetch(prod, "productos", "insert_image").then((res) => {
      return res;
    });
  };
  const editarImg = async (prod) => {
    await apiFetch(prod, "productos", "update_image").then((res) => {
      return res;
    });
  };
  const borrarImg = async (prod) => {
    await apiFetch(prod, "productos", "delete_image").then((res) => {
      return res;
    });
  };

  return (
    <div className="sumarioContainer">
      <div className="container">
        <Breadcrumbs links={pathnames} />
        <span className="title">SUMARIO</span>
        <span className="subtitle">Revis?? los datos y public?? tu producto</span>
        <div className="detailSection">
          <div className="subSection">
            <div className="firstLine">
              <p className="title">Categor??a</p>
              <img
                className="editICon"
                src={editIcon}
                alt="editICon"
                onClick={() => navigate(`/Mi&Tienda/CATEGORIA`)}
              />
            </div>
            <div className="infoCat">
              <p>
                {form.prodEditar
                  ? form.tipoNombre
                  : `${form.categoriaNombre} / ${form.tipoNombre}`}
              </p>
              {!form.prodEditar && (
                <button onClick={() => navigate(`/Mi&Tienda/CATEGORIA`)}>
                  MODIFICAR
                </button>
              )}
            </div>
          </div>
          <div className="subSection">
            <div className="firstLine">
              <p className="title">Im??genes</p>
              <img
                className="editICon"
                src={editIcon}
                alt="editICon"
                onClick={() => navigate(`/Mi&Tienda/IMAGENES`)}
              />
            </div>
            <div className="infoImagenes">
              <div><>
                {Object.keys(form.imagenesPreview).map((key, i) => {
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
                {form.video !== null && 
                  <img
                    src={videoLogo}
                    alt="formImg"
                    width={isMobile?25:30}
                    height={isMobile?25:30}
                  />
                }</>
              </div>
              <button onClick={() => navigate(`/Mi&Tienda/IMAGENES`)}>
                MODIFICAR
              </button>
            </div>
          </div>
          <div className="subSection">
            <div className="firstLine">
              <p className="title">Caracter??sticas</p>
              <img
                className="editICon"
                src={editIcon}
                alt="editICon"
                onClick={() => navigate(`/Mi&Tienda/CARACTERISTICAS`)}
              />
            </div>
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
            <div className="firstLine">
              <p className="title">Detalle</p>
              <img
                className="editICon"
                src={editIcon}
                alt="editICon"
                onClick={() => navigate(`/Mi&Tienda/DETALLES`)}
              />
            </div>
            <div className="infoDetalle">
              <div>
                {Object.keys(form.detalles).map((key, index) => {
                  return (
                    <div key={index}>
                      <p>{key}:</p>
                      <span>{key.toUpperCase()==="PRECIO"?" $ ":null}{form.detalles[key]}</span>
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
            <Button onClick={() => handleSubmit()}>
              {form.prodEditar ? "GUARDAR CAMBIOS" : "PUBLICAR"}
            </Button>
          )}
          {form.prodEditar ? <></> : 
            <p>
              Al oprimir {form.prodEditar ? "GUARDAR CAMBIOS" : "PUBLICAR "}
              aceptas los{" "}
              <span
                onClick={() =>
                  window.open("https://www.miropero.ar/terminos&y&condiciones")
                }
                >
                t??rminos y condiciones
              </span>{" "}
              de uso de la plataforma Mi Ropero y nuestras{" "}
              <span
                onClick={() =>
                  window.open("https://www.miropero.ar/politica&de&privacidad")
                }
              >
                politicas de privacidad.
              </span>
            </p>
          }
        </div>
        <div
          className="returnLink"
          
        >
          <img src={leftArrow} alt="leftArrow" />
          <p onClick={() => {
            form.crearTienda
              ? navigate(`/Mi&Tienda/CONTACTO`)
              : navigate(`/Mi&Tienda/DETALLES`);
          }}>{form.crearTienda ? "VOLVER A CONTACTO" : "VOLVER A DETALLES"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sumario;
