import React from "react";

const YoutubeEmbed = ({ embedId }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="100%"
        height="665"
        src="https://www.youtube.com/embed/0Eucpoysz8M"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
