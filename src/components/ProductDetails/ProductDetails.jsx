import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import theme from "../../styles/theme";

const ProductDetails = ({ detail }) => {
  return (
    <Box>
      {Object.entries(detail).map((key) => (
        <Box
          sx={{
            maxWidth: 600,
          }}
        >
          <Typography
            key={key}
            sx={{
              fontSize: theme.typography.fontSize[5],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.tertiary.main,
              textTransform: "uppercase",
              my: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {key[0]}
            <span
              style={{
                fontSize: theme.typography.fontSize[4],
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "capitalize",
                textAlign: "right",
              }}
            >
              {key[1]}
            </span>
          </Typography>
          <Divider light />
        </Box>
      ))}
    </Box>
  );
};

export default ProductDetails;
