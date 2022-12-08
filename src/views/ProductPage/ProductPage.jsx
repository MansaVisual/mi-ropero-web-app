import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Grid,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";
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
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import PopUpOfertaPP from "../../components/Dialog/PopUpOfertaPP";
import PopUpMensajePP from "../../components/Dialog/PopUpMensajePP";
import logo from "../../assets/img/isologo.png";
import Swal from "sweetalert2";
import { apiFetch } from "../../apiFetch/apiFetch";

const ProductPage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("lg"));
  const { itemID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { infoUser, userLog } = useContext(UseLoginContext);
  const [tienda, setTienda] = useState([]);

  const [open, setOpen] = useState(false);
  const [openMessagePop, setOpenMessagePop] = useState(false);

  const [prod, setProd] = useState([]);
  const [prodFotos, setProdFotos] = useState([]);
  const [prodCaracteristicas, setProdCaracteristicas] = useState([]);

  const _renderVideo = (item) => {

    return (
      <video
        key={item.original}
        controls
        loop
        id="myVideo"
        className="image-gallery-image"
      >
        <source src={item.original} type="video/mp4" id="myVideo1" />
      </video>
    );
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    if (prod.length !== 0) {
      const ropero = new FormData();
      ropero.append("idtienda", prod.tienda.idtienda);
      apiFetch(ropero, "tiendas", "detail").then((res) => {
        if (res.status === "success") {
          setTienda(res.result);
        }
      });
    }
  }, [prod]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (itemID !== undefined) {
      const prod = new FormData();
      prod.append("idproducto", itemID);
      prod.append("idcliente", userLog);
      apiFetch(prod, "productos", "details").then((res) => {
        if (res.status === "success") {
          let arrayFotos = [];
          for (const i in res.result.imagenes) {
            if (res.result.imagenes[i].tipo === "video") {
              arrayFotos = [
                ...arrayFotos,
                {
                  original: res.result.imagenes[i].imagen_vertical,
                  thumbnail: res.result.imagenes[i].imagen_chica,
                  renderItem: _renderVideo.bind(),
                },
              ];
            } else {
              arrayFotos = [
                ...arrayFotos,
                {
                  original: res.result.imagenes[i].imagen_vertical,
                  thumbnail: res.result.imagenes[i].imagen_chica,
                },
              ];
            }
          }
          setProdFotos(arrayFotos);
          setProd(res.result);
          setProdCaracteristicas(res.result.caracteristicas);
        }
      });
    }
  }, [itemID]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCompraSinLogin = () => {
    if (userLog === "") {
      Swal.fire({
        title: "¡HOLA! Para comprar, ingresá a tu cuenta.",
        iconHtml: `<img src=${logo} alt="LOGO">`,
        customClass: {
          icon: "no-border",
          container: "popUpLoginAlert",
          cancelButton: "popUpLoginCancel",
        },
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "INGRESAR",
        cancelButtonText: "VOLVER",
      }).then((res) => {
        if (res.isConfirmed) {
          localStorage.setItem("redirectUrl", location.pathname);
          navigate("/login");
        }
      });
      return;
    }
  };

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
        {prod.length === 0 ? (
          <div
            style={{
              marginTop: "24px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              minHeight: "75vh",
            }}
          >
            <Loader spin={"spinnerG"} />
          </div>
        ) : (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              position="relative"
            >
              {isMobile || isMobileBigScreen || isTablet ? (
                <>
                  <Box sx={{ mt: "16px" }}>
                    <Breadcrumbs
                      links={[
                        "PRODUCTO",
                        prod.nombre.length > 15
                          ? prod.nombre.substring(0, 15) + "..."
                          : prod.nombre,
                      ]}
                    />
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
                  <Box sx={{ position: "relative" }}>
                    <ImageGallery
                      items={prodFotos}
                      showIndex={false}
                      showNav={true}
                      showThumbnails={true}
                      thumbnailPosition={
                        isMobile || isMobileBigScreen || isTablet
                          ? "bottom"
                          : "left"
                      }
                      showFullscreenButton={false}
                      showPlayButton={false}
                      slideOnThumbnailOver={true}
                      disableThumbnailScroll={true}
                      infinite={false}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "20px",
                      }}
                    >
                      {isMobileBigScreen && (
                        <LikeButton
                          idCliente={userLog}
                          infoUser={infoUser}
                          idProd={itemID}
                          location={location.pathname}
                        />
                      )}
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ mb: "16px" }}>
                    <Breadcrumbs
                      links={[
                        "PRODUCTO",
                        prod.nombre.length > 15
                          ? prod.nombre.substring(0, 15) + "..."
                          : prod.nombre,
                      ]}
                    />
                  </Box>
                  <ImageGallery
                    items={prodFotos}
                    showIndex={false}
                    showNav={true}
                    showThumbnails={true}
                    thumbnailPosition={
                      isMobile || isMobileBigScreen || isTablet || isDesktop
                        ? "bottom"
                        : "left"
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

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              position="relative"
            >
              {isMobile || isMobileBigScreen ? (
                <>
                  <ProductBuyBox prod={prod} itemID={itemID} tienda={tienda} />
                </>
              ) : (
                <>
                  <Box sx={{ mb: "24px", mt: "32px" }}>
                    <Breadcrumbs
                      links={[
                        "PRODUCTO",
                        prod.nombre.length > 15
                          ? prod.nombre.substring(0, 15) + "..."
                          : prod.nombre,
                      ]}
                    />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        maxWidth: "90%",
                        minWidth: "90%",
                        minHeight: "100px",
                      }}
                    >
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
                        location={location.pathname}
                      />
                      {prod.tienda.idcliente !== userLog && (
                        <CommentButton
                          onClick={
                            tienda.estado_text !== "Activa"
                              ? () =>
                                  Swal.fire({
                                    title: "TIENDA PAUSADA",
                                    text: "Si lo agregas a favoritos, te avisamos cuando se active nuevamente.",
                                    icon: "info",
                                    confirmButtonText: "ACEPTAR",
                                  })
                              : userLog === ""
                              ? () => handleCompraSinLogin()
                              : () => setOpenMessagePop(true)
                          }
                        />
                      )}
                    </Box>
                  </Box>
                  <ProductBuyBox prod={prod} itemID={itemID} tienda={tienda} />
                  {openMessagePop && (
                    <PopUpMensajePP
                      setOpenMessagePop={setOpenMessagePop}
                      openMessagePop={openMessagePop}
                      prod={prod}
                    />
                  )}
                  {open && (
                    <PopUpOfertaPP open={open} setOpen={setOpen} prod={prod} />
                  )}
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              {isMobile || isMobileBigScreen ? (
                <Box sx={{ mt: "32px" }}>
                  <Accordion
                    title="Características del producto"
                    prodCaracteristicas={prodCaracteristicas}
                  />
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
                  {prodCaracteristicas !== undefined &&
                    prodCaracteristicas.map((carac, index) => (
                      <ProductDetails key={index} carac={carac} />
                    ))}
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(
                        `/roperos/${prod.tienda.idtienda}/${prod.tienda.nombre}`
                      )
                    }
                  >
                    {prod.length !== 0 && prod.tienda.nombre}
                  </Typography>
                  <Rating
                    name="read-only"
                    readOnly
                    value={
                      prod.tienda.calificaciones !== undefined &&
                      prod.tienda.calificaciones.sum !== null &&
                      Number(prod.tienda.calificaciones.sum) /
                        Number(prod.tienda.calificaciones.total)
                    }
                  />
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
                  <IconGroupText prod={prod} prod2={undefined} />
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
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProductPage;
