import React, { createRef, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../../assets/img/leftArrow.png";
import ChatItem from "./ChatItem";
import Avatar from "./Avatar";
import { UseLoginContext } from "../../../context/LoginContext";
import { UsePerfilContext } from "../../../context/PerfilContext";
import Loader from "../../Loader/Loader";
import { Button } from "@mui/material";

const MiChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { userLog, infoUser } = useContext(UseLoginContext);
  const { mensajeId, PerfilAPI } = useContext(UsePerfilContext);

  const messagesEndRef = createRef(null);

  const [mensaje, setMensaje] = useState("");
  const [chatActual, setChatActual] = useState([]);
  const [scroll, setScroll] = useState(true);
  const [productoImg, setProductoImg] = useState(false);
  const [nombreRemitente, setNombreRemitente] = useState(false);
  const [productoId, setProductoId] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userLog && !mensajeId /* && !infoUser */) {
      navigate("/perfil/MIS MENSAJES");
    } else {
      const dir = new FormData();
      dir.append("idcliente", userLog);
      dir.append("idmensaje", mensajeId);
      PerfilAPI(dir, "mensajes", "thread").then((res) => {
        console.log(res);
        if (res.status === "success") {
          setProductoImg(res.result[0].producto.imagenes[0].imagen_chica);
          setNombreRemitente(res.result[0].cliente_nombre);
          setProductoId(res.result[0].producto.idproducto);
          let array = [];
          for (const ii in res.result) {
            array.push({
              type:
                res.result[ii].cliente_email === infoUser.email ? "" : "other",
              msg: res.result[ii].mensaje,
              image:
                res.result[ii].cliente_email === infoUser.email
                  ? infoUser.avatar
                  : res.result[0].producto.imagenes[0].imagen_chica,
              idMensaje: res.result[ii].idmensaje,
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
      const mensajePadre = chatActual[chatActual.length - 1];

      const dir = new FormData();
      dir.append("idcliente", userLog);
      dir.append("idmensajepadre", mensajePadre.idMensaje);
      dir.append("idproducto", productoId);
      dir.append("mensaje", mensaje);

      PerfilAPI(dir, "mensajes", "insert").then((res) => {
        if (res.status === "success") {
          setChatActual([
            ...chatActual,
            { type: "", msg: mensaje, image: infoUser.avatar },
          ]);
          setMensaje("");
          setScroll(true);
        }
      });
    }
  };

  console.log(chatActual);

  return (
    <div className="miChatContainer">
      <Breadcrumbs links={pathnames} />
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
            <p className="title">MI CHAT CON </p>
          </div>
          <div className="chatContainer">
            <div className="chatContent">
              <div className="chatHeader">
                <div className="blocks">
                  <div className="current-chatting-user">
                    <Avatar isOnline="active" image={productoImg} />
                    <p>{nombreRemitente}</p>
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

      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default MiChat;
