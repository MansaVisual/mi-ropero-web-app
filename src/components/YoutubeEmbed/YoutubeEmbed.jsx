import React from "react";
import { useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";

const YoutubeEmbed = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="video-responsive">
      <iframe
        width="100%"
        height={isMobile ? "320px" : "665px"}
        src="https://www.youtube.com/embed/0Eucpoysz8M?rel=0"
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
