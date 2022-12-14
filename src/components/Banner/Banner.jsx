import React from "react";
import HomeBanner1 from "../../assets/img/HomeBanner1.jpg";
import HomeBanner2 from "../../assets/img/HomeBanner2.jpg";
import HomeBanner3 from "../../assets/img/HomeBanner3.jpg";
import homeBannerMobile1 from "../../assets/img/bannerMobile.jpg"
import homeBannerMobile2 from "../../assets/img/bannerMobile2.jpg"
import homeBannerMobile3 from "../../assets/img/bannerMobile3.jpg"
import Carousel from "react-material-ui-carousel";
import { Box, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";

const slides = [
  {
    img:HomeBanner3,
  },
  {
    img:HomeBanner1,
  },
  {
    img: HomeBanner2,
  },
];

const slides2 = [
  {
    img:homeBannerMobile3,
  },
  {
    img:homeBannerMobile1,
  },
  {
    img: homeBannerMobile2,
  },
];

const Banner = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box style={{maxWidth:"1366px",margin:"auto"}}>
      <Carousel
        animation="slide"
        className="bannerCarousel"
        autoPlay={true}
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
        sx={{ minHeight: { xs: "135px", md: "200px" }, maxHeight: { xs: "320px", md: "320px" }}}
      >
        {(isMobile?slides2:slides).map((item, index) => (

            <img
              src={item.img}
              alt="banner"
              className="imgBanner"
              key={index}
              width="100%"
              height="100%"
            />
        ))}
      </Carousel>
    </Box>
  );
};

export default Banner;
