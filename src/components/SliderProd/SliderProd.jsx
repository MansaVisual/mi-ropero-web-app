import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Box } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "../Loader/Loader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 5000, min: 1201 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1200, min: 601 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 280 },
    items: 2,
  },
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="buttonSlidePrev">
      <IoIosArrowBack size={20} color="hsla(0, 0%, 0%, 0.5)" />
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="buttonSlideNext">
      <IoIosArrowForward size={20} color="hsla(0, 0%, 0%, 0.5)" />
    </button>
  );
};

const SliderProd = ({ contenido }) => {
  return (
    <div className="containerSliders">
      {contenido !== undefined && contenido.length === 0 ? (
        <div
          style={{
            marginTop: "24px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader spin={"spinnerG"} />
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          customLeftArrow={<PrevArrow />}
          customRightArrow={<NextArrow />}
        >
          {contenido.map((item, index) => {
            console.log(contenido);
            if (item.imagenes[0].imagen_vertical) {
              return null;
            }
            return (
              <Box key={index}>
                <ProductCard
                  imageCard={item.imagenes[0].imagen_vertical}
                  productName={item.nombre}
                  productPrice={item.precio}
                  idProducto={item.idproducto}
                  datosTienda={item.tienda}
                  idTienda={item.idtienda}
                  precioOferta={item.precio_oferta}
                  tag="NUEVO"
                />
              </Box>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default SliderProd;
