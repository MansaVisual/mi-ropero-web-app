import React, { useState,useEffect,useContext } from "react";
import {
  Box,
  Container,
  Grid,
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
import { useNavigate } from "react-router-dom";


const ProductPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const {itemID}=useParams()
  const navigate = useNavigate()

  const {infoUser,userLog}=useContext(UseLoginContext)
  const {ProdAPI}=useContext(UseProdsContext)

  const [open, setOpen] = useState(false);

  const [prod,setProd]=useState([])
  const [prodFotos,setProdFotos]=useState([])
  const [prodCaracteristicas,setProdCaracteristicas]=useState([])

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
    if(itemID!==undefined){
      const prod=new FormData()
      prod.append("idproducto",itemID)
      prod.append("idcliente",userLog)
      ProdAPI(
        prod,
        "productos",
        "details"
      ).then((res)=>{
        if(res.status==="success"){
          let arrayFotos=[]
          for(const i in res.result.imagenes){
            arrayFotos=[...arrayFotos,{original:res.result.imagenes[i].imagen_vertical,thumbnail:res.result.imagenes[i].imagen_chica}]
          }
          setProdFotos(arrayFotos)
          setProd(res.result)
          setProdCaracteristicas(res.result.caracteristicas)
        }
      })
    }
  }, [itemID]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="xl">
      <Grid
        container
        sx={{
          px: isMobile || isMobileBigScreen ? "16px" : "74px",
          py: "40px",
          overflowX: "hidden",
          marginBottom:"100px"
        }}
      >
        {prod.length===0?<div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center",minHeight:"75vh" }}><Loader spin={"spinnerG"}/></div> :<>
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
                  items={prodFotos}
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
                  items={prodFotos}
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
                <ProductBuyBox prod={prod} itemID={itemID} />
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
                    prod={prod}
                  />
                )}
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={8} xl={6}>
            {isMobile || isMobileBigScreen ? (
              <Box sx={{ mt: "32px" }}>
                <Accordion title="Características del producto" prodCaracteristicas={prodCaracteristicas}/>
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
                {prodCaracteristicas !== undefined && prodCaracteristicas.map((carac,index) => (
                  <ProductDetails key={index} carac={carac}/>
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
                    cursor:"pointer"
                  }}
                  onClick={()=>navigate(`/roperos/${prod.tienda.idcliente}/${prod.tienda.nombre}`)}
                >
                  {prod.length!==0&&prod.tienda.nombre}
                </Typography>
                <Rating name="read-only" readOnly value={4} />
                {/* <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[4],
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.tertiary.main,
                    my: "24px",
                  }}
                >
                  La tienda aún no tiene calificaciones
                </Typography> */}
                <IconGroupText prod={prod} prod2={undefined}/>
              </Box>
            </Box>
          </Grid>

          {/* <Grid item xs={12} sm={12}>
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
          </Grid> */}
        </>}
      </Grid>
    </Container>
  );
};

export default ProductPage;
