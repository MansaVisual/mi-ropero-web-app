import React from "react";
import "./App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Home />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
