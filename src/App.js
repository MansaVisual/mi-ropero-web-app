import React from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
import SearchProductsResults from "./views/SearchProductsResults/SearchProductsResults";
import SearchClosetResults from "./views/SearchClosetResults/SearchClosetResults";
import ViewCloset from "./views/ViewCloset/ViewCloset";
import ProductPage from "./views/ProductPage/ProductPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./views/Cart/Cart";
import Checkout from "./views/Checkout/Checkout";
import { FormContext } from "./context/FormContext";
import { ProdsContext } from "./context/ProdsContext";
import { CartContext } from "./context/CartContext";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import { LoginContext } from "./context/LoginContext";


function App() {
  return (
    <LoginContext>
      <ProdsContext>
        <FormContext>
          <CartContext>
            <Router>
              
              <ThemeProvider theme={theme}>
                <NavBar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/productos/:keyword"
                    element={<SearchProductsResults />}
                    />
                  <Route path="/roperos/:keyword" element={<SearchClosetResults />} />
                  <Route path="/roperos/:keyword/:closetId" element={<ViewCloset />} />
                  <Route
                    path="/roperos/:keyword/:closetId/:itemName"
                    element={<ProductPage />}
                    />
                  <Route
                    path="/carrito"
                    element={<Cart />}
                    />  
                  <Route
                    path="/checkout"
                    element={<Checkout />}
                    />
                  <Route
                    path="/login"
                    element={<Login />}
                    />
                  <Route
                    path="/registro"
                    element={<Register />}
                    />
                </Routes>
                <Footer />
              </ThemeProvider>
            </Router>
          </CartContext>
        </FormContext>
      </ProdsContext>
    </LoginContext>
  );
}

export default App;
