import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import pag from "../../assets/img/PAGINANOT.png";
import error from "../../assets/img/#404.png";
import { useNavigate } from "react-router-dom";
import Onboarding from "../../components/Onboarding/Onboarding";

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <Box>
      <Onboarding />
      <Box sx={{ mt: "32px" }}></Box>
      <Box
        sx={{
          maxWidth: "1366px",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          justifyContent: "center",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ ml: "72px" }}>
          <Breadcrumbs links={["404"]} />
        </Box>
        <Box className="page404">
          <img src={pag} alt="PAGE" />
          <img src={error} alt="ERROR" className="error" />

          <p className="p1">
            La página que estás buscando no está disponible en este momento.
          </p>
          {/* <p className="p2">
            Si necesitas ayuda, podés <span className="span">contactarte</span>{" "}
            con nosotros.
          </p> */}

          <Button className="button" sx={{mb:"72px"}} onClick={() => navigate(-1)}>
            VOLVER ATRAS
          </Button>

          {/* <Box sx={{ pt: "40px", textAlign: "center" }}>
            <Chip primary>Nuevos ingresos</Chip>
          </Box>
          <Box sx={{ pt: "24px"}}>
            <SliderProd contenido={coleccionNuevosIngresos} />
          </Box>
          <Box sx={{ pt: "27px", textAlign: "center", mb: "72px" }}>
            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
                cursor: "pointer",
              }}
              onClick={() => navigate("/colecciones/NuevosIngresos")}
            >
              VER TODOS LOS INGRESOS
            </Link>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Error;
