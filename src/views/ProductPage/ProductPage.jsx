import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import {
  CommentButton,
  LikeButton,
} from "../../components/ActionButton/ActionButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    talle: "L",
    colores: "Rosa",
    marca: "Adidas",
    condicion: "Nuevo",
    "tipo de tela": "Silver",
    estampado: "Combinado con texturas",
    temporada: "Media estacion",
    estilo: "Deportivo",
    origen: "Importado",
  },
];

const ProductPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid
        container
        sx={{
          padding: isMobile || isMobileBigScreen ? "40px 16px" : "40px 74px",
        }}
        spacing={isMobile || isMobileBigScreen ? 0 : 2}
      >
        <Grid item xs={12} sm={12} md={7}>
          {isMobile || isMobileBigScreen ? (
            <>
              <Box sx={{ mt: "16px" }}>
                <Breadcrumbs links={pathnames} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[10],
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.quaternary.contrastText,
                  }}
                >
                  Campera deportiva Adicolor Colorblock 2022 Ed. limitada
                </Typography>
              </Box>
              <ImageGallery
                items={data}
                showIndex={false}
                showNav={true}
                showThumbnails={true}
                thumbnailPosition={
                  isMobile || isMobileBigScreen ? "bottom" : "left"
                }
                showFullscreenButton={false}
                showPlayButton={false}
                slideOnThumbnailOver={true}
                disableThumbnailScroll={true}
                infinite={false}
              />
            </>
          ) : (
            <>
              <Box sx={{ mb: "16px" }}>
                <Breadcrumbs links={pathnames} />
              </Box>
              <ImageGallery
                items={data}
                showIndex={false}
                showNav={true}
                showThumbnails={true}
                thumbnailPosition={
                  isMobile || isMobileBigScreen ? "bottom" : "left"
                }
                showFullscreenButton={false}
                showPlayButton={false}
                slideOnThumbnailOver={true}
                disableThumbnailScroll={true}
                infinite={false}
              />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={5} position="relative">
          {isMobile || isMobileBigScreen ? (
            <>
              <ProductBuyBox />
            </>
          ) : (
            <>
              <Box sx={{ mb: "24px" }}>
                <Breadcrumbs links={pathnames} />
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ maxWidth: "90%" }}>
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[10],
                      fontWeight: theme.typography.fontWeightMedium,
                      color: theme.palette.quaternary.contrastText,
                    }}
                  >
                    Campera deportiva Adicolor Colorblock 2022 Ed. limitada
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <LikeButton />
                  <CommentButton />
                </Box>
              </Box>
              <ProductBuyBox />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={7}>
          {isMobile || isMobileBigScreen ? (
            <Box sx={{ mt: "32px" }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[5],
                      fontWeight: theme.typography.fontWeightMedium,
                      color: theme.palette.tertiary.main,
                    }}
                  >
                    Características del producto
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    "&.MuiAccordionDetails-root": {
                      pb: 0,
                    },
                  }}
                >
                  {Object.entries(productDetails[0]).map(([key, value]) => (
                    <ProductDetails key={key} title={key} content={value} />
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          ) : (
            <>
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
              {Object.entries(productDetails[0]).map(([key, value]) => (
                <ProductDetails key={key} title={key} content={value} />
              ))}
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
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
                  fontSize:
                    isMobile || isMobileBigScreen
                      ? theme.typography.fontSize[5]
                      : theme.typography.fontSize[10],
                  fontWeight:
                    isMobile || isMobileBigScreen
                      ? theme.typography.fontWeightMedium
                      : theme.typography.fontWeightRegular,
                  color: theme.palette.tertiary.main,
                  mt: isMobile || isMobileBigScreen ? "16px" : "56px",
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
