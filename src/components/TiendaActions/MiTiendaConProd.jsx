import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../assets/img/MiTiendaBanner.svg";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { UseLoginContext } from "../../context/LoginContext";

const MiTiendaConProd = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { infoUser } = useContext(UseLoginContext);

  const prods = [
    {
      id: 1,
      img: foto,
      nombre: "prueba",
      precio: 2000,
    },
  ];

  console.log(infoUser);
  return (
    <div className="MiTiendaConProd">
      <div className="breadcrumbs">
        <Breadcrumbs links={pathnames} />
      </div>
      <div className="banner">
        <img src={Banner} alt="banner" />
        <div className="content">
          <div className="titleBox">
            <span className="title">El Ropero de Sandra</span>
            <span className="subTitle">VER MI TIENDA</span>
          </div>
          <div className="moneyCount">
            <div>
              <p>Cuenta corriente</p>
              <span>$30.713,02</span>
              {/* <img src="" alt="" /> */}
            </div>
            <button>SOLICITAR TRANSFERENCIA</button>
          </div>
        </div>
      </div>
      <div className="productContainer">
        <div className="firstLine">
          <p className="title">MIS MENSAJES</p>
          <p className="discountLink">CREAR DESCUENTO PARA TU TIENDA</p>
        </div>
        <div className="productList">
          {prods.map((product, id) => {
            return (
              <div
                key={id}
                className="desktopCard"
                onClick={() => {
                  /* setMensajeId(product.idmensaje);
              navigate(`/perfil/MI CHAT`); */
                }}
              >
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
                <div className="rigthSide" style={{ display: "flex" }}>
                  <p>${product.precio}</p>

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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MiTiendaConProd;
