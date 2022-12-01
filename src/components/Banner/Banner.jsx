import React from "react";
import HomeBanner1 from "../../assets/img/HomeBanner1.jpg";
import HomeBanner2 from "../../assets/img/HomeBanner2.jpg";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

const slides = [
  {
    img:HomeBanner1,
  },
  {
    img: HomeBanner2,
  },
];

const Banner = () => {
  return (
    <Box style={{maxWidth:"1450px",margin:"auto"}}>
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
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            backgroundImage:`url(${item.img})`,
            backgroundRepeat:"no-repeat",
            backgroundSize:"contain",
            width:"100%",
            height:"344px"
          }} key={index}>
            {/* <img
              src={item.img}
              alt=""
              className="imgBanner"
              key={index}
              width="100%"
              height="100%"
            /> */}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Banner;
