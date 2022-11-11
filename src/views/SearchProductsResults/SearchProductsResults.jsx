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
import { useNavigate, useParams } from "react-router-dom";
import Onboarding from "../../components/Onboarding/Onboarding";
import Filter from "../../components/Filter/Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import { StyledLink } from "../../components/Footer/styles";
import notFoundIcon from "../../assets/img/notFoundIcon.svg";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { FilterButton } from "../../components/ActionButton/ActionButton";
import theme from "../../styles/theme";
import Pagination from "../../components/Pagination/Pagination";
import { UseProdsContext } from "../../context/ProdsContext";
import Loader from "../../components/Loader/Loader";
import ChipFilterCategories from "../../components/ChipFilterCategories/ChipFilterCategories";
import Swal from "sweetalert2";
import lupa from "../../assets/img/lupaFilters.png"

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
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))
  const navigate=useNavigate()
  const [load2, setLoad2] = useState(false);

  const [prods, setProds] = useState([]);
  const [buscandoProds, setBuscandoProds] = useState(true);
  const [buscandoFiltros, setBuscandoFiltros] = useState(false);
  const [filtrosCategoria, setFiltrosCategoria] = useState([]);
  const [putCategory,setPutCategory]=useState("")

  const [totalPages, setTotalPages] = useState(0);

  const [putFilters, setPutFilters] = useState([]);
  const [putSort, setPutSort] = useState("");
  const [rangoPrecio, setRangoPrecio] = useState({ min: 0, max: 999999 });

  const [filtrosFin, setFiltrosFin] = useState("");

  const [pags, setPags] = useState(1);

  useEffect(() => {
    // filter products by keyword entered in search bar
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    setBuscandoProds(true);
    setProds([]);
    setPutFilters([]);
    setPutSort("");
    setTotalPages(0);
    setPags(1)
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

  useEffect(() => {
    if(putCategory!==""){
      setLoad2(true)
      setPags(1)
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
      busquedaPrimera()
    }
  }, [putCategory]);// eslint-disable-line react-hooks/exhaustive-deps

  const busquedaPrimera=()=>{
    setBuscandoFiltros(true)
    setPutSort("")
    setPutFilters([])
    setPags(1)
    if(putCategory!==""){
      let idCat=categorias.filter(e=>e.nombre===putCategory)
      idCat=idCat[0].idcategoria

      const col=new FormData()
      col.append("text",keyword)
      col.append("idcategoria",idCat)
      col.append("bypage",30)
      col.append("page",0)

      ProdAPI(
          col,
          "productos",
          "search"
      ).then((res)=>{console.log(res)
        if(res.status==="success"){
          const catFilters = new FormData();
          catFilters.append("idcategoria", idCat);
          ProdAPI(catFilters, "categorias", "get").then((res) => {
            if (res.status === "success") {
              setFiltrosCategoria(res.result[0]);
            }
          });
          setProds(res.result.productos)
          setTotalPages(res.result.total_paginas)
        }else if(res.result==="No se encontraron productos"){
          setFiltrosCategoria([])
          setProds([])
          setTotalPages(0)
        }
        // setBuscandoCol(false)
        setLoad2(false)
      })
    }
  }


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

      if (rangoPrecio.min !== 0 || rangoPrecio.max !== 0) {
        catProd.append("precio_desde", rangoPrecio.min);
        catProd.append("precio_hasta", rangoPrecio.max);
      }

      ProdAPI(catFilters, "categorias", "get").then((res) => {
        if (res.status === "success") {
          setFiltrosCategoria(res.result[0]);
        }
      });
    }
    catProd.append("bypage", 30);
    catProd.append("page", 0);
    ProdAPI(catProd, "productos", "search").then((res) => {console.log(res)
      setBuscandoProds(false);
      if (res.status === "success") {
        setProds(res.result.productos);
        setTotalPages(res.result.total_paginas);
      }
    });
  };

  const buscarPage = (paramSearch, value) => {
    if (rangoPrecio.min > rangoPrecio.max) {
      Swal.fire({
        title:'RANGOS INCORRECTOS',
        text:"Los rangos de precios son incorrectos. Volvé a intentarlo",
        icon:'error',
        confirmButtonText: 'ACEPTAR',
      })
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setLoad2(true);
    const catProd = new FormData();
    let idCat = "";

    if (putSort === "Mas relevante primero") {
      catProd.append("order_type", "desc");
      catProd.append("order", "idproducto");
    } else if (putSort === "Mayor precio primero") {
      catProd.append("order_type", "desc");
      catProd.append("order", "precio");
    } else if (putSort === "Menor precio primero") {
      catProd.append("order_type", "asc");
      catProd.append("order", "precio");
    }
    if (rangoPrecio.min !== 0 || rangoPrecio.max !== 0) {
      catProd.append("precio_desde", rangoPrecio.min);
      catProd.append("precio_hasta", rangoPrecio.max);
    }
    if (putFilters.length !== 0) {
      catProd.append("caracteristicas", filtrosFin);
    }
    if (paramSearch) {
      catProd.append("text", keyword);
      if(putCategory!==""){
        let idCat=categorias.filter(e=>e.nombre===putCategory)
        idCat=idCat[0].idcategoria
        catProd.append("idcategoria", idCat);
      }
    } else {
      idCat = categorias.find(
        (e) => e.nombre.toString().trim() === keyword.replaceAll("&", "/")
      );
      catProd.append("idcategoria", idCat.idcategoria);
    }
    catProd.append("bypage", 15);

    catProd.append("page", value);
    console.log(Object.fromEntries(catProd))

    ProdAPI(catProd, "productos", "search").then((res) => {
      setBuscandoProds(false);
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
    setBuscandoFiltros(true)
    if (rangoPrecio.min > rangoPrecio.max) {
      Swal.fire({
        title:'RANGOS INCORRECTOS',
        text:"Los rangos de precios son incorrectos. Volvé a intentarlo",
        icon:'error',
        confirmButtonText: 'ACEPTAR',
      })
      return;
    }
    setPags(1);
    setLoad2(true);
    let array = [];
    for (let i = 0; i < putFilters.length; i++) {
      array.push(`${putFilters[i].idName}:${putFilters[i].id}`);
    }
    setFiltrosFin(array.toString());
    console.log(array.toString())
    if (
      putFilters.length !== 0 ||
      putSort !== "" ||
      rangoPrecio.min !== 0 ||
      rangoPrecio.max !== 0
    ) {
      const prod = new FormData();
      let idCat = [];

      if (search!==undefined) {
        prod.append("text", keyword);
        if(putCategory!==""){
          let idCat=categorias.filter(e=>e.nombre===putCategory)
          idCat=idCat[0].idcategoria
          prod.append("idcategoria", idCat);
        }
      } else {
        idCat = categorias.find(
          (e) => e.nombre.toString().trim() === keyword.replaceAll("&", "/")
        );
        prod.append("idcategoria", idCat.idcategoria);
      }

      if (rangoPrecio.min !== 0 || rangoPrecio.max !== 0) {
        prod.append("precio_desde", rangoPrecio.min);
        prod.append("precio_hasta", rangoPrecio.max);
      }

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
      ProdAPI(prod, "productos", "search").then((res) => {
        setLoad2(false);
        if (res.status === "success") {
          setProds(res.result.productos);
          setTotalPages(res.result.total_paginas);
        }else if(res.result==="No se encontraron productos"){
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
            px: isMobile || isMobileBigScreen ? "16px" : isTablet ? "20px" : "74px",
            py: "40px",
            mb: "100px",
          }}
          spacing={5}
        >
          <Grid item xs={12} sm={6} md={3}>
            {isMobile || isMobileBigScreen ? (
              <Box sx={{ mt: "16px" }}>
                <Breadcrumbs links={[
                  "productos",
                  keyword.length > 15
                    ? keyword.replaceAll("&"," ").substring(0, 15) + "..."
                    : keyword.replaceAll("&"," ")
                ]} />
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
                    {                        keyword.length > 15
                          ? keyword.replaceAll("&"," ").substring(0, 15) + "..."
                          : keyword.replaceAll("&"," ")}
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
                          {(putSort!=="" || putFilters.length!==0 || (rangoPrecio.min!==0 || rangoPrecio.max!==999999))?
                          <Typography
                          sx={{
                            fontSize: theme.typography.fontSize[2],
                            fontWeight: theme.typography.fontWeightRegular,
                            textDecoration: 'underline',
                            mt: '12px',
                            mb: '16px',
                          }}
                          onClick={(putSort!=="" || putFilters.length!==0 || (rangoPrecio.min!==0 || rangoPrecio.max!==999999))?
                          ()=>{
                            setPutFilters([])
                            setPutSort("")
                            setRangoPrecio({ min: 0, max: 999999 })
                            prodsCategoria(false)
                          }
                          :null
                        }
                          >
                            Limpiar filtros
                          </Typography>
                          :<></>}
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
                                  clase={"productos"}
                                  metodo={"search"}
                                />
                              </Stack>
                            );
                          })}
                        </Box>
                        <Filter
                          filtros={filtrosCategoria}
                          setPutFilters={setPutFilters}
                          putFilters={putFilters}
                          putSort={putSort}
                          setPutSort={setPutSort}
                          handleAplicarFiltros={handleAplicarFiltros}
                          categorias={categorias}
                          ProdAPI={ProdAPI}
                          setProds={setProds}
                          setTotalPages={setTotalPages}
                          rangoPrecio={rangoPrecio}
                          setRangoPrecio={setRangoPrecio}
                          categoriasSearch={categorias}
                          putCategory={keyword}
                          setPutCategory={setPutCategory}
                        />
                      </Box>
                    </Fade>
                  </Modal>
                )}
              </Box>
            ) : (
              <>
                <Box>
                  <Breadcrumbs links={[
                    "productos",
                    keyword.length > 15
                      ? keyword.replaceAll("&"," ").substring(0, 15) + "..."
                      : keyword.replaceAll("&"," ")
                  ]} />
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[9],
                      fontWeight: theme.typography.fontWeightMedium,
                      color: theme.palette.primary.main,
                      textTransform: "capitalize",
                      mb: "20px",
                    }}
                  >
                  {keyword.length > 15
                          ? keyword.replaceAll("&"," ").substring(0, 15) + "..."
                          : keyword.replaceAll("&"," ")}
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
                        clase={"productos"}
                        metodo={"search"}
                      />
                    </Stack>
                  );
                })}
                {(putSort!=="" || putFilters.length!==0 || (rangoPrecio.min!==0 || rangoPrecio.max!==999999))?
                <Typography
                sx={{
                  fontSize: theme.typography.fontSize[2],
                  fontWeight: theme.typography.fontWeightRegular,
                  textDecoration: 'underline',
                  mt: '12px',
                  mb: '16px',
                  cursor:"pointer"
                }}
                onClick={(putSort!=="" || putFilters.length!==0 || (rangoPrecio.min!==0 || rangoPrecio.max!==999999))?
                    ()=>{
                      setPags(1);
                      setPutFilters([])
                      setPutSort("")
                      setRangoPrecio({ min: 0, max: 999999 })
                      prodsCategoria(false)
                    }
                    :null
                  }
                  >
                  Limpiar filtros
                </Typography>
                :<></>}
                <Filter
                  filtros={filtrosCategoria}
                  setPutFilters={setPutFilters}
                  putFilters={putFilters}
                  putSort={putSort}
                  setPutSort={setPutSort}
                  handleAplicarFiltros={handleAplicarFiltros}
                  categorias={categorias}
                  ProdAPI={ProdAPI}
                  setProds={setProds}
                  setTotalPages={setTotalPages}
                  rangoPrecio={rangoPrecio}
                  setRangoPrecio={setRangoPrecio}
                  categoriasSearch={search!==undefined?categorias:undefined}
                  putCategory={keyword}
                  setPutCategory={setPutCategory}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
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
                        idTienda={product.idtienda}
                        tag="NUEVO"
                        datosTienda={product.tienda}
                        precioOferta={product.precio_oferta}
                      />
                    );
                  })
                ) : (
                  <>
                    {buscandoProds ? (
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mt: "16px",
                          flexDirection:buscandoFiltros ? "column" : "row"
                        }}
                      >
                        {buscandoFiltros ? 
                        <Box sx={{ mr: "20px" }}>
                          <img
                            src={lupa}
                            width={30}
                            height={30}
                            alt="not found icon"
                            />
                        </Box>
                        :
                        <Box sx={{ mr: "20px" }}>
                          <img
                            src={notFoundIcon}
                            width={40}
                            height={40}
                            alt="not found icon"
                            />
                        </Box>
                        }
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
                                  : buscandoFiltros?"center":"unset",
                              mb: 4,
                            }}
                          >
                            {buscandoFiltros ? "No encontramos resultados para esos filtros": 
                            `No encontramos resultados para `
                            }
                            <Typography
                              component="span"
                              sx={{
                                color: theme.palette.secondary.main,
                                textTransform: "capitalize",
                              }}
                            >
                              {!buscandoFiltros ?
                              `"${keyword}"`:""
                              }
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: theme.typography.fontSize[6],
                              fontWeight: theme.typography.fontWeightRegular,
                              color: theme.palette.tertiary.main,
                              textAlign:buscandoFiltros?"center":"unset"
                            }}
                          >
                            {buscandoFiltros ? "Intentá con filtros diferentes":
                              "Revisá la ortografía de la palabra"
                            }
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: theme.typography.fontSize[6],
                              fontWeight: theme.typography.fontWeightMedium,
                              color: theme.palette.tertiary.main,
                            }}
                          >
                            {!buscandoFiltros ?
                            "Utilizá palabras más genéricas o menos palabras.":""
                            }
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: theme.typography.fontSize[6],
                              fontWeight: theme.typography.fontWeightMedium,
                              color: theme.palette.tertiary.main,
                            }}
                          >
                            {!buscandoFiltros ?
                            "Navegá por las categorías para encontrar un producto similar":""
                            }
                          </Typography>
                          {!buscandoFiltros &&
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
                              onClick={() => navigate("/")}
                              >
                              Ir al Inicio
                            </Typography>
                          </StyledLink>
                          }
                        </Box>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            )}

            {prods.length !== 0 && totalPages > 1 && keyword && !load2 && (
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
          {/* {!buscandoProds && <ProdsRelation />} */}
        </Grid>
      </Container>
    </>
  );
};

export default SearchProductsResults;
