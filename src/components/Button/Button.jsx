import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({
  text,
  backgroundColor,
  color,
  icon,
  endIcon,
  fullWidth,
  height,
}) => {
  return (
    <MuiButton
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        padding: "0 48px",
        textTransform: "uppercase",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "bold",
        boxShadow: "0 2px 6px 0  hsla(270, 2%, 26%, 0.1)",
        width: fullWidth ? "100%" : "auto",
        height: height ? "48px" : "36px",
      }}
      endIcon={endIcon}
    >
      {text} <img style={{ marginLeft: "8px" }} src={icon} alt="" />
    </MuiButton>
  );
};

export default Button;
