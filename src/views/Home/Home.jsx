import { Box, Container, Link, Typography, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect,Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  UpButton,
  /*  WspButton, */
} from "../../components/ActionButton/ActionButton";
import Banner from "../../components/Banner/Banner";
import Chip from "../../components/Chip/Chip";
import Onboarding from "../../components/Onboarding/Onboarding";
import SliderProd from "../../components/SliderProd/SliderProd";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";
import { UseColeccionContext } from "../../context/ColeccionesContext";
import { UseProdsContext } from "../../context/ProdsContext";
import theme from "../../styles/theme";
import "react-multi-carousel/lib/styles.css";
import { UseLoginContext } from "../../context/LoginContext";

const Home = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { slider1, slider2, slider3 } = useContext(UseProdsContext);
  const { coleccionNuevosIngresos, coleccionRecomendados, coleccionMejoresV,colecciones } =
    useContext(UseColeccionContext);
    const {reBuscarInfo}=useContext(UseLoginContext)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    reBuscarInfo()
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Banner />
      <Onboarding />
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#FBFBFB",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          pb: "84px",
        }}
      >
        <Container maxWidth="xl">
          {colecciones.map((res,i)=>{
            if(res.tipo_text==="Coleccion 1er Scroll"){
              return(
                <Fragment key={i}>
                  <Box sx={{ pt: "40px", textAlign: "center" }}>
                    <Chip primary>{res.nombre}</Chip>
                  </Box>
                  <Box sx={{ pt: "24px" }}>
                    <SliderProd contenido={coleccionNuevosIngresos} />
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Link
                      sx={{
                        color: "hsla(0, 0%, 53%, 1)",
                        fontSize: theme.typography.fontSize[4],
                        cursor: "pointer",
                        "&:hover": {
                          fontWeight: "700",
                        },
                      }}
                      onClick={() => navigate("/colecciones/NuevosIngresos")}
                    >
                      VER "{res.nombre}"
                    </Link>
                  </Box>
                </Fragment>
              )
            }else{
              return(<Fragment key={i}></Fragment>)
            }
          })}
          {colecciones.map((res,i)=>{
            if(res.tipo_text==="Coleccion 2do Scroll"){
              return(
                <Fragment key={i}>
                  <Box sx={{ pt: "40px", textAlign: "center" }}>
                    <Chip primary>{res.nombre}</Chip>
                  </Box>
                  <Box sx={{ pt: "24px" }}>
                    <SliderProd contenido={coleccionNuevosIngresos} />
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Link
                      sx={{
                        color: "hsla(0, 0%, 53%, 1)",
                        fontSize: theme.typography.fontSize[4],
                        cursor: "pointer",
                        "&:hover": {
                          fontWeight: "700",
                        },
                      }}
                      onClick={() => navigate("/colecciones/NuevosIngresos")}
                    >
                      VER "{res.nombre}"
                    </Link>
                  </Box>
                </Fragment>
              )
            }else{
              return(<Fragment key={i}></Fragment>)
            }
          })}
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip>Zapatillas</Chip>
          </Box>

          <Box sx={{ pt: "24px" }}>
            <SliderProd contenido={slider1} />
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor: "pointer",
                "&:hover": {
                  fontWeight: "700",
                },
              }}
              onClick={() => navigate(`/productos/Zapatillas`)}
            >
              VER TODOS ZAPATILLAS
            </Link>
          </Box>
          <Box
            sx={{
              paddingTop: "43px",
              paddingBottom: "40px",
              maxWidth: "1200px",
              margin: "0 auto",
              minHeight: isMobile ? "100%" : "665px",
            }}
          >
            <YoutubeEmbed />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Chip>Remeras</Chip>
          </Box>

          <Box sx={{ pt: "24px" }}>
            <SliderProd contenido={slider2} />
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor: "pointer",
                "&:hover": {
                  fontWeight: "700",
                },
              }}
              onClick={() => navigate(`/productos/Remeras`)}
            >
              VER TODOS REMERAS
            </Link>
          </Box>
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip>Blusa/Top</Chip>
          </Box>

          <Box sx={{ pt: "24px" }}>
            <SliderProd contenido={slider3} />
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor: "pointer",
                "&:hover": {
                  fontWeight: "700",
                },
              }}
              onClick={() => navigate(`/productos/Bluse&top`)}
            >
              VER TODOS BLUSA/TOP
            </Link>
          </Box>
        </Container>
        <Box
          sx={{
            backgroundColor: "hsla(320, 100%, 83%, 1)",
            mt: "44px",
            mb: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              paddingTop: isMobile ? "16px" : "32px",
              paddingLeft: isMobile ? "86px" : null,
              paddingRight: isMobile ? "86px" : null,
              fontSize: isMobile
                ? theme.typography.fontSize[8]
                : theme.typography.fontSize[11],
              fontWeight: theme.typography.fontWeightBold,
              color: "hsla(248, 41%, 38%, 1)",
              textAlign: "center",
              lineHeight: isMobile ? "28px" : "50px",
            }}
          >
            EMPEZÁ A VENDER ESO QUE NO USÁS
          </Typography>
          <Box sx={{ paddingBottom: "28px", marginTop: "14px" }}>
            {/* <Button
              sx={{
                border: "1px solid hsla(248, 41%, 38%, 1)",
                borderRadius: "20px",
                padding: "2px 48px 2px 48px",
                fontSize: theme.typography.fontSize[3],
                fontWeight: theme.typography.fontWeightRegular,
                color: "hsla(248, 41%, 38%, 1)",
                height: isMobile ? "36px" : "31px",
                lineHeight: "36px",
                width: isMobile ? "189px" : null,
              }}
              href="https://play.google.com/store/apps/details?id=biz.pupila.MiRopero"
              target={"_blank"}
            >
              Vender
            </Button> */}
          </Box>
        </Box>
        <Container maxWidth="xl">
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip primary>Productos recomendados</Chip>
          </Box>
          <Box sx={{ pt: "24px" }}>
            <SliderProd contenido={coleccionRecomendados} />
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor: "pointer",
                "&:hover": {
                  fontWeight: "700",
                },
              }}
              onClick={() => navigate("/colecciones/Recomendados")}
            >
              VER TODOS LOS PRODUCTOS RECOMENDADOS
            </Link>
          </Box>
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip primary>Mejores Vendedores</Chip>
          </Box>
          <Box sx={{ pt: "24px" }}>
            <SliderProd contenido={coleccionMejoresV} />
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor: "pointer",
                "&:hover": {
                  fontWeight: "700",
                },
              }}
              onClick={() => navigate("/colecciones/MejoresVendedores")}
            >
              VER TODOS LOS MEJORES VENDEDORES
            </Link>
          </Box>
        </Container>
        <Box sx={{ position: "fixed", right: 10, bottom: 10 }}>
          <Box sx={{ marginBottom: "16px" }} onClick={() => scrollTop()}>
            <UpButton />
          </Box>
          {/* <Box>
            <WspButton />
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default Home;
