import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider, Box, CardActionArea, useMediaQuery } from "@mui/material";
import { TagNewStyled } from "./styles";
import AvatarMR from "../AvatarMR/AvatarMR";
import { LikeButton } from "../ActionButton/ActionButton";
import theme from "../../styles/theme";

const ProductCard = ({ imageCard, tag }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        width: isMobile ? "160px" : "264px",

        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "-10px -10px 30px rgba(223, 229, 239, 0.25)",
      }}
    >
      <Box>
        <CardActionArea>
          <CardMedia
            component="img"
            height={isMobile ? "196px" : "323px"}
            image={imageCard}
            alt="product"
            sx={{ objectFit: "cover" }}
          />
        </CardActionArea>

        <TagNewStyled sx={{ bottom: isMobile ? "163px" : "155px" }}>
          {tag}
        </TagNewStyled>
        <Box sx={{ position: "absolute", top: "8px", right: "8px" }}>
          <LikeButton />
        </Box>
      </Box>

      <CardContent>
        <Typography
          sx={{
            fontSize: isMobile ? "11px" : "16px",
            fontFamily: theme.typography.fontFamily,
            lineHeight: "20px",
            textAlign: isMobile ? null : "center",
          }}
        >
          Calza multicolor Adidas 2022
        </Typography>
        <Box sx={{ pt: isMobile ? "8px" : "12px" }}>
          <AvatarMR avatarCard />
        </Box>
      </CardContent>
      <Divider />
      <CardContent sx={{ display: "flex", alignItems: "center", padding: 0 }}>
        <Typography
          sx={{
            lineHeight: "40px",
            fontSize: isMobile ? "13px" : "20px",
            pl: "16px",
          }}
        >
          $2850
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
