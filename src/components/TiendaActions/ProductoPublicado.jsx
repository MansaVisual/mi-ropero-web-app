import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ready from "../../assets/img/ready.png";

const ProductoPublicado = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Grid className="gridContainer">
      <div className="prodPublicadoContainer">
        <Breadcrumbs links={pathnames} />
        <div className="mainSection">
          <div className="successMessage">
            <img src={ready} alt="ready" />
            <p className="firstMessage">¡Muy bien!</p>
            <p className="secondMessage">Tu producto fue publicado</p>
            <div>
              <button className="leftButton">VER MIS PRODUCTOS</button>
              <button className="rightButton">CARGAR OTRO PRODUCTO</button>
            </div>
          </div>
          <div className="adImage"></div>
        </div>
      </div>
    </Grid>
  );
};

export default ProductoPublicado;
