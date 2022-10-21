import React, { useRef,useContext } from "react";
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
import { UseLoginContext } from "../../context/LoginContext";

const ProductCard = ({
  imageCard,
  tag,
  productName,
  productPrice,
  onClick,
  idProducto,
  datosTienda,
  itemFav
}) => {
  const {userLog,infoUser}=useContext(UseLoginContext)

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    buttonRef.current.style.opacity = "1";
  };
  const handleMouseLeave = () => {
    buttonRef.current.style.opacity = "0";
  };



  return (
    <Card
      sx={{
        width: { xs: "160px", md: "264px", lg: "220px", xl: "264px" },
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "-10px -10px 30px rgba(223, 229, 239, 0.25)",
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={isMobile ? "196px" : "323px"}
            image={imageCard}
            alt="product"
            loading="lazy"
            sx={{
              objectFit: "cover",
              "&:hover": {
                filter: "blur(2px)",
              },
            }}
          />
        </CardActionArea>

        <TagNewStyled sx={{ bottom: isMobile ? "145px" : "157px" }}>
          {tag}
        </TagNewStyled>
        <Box sx={{ position: "absolute", top: "8px", right: "8px" }}>
          {userLog!==""&&
            <LikeButton idCliente={userLog} infoUser={infoUser} idProd={idProducto}/>
          }
        </Box>
        <Button
          sx={{
            position: "absolute",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.contrastText,
            minWidth: "75%",
            minHeight: "36px",
            borderRadius: "20px",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: "0",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.secondary.contrastText,
            },
          }}
          ref={buttonRef}
          onClick={onClick}
        >
          Comprar
        </Button>
      </Box>

      <CardContent>
        <Typography
          sx={{
            fontSize: isMobile ? "11px" : "16px",
            lineHeight: "20px",
            textAlign: isMobile ? null : "start",
            maxHeight:"18px",
            overflowY:"hidden"
          }}
        >
          {productName}
        </Typography>
        <Box sx={{ pt: isMobile ? "8px" : "12px" }}>
          <AvatarMR avatarCard datosTienda={datosTienda!==undefined?datosTienda:itemFav.producto_tienda}/>
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
          ${productPrice!==undefined?productPrice:itemFav.producto_precio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
