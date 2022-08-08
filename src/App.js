import React from "react";
import "./App.css";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Onboarding from "./components/Onboarding/Onboarding";
import ProductCard from "./components/ProductCard/ProductCard";
import Banner from "./components/Banner/Banner";
import Chip from "./components/Chip/Chip";
import ChipCategory from "./components/Chip/Chip";
import {LikeButton, UpButton, WspButton} from "./components/ActionButton/ActionButton";
import Home from "./views/Home/Home";
import SliderProd from "./components/SliderProd/SliderProd";




function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Banner />
      <Onboarding/>
      <Home />
      <Footer />
      
    </ThemeProvider>
  );
}

export default App;
