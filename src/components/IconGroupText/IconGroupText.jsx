import React from "react";
import { Box, Typography } from "@mui/material";
import Tshirt from "../../assets/img/T-shirt.svg";
import ShoppingBag from "../../assets/img/ShoppingBag.svg";
import Users from "../../assets/img/Users.svg";
import theme from "../../styles/theme";

const IconGroupText = ({ prod, prod2 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "16px",
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
          {prod !== undefined && prod.length !== 0 && prod.tienda.productos}
          {prod2 !== undefined && prod2.length !== 0 && prod2.productos}
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
          {prod !== undefined && prod.length !== 0 && prod.tienda.seguidores}
          {prod2 !== undefined && prod2.length !== 0 && prod2.seguidores}
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
          {prod !== undefined && prod.length !== 0 && prod.tienda.ventas}
          {prod2 !== undefined && prod2.length !== 0 && prod2.operaciones}
        </Typography>
      </Box>
    </Box>
  );
};

export default IconGroupText;
