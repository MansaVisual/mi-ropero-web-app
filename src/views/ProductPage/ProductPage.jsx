import React, { useState,useEffect,useContext } from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
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
import Accordion from "../../components/Accordion/Accordion";
import DialogComponent from "../../components/Dialog/Dialog";
import { UseLoginContext } from "../../context/LoginContext";
import { UseProdsContext } from "../../context/ProdsContext";
import Loader from "../../components/Loader/Loader";

const data = [
  {
    original: require("../../assets/img/Sweater.png"),
    thumbnail: require("../../assets/img/SweaterSmall.png"),
  },
  {
    original: require("../../assets/img/Sweater.png"),
    thumbnail: require("../../assets/img/SweaterSmall.png"),
  },
  {
    original: require("../../assets/img/Sweater.png"),
    thumbnail: require("../../assets/img/SweaterSmall.png"),
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
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const {itemID,tiendaID}=useParams()

  const {infoUser,userLog}=useContext(UseLoginContext)
  const {ProdAPI}=useContext(UseProdsContext)

  const [open, setOpen] = useState(false);

  const [prod,setProd]=useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  useEffect(() => {
    if(itemID!==undefined && tiendaID!==undefined){
      const prod=new FormData()
      prod.append("idproducto",itemID)
      prod.append("idtienda",tiendaID)
      ProdAPI(
        prod,
        "productos",
        "get"
      ).then((res)=>{
        if(res.status==="success"){
          setProd(res.result)
        }
      })
    }
  }, [itemID,tiendaID]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="xl">
      <Grid
        container
        sx={{
          px: isMobile || isMobileBigScreen ? "16px" : "74px",
          py: "40px",
          overflowX: "hidden",
        }}
      >
        {prod.length===0?<div style={{minHeight:"80vh"}}><Loader spin={"spinnerM"}/></div> :<>
          <Grid item xs={12} sm={12} md={8} xl={6}>
            {isMobile || isMobileBigScreen || isTablet ? (
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
                    {prod.nombre}
                  </Typography>
                </Box>
                <ImageGallery
                  items={data}
                  showIndex={false}
                  showNav={true}
                  showThumbnails={true}
                  thumbnailPosition={
                    isMobile || isMobileBigScreen || isTablet ? "bottom" : "left"
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

          <Grid item xs={12} sm={12} md={4} xl={6} position="relative">
            {isMobile || isMobileBigScreen ? (
              <>
                <ProductBuyBox />
              </>
            ) : (
              <>
                <Box sx={{ mb: "24px", mt: "32px" }}>
                  <Breadcrumbs links={pathnames} />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ maxWidth: "90%",minWidth:"90%",minHeight:"100px" }}>
                    <Typography
                      sx={{
                        fontSize: theme.typography.fontSize[10],
                        fontWeight: theme.typography.fontWeightMedium,
                        color: theme.palette.quaternary.contrastText,
                      }}
                    >
                      {prod.nombre}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <LikeButton 
                      idCliente={userLog}
                      infoUser={infoUser}
                      idProd={itemID}
                    />
                    <CommentButton onClick={handleClickOpen} />
                  </Box>
                </Box>
                <ProductBuyBox prod={prod} itemID={itemID}/>
                {open && (
                  <DialogComponent
                    open={open}
                    handleClose={handleClose}
                    dialogType="comentar"
                    title="¡ENVIÁ UN MENSAJE!"
                    firstDialogText="Sacate todas las dudas que tengas escribiéndole al vendedor/a. Recordá que no podés ingresar información de contacto como direcciones de email, números de teléfono, etc."
                    thirdInputLabel="Tu mensaje para el vendedor/a"
                    leftButtonText="Cancelar"
                    rightButtonText="Enviar mensaje"
                  />
                )}
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={8} xl={6}>
            {isMobile || isMobileBigScreen ? (
              <Box sx={{ mt: "32px" }}>
                <Accordion title="Características del producto" />
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

          <Grid item xs={12} sm={12} md={4} xl={6}>
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

          <Grid item xs={12} sm={12}>
            <Box
              sx={{
                pt: "43px",
                textAlign: "center",
              }}
            >
              <Chip smallSize>Mas productos del ropero</Chip>
            </Box>
            <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
              <SliderProd contenido={[]}/>
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
        </>}
      </Grid>
    </Container>
  );
};

export default ProductPage;
