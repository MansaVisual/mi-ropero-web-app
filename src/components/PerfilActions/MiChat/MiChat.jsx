import React, { createRef, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../../assets/img/leftArrow.png";
import ChatItem from "./ChatItem";
import Avatar from "./Avatar";
import { UseLoginContext } from "../../../context/LoginContext";
import { UsePerfilContext } from "../../../context/PerfilContext";

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

  useEffect(() => {
    if (userLog) {
      const dir = new FormData();
      dir.append("idcliente", userLog);
      dir.append("idmensaje", mensajeId);
      PerfilAPI(dir, "mensajes", "thread").then((res) => {
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
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensajeId, userLog]);

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
  }, [chatActual]);

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

  return (
    <div className="miChatContainer">
      <Breadcrumbs links={pathnames} />
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
              <input
                type="text"
                placeholder="Escribe un mensaje"
                onChange={(e) => setMensaje(e.target.value)}
                value={mensaje}
                onKeyPress={handlePress}
              />
              <button
                className="btnSendMsg"
                id="sendMsgBtn"
                onClick={() => sendMessage()}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default MiChat;
