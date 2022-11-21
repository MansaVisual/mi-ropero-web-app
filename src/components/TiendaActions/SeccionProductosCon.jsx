import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import basura from "../../assets/img/basura.png";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import { Grid } from "@mui/material";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import PopUpDescProd from "./PopUpDescProd";

const SeccionProductosCon = () => {
  const navigate = useNavigate();

  const { productos } = useContext(UseMiTiendaContext);

  const [openMessagePopUp, setOpenMessagePopUp] = useState(false);

  return (
    <div className="seccionProductosCon">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="productContainer">
          <div className="firstLine">
            <p className="title">MIS PRODUCTOS</p>
            <p className="discountLink">CREAR DESCUENTO PARA TU TIENDA</p>
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
                          <p className="discountLink">
                            CREAR DESCUENTO PARA TU TIENDA
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
      {openMessagePopUp && (
        <PopUpDescProd setOpenMessagePopUp={setOpenMessagePopUp} />
      )}
    </div>
  );
};

export default SeccionProductosCon;
