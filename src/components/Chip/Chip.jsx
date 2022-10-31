import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";
import { StyledChip } from "./styles";

const Chip = (props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledChip
      sx={{
        backgroundColor: props.primary
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        maxWidth: isMobile ? props.smallSize : "400px",
      }}
    >
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: isMobile
            ? theme.typography.fontSize[5]
            : theme.typography.fontSize[9],
          padding:
            isExtraSmall && props.smallSize
              ? "0px 24px 0px 24px"
              : "0px 48px 0px 48px",
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: "40px",
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
