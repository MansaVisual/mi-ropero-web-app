import React from "react";
import {
  Box,
  Grid,
  Link,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ImageGallery from "react-image-gallery";
import ProductBuyBox from "../../components/ProductBuyBox/ProductBuyBox";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import IconGroupText from "../../components/IconGroupText/IconGroupText";
import SliderProd from "../../components/SliderProd/SliderProd";
import Chip from "../../components/Chip/Chip";
import theme from "../../styles/theme";

const data = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const productDetails = [
  {
    genero: "Unisex",
  },
  {
    talle: "L",
  },
  {
    colores: "Rosa",
  },
  {
    marca: "Adidas",
  },
  {
    condicion: "Nuevo",
  },
  {
    "tipo de tela": "Silver",
  },
  {
    estampado: "Combinado con texturas",
  },
  {
    temporada: "Media estacion",
  },
  {
    estilo: "Deportivo",
  },
  {
    origen: "Importado",
  },
];

const ProductPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    // grid container with 2 columns in desktop and 1 column in mobile
    <>
      <Grid
        container
        sx={{ px: "74px", py: "32px" }}
        spacing={isMobile ? 0 : 4}
      >
        <Grid item xs={12} md={7}>
          <Box sx={{ mb: "24px" }}>
            <Breadcrumbs links={pathnames} />
          </Box>
          <ImageGallery
            items={data}
            showIndex={false}
            showNav={true}
            showThumbnails={true}
            thumbnailPosition={isMobile ? "bottom" : "left"}
            showFullscreenButton={false}
            showPlayButton={false}
            slideOnThumbnailOver={true}
            disableThumbnailScroll={true}
            infinite={false}
          />
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[10],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.tertiary.main,
              mt: "56px",
              mb: "16px",
            }}
          >
            Características del producto
          </Typography>
          {productDetails.map((detail, index) => (
            <ProductDetails key={index} detail={detail} />
          ))}
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ position: "relative" }}>
            <ProductBuyBox />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize[10],
                  fontWeight: theme.typography.fontWeightRegular,
                  color: theme.palette.tertiary.main,
                  mt: "56px",
                  mb: "16px",
                }}
              >
                El Ropero de Susana Domingo
              </Typography>
              <Rating name="read-only" readOnly value={4} />
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize[4],
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.tertiary.main,
                  my: "24px",
                }}
              >
                La tienda aún no tiene calificaciones
              </Typography>
              <IconGroupText />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip>Mas productos del ropero</Chip>
          </Box>
          <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
            <SliderProd />
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
              }}
            >
              VER TODOS LOS PRODUCTOS DEL ROPERO
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductPage;
