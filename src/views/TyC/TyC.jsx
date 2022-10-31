import React from "react";
import { Box, Grid } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";

const TyC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Grid className="gridContainer">
        <Box sx={{mt:"32px"}}></Box>
        <Breadcrumbs links={pathnames}/>

        <Box className="TyC">
            <p className="titulo1">Términos y condiciones</p>

            <p></p>
        </Box>
    </Grid>
  );
};

export default TyC;
