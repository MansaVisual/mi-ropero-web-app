import React, { Component } from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";
import fotoProd from "../../assets/fotoProd.png";
import { Box } from "@mui/material";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const slides = [
  {
    img: fotoProd,
  },
  {
    img: fotoProd,
  },
  {
    img: fotoProd,
  },
  {
    img: fotoProd,
  },
  {
    img: fotoProd,
  },
  {
    img: fotoProd,
  },
  {
    img: fotoProd,
  },
  {
    img: fotoProd,
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
      <IoIosArrowForward size={23} color="hsla(0, 0%, 0%, 0.5)" />
    </button>
  );
};

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
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
    return (
      <div>
        <Slider {...settings}>
          {slides.map((item, index) => {
            return (
              <Box key={index}>
                <ProductCard imageCard={item.img} tag="NUEVO" />
              </Box>
            );
          })}
        </Slider>
      </div>
    );
  }
}
