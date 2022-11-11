import React from "react";
import Avatar from "./Avatar";
import dobleTilde from "../../../assets/img/dobleTilde.png";

const ChatItem = ({ msg, image, user, fecha, estado }) => {
  console.log(fecha);
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chatItem ${user ? user : ""}`}
    >
      <div className="chatItemContent">
        <p className="chatMsg">{msg}</p>
        <div className="chatMeta">
          <span>{fecha}</span>
          {estado === "2" && <img src={dobleTilde} alt="dobleTilde" />}
        </div>
      </div>
      <Avatar isOnline="active" image={image} />
    </div>
  );
};

export default ChatItem;
