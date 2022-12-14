import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import error from "../../assets/img/error.png";
import mensaje from "../../assets/img/mensajesVacio.png";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import Loader from "../Loader/Loader";
import { UseLoginContext } from "../../context/LoginContext";
import { UsePerfilContext } from "../../context/PerfilContext";
import isologo from "../../assets/img/MRlogoGrande.png";

const Mensajes = () => {
  const navigate = useNavigate();

  let { id } = useParams();

  const typeMessages = ["ver todos", "ver no leídos", "ver leídos"];
  const [currentType, setCurrentType] = useState("ver todos");
  const [mensajesFiltrados, setMensajesFiltrados] = useState([]);
  /*   const [borrarMsj, setBorrarMsj] = useState(false); */
  const mensajesEstado = ["", "No leído", "Leído"];

  const { userLog } = useContext(UseLoginContext);
  const {
    handleMensajes,
    mensajes,
    mensajesFinBusqueda,
    setMensajeId,
    /*  mensajeId, */
  } = useContext(UsePerfilContext);

  useEffect(() => {
    if (userLog !== "") {
      handleMensajes(userLog, "all_saler");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog]);

  useEffect(() => {
    if (id) {
      setMensajeId(id);
      navigate(`/MI&TIENDA/MI CHAT`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mensajes.length > 0) {
      if (currentType === "ver todos") {
        setMensajesFiltrados(mensajes);
      }
      if (currentType === "ver no leídos") {
        setMensajesFiltrados(mensajes.filter((msg) => msg.estado === "1"));
      }
      if (currentType === "ver leídos") {
        setMensajesFiltrados(mensajes.filter((msg) => msg.estado === "2"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensajes, currentType]);

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
    <div className="mensajesPage">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="container">
          <div className="mensajesSection">
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
                    sx={{
                      fontSize: "14px",
                      color: "#BABCBE",
                      fontWeight: "400",
                    }}
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
                          navigate(`/Mi&Tienda/MI CHAT`);
                        }}
                      >
                        <div className="mensajeData">
                          <img
                            src={
                              mensaje.producto
                                ? mensaje.producto.imagenes[0].imagen_cuadrada
                                : isologo
                            }
                            alt="cardImage"
                            onError={(e) => handleAvatarError(e)}
                          />
                          <div>
                            <p className="messageTitle">
                              {mensaje.producto
                                ? mensaje.producto.nombre
                                : "producto no encontrado"}
                            </p>
                            <p className="messageDate">
                              {mensaje.fecha_ultimo
                                ? formatoFecha(mensaje.fecha_ultimo)
                                : formatoFecha(mensaje.fecha)}
                            </p>
                            <p className="messageMessage">
                              {mensaje.mensaje_ultimo
                                ? mensaje.mensaje_ultimo
                                : mensaje.mensaje}
                            </p>
                            <p className="messageState">
                              {mensaje.estado_ultimo
                                ? mensajesEstado[Number(mensaje.estado_ultimo)]
                                : mensajesEstado[Number(mensaje.estado)]}
                            </p>
                          </div>
                        </div>
                        {/* <img
                          onClick={() => {
                            setBorrarMsj(true);
                            setMensajeId(mensaje.idmensaje);
                          }}
                          className="basuraIcon"
                          src={basura}
                          alt="BasuraIcon"
                        /> */}
                      </div>
                      <div
                        key={`mobile${id}`}
                        className="mobileCard"
                        onClick={() => {
                          setMensajeId(mensaje.idmensaje);
                          navigate(`/Mi&Tienda/MI CHAT`);
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
                            {mensaje.fecha_ultimo
                              ? formatoFecha(mensaje.fecha_ultimo)
                              : formatoFecha(mensaje.fecha)}
                          </p>
                          <p className="messageMessage">
                            {mensaje.mensaje_ultimo
                              ? mensaje.mensaje_ultimo
                              : mensaje.mensaje}
                          </p>
                          <p className="messageState">
                            {mensaje.estado_ultimo
                              ? mensajesEstado[Number(mensaje.estado_ultimo)]
                              : mensajesEstado[Number(mensaje.estado)]}
                          </p>
                        </div>
                        {/*  <img
                          src={basura}
                          className="trashICon"
                          alt="basuraIcon"
                        /> */}
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="perfilVacio">
                  <div>
                    <img src={mensaje} alt="LOGO" />
                    <p>Aún no tienes mensajes "{currentType}"</p>
                    <Button onClick={() => navigate(`/MI&TIENDA`)}>
                      IR A MI TIENDA
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="returnLink" onClick={() => navigate(`/Mi&Tienda`)}>
              <img src={leftArrow} alt="leftArrow" />
              <p>VOLVER A MI TIENDA</p>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Mensajes;
