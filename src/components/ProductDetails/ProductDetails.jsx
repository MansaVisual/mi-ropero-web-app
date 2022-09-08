import React from "react";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";

const ProductDetails = ({ key, title, content }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        maxWidth: 600,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          key={key}
          sx={{
            fontSize:
              isMobile || isMobileBigScreen
                ? theme.typography.fontSize[3]
                : theme.typography.fontSize[5],
            fontWeight: theme.typography.fontWeightMedium,
            color:
              isMobile || isMobileBigScreen
                ? theme.palette.quaternary.contrastText
                : theme.palette.tertiary.main,
            textTransform: "uppercase",
            my: "8px",
            flex: 0.4,
          }}
        >
          {title}
        </Typography>
        <Typography
          component="span"
          style={{
            fontSize:
              isMobile || isMobileBigScreen
                ? theme.typography.fontSize[3]
                : theme.typography.fontSize[4],
            fontWeight: theme.typography.fontWeightRegular,
            textTransform: "capitalize",
            my: "8px",
            flex: 0.6,
          }}
        >
          {content}
        </Typography>
      </Box>
      <Divider light />
    </Box>
  );
};

export default ProductDetails;
