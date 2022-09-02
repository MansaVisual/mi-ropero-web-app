import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import SliderProd from "../../components/SliderProd/SliderProd";

const ProductPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div>
      <Breadcrumbs links={pathnames} />
      <Box>
        <SliderProd slidesVertical noPrevArrow noNextArrow />
      </Box>
      <SliderProd slidesToShow />
    </div>
  );
};

export default ProductPage;
