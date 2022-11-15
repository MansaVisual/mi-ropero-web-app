import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import profileTest from "../../assets/img/profileTest.png";
import misCompras from "../../assets/img/misComprasIcon.png";
import misDatos from "../../assets/img/misDatosIcon.png";
import misDirecc from "../../assets/img/misDireccIcon.png";
import misFavs from "../../assets/img/misFavsIcon.png";
import misMensajes from "../../assets/img/misMensajesIcon.png";
import misOfertas from "../../assets/img/misOfertasIcon.png";
// import miTienda from '../../assets/img/miTiendaIcon.png';
import PopUpNotis from "./PopUpNotis";
import PopUpSesion from "./PopUpSesion";
import PopUpEliminar from "./PopUpEliminar";
import { UseLoginContext } from "../../context/LoginContext";

const MiPerfil = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const { infoUser, reBuscarInfo } = useContext(UseLoginContext);

  const [notificationsOff, setNotificationsOff] = useState(false);
  const [closeSession, setCloseSession] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  useEffect(() => {
    reBuscarInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const testData = {
    name: "Sabrina Godoy",
    email: "sabrinagodoy@gmail.com",
    img: profileTest,
  };

  const profileSections = [
    // {
    //   name: 'MI TIENDA',
    //   icon: miTienda,
    // },
    {
      name: "MIS DATOS",
      icon: misDatos,
    },
    {
      name: "MIS FAVORITOS",
      icon: misFavs,
    },
    {
      name: "MIS DIRECCIONES",
      icon: misDirecc,
    },
    {
      name: "MIS COMPRAS",
      icon: misCompras,
    },
    {
      name: "OFERTAS REALIZADAS",
      icon: misOfertas,
    },
    {
      name: "MIS MENSAJES",
      icon: misMensajes,
    },
  ];


  const handleAvatarError = (event) => {
    event.currentTarget.src = testData.img;
  };

  return (
    <div className="miPerfilContainer">
      <Breadcrumbs links={pathnames} />
      <div className="container">
        <p className="title">MI PERFIL</p>
        <div className="profileData">
          <img
            src={infoUser && infoUser.avatar ? infoUser.avatar : testData.img}
            className="profilePicture"
            alt="profilePicture"
            onError={(e) => handleAvatarError(e)}
          />
          <div className="profileText">
            <p className="hello">HOLA!</p>
            <p className="name">
              {infoUser.length !== 0 &&
                `${infoUser.nombre} ${infoUser.apellido}`}
            </p>
            <p className="email">{infoUser.length !== 0 && infoUser.email}</p>
          </div>
        </div>
        <p className="profileSections">
          {profileSections.map((section) => {
            return (
              <div
                className="section"
                onClick={() => navigate(`/perfil/${section.name}`)}
              >
                <div className="imgBox">
                  <img src={section.icon} alt="icon" />
                  <p className="sectionTitleMobile">{section.name}</p>
                </div>
                <p className="sectionTitle">{section.name}</p>
              </div>
            );
          })}
        </p>
        <div className="buttonsContainer">
          <div className="bottomOptions">
            {/* <button>Acerca de la aplicación</button>
            <button>Califica la aplicación</button> */}
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
      {notificationsOff && (
        <PopUpNotis setNotificationsOff={setNotificationsOff} />
      )}
      {closeSession && <PopUpSesion setCloseSession={setCloseSession} />}
      {deleteAccount && (
        <PopUpEliminar
          setDeleteAccount={setDeleteAccount}
          idCliente={infoUser.idcliente}
        />
      )}
    </div>
  );
};

export default MiPerfil;
