import React from "react";
import Avatar from "./Avatar";

const ChatItem = ({ msg, image, user, fecha }) => {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chatItem ${user ? user : ""}`}
    >
      <div className="chatItemContent">
        <p className="chatMsg">{msg}</p>
        <div className="chatMeta">
          <span>{fecha}</span>
        </div>
      </div>
      <Avatar isOnline="active" image={image} />
    </div>
  );
};

export default ChatItem;
