import React, { useState, useEffect, useContext } from "react";
import {
  Backdrop,
  Box,
  Container,
  Fade,
  Grid,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import Onboarding from "../../components/Onboarding/Onboarding";
import Filter from "../../components/Filter/Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { FilterButton } from "../../components/ActionButton/ActionButton";
import theme from "../../styles/theme";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import { UseColeccionContext } from "../../context/ColeccionesContext";
import { UseProdsContext } from "../../context/ProdsContext";
import ChipFilterCategories from "../../components/ChipFilterCategories/ChipFilterCategories";
import Swal from "sweetalert2";
import lupa from "../../assets/img/lupaFilters.png";

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
  const { coleccionName, idColeccion } = useParams();
  const { ColeccionAPI } = useContext(UseColeccionContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { categorias, ProdAPI } = useContext(UseProdsContext);
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const [load2, setLoad2] = useState(false);

  const [prods, setProds] = useState([]);
  const [filtrosCategoria, setFiltrosCategoria] = useState([]);
  const [buscandoCol, setBuscandoCol] = useState(true);

  const [totalPages, setTotalPages] = useState(0);

  const [coleccion, setColeccion] = useState([]);

  const [putCategory, setPutCategory] = useState("");
  const [putFilters, setPutFilters] = useState([]);
  const [putSort, setPutSort] = useState("");
  const [filtrosFin, setFiltrosFin] = useState("");
  const [rangoPrecio, setRangoPrecio] = useState({ min: 0, max: 999999 });

  const [pags, setPags] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    setProds([]);
    setPags(1);

    const col = new FormData();
    col.append("idcoleccion", Number(idColeccion));
    col.append("bypage", 15);
    col.append("page", 0);

    ColeccionAPI(col, "colecciones", "detail").then((res) => {
      if (res.status === "success") {
        setColeccion(res.result);
        setProds(res.result.productos);
        setTotalPages(res.result.productos_total_paginas);
      }
      setLoad2(false);
    });
  }, [idColeccion]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoad2(true);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    busquedaPrimera();
  }, [putCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const busquedaPrimera = () => {
    setPutSort("");
    setPutFilters([]);
    setPags(1);
    if (putCategory !== "") {
      let idCat = coleccion.productos_categorias.filter(
        (e) => e !== null && e.nombre === putCategory
      );
      idCat = idCat[0].idcategoria;

      const col = new FormData();
      col.append("idcoleccion", Number(idColeccion));
      col.append("idcategoria", idCat);
      col.append("bypage", 15);
      col.append("page", 0);

      ColeccionAPI(col, "colecciones", "detail").then((res) => {

        if (res.status === "success") {
          setFiltrosCategoria(
            res.result.productos_categorias[0].caracteristica
          );
          setProds(res.result.productos);
          setTotalPages(res.result.productos_total_paginas);
        }
        setBuscandoCol(false);
        setLoad2(false);
      });
    } else {
      const col = new FormData();
      col.append("idcoleccion", Number(idColeccion));
      col.append("bypage", 15);
      col.append("page", 0);

      ColeccionAPI(col, "colecciones", "detail").then((res) => {
        if (res.status === "success") {
          setProds(res.result.productos);
          setTotalPages(res.result.productos_total_paginas);
        }
        setBuscandoCol(false);
        setLoad2(false);
      });
    }
  };

  const buscarPage = (paramSearch, value) => {
    if (rangoPrecio.min > rangoPrecio.max) {
      Swal.fire({
        title: "RANGOS INCORRECTOS",
        text: "Los rangos de precios son incorrectos. Volvé a intentarlo",
        icon: "error",
        confirmButtonText: "ACEPTAR",
      });
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setLoad2(true);

    const catProd = new FormData();

    if (putCategory !== "") {
      let idCat = coleccion.productos_categorias.filter(
        (e) => e !== null && e.nombre === putCategory
      );
      idCat = idCat[0].idcategoria;
      catProd.append("idcategoria", Number(idCat));
    }

    if (rangoPrecio.min !== 0 || rangoPrecio.max !== 0) {
      catProd.append("precio_desde", rangoPrecio.min);
      catProd.append("precio_hasta", rangoPrecio.max);
    }

    catProd.append("idcoleccion", Number(idColeccion));
    catProd.append("bypage", 15);
    catProd.append("page", value);

    if (putSort === "Mas relevante primero") {
      catProd.append("order_type", "desc");
      catProd.append("order", "idproducto");
    } else if (putSort === "Menos relevante primero") {
      catProd.append("order_type", "asc");
      catProd.append("order", "idproducto");
    } else if (putSort === "Mayor precio primero") {
      catProd.append("order_type", "desc");
      catProd.append("order", "precio");
    } else if (putSort === "Menor precio primero") {
      catProd.append("order_type", "asc");
      catProd.append("order", "precio");
    }

    if (putFilters.length !== 0) {
      catProd.append("caracteristicas", filtrosFin);
    }
    console.log(Object.fromEntries(catProd))
    ColeccionAPI(catProd, "colecciones", "detail").then((res) => {
      if (res.status === "success") {
        setProds(res.result.productos);
      }
      setLoad2(false);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
  };

  const handleAplicarFiltros = () => {
    setBuscandoCol(true);

    if (rangoPrecio.min > rangoPrecio.max) {
      Swal.fire({
        title: "RANGOS INCORRECTOS",
        text: "Los rangos de precios son incorrectos. Volvé a intentarlo",
        icon: "error",
        confirmButtonText: "ACEPTAR",
      });
      return;
    }
    setPags(1);
    setLoad2(true);
    let array = [];
    for (let i = 0; i < putFilters.length; i++) {
      array.push(`${putFilters[i].idName}:${putFilters[i].id}`);
    }
    setFiltrosFin(array.toString());

    if (
      putFilters.length !== 0 ||
      putSort !== "" ||
      rangoPrecio.min !== 0 ||
      rangoPrecio.max !== 0
    ) {
      const prod = new FormData();

      if (putCategory !== "") {
        let idCat = coleccion.productos_categorias.filter(
          (e) => e !== null && e.nombre === putCategory
        );
        idCat = idCat[0].idcategoria;
        prod.append("idcategoria", Number(idCat));
      }

      if (rangoPrecio.min !== 0 || rangoPrecio.max !== 0) {
        prod.append("precio_desde", rangoPrecio.min);
        prod.append("precio_hasta", rangoPrecio.max);
      }

      prod.append("idcoleccion", Number(idColeccion));

      prod.append("bypage", 15);
      prod.append("page", 0);

      if (putSort === "Mas relevante primero") {
        prod.append("order_type", "desc");
        prod.append("order", "idproducto");
      } else if (putSort === "Menos relevante primero") {
        prod.append("order_type", "asc");
        prod.append("order", "idproducto");
      } else if (putSort === "Mayor precio primero") {
        prod.append("order_type", "desc");
        prod.append("order", "precio");
      } else if (putSort === "Menor precio primero") {
        prod.append("order_type", "asc");
        prod.append("order", "precio");
      }

      if (putFilters.length !== 0) {
        prod.append("caracteristicas", array.toString());
      }

      ProdAPI(prod, "colecciones", "detail").then((res) => {
        console.log(Object.fromEntries(prod));
        console.log(Object.fromEntries(prod));
        setLoad2(false);
        setBuscandoCol(false);
        if (res.status === "success") {
          setProds(res.result.productos);
          setTotalPages(res.result.productos_total_paginas);
        } else if (
          res.result === "No se encontraron producto para la coleccion"
        ) {
          setProds([]);
          setTotalPages(0);
        }
      });
    }
  };

  return (
    <>
      {isMobile || isMobileBigScreen ? <></> : <Onboarding />}

      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            px:
              isMobile || isMobileBigScreen
                ? "16px"
                : isTablet
                ? "20px"
                : "74px",
            py: "40px",
          }}
          spacing={5}
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
                    {coleccionName}
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
                        </Box>
                        {putFilters.map((res, index) => {
                          return (
                            <Stack direction="row" spacing={1}>
                              <ChipFilterCategories
                                filteredCategory={res}
                                key={index}
                                putFilters={putFilters}
                                setPutFilters={setPutFilters}
                                setProds={setProds}
                                ProdAPI={ProdAPI}
                                setTotalPages={setTotalPages}
                                categorias={categorias}
                                clase={"colecciones"}
                                metodo={"detail"}
                                putCategory={putCategory}
                                coleccionName={coleccionName}
                              />
                            </Stack>
                          );
                        })}
                        {putCategory !== "" ||
                        putSort !== "" ||
                        putFilters.length !== 0 ||
                        rangoPrecio.min !== 0 ||
                        rangoPrecio.max !== 999999 ? (
                          <Typography
                            sx={{
                              fontSize: theme.typography.fontSize[2],
                              fontWeight: theme.typography.fontWeightRegular,
                              textDecoration: "underline",
                              mt: "12px",
                              mb: "16px",
                              cursor: "pointer",
                            }}
                            onClick={
                              putCategory !== "" ||
                              putSort !== "" ||
                              putFilters.length !== 0 ||
                              rangoPrecio.min !== 0 ||
                              rangoPrecio.max !== 999999
                                ? () => {
                                    setPutCategory("");
                                    setRangoPrecio({ min: 0, max: 999999 });
                                    busquedaPrimera();
                                  }
                                : null
                            }
                          >
                            Limpiar filtros
                          </Typography>
                        ) : (
                          <></>
                        )}
                        <Filter
                          filtrosCol={filtrosCategoria}
                          setPutCategory={setPutCategory}
                          putCategory={putCategory}
                          filtros={filtrosCategoria}
                          setPutFilters={setPutFilters}
                          putFilters={putFilters}
                          putSort={putSort}
                          setPutSort={setPutSort}
                          coleccion={coleccion}
                          handleAplicarFiltros={handleAplicarFiltros}
                          rangoPrecio={rangoPrecio}
                          setRangoPrecio={setRangoPrecio}
                        />
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
                    {coleccionName}
                  </Typography>
                </Box>
                {putFilters.map((res, index) => {
                  return (
                    <Stack direction="row" spacing={1}>
                      <ChipFilterCategories
                        filteredCategory={res}
                        key={index}
                        putFilters={putFilters}
                        setPutFilters={setPutFilters}
                        setProds={setProds}
                        ProdAPI={ProdAPI}
                        setTotalPages={setTotalPages}
                        categorias={categorias}
                        clase={"colecciones"}
                        metodo={"detail"}
                        putCategory={putCategory}
                        coleccionName={coleccionName}
                      />
                    </Stack>
                  );
                })}
                {putCategory !== "" ||
                putSort !== "" ||
                putFilters.length !== 0 ||
                rangoPrecio.min !== 0 ||
                rangoPrecio.max !== 999999 ? (
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[2],
                      fontWeight: theme.typography.fontWeightRegular,
                      textDecoration: "underline",
                      mt: "12px",
                      mb: "16px",
                      cursor: "pointer",
                    }}
                    onClick={
                      putCategory !== "" ||
                      putSort !== "" ||
                      putFilters.length !== 0 ||
                      rangoPrecio.min !== 0 ||
                      rangoPrecio.max !== 999999
                        ? () => {
                            setPutCategory("");
                            setRangoPrecio({ min: 0, max: 999999 });
                            busquedaPrimera();
                          }
                        : null
                    }
                  >
                    Limpiar filtros
                  </Typography>
                ) : (
                  <></>
                )}
                <Filter
                  filtrosCol={filtrosCategoria}
                  setPutCategory={setPutCategory}
                  putCategory={putCategory}
                  filtros={filtrosCategoria}
                  setPutFilters={setPutFilters}
                  putFilters={putFilters}
                  putSort={putSort}
                  setPutSort={setPutSort}
                  coleccion={coleccion}
                  handleAplicarFiltros={handleAplicarFiltros}
                  rangoPrecio={rangoPrecio}
                  setRangoPrecio={setRangoPrecio}
                />
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            {load2 ? (
              <div
                style={{
                  marginTop: "24px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader spin={"spinnerG"} />
              </div>
            ) : (
              <>
                {!buscandoCol && prods.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: "16px",
                      flexDirection: !buscandoCol ? "column" : "row",
                    }}
                  >
                    <Box sx={{ mr: "20px" }}>
                      <img
                        src={lupa}
                        width={40}
                        height={40}
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
                              : !buscandoCol
                              ? "center"
                              : "unset",
                          mb: 4,
                        }}
                      >
                        No encontramos resultados para esos filtros
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: theme.typography.fontSize[6],
                          fontWeight: theme.typography.fontWeightRegular,
                          color: theme.palette.tertiary.main,
                          textAlign: !buscandoCol ? "center" : "unset",
                        }}
                      >
                        Intentá con filtros diferentes.
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      gap: "32px",
                      mb: "32px",
                    }}
                  >
                    {prods.length !== 0 && coleccionName ? (
                      prods.map((product, index) => {
                        return (
                          <>
                            {product.imagenes.length !== 0 && (
                              <ProductCard
                                key={index}
                                imageCard={product.imagenes[0].imagen_vertical}
                                productName={product.nombre}
                                productPrice={product.precio}
                                idProducto={product.idproducto}
                                idTienda={product.idtienda}
                                tag={product.tag}
                                datosTienda={product.tienda}
                                precioOferta={product.precio_oferta}
                              />
                            )}
                          </>
                        );
                      })
                    ) : (
                      <div
                        style={{
                          marginTop: "24px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Loader spin={"spinnerG"} />
                      </div>
                    )}
                  </Box>
                )}
              </>
            )}
            {prods.length !== 0 && totalPages > 1 && coleccionName && !load2 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pagination
                  cantidad={totalPages}
                  buscarPage={buscarPage}
                  pags={pags}
                  setPags={setPags}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SearchProductsResults;
