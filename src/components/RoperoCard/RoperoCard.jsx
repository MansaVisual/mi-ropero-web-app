import * as React from "react";
import {
  Card,
  CardContent,
  Box,
  CardActionArea,
  Typography,
  Rating,
  Avatar,
} from "@mui/material";
import theme from "../../styles/theme";
import fotoProd from "../../assets/fotoProd.png";

export default function RoperoCard() {
  return (
    <Card
      sx={{
        maxWidth: 385,
        height: 194,
        borderRadius: "10px",
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          height: "56px",
          backgroundColor: "hsla(210, 77%, 95%, 1)",
          padding: 0,
          display: "flex",
          alignItems: "center",
          px: "16px",
        }}
      >
        <Avatar sx={{ mr: "15px", fontSize: theme.typography.fontSize[3] }}>
          SG
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: theme.typography.fontSize[3] }}>
            Ropero de Romina
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: theme.typography.fontSize[2],
                color: "hsla(0, 0%, 53%, 1)",
                mr: "5px",
              }}
            >
              142 productos
            </Typography>
            <Rating name="read-only" readOnly value={1} size="small" />
          </Box>
        </Box>
      </CardContent>
      <CardActionArea sx={{ display: "flex" }}>
        <img src={fotoProd} alt="ropa" width={128} />
        <img src={fotoProd} alt="ropa" width={128} />
        <img src={fotoProd} alt="ropa" width={128} />
      </CardActionArea>
    </Card>
  );
}
