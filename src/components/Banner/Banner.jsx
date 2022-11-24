import React from "react";
import IMGbanner from "../../assets/img/IMGbanner.png";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

const slides = [
  {
    img: IMGbanner,
  },
  {
    img: IMGbanner,
  },
  {
    img: IMGbanner,
  },
];

const Banner = () => {
  return (
    <Box>
      <Carousel
        animation="slide"
        autoPlay={false}
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            backgroundColor: "hsla(0, 0%, 100%, 0.5)",
            color: "hsla(0, 0%, 0%, 0.5)",
            width: "30px",
            height: "30px",
          },
        }}
        indicatorIconButtonProps={{
          style: {
            color: "transparent",
            border: "1px solid #FF3F20",
            width: "8px",
            height: "8px",
            marginRight: "20px",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: { backgroundColor: "hsla(8, 100%, 56%, 1)" },
        }}
        indicatorContainerProps={{
          style: { position: "absolute", bottom: "8px", zIndex: 10 },
        }}
        sx={{ height: { xs: "157px", md: "200px", lg: "260px", xl: "344px" } }}
      >
        {slides.map((item, index) => (
          <Box sx={{ display: "flex", justifyContent: "center" }} key={index}>
            <img
              src={item.img}
              alt=""
              className="imgBanner"
              key={index}
              width="100%"
              height="100%"
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Banner;
