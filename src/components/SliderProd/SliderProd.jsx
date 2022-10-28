import React, { Component } from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";
import { Box } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "../Loader/Loader";

export const slides = [
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: 2000,
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: 2000,
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: 2000,
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: 2000,
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: 2000,
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: 2000,
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: 2000,
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: 2000,
    tag: "NUEVO",
  },
];

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

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      centerPadding: "20px",
      initialSlide: 0,
      swipeToSlide: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const { contenido } = this.props;
    return (
      <div>
        {contenido !== undefined && contenido.length === 0 ? (
          <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}>
            <Loader spin={"spinnerG"} />
          </div>
        ) : (
          <Slider {...settings}>
            {contenido.map((item, index) => {
              return(
                <Box key={index}>
                  <ProductCard
                    imageCard={item.imagenes[0].imagen_vertical}
                    productName={item.nombre}
                    productPrice={item.precio}
                    idProducto={item.idproducto}
                    item
                    datosTienda={item.tienda}
                    precioOferta={item.precio_oferta}
                    tag="NUEVO"
                  />
                </Box>
            )})}
          </Slider>
        )}
      </div>
    );
  }
}
