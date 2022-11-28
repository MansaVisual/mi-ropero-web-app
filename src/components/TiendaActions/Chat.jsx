import React, { createRef, useState, useEffect, useContext } from "react";
import { Button, Grid } from "@mui/material";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import { UsePerfilContext } from "../../context/PerfilContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import Loader from "../Loader/Loader";
import Avatar from "../Chat/Avatar";
import ChatItem from "../Chat/ChatItem";
import leftArrow from "../../assets/img/leftArrow.png";

const Chat = () => {
  const navigate = useNavigate();

  const { userLog, infoUser } = useContext(UseLoginContext);
  const { mensajeId } = useContext(UsePerfilContext);

  const messagesEndRef = createRef(null);

  const [mensaje, setMensaje] = useState("");
  const [chatActual, setChatActual] = useState([]);
  const [scroll, setScroll] = useState(true);
  const [productoImg, setProductoImg] = useState(false);
  const [nombreProducto, setNombreProducto] = useState(false);
  const [productoId, setProductoId] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userLog && !mensajeId /* && !infoUser */) {
      navigate("/MiTienda/MENSAJES");
    } else {
      const dir = new FormData();
      dir.append("idcliente", userLog);
      dir.append("idmensaje", mensajeId);
      apiFetch(dir, "mensajes", "thread").then((res) => {
        if (res.status === "success") {
          setProductoImg(res.result[0].producto.imagenes[0].imagen_chica);
          setNombreProducto(res.result[0].producto.nombre);
          setProductoId(res.result[0].producto.idproducto);
          let array = [];
          for (const ii in res.result) {
            if (
              res.result[ii].estado === "1" &&
              res.result[ii].cliente_email !== infoUser.email
            ) {
              const msg = new FormData();
              msg.append("idcliente", userLog);
              msg.append("idmensaje", res.result[ii].idmensaje);
              apiFetch(msg, "mensajes", "readed").then((res) => {});
            }
            array.push({
              type:
                res.result[ii].cliente_email === infoUser.email ? "" : "other",
              msg: res.result[ii].mensaje,
              image:
                res.result[ii].cliente_email === infoUser.email
                  ? infoUser.avatar
                  : res.result[0].producto.imagenes[0].imagen_chica,
              idMensaje: res.result[ii].idmensaje,
              fecha: res.result[ii].fecha,
              estado: res.result[ii].estado,
            });
          }
          setChatActual(array);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          setError(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensajeId, userLog, infoUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatActual, loading]);

  useEffect(() => {
    scrollToBottom();
    setScroll(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]);

  const handlePress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (mensaje !== "") {
      const mensajePadre = chatActual[0];

      const d = new Date();

      const fecha = `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:12`;

      const dir = new FormData();
      dir.append("idcliente", userLog);
      dir.append("idmensajepadre", mensajePadre.idMensaje);
      dir.append("idproducto", productoId);
      dir.append("mensaje", mensaje);

      apiFetch(dir, "mensajes", "insert").then((res) => {
        if (res.status === "success") {
          setChatActual([
            ...chatActual,
            { type: "", msg: mensaje, image: infoUser.avatar, fecha: fecha },
          ]);
          setMensaje("");
          setScroll(true);
        }
      });
    }
  };

  return (
    <div className="tiendaChatContainer">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="chatSection">
          {loading ? (
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
          ) : !error ? (
            <>
              <div className="firstLine">
                <p className="title">MI CHAT</p>
              </div>
              <div className="chatContainer">
                <div className="chatContent">
                  <div className="chatHeader">
                    <div className="blocks">
                      <div className="current-chatting-user">
                        <Avatar isOnline="active" image={productoImg} />
                        <p>{nombreProducto}</p>
                      </div>
                    </div>
                  </div>
                  <div className="contentBody">
                    {chatActual.map((itm, i) => {
                      return (
                        <ChatItem
                          animationDelay={i + 2}
                          key={i}
                          user={itm.type ? itm.type : "me"}
                          msg={itm.msg}
                          image={itm.image}
                          fecha={itm.fecha.slice(0, -3)}
                          estado={itm.estado}
                        />
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="content__footer">
                    <div className="sendNewMessage">
                      <textarea
                        type="text"
                        placeholder="Escribe un mensaje"
                        onChange={(e) => setMensaje(e.target.value)}
                        value={mensaje}
                        onKeyPress={handlePress}
                      />
                      <button
                        className={`${
                          mensaje === "" ? "disabledButton" : "btnSendMsg"
                        }`}
                        onClick={() => sendMessage()}
                        disabled={mensaje === "" ? true : false}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="perfilVacio">
              <div>
                <img src={mensaje} alt="LOGO" />
                <p>Error al abrir chat. Vuelva a intentar en un momento</p>
                <Button onClick={() => navigate(`/`)}>IR A INICIO</Button>
              </div>
            </div>
          )}
          <div
            className="returnLink"
            onClick={() => navigate(`/MiTienda/MENSAJES`)}
          >
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A MENSAJES</p>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Chat;
