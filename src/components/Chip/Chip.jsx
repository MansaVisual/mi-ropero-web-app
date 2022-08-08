import { Typography } from "@mui/material";
import React from "react";
import theme from "../../styles/theme";
import { StyledChip } from "./styles";

const Chip = (props) => {
  return (
    <StyledChip
      sx={{
        backgroundColor: props.primary
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      }}
    >
      <Typography
        sx={{
          padding: "0px 48px 0px 48px",
          fontWeight: theme.typography.fontWeightBold,
          fontFamily: theme.typography.fontFamily,
          lineHeight: '40px',
          color: props.primary
            ? theme.palette.primary.contrastText
            : theme.palette.secondary.contrastText,
        }}
      >
        {props.children}
      </Typography>
    </StyledChip>
  );
};

export default Chip;
