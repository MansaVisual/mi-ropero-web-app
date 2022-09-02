import React from "react";
import { Box, Typography } from "@mui/material";
import Tshirt from "../../assets/img/T-shirt.svg";
import ShoppingBag from "../../assets/img/ShoppingBag.svg";
import Users from "../../assets/img/Users.svg";
import theme from "../../styles/theme";

const IconGroupText = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        my: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Tshirt} alt="Remera" width={32} height={30} />
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[0],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.tertiary.main,
            textTransform: "uppercase",
            my: "8px",
          }}
        >
          Productos
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[4],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.tertiary.main,
          }}
        >
          11
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Users} alt="Grupo de usuarios" width={32} height={30} />
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[0],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.tertiary.main,
            textTransform: "uppercase",
            my: "8px",
          }}
        >
          Seguidores
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[4],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.tertiary.main,
          }}
        >
          40
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={ShoppingBag} alt="Bolsa de compras" width={32} height={30} />
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[0],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.tertiary.main,
            textTransform: "uppercase",
            my: "8px",
          }}
        >
          Ventas
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[4],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.tertiary.main,
          }}
        >
          2
        </Typography>
      </Box>
    </Box>
  );
};

export default IconGroupText;
