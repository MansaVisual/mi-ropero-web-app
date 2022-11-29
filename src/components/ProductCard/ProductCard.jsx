import React, { useRef, useContext } from "react";
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
import AvatarMR from "../AvatarMR/AvatarMR";
import { LikeButton } from "../ActionButton/ActionButton";
import theme from "../../styles/theme";
import { UseLoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  imageCard,
  productName,
  productPrice,
  idProducto,
  datosTienda,
  itemFav,
  precioOferta,
  idTienda,
  paginaProductos
}) => {
  const { userLog, infoUser } = useContext(UseLoginContext);
  const navigate = useNavigate();

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
        width: { xs: "160px", sm: paginaProductos?"200px":"220px", md: paginaProductos?"220px":"264px", xl: "264px" },
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
            onClick={() => navigate(`/productoCard/${idProducto}`)}
          />
        </CardActionArea>
        <Box sx={{ position: "absolute", top: "8px", right: "8px" }}>
          {userLog !== "" && (
            <LikeButton
              idCliente={userLog}
              infoUser={infoUser}
              idProd={idProducto}
              itemFav={itemFav}
            />
          )}
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
          onClick={() => navigate(`/productoCard/${idProducto}`)}
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
            maxHeight: "20px",
            overflowY: "hidden",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/productoCard/${idProducto}`)}
        >
          {productName}
        </Typography>
        <Box
          sx={{ pt: isMobile ? "8px" : "12px", cursor: "pointer" }}
          onClick={
            itemFav !== undefined && itemFav.producto_tienda !== undefined
              ? () =>
                  navigate(
                    `/roperos/${itemFav.producto_tienda.idtienda}/${itemFav.producto_tienda.nombre}`
                  )
              : () => navigate(`/roperos/${idTienda}/${datosTienda.nombre}`)
          }
        >
          {itemFav !== undefined && itemFav.producto_tienda !== undefined && (
            <AvatarMR
              avatarCard
              datosTienda={itemFav.producto_tienda}
              idTienda={idTienda}
            />
          )}
          {datosTienda !== undefined && (
            <AvatarMR
              avatarCard
              datosTienda={datosTienda}
              idTienda={idTienda}
            />
          )}
        </Box>
      </CardContent>
      <Divider />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 0,
          cursor: "pointer",
        }}
        onClick={() => navigate(`/productoCard/${idProducto}`)}
      >
        {precioOferta !== "0.00" ? (
          <>
            <Typography
              sx={{
                lineHeight: "40px",
                fontSize: isMobile ? "13px" : "20px",
                fontWeight: theme.typography.fontWeightRegular,
                pl: "16px",
                color: "#BABCBE",
                textDecoration: `${theme.palette.secondary.main} line-through`,
                opacity: "0.5",
              }}
            >
              ${new Intl.NumberFormat("de-DE").format(productPrice)}
            </Typography>
            <Typography
              component="span"
              sx={{
                lineHeight: "40px",
                fontSize: isMobile ? "13px" : "20px",
                fontWeight: theme.typography.fontWeightRegular,
                pl: "16px",
                color: "#FF3F20",
              }}
            >
              ${new Intl.NumberFormat("de-DE").format(precioOferta)}
            </Typography>
          </>
        ) : (
          <Typography
            sx={{
              lineHeight: "40px",
              fontSize: isMobile ? "13px" : "20px",
              fontWeight: theme.typography.fontWeightMedium,
              pl: "16px",
              color: "#423B3C",
            }}
          >
            $
            {productPrice !== undefined
              ? new Intl.NumberFormat("de-DE").format(productPrice)
              : new Intl.NumberFormat("de-DE").format(itemFav.producto_precio)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
