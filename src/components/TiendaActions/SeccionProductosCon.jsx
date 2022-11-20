import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import { UseLoginContext } from "../../context/LoginContext";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import { Grid } from "@mui/material";

const SeccionProductosCon = () => {
  const navigate = useNavigate();
  const { infoUser } = useContext(UseLoginContext);

  const prods = [
    // {
    //   id: 1,
    //   img: foto,
    //   nombre: "prueba",
    //   precio: 2000,
    //   fecha: "21/7/2022  11:08:20 Hs.",
    // },
  ];

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
            {prods.map((product, id) => {
              return (
                <>
                  <div key={id} className="desktopCard">
                    <div className="cardData">
                      <img
                        src={product.img}
                        alt="cardImage"
                        /* onError={(e) => handleAvatarError(e)} */
                      />
                      <div>
                        <p className="title">{product.nombre}</p>
                        <p className="state">
                          {/* {mensajesEstado[Number(product.estado)]} */}
                          Estado:publicado
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
                      src={product.img}
                      className="productImg"
                      alt="cardImage"
                    />
                    <div>
                      <p className="messageTitle">{product.nombre}</p>
                      <p className="messageState">Estado:publicado</p>
                      <p className="monto">${product.precio}</p>
                    </div>
                    <img src={basura} className="trashICon" alt="basuraIcon" />
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
    </div>
  );
};

export default SeccionProductosCon;
