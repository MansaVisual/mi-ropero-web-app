import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import Sweater from "../../assets/img/Sweater.png";
import Basura from "../../assets/img/basura.png";
import { Button, MenuItem, Select } from "@mui/material";
import { UseLoginContext } from "../../context/LoginContext";
import { UsePerfilContext } from "../../context/PerfilContext";
import Loader from "../Loader/Loader";
import mensaje from "../../assets/img/mensajesVacio.png";
import PopUpBorrarMsj from "./PopUpBorrarMsj";

const MisMensajes = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();
  const [typeMessage, setTypeMessage] = useState("ver no leídos");
  const typeMessages = ["ver todos", "ver no leídos", "ver leídos"];
  const [mensajesFiltrados, setMensajesFiltrados] = useState([]);
  const [borrarMsj, setBorrarMsj] = useState(false);

  const { userLog } = useContext(UseLoginContext);
  const {
    handleMensajes,
    mensajes,
    mensajesFinBusqueda,
    setMensajeId,
    mensajeId,
  } = useContext(UsePerfilContext);

  useEffect(() => {
    if (userLog !== "") {
      handleMensajes(userLog);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog]);

  useEffect(() => {
    if (mensajes.length > 0) {
      if (typeMessage === "ver todos") {
        setMensajesFiltrados(mensajes);
      }
      if (typeMessage === "ver no leídos") {
        setMensajesFiltrados(mensajes.filter((msg) => msg.estado === "2"));
      }
      if (typeMessage === "ver leídos") {
        setMensajesFiltrados(mensajes.filter((msg) => msg.estado === "1"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensajes, typeMessage]);

  const mensajesEstado = ["No leído", "Leído"];

  const handleAvatarError = (event) => {
    event.currentTarget.src = Sweater;
  };

  const formatoFecha = (fecha) => {
    const hora = fecha.substring(11, 16);
    const fechaSinHora = fecha.substring(0, 10);
    const [year, month, day] = fechaSinHora.split("-");

    const formatoFinal = `Fecha: ${day} / ${month} / ${year} ${hora} Hs.`;
    return formatoFinal;
  };

  return (
    <div className="misMensajesContainer">
      <Breadcrumbs links={pathnames} />
      <div className="firstLine">
        <p className="title">MIS MENSAJES</p>
        <div className="inputBox">
          <Select
            displayEmpty
            color="primary"
            className="selectInput"
            size="small"
            onChange={(e) => setTypeMessage(e.target.value)}
            value={typeMessage}
            renderValue={(selected) => {
              if (selected === "") {
                return <em>Seleccioná una opción</em>;
              }
              return selected;
            }}
            sx={{
              "& div": {
                fontSize: "14px",
                fontWeight: "400",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
              },
              height: 42,
            }}
          >
            <MenuItem
              disabled
              value=""
              className="selectOption"
              sx={{ fontSize: "14px", color: "#BABCBE", fontWeight: "400" }}
            >
              <em>Seleccioná </em>
            </MenuItem>
            {typeMessages.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ fontSize: "14px", color: "#969696" }}
                className="selectOption"
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="mensajesContainer">
        {!mensajesFinBusqueda ? (
          <div
            style={{
              height: "50vh",
              marginTop: "42px",
              width: "100%",
              maxWidth: "1366px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader spin={"spinnerM"} />
          </div>
        ) : mensajes.length > 0 ? (
          mensajesFiltrados.map((mensaje, id) => {
            return (
              <>
                <div key={id} className="desktopCard">
                  <div className="mensajeData">
                    <img
                      src={mensaje.producto.imagenes[0].imagen_cuadrada}
                      alt="cardImage"
                      onError={(e) => handleAvatarError(e)}
                    />
                    <div>
                      <p
                        className="messageTitle"
                        onClick={() => {
                          setMensajeId(mensaje.idmensaje);
                          navigate(`/perfil/MI CHAT`);
                        }}
                      >
                        {mensaje.producto.nombre}
                      </p>
                      <p className="messageDate">
                        {formatoFecha(mensaje.fecha)}
                      </p>
                      <p className="messageMessage">{mensaje.mensaje}</p>
                      <p className="messageState">
                        {mensajesEstado[Number(mensaje.estado)]}
                      </p>
                    </div>
                  </div>
                  <img
                    onClick={() => {
                      setBorrarMsj(true);
                      setMensajeId(mensaje.idmensaje);
                    }}
                    className="basuraIcon"
                    src={Basura}
                    alt="BasuraIcon"
                  />
                </div>
                <div key={`mobile${id}`} className="mobileCard">
                  <img
                    src={mensaje.producto.imagenes[0].imagen_cuadrada}
                    className="productImg"
                    alt="cardImage"
                    onError={(e) => handleAvatarError(e)}
                  />
                  <div>
                    <p className="messageTitle">{mensaje.titulo}</p>
                    <p className="messageDate">{formatoFecha(mensaje.fecha)}</p>
                    <p className="messageMessage">{mensaje.mensaje}</p>
                    <p className="messageState">
                      {mensajesEstado[Number(mensaje.estado)]}
                    </p>
                  </div>
                  <img src={Basura} className="trashICon" alt="basuraIcon" />
                </div>
              </>
            );
          })
        ) : (
          <div className="perfilVacio">
            <div>
              <img src={mensaje} alt="LOGO" />
              <p>Aún no tienes mensajes "{typeMessage}"</p>
              <Button onClick={() => navigate(`/`)}>IR A INICIO</Button>
            </div>
          </div>
        )}
      </div>
      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
      </div>
      {borrarMsj && (
        <PopUpBorrarMsj
          setBorrarMsj={setBorrarMsj}
          mensajeId={mensajeId}
          setMensajesFiltrados={setMensajesFiltrados}
        />
      )}
    </div>
  );
};

export default MisMensajes;
