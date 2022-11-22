import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import basura from "../../assets/img/basura.png";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import { Grid } from "@mui/material";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import PopUpDescuento from "./PopUpDescuento";

const SeccionProductosCon = () => {
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
              productos.map((product, id) => {
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
                        <p className="monto">${product.precio}</p>
                        <img
                          onClick={() => {
                            /* setBorrarMsj(true);
                      setMensajeId(mensaje.idmensaje); */
                          }}
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
                        <p className="monto">${product.precio}</p>
                        <p
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

export default SeccionProductosCon;
