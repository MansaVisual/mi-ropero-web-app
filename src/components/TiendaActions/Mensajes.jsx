import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import foto from "../../assets/img/fotoProd.png";
import error from "../../assets/img/error.png";
import basura from "../../assets/img/basura.png";
import mensaje from "../../assets/img/mensajesVacio.png";
import { Button, MenuItem, Select } from "@mui/material";
import Loader from "../Loader/Loader";
import { UseLoginContext } from "../../context/LoginContext";
import { UsePerfilContext } from "../../context/PerfilContext";

const Mensajes = () => {
  const navigate = useNavigate();

  let { id } = useParams();

  const [typeMessages, setTypeMessages] = useState(false);
  const [currentType, setCurrentType] = useState(false);
  const [mensajesFiltrados, setMensajesFiltrados] = useState([]);
  const [borrarMsj, setBorrarMsj] = useState(false);
  const mensajesEstado = ["No leído", "Leído"];

  /*   const { userLog } = useContext(UseLoginContext);
  const {
    handleMensajes,
    mensajes,
    mensajesFinBusqueda,
    setMensajeId,
    mensajeId,
  } = useContext(UsePerfilContext); */

  /*   useEffect(() => {
    if (userLog !== "") {
      handleMensajes(userLog);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog]);

  useEffect(() => {
    if (id) {
      setMensajeId(id);
      navigate(`/perfil/MI CHAT`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mensajes.length > 0) {
      if (currentType === "ver todos") {
        setMensajesFiltrados(
          mensajes.filter((msg) => msg.cliente_id !== userLog)
        );
      }
      if (currentType === "ver no leídos") {
        setMensajesFiltrados(
          mensajes.filter(
            (msg) => msg.estado === "1" && msg.cliente_id !== userLog
          )
        );
      }
      if (currentType === "ver leídos") {
        setMensajesFiltrados(
          mensajes.filter(
            (msg) => msg.estado === "2" && msg.cliente_id !== userLog
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensajes, currentType]); */

  const array = [
    {
      img: foto,
      nombreProd: "Conjunto Grisino (1 a 3 meses)",
      fecha: "9/8/2022  15:09:22 hs",
      estado: "Pago realizado",
      monto: 2000,
      oferta: 2500,
    },
  ];
  const stateList = ["pago Realizado", "en espera"];

  const formatoFecha = (fecha) => {
    const hora = fecha.substring(11, 16);
    const fechaSinHora = fecha.substring(0, 10);
    const [year, month, day] = fechaSinHora.split("-");

    const formatoFinal = `Fecha: ${day} / ${month} / ${year} ${hora} Hs.`;
    return formatoFinal;
  };
  const handleAvatarError = (event) => {
    event.currentTarget.src = error;
  };

  return (
    <div className="ofertasContainer">
      <TiendaBanner />
      <div className="container">
        <div className="firstLine">
          <p className="title">MIS MENSAJES</p>
          <div className="inputBox">
            <Select
              displayEmpty
              color="primary"
              className="selectInput"
              size="small"
              onChange={(e) => setCurrentType(e.target.value)}
              value={currentType}
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
          {/* {!mensajesFinBusqueda ? (
            <div
              style={{
                height: "50vh",
                marginTop: "42px",
                width: "100%",
                maxWidth: "895px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Loader spin={"spinnerM"} />
            </div>
          ) : mensajesFiltrados.length > 0 ? (
            mensajesFiltrados.map((mensaje, id) => {
              return (
                <>
                  <div
                    key={id}
                    className="desktopCard"
                    onClick={() => {
                   setMensajeId(mensaje.idmensaje); 
                      navigate(`/perfil/MI CHAT`);
                    }}
                  >
                    <div className="mensajeData">
                      <img
                        src={mensaje.producto.imagenes[0].imagen_cuadrada}
                        alt="cardImage"
                        onError={(e) => handleAvatarError(e)}
                      />
                      <div>
                        <p className="messageTitle">
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
                  <div
                    key={`mobile${id}`}
                    className="mobileCard"
                    onClick={() => {
                   setMensajeId(mensaje.idmensaje);
                      navigate(`/perfil/MI CHAT`);
                    }}
                  >
                    <img
                      src={mensaje.producto.imagenes[0].imagen_cuadrada}
                      className="productImg"
                      alt="cardImage"
                      onError={(e) => handleAvatarError(e)}
                    />
                    <div>
                      <p className="messageTitle">{mensaje.titulo}</p>
                      <p className="messageDate">
                        {formatoFecha(mensaje.fecha)}
                      </p>
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
                <p>Aún no tienes mensajes "{currentType}"</p>
                <Button onClick={() => navigate(`/`)}>IR A INICIO</Button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Mensajes;