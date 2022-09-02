import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../styles/theme";

const FeaturedProductsBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.quaternary.main,
        textAlign: "center",
        padding: "24px",
      }}
    >
      <Typography
        sx={{
          fontSize: theme.typography.fontSize[7],
          fontWeight: theme.typography.fontWeightRegular,
          textTransform: "uppercase",
          color: theme.palette.primary.main,
        }}
      >
        DESCUBRÍ LOS PRODUCTOS MÁS{" "}
        <Typography
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            display: "inline-block",
          }}
        >
          DESTACADOS
        </Typography>{" "}
        DE MI ROPERO
      </Typography>
    </Box>
  );
};

export default FeaturedProductsBanner;
