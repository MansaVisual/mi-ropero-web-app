import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import basura from "../../assets/img/basura.png";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import logo from "../../assets/img/isologo.png";
import MRlogoGrande from "../../assets/img/MRlogoGrande.png";
import { Grid } from "@mui/material";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import PopUpDescuento from "./PopUpDescuento";
import Swal from "sweetalert2";
import { apiFetch } from "../../apiFetch/apiFetch";
import PopUpDescTienda from "./PopUpDescTienda";
import { UseLoginContext } from "../../context/LoginContext";
import editIcon from "../../assets/img/editIcon.png";

const SeccionProductos = ({ setForm }) => {
  const navigate = useNavigate();
  const { userLog } = useContext(UseLoginContext);

  const { productos, tiendaDetail } = useContext(UseMiTiendaContext);
  const [descuentoInfo, setDescuentoInfo] = useState({});
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPopUp2, setOpenPopUp2] = useState(false);

  const handleOpenModal = (infoDesc, metodo) => {
    if (metodo === "productos") {
      setOpenPopUp(true);
      setDescuentoInfo({
        productId: infoDesc.idproducto,
        idTienda: infoDesc.idtienda,
        metodo: "productos",
      });
    } else {
      setOpenPopUp2(true);
      setDescuentoInfo({
        idCliente: tiendaDetail.idcliente,
        idTienda: tiendaDetail.idtienda,
        metodo: "tiendas",
      });
    }
  };

  const handleDelete = (idproducto) => {
    Swal.fire({
      title: "¿DESEA BORRAR ESTE PRODUCTO?",
      text: "Si borras este producto, perderás todos sus datos",
      iconHtml: `<img src=${logo} alt="LOGO">`,
      customClass: {
        icon: "no-border",
        container: "popUpLoginAlert",
        cancelButton: "popUpLoginCancel",
      },
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "CONTINUAR",
      cancelButtonText: "CANCELAR",
    }).then((res) => {
      if (res.isConfirmed) {
        const prod = new FormData();
        prod.append("idtienda", tiendaDetail.idtienda);
        prod.append("idproducto", idproducto);
        apiFetch(prod, "productos", "delete").then(async (res) => {
          if (res.status === "error") {
            Swal.fire({
              title: "ERROR AL ELIMINAR PRODUCTO",
              text: "Surgió un error al eliminar producto. Volvé a intentarlo",
              icon: "error",
              confirmButtonText: "ACEPTAR",
            });
          } else {
            Swal.fire({
              title: "PRODUCTO ELIMINADO CON EXITO",
              text: "La operación se realizó correctamente!",
              icon: "success",
              confirmButtonText: "ACEPTAR",
            }).then(() => {
              window.location.reload();
            });
          }
        });
      }
    });
  };

  const editarProd = async (id) => {
    const prod = new FormData();
    prod.append("idproducto", Number(id));
    prod.append("idtienda", Number(tiendaDetail.idtienda));
    apiFetch(prod, "productos", "get").then((res) => {
      if (res.status === "success") {
        setForm((prevState) => ({
          ...prevState,
          crearTienda: false,
          editarProd: true,
          prodEditar: res.result,
        }));
        navigate(`/Mi&Tienda/IMAGENES`);
      }
    });
  };

  return (
    <div className="seccionProductosCon">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="productContainer">
          <div className="firstLine">
            <p className="title">MIS PRODUCTOS</p>
            <p
              className="discountLink"
              onClick={() => handleOpenModal("", "tiendas")}
            >
              CREAR DESCUENTO PARA TU TIENDA
            </p>
          </div>
          <div className="buttonContainer">
            <button
              onClick={() => {
                setForm((prevState) => ({
                  ...prevState,
                  crearTienda: false,
                }));
                navigate(`/Mi&Tienda/CATEGORIA`);
              }}
            >
              AGREGAR PRODUCTO
            </button>
          </div>
          <div className="productList">
            {productos.length > 0 &&
              productos.map((product, id) => {
                return (
                  <>
                    <div key={id} className="desktopCard">
                      <div className="cardData">
                        <img
                          src={
                            product.imagenes.length !== 0
                              ? product.imagenes[0].imagen_cuadrada
                              : MRlogoGrande
                          }
                          alt="cardImage"
                        />
                        <div>
                          <p className="title">{product.nombre}</p>
                          <p className="state"><span style={{
                            color:"#423b3c",
                            fontSize:"14px",
                            fontWeight:"600",
                            lineHeight:"24px"
                          }}>Estado:</span>{" "}{product.estado_text}</p>
                          <p
                            className="discountLink"
                            onClick={
                              product.precio_oferta !== "0.00"
                                ? () =>
                                    Swal.fire({
                                      title: "EL PRODUCTO YA ESTA EN OFERTA",
                                      icon: "info",
                                      confirmButtonText: "ACEPTAR",
                                    })
                                : () => handleOpenModal(product, "productos")
                            }
                          >
                            CREAR DESCUENTO
                          </p>
                        </div>
                        <img
                          className="editICon"
                          src={editIcon}
                          alt="editICon"
                          onClick={() => {
                            editarProd(product.idproducto);
                          }}
                        />
                      </div>
                      <div className="ofertaData">
                        {product.precio_oferta === "0.00" ? (
                          <p className="monto" style={{color:"#423B3C"}}>
                            $
                            {new Intl.NumberFormat("de-DE").format(
                              product.precio
                            )}
                          </p>
                        ) : (
                          <>
                            <p className="oldMonto">
                              $
                              {new Intl.NumberFormat("de-DE").format(
                                product.precio
                              )}
                            </p>
                            <p className="montoOferta">
                              $
                              {new Intl.NumberFormat("de-DE").format(
                                product.precio_oferta
                              )}
                            </p>
                          </>
                        )}
                        <img
                          onClick={() => handleDelete(product.idproducto)}
                          className="basuraIcon"
                          src={basura}
                          alt="BasuraIcon"
                        />
                      </div>
                    </div>
                    <div key={`mobile${id}`} className="mobileCard">
                      <img
                        src={
                          product.imagenes.length !== 0
                            ? product.imagenes[0].imagen_cuadrada
                            : MRlogoGrande
                        }
                        className="productImg"
                        alt="cardImage"
                      />
                      <div>
                        <p className="messageTitle">{product.nombre}
                        <img
                          className="editIConMobile"
                          src={editIcon}
                          alt="editICon"
                          onClick={() => {
                            editarProd(product.idproducto);
                          }}
                        />
                        </p>
                        <p className="messageState">{product.estado_text}</p>
                        {product.precio_oferta === "0.00" ? (
                          <p className="monto">
                            $
                            {new Intl.NumberFormat("de-DE").format(
                              product.precio
                            )}
                          </p>
                        ) : (
                          <>
                            <p className="oldMonto">
                              $
                              {new Intl.NumberFormat("de-DE").format(
                                product.precio
                              )}
                            </p>
                            <p className="montoOferta">
                              $
                              {new Intl.NumberFormat("de-DE").format(
                                product.precio_oferta
                              )}
                            </p>
                          </>
                        )}
                        <p
                          className="discountLink"
                          onClick={
                            product.precio_oferta !== "0.00"
                              ? () =>
                                  Swal.fire({
                                    title: "EL PRODUCTO YA ESTA EN OFERTA",
                                    icon: "info",
                                    confirmButtonText: "ACEPTAR",
                                  })
                              : () => handleOpenModal(product, "productos")
                          }
                        >
                          CREAR DESCUENTO
                        </p>

                      </div>
                      <img
                        src={basura}
                        className="trashICon"
                        alt="basuraIcon"
                      />
                    </div>
                  </>
                );
              })}
          </div>
          <div className="returnLink" onClick={() => navigate(`/Mi&Tienda`)}>
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A MI TIENDA</p>
          </div>
        </div>
      </Grid>
      {openPopUp && (
        <PopUpDescuento
          descuentoInfo={descuentoInfo}
          setOpenPopUp={setOpenPopUp}
        />
      )}
      {openPopUp2 && (
        <PopUpDescTienda
          descuentoInfo={descuentoInfo}
          setOpenPopUp={setOpenPopUp2}
        />
      )}
    </div>
  );
};

export default SeccionProductos;
