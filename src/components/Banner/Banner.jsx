import React from "react";
import HomeBanner1 from "../../assets/img/HomeBanner1.jpg";
import HomeBanner2 from "../../assets/img/HomeBanner2.jpg";
import HomeBanner1M from "../../assets/img/bannerMobile.jpg";
import HomeBanner2M from "../../assets/img/bannerMobile2.jpg";
import Carousel from "react-material-ui-carousel";
import { Box, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";

const slides = [
  {
    img:HomeBanner1,
  },
  {
    img: HomeBanner2,
  },
];

const slidesMobile = [
  {
    img:HomeBanner1M,
  },
  {
    img: HomeBanner2M,
  },
];

const Banner = () => {

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{maxWidth:"1450px",margin:"auto"}}>
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
        sx={{ height: { xs: "157px", md: "344px"} }}
      >
        {isMobile?<>
          {slidesMobile.map((item, index) => (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            backgroundImage:`url(${item.img})`,
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
            width:"100%",
            height:"344px"
          }} key={index}>
          </Box>
        ))}
        </>
        :<>
        {slides.map((item, index) => (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            backgroundImage:`url(${item.img})`,
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
            width:"100%",
            height:"344px"
          }} key={index}>
          </Box>
        ))}
        </>
        }
      </Carousel>
    </Box>
  );
};

export default Banner;
