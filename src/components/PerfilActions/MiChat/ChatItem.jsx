import React from "react";
import Avatar from "./Avatar";

const ChatItem = ({ msg, image, user }) => {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chatItem ${user ? user : ""}`}
    >
      <div className="chatItemContent">
        <p className="chatMsg">{msg}</p>
        {/* <div className="chatMeta">
          <span>Hace 16 min</span>
          <span>Visto 1.03PM</span>
        </div> */}
      </div>
      <Avatar isOnline="active" image={image} />
    </div>
  );
};

export default ChatItem;
