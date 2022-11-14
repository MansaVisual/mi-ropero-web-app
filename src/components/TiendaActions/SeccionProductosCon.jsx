import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../../assets/img/MiTiendaBanner.svg";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import iconHide from "../../assets/img/iconHide.svg";
import iconShow from "../../assets/img/iconShow.svg";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { UseLoginContext } from "../../context/LoginContext";

const SeccionProductosCon = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const { infoUser } = useContext(UseLoginContext);

  const [notificationsOff, setNotificationsOff] = useState(false);
  const [closeSession, setCloseSession] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const [showMoney, setShowMoney] = useState(false);

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
    <div className="seccionProductosCon">
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
              <span>{showMoney ? "$30.713,02" : "$**.***.**"}</span>
              {showMoney ? (
                <img
                  src={iconHide}
                  alt="iconHide"
                  onClick={() => setShowMoney(false)}
                />
              ) : (
                <img
                  src={iconShow}
                  alt="iconShow"
                  onClick={() => setShowMoney(true)}
                />
              )}
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
        <div className="bottomSection">
          <div className="bottomOptions">
            <button>Acerca de la aplicación</button>
            <button>Califica la aplicación</button>
            {/* <button
              onClick={() => setNotificationsOff(true)}
              style={{ color: "#423B3C" }}
            >
              Desactivar notificaciones
            </button> */}
            <button
              onClick={() => setCloseSession(true)}
              style={{ color: "#FF3F20" }}
            >
              Cerrar Sesión
            </button>
            <button onClick={() => setDeleteAccount(true)}>
              Eliminar mi cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionProductosCon;
