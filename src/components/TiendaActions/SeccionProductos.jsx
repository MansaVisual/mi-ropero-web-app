import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import basura from "../../assets/img/basura.png";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import logo from "../../assets/img/isologo.png";
import { Grid } from "@mui/material";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import PopUpDescuento from "./PopUpDescuento";
import Swal from "sweetalert2";
import { apiFetch } from "../../apiFetch/apiFetch";

const SeccionProductos = ({ setForm }) => {
  const navigate = useNavigate();

  const { productos, tiendaDetail } = useContext(UseMiTiendaContext);
  const [descuentoInfo, setDescuentoInfo] = useState({});
  const [openPopUp, setOpenPopUp] = useState(false);

  console.log(tiendaDetail);

  const handleOpenModal = (infoDesc, metodo) => {
    console.log(metodo, infoDesc);
    setOpenPopUp(true);
    if (metodo === "productos") {
      setDescuentoInfo({
        productId: infoDesc.idproducto,
        idTienda: infoDesc.idtienda,
        metodo: "productos",
      });
    } else {
      setDescuentoInfo({
        idCliente: tiendaDetail.idcliente,
        idTienda: tiendaDetail.idtienda,
        metodo: "tiendas",
      });
    }
  };

  const handleDelete = ( idproducto ) => {
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
          <div className="productList">
            {productos.length > 0 &&
              productos.map((product, id) => {console.log(product)
                return (
                  <>
                    <div key={id} className="desktopCard">
                      <div className="cardData">
                        <img
                          src={product.imagenes[0].imagen_cuadrada}
                          alt="cardImage"
                          /* onError={(e) => handleAvatarError(e)} */
                        />
                        <div>
                          <p className="title">{product.nombre}</p>
                          <p className="state">{product.estado_text}</p>
                          <p
                            className="discountLink"
                            onClick={() =>
                              handleOpenModal(product, "productos")
                            }
                          >
                            CREAR DESCUENTO
                          </p>
                        </div>
                      </div>
                      <div className="ofertaData">
                        {product.precio_oferta==="0.00"?
                          <p className="monto">${product.precio}</p>:<>
                          <p className="oldMonto">${product.precio}</p>
                          <p className="montoOferta">${product.precio_oferta}</p></>
                        }
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
                        src={product.imagenes[0].imagen_cuadrada}
                        className="productImg"
                        alt="cardImage"
                      />
                      <div>
                        <p className="messageTitle">{product.nombre}</p>
                        <p className="messageState">{product.estado_text}</p>
                        {product.precio_oferta==="0.00"?
                          <p className="monto">${product.precio}</p>:<>
                          <p className="oldMonto">${product.precio}</p>
                          <p className="montoOferta">${product.precio_oferta}</p></>
                        }                        <p
                          className="discountLink"
                          onClick={() => handleOpenModal(product, "productos")}
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
          <div className="buttonContainer">
            <button
              onClick={() => {
                setForm((prevState) => ({
                  ...prevState,
                  crearTienda: false,
                }));
                navigate(`/MiTienda/CATEGORIA`);
              }}
            >
              AGREGAR PRODUCTO
            </button>
          </div>
          <div className="returnLink" onClick={() => navigate(`/MiTienda`)}>
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
    </div>
  );
};

export default SeccionProductos;
