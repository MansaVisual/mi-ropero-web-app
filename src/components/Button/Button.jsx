import React from "react";
import { Button as MuiButton } from "@mui/material";
import theme from "../../styles/theme";

const Button = ({
  text,
  backgroundColor,
  color,
  small,
  medium,
  icon,
  endIcon,
  fullWidth,
  height,
  notRounded,
  disabled,
  onClick,
  border,
}) => {
  return (
    <MuiButton
      sx={{
        backgroundColor: disabled
          ? theme.palette.quinary.main
          : backgroundColor,
        color: disabled ? theme.palette.tertiary.main : color,
        padding: small ? "5px 12px" : medium ? "0 24px" : "0 48px",
        textTransform: "uppercase",
        border: border,
        borderRadius: notRounded ? "6px" : "20px",
        fontSize: small
          ? theme.typography.fontSize[0]
          : theme.typography.fontSize[4],
        fontWeight: theme.typography.fontWeightMedium,
        boxShadow: "0 2px 6px 0  hsla(270, 2%, 26%, 0.1)",
        width: fullWidth ? "100%" : "auto",
        height: height ? "48px" : "36px",
        whiteSpace: "nowrap",
      }}
      endIcon={endIcon}
      onClick={onClick}
    >
      {text} {icon && <img style={{ marginLeft: "8px" }} src={icon} alt="" />}
    </MuiButton>
  );
};

export default Button;
