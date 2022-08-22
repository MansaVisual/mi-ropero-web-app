import * as React from "react";
import { useState } from "react";
import {
  Divider,
  Box,
  CardActionArea,
  useMediaQuery,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { TagNewStyled } from "./styles";
import AvatarMR from "../AvatarMR/AvatarMR";
import { LikeButton } from "../ActionButton/ActionButton";
import theme from "../../styles/theme";

const ProductCard = ({ imageCard, tag }) => {
  const [showButton, setShowButton] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        width: { xs: "160px", md: "264px", lg: "220px", xl: "264px" },

        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "-10px -10px 30px rgba(223, 229, 239, 0.25)",
        fontFamily: theme.typography.fontFamily
      }}
    >
      <Box>
        <CardActionArea
          onMouseOver={() => setShowButton(true)}
          onMouseOut={() => setShowButton(false)}
        >
          <CardMedia
            component="img"
            height={isMobile ? "196px" : "323px"}
            image={imageCard}
            alt="product"
            sx={{ objectFit: "cover", "&:hover": { filter: "blur(2px)" } }}
            className="image-product"
          />
        </CardActionArea>

        <TagNewStyled sx={{ bottom: isMobile ? "163px" : "155px" }}>
          {tag}
        </TagNewStyled>
        <Box sx={{ position: "absolute", top: "8px", right: "8px" }}>
          <LikeButton />
        </Box>
        {!showButton ? null : (
          <Button
            sx={{
              position: "absolute",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.contrastText,
              minWidth: "159px",
              minHeight: "36px",
              borderRadius: "20px",
              top: "30%",
              right: "20%",
            }}
          >
            Comprar
          </Button>
        )}
      </Box>

      <CardContent>
        <Typography
          sx={{
            fontSize: isMobile ? "11px" : "16px",
            lineHeight: "20px",
            textAlign: isMobile ? null : "center",
          }}
        >
          Calza multicolor Adidas
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
