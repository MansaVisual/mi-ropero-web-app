import {
  Box,
  Container,
  Link,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import React,{useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  UpButton,
  WspButton,
} from "../../components/ActionButton/ActionButton";
import Banner from "../../components/Banner/Banner";
import Chip from "../../components/Chip/Chip";
import Onboarding from "../../components/Onboarding/Onboarding";
import SliderProd from "../../components/SliderProd/SliderProd";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";
import { UseColeccionContext } from "../../context/ColeccionesContext";
import { UseProdsContext } from "../../context/ProdsContext";
import theme from "../../styles/theme";

const Home = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate=useNavigate()
  const {nuevosIngresos,ropa,calzado,accesorios,belleza}=useContext(UseProdsContext)
  const {coleccionNuevosIngresos,coleccionRecomendados}=useContext(UseColeccionContext)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
  });
  }, []);

  return (
    <>
      <Banner />
      <Onboarding />
      <Box
        sx={{
          backgroundColor: "#FBFBFB",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          overflowX: "hidden",
          pb: "84px",
        }}
      >
        <Container maxWidth={{ xs: "xs", md: "md", lg: "lg", xl: "xl" }}>
          <Box sx={{ pt: "40px", textAlign: "center" }}>
            <Chip primary>Nuevos ingresos</Chip>
          </Box>
          <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
            <SliderProd contenido={coleccionNuevosIngresos}/>
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor:"pointer"
              }}
            >
              VER TODOS LOS INGRESOS
            </Link>
          </Box>
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip>Ropa</Chip>
          </Box>

          <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
            <SliderProd contenido={ropa}/>
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor:"pointer"
              }}
              onClick={()=>navigate(`/productos/ROPA`)}
              >
              VER TODOS ROPA
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
            <Chip>Calzado</Chip>
          </Box>

          <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
            <SliderProd contenido={calzado}/>
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor:"pointer"
              }}
              onClick={()=>navigate(`/productos/CALZADO`)}
              >
              VER TODOS CALZADO
            </Link>
          </Box>
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip>Accesorios</Chip>
          </Box>

          <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
            <SliderProd contenido={accesorios}/>
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor:"pointer"
              }}
              onClick={()=>navigate(`/productos/ACCESORIOS`)}
              >
              VER TODOS ACCESORIOS
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
            <Button
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
            >
              Vender
            </Button>
          </Box>
        </Box>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center" }}>
            <Chip>Belleza</Chip>
          </Box>

          <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
            <SliderProd contenido={belleza}/>
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
              }}
              onClick={()=>navigate(`/productos/BELLEZA`)}
              >
              VER TODOS BELLEZA
            </Link>
          </Box>
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip primary>Productos recomendados</Chip>
          </Box>
          <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
            <SliderProd contenido={coleccionRecomendados}/>
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor:"pointer"
              }}
            >
              VER TODOS LOS PRODUCTOS RECOMENDADOS
            </Link>
          </Box>
          <Box sx={{ pt: "43px", textAlign: "center" }}>
            <Chip primary>Mejores Vendedores</Chip>
          </Box>
          <Box sx={{ pt: "24px", display: "flex", justifyContent: "center" }}>
            <SliderProd contenido={nuevosIngresos}/>
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor:"pointer"
              }}
            >
              VER TODOS LOS MEJORES VENDEDORES
            </Link>
          </Box>
        </Container>
        <Box sx={{ position: "absolute", right: isMobile ? 20 : 60 }}>
          <Box sx={{ paddingBottom: "16px" }}>
            <UpButton />
          </Box>
          <Box>
            <WspButton />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
