import React, { useEffect } from "react";
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
import LoginValidation from "./views/LoginValidation/LoginValidation";
import Perfil from "./views/Perfil/Perfil";
import { ColeccionContext } from "./context/ColeccionesContext";
import { PerfilContext } from "./context/PerfilContext";
import SearchColeccionesResults from "./views/SearchColeccionesResults/SearchColeccionesResults";
import TyC from "./views/TyC/TyC";
import PdeP from "./views/PdeP/PdeP";
import Error from "./views/404error/error";
import Maintance from "./views/Maintance/Maintance";
import About from "./views/About/About";
import Notifications from "./views/Notifications/Notifications";
import CancelacionCompra from "./views/CancelacionCompra/CancelacionCompra";
import CancelacionCompraOk from "./views/CancelacionCompra/CancelacionCompraOk";

function App() {
  useEffect(() => {
    fetch('MiRoperoApiDataGetway.php',{
      method:"POST",
    }).then((res)=>console.log(res))

    const handleFooterClick = (e) => {
      if (e.target.id === "Ropa") {
        document.getElementById("ROPA").click();
      } else if (e.target.id === "Accesorios") {
        document.getElementById("ACCESORIOS").click();
      } else if (e.target.id === "Calzado") {
        document.getElementById("CALZADO").click();
      } else if (e.target.id === "Belleza") {
        document.getElementById("BELLEZA").click();
      }
    };
    window.addEventListener("click", handleFooterClick);

    return () => {
      window.removeEventListener("click", handleFooterClick);
    };
  }, []);

  return (
    <LoginContext>
      <ColeccionContext>
        <ProdsContext>
          <PerfilContext>
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
                      <Route
                        path="/productos/:search/:keyword"
                        element={<SearchProductsResults />}
                      />
                      <Route
                        path="/roperos"
                        element={<SearchClosetResults />}
                      />
                      <Route
                        path="/roperos/:keyword"
                        element={<SearchClosetResults />}
                      />
                      <Route
                        path="/roperos/search/:keyword"
                        element={<SearchClosetResults />}
                      />
                      <Route
                        path="/roperos/:closetId/:nombre"
                        element={<ViewCloset />}
                      />
                      <Route
                        path="/productoCard/:itemID"
                        element={<ProductPage />}
                      />
                      <Route
                        path="/colecciones/:coleccionName"
                        element={<SearchColeccionesResults />}
                      />
                      <Route path="/carrito" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/checkout/:status" element={<Checkout />} />
                      <Route path="*" element={<Error />}></Route>
                      <Route path="/login" element={<Login />} />
                      <Route
                        path="/login/:redireccionCompra"
                        element={<Login />}
                      />
                      <Route path="/registro" element={<Register />} />
                      <Route
                        path="/validacionLogin"
                        element={<LoginValidation />}
                      />
                      <Route path="/perfil" element={<Perfil />} />
                      <Route
                        path="perfil/:perfilSeccion"
                        element={<Perfil />}
                      />
                      <Route
                        path="perfil/:perfilSeccion/:id"
                        element={<Perfil />}
                      />
                      <Route path="productos" element={<Home />} />
                      <Route path="terminos&y&condiciones" element={<TyC />} />
                      <Route path="politica&de&privacidad" element={<PdeP />} />
                      <Route path="mantenimiento" element={<Maintance />} />
                      <Route path="acercaDe" element={<About />} />
                      <Route
                        path="notificaciones"
                        element={<Notifications />}
                      />
                      <Route
                        path="cancelacionCompra"
                        element={<CancelacionCompra />}
                      />
                      <Route
                        path="cancelacionCompraOk"
                        element={<CancelacionCompraOk />}
                      />
                    </Routes>
                    <Footer />
                  </ThemeProvider>
                </Router>
              </CartContext>
            </FormContext>
          </PerfilContext>
        </ProdsContext>
      </ColeccionContext>
    </LoginContext>
  );
}

export default App;
