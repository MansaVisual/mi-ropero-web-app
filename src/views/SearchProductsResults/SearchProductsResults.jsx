import React, { useState, useEffect, useContext } from "react";
import {
  Backdrop,
  Box,
  Container,
  Fade,
  Grid,
  Link,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import Onboarding from "../../components/Onboarding/Onboarding";
import Filter from "../../components/Filter/Filter";
import Chip from "../../components/Chip/Chip";
import SliderProd from "../../components/SliderProd/SliderProd";
import ProductCard from "../../components/ProductCard/ProductCard";
import { StyledLink } from "../../components/Footer/styles";
import notFoundIcon from "../../assets/img/notFoundIcon.svg";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Button from "../../components/Button/Button";
import { FilterButton } from "../../components/ActionButton/ActionButton";
import theme from "../../styles/theme";
import Pagination from "../../components/Pagination/Pagination";
import { UseProdsContext } from "../../context/ProdsContext";
import Loader from "../../components/Loader/Loader";
import ChipFilterCategories from "../../components/ChipFilterCategories/ChipFilterCategories";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "100%",
  bgcolor: theme.palette.secondary.contrastText,
  boxShadow: 24,
  p: 3,
  borderRadius: "6px",
  zIndex: 10,
  overflowY: "auto",
};

const SearchProductsResults = () => {
  const { categorias, ProdAPI } = useContext(UseProdsContext);
  const { keyword, search } = useParams();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [load, setLoad] = useState(false);

  const [prods, setProds] = useState([]);
  const [buscandoProds, setBuscandoProds] = useState(true);
  const [filtrosCategoria, setFiltrosCategoria] = useState([]);

  const [totalPages, setTotalPages] = useState(0);

  const [putFilters, setPutFilters] = useState([]);
  const [putSort, setPutSort] = useState("");

  useEffect(() => {
    // filter products by keyword entered in search bar
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    setBuscandoProds(true);
    setProds([]);
    if (
      categorias !== undefined &&
      categorias.length !== 0 &&
      keyword !== undefined &&
      search !== undefined
    ) {
      prodsCategoria(true);
    }
    if (
      categorias !== undefined &&
      categorias.length !== 0 &&
      keyword !== undefined &&
      search === undefined
    ) {
      prodsCategoria(false);
    }
  }, [keyword, categorias]); // eslint-disable-line react-hooks/exhaustive-deps

  const prodsCategoria = (paramSearch) => {
    const catProd = new FormData();
    let idCat = "";

    if (paramSearch) {
      catProd.append("text", keyword);
    } else {
      idCat = categorias.find(
        (e) => e.nombre.toString().trim() === keyword.replaceAll("&", "/")
      );
      catProd.append("idcategoria", idCat.idcategoria);

      const catFilters = new FormData();
      catFilters.append("idcategoria", idCat.idcategoria);
      ProdAPI(catFilters, "categorias", "get").then((res) => {
        if (res.status === "success") {
          setFiltrosCategoria(res.result[0]);
        }
      });
    }
    catProd.append("bypage", 15);
    catProd.append("page", 1);
    ProdAPI(catProd, "productos", "search").then((res) => {
      setBuscandoProds(false);
      if (res.status === "success") {
        setProds(res.result.productos);
        setTotalPages(res.result.total_paginas);
      }
    });
  };

  const buscarPage = (paramSearch, value) => {
    setLoad(true);
    const catProd = new FormData();
    let idCat = "";
    if (paramSearch) {
      catProd.append("text", keyword);
      catProd.append("bypage", 15);
    } else {
      idCat = categorias.find(
        (e) => e.nombre.toString().trim() === keyword.replaceAll("&", "/")
      );
      catProd.append("idcategoria", idCat.idcategoria);
      catProd.append("bypage", 15);
    }

    catProd.append("page", value);

    ProdAPI(catProd, "productos", "search").then((res) => {
      setBuscandoProds(false);
      if (res.status === "success") {
        setProds(res.result.productos);
      }
      setLoad(false);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
  };

  return (
    <>
      {isMobile || isMobileBigScreen ? <></> : <Onboarding />}

      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            px: isMobile || isMobileBigScreen ? "16px" : "74px",
            py: "40px",
          }}
          spacing={6}
        >
          <Grid item xs={12} sm={6} md={3}>
            {isMobile || isMobileBigScreen ? (
              <Box sx={{ mt: "16px" }}>
                <Breadcrumbs links={pathnames} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[9],
                      fontWeight: theme.typography.fontWeightMedium,
                      color: theme.palette.primary.main,
                      textTransform: "capitalize",
                    }}
                  >
                    {keyword}
                  </Typography>
                  <FilterButton onClick={() => setOpen(true)} />
                </Box>
                {open && (
                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="filter-modal-title"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                    sx={{ overflowY: "auto", m: "40px 0", borderRadius: "6px" }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: "16px",
                          }}
                        >
                          <Typography id="filter-modal-title" component="h2">
                            Filtrar
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: theme.typography.fontSize[2],
                              fontWeight: theme.typography.fontWeightRegular,
                              textDecoration: "underline",
                              mt: "12px",
                              mb: "16px",
                            }}
                          >
                            Limpiar filtros
                          </Typography>
                          <Button
                            backgroundColor={theme.palette.primary.main}
                            color={theme.palette.secondary.contrastText}
                            text="APLICAR"
                            small
                            notRounded
                            disabled
                          />
                        </Box>
                        <Filter filtros={filtrosCategoria} putSort={putSort} />
                      </Box>
                    </Fade>
                  </Modal>
                )}
              </Box>
            ) : (
              <>
                <Box>
                  <Breadcrumbs links={pathnames} />
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[9],
                      fontWeight: theme.typography.fontWeightMedium,
                      color: theme.palette.primary.main,
                      textTransform: "capitalize",
                      mb: "20px",
                    }}
                  >
                    {keyword}
                  </Typography>
                </Box>
                {putFilters.map((res, index) => {
                  return (
                    <Stack direction="row" spacing={1}>
                      <ChipFilterCategories
                        filteredCategory={res}
                        key={index}
                      />
                    </Stack>
                  );
                })}
                <Filter
                  filtros={filtrosCategoria}
                  setPutFilters={setPutFilters}
                  putFilters={putFilters}
                  putSort={putSort}
                  setPutSort={setPutSort}
                />
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                gap: "32px",
                mb: "32px",
              }}
            >
              {prods.length !== 0 && keyword ? (
                prods.map((product, index) => {
                  return (
                    <ProductCard
                      key={index}
                      imageCard={product.imagenes[0].imagen_vertical}
                      productName={product.nombre}
                      productPrice={product.precio}
                      idProducto={product.idproducto}
                      tag="NUEVO"
                      datosTienda={product.tienda}
                      precioOferta={product.precio_oferta}
                    />
                  );
                })
              ) : (
                <>
                  {buscandoProds ? (
                    <Loader spin={"spinnerG"} />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: "16px",
                      }}
                    >
                      <Box sx={{ mr: "20px" }}>
                        <img
                          src={notFoundIcon}
                          width={30}
                          height={30}
                          alt="not found icon"
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: theme.typography.fontSize[6],
                            fontWeight: theme.typography.fontWeightMedium,
                            color: theme.palette.secondary.main,
                            textTransform: "uppercase",
                            textAlign:
                              isMobile || isMobileBigScreen
                                ? "center"
                                : "unset",
                            mb: 4,
                          }}
                        >
                          No encontramos resultados para{" "}
                          <Typography
                            component="span"
                            sx={{
                              color: theme.palette.secondary.main,
                              textTransform: "capitalize",
                            }}
                          >
                            "{keyword}"
                          </Typography>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: theme.typography.fontSize[6],
                            fontWeight: theme.typography.fontWeightRegular,
                            color: theme.palette.tertiary.main,
                          }}
                        >
                          Revisá la ortografía de la palabra
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: theme.typography.fontSize[6],
                            fontWeight: theme.typography.fontWeightMedium,
                            color: theme.palette.tertiary.main,
                          }}
                        >
                          Utilizá palabras más genéricas o menos palabras.
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: theme.typography.fontSize[6],
                            fontWeight: theme.typography.fontWeightMedium,
                            color: theme.palette.tertiary.main,
                          }}
                        >
                          Navegá por las categorías para encontrar un producto
                          similar
                        </Typography>
                        <StyledLink
                          to="/"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "default",
                          }}
                        >
                          <Typography
                            component="span"
                            sx={{
                              boxSizing: "border-box",
                              color: theme.palette.primary.main,
                              fontSize: theme.typography.fontSize[2],
                              fontWeight: theme.typography.fontWeightRegular,
                              textTransform: "uppercase",
                              padding: "10px 36px",
                              height: "36px",
                              width: "200px",
                              textAlign: "center",
                              border: "1px solid hsl(248.4, 40.9%, 37.8%)",
                              borderRadius: "20px",
                              mt: 4,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={() => prodsCategoria()}
                          >
                            Ir al Inicio
                          </Typography>
                        </StyledLink>
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </Box>
            {load && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Loader spin={"spinnerM"} />
              </div>
            )}
            {prods.length !== 0 && totalPages > 1 && keyword && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pagination cantidad={totalPages} buscarPage={buscarPage} />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ mt: "40px", textAlign: "center" }}>
              <Chip primary>Productos relacionados</Chip>
            </Box>
            <Box sx={{ mt: "24px", mb: "28px" }}>
              <SliderProd contenido={[]} />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Link
                sx={{
                  color: theme.palette.tertiary.main,
                  fontSize: theme.typography.fontSize[4],
                }}
              >
                VER TODOS LOS PRODUCTOS RELACIONADOS
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SearchProductsResults;
