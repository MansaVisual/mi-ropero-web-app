import React, { Component } from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";
import { Box } from "@mui/material";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    const { slidesVertical, noPrevArrow, noNextArrow, slidesToShow } =
      this.props;

    const settings = {
      vertical: slidesVertical ? true : false,
      verticalSwiping: slidesVertical ? true : false,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow ? 1 : 3,
      slidesToScroll: 1,
      initialSlide: 0,
      swipeToSlide: true,
      prevArrow: noPrevArrow ? null : <PrevArrow />,
      nextArrow: noNextArrow ? null : <NextArrow />,
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
    return (
      <div>
        <Slider {...settings}>
          {slides.map((item, index) =>
            slidesVertical ? (
              <img
                key={index}
                src={item.img}
                alt="foto"
                className="imgSliderVertical"
              />
            ) : (
              <Box key={index}>
                <ProductCard
                  imageCard={item.img}
                  productName={item.title}
                  productPrice={item.price}
                  tag="NUEVO"
                />
              </Box>
            )
          )}
        </Slider>
      </div>
    );
  }
}
