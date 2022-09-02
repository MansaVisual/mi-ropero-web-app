import React, { useState, useEffect } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import Onboarding from "../../components/Onboarding/Onboarding";
import Filter from "../../components/Filter/Filter";
import Chip from "../../components/Chip/Chip";
import SliderProd from "../../components/SliderProd/SliderProd";
import { slides } from "../../components/SliderProd/SliderProd";
import theme from "../../styles/theme";
import ProductCard from "../../components/ProductCard/ProductCard";
import { StyledLink } from "../../components/Footer/styles";
import notFoundIcon from "../../assets/img/notFoundIcon.svg";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const SearchProductsResults = () => {
  const { keyword } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    // filter products by keyword entered in search bar
    const filteredProd = slides.filter((product) => {
      return product.title.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredProducts(filteredProd);
  }, [keyword]);

  return (
    <>
      <Onboarding />
      <Box
        sx={{
          pb: "84px",
          pl: "74px",
          pr: "74px",
          backgroundColor: "hsl(0, 0%, 98.4%)",
          overflowX: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ marginTop: "16px", display: "flex" }}>
            <Box>
              <Breadcrumbs links={pathnames} />
              <Filter>{keyword}</Filter>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginLeft: "45px",
              }}
            >
              {filteredProducts.length > 0 && keyword ? (
                filteredProducts.map((product, index) => {
                  return (
                    <ProductCard
                      key={index}
                      imageCard={product.img}
                      productName={product.title}
                      productPrice={product.price}
                      tag={product.tag}
                    />
                  );
                })
              ) : (
                <Box
                  sx={{
                    p: "20px",
                    display: "flex",
                    alignItems: "center",
                    m: "20px",
                  }}
                  maxHeight="300px"
                >
                  <Box sx={{ alignSelf: "center" }}>
                    <img
                      src={notFoundIcon}
                      width={30}
                      height={30}
                      alt="notFoundIcon"
                    />
                  </Box>
                  <Box sx={{ marginLeft: "20px" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#FF3F20",
                        fontSize: theme.typography.fontSize[6],
                        fontWeight: theme.typography.fontWeightMedium,
                        textTransform: "uppercase",
                      }}
                    >
                      No se encontraron resultados para{" "}
                      <Typography
                        paragraph
                        sx={{
                          textTransform: "lowercase",
                        }}
                      >
                        "{keyword}"
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: theme.typography.fontWeightMedium,
                        fontSize: theme.typography.fontSize[6],
                        color: "#878787",
                      }}
                    >
                      Revisá la ortografía de la palabra
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: theme.typography.fontWeightMedium,
                        fontSize: theme.typography.fontSize[6],
                        color: "#878787",
                      }}
                    >
                      Utilizá palabras más genéricas o menos palabras.
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: theme.typography.fontWeightMedium,
                        fontSize: theme.typography.fontSize[6],
                        color: "#878787",
                      }}
                    >
                      Navegá por las categorías para encontrar un producto
                      similar
                    </Typography>
                    <Box sx={{ width: "100%", textAlign: "center", m: "20px" }}>
                      <StyledLink
                        href="/"
                        sx={{
                          color: "#443988",
                          fontSize: theme.typography.fontSize[2],
                          fontWeight: theme.typography.fontWeightRegular,
                          textTransform: "uppercase",
                          padding: "10px 25px",
                          height: "36px",
                          border: "1px solid #443988",
                          borderRadius: "20px",
                        }}
                      >
                        Ir al Inicio
                      </StyledLink>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ mt: "40px" }}>
              <Chip primary>Productos relacionados</Chip>
            </Box>
            <Box sx={{ mt: "24px", mb: "28px" }}>
              <SliderProd />
            </Box>

            <Link
              sx={{
                color: "hsla(0, 0%, 53%, 1)",
                fontSize: theme.typography.fontSize[4],
              }}
            >
              VER TODOS LOS PRODUCTOS RELACIONADOS
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SearchProductsResults;
