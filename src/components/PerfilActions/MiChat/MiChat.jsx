import React, { createRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../../assets/img/leftArrow.png";
import profileTest1 from "../../../assets/img/profileTest1.jpg";
import ChatItem from "./ChatItem";
import Avatar from "./Avatar";

const MiChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const messagesEndRef = createRef(null);

  const chatPrevio = [
    {
      image: profileTest1,
      type: "",
      msg: "que onda timo",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "todo bien y vos",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",

      type: "other",
      msg: "todo tranqui por suerte",
    },
    {
      image: profileTest1,
      type: "",
      msg: "sale discord",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "sale discord ",
    },
    {
      image: profileTest1,
      type: "",
      msg: "sale discord",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "sale discord",
    },
  ];

  const [mensaje, setMensaje] = useState("");
  const [chatActual, setChatActual] = useState(chatPrevio);
  const [scroll, setScroll] = useState(false);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        /*  inline: "nearest", */
      });
    }, 1200);
  };

  const chateador = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    nombre: "Timo",
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (mensaje !== "") {
      setChatActual([
        ...chatActual,
        { type: "", msg: mensaje, image: profileTest1 },
      ]);
      setMensaje("");
      console.log(chatActual);
      setScroll(true);
    }
  };

  useEffect(() => {
    console.log("first");
    setTimeout(() => {
      scrollToBottom();
      console.log("second");
    }, 500);
    setScroll(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]);

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
                <Avatar isOnline="active" image={chateador.image} />
                <p>{chateador.nombre}</p>
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
              <button className="addFiles">
                <i className="fa fa-plus"></i>
              </button>
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
                <i className="fa fa-paper-plane"></i>
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
