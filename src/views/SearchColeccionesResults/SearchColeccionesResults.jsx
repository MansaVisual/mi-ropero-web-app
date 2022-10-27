import React, { useState, useEffect,useContext } from "react";
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
import {UseProdsContext} from "../../context/ProdsContext"
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
  const { coleccionName } = useParams();
  const {ColeccionAPI}=useContext(UseColeccionContext)
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { categorias, ProdAPI } = useContext(UseProdsContext);

  const [load,setLoad]=useState(false)
  const [load2, setLoad2] = useState(false);
  
  const [prods,setProds]=useState([])
  const [filtrosCategoria,setFiltrosCategoria]=useState([])

  const [totalPages,setTotalPages]=useState(0)

  const [coleccion,setColeccion]=useState([])

  const [putCategory,setPutCategory]=useState("")
  const [putFilters,setPutFilters]=useState([])
  const [putSort,setPutSort]=useState("")
  const [filtrosFin, setFiltrosFin] = useState("");

  const [pags,setPags]=useState(1)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    setProds([])
    setPags(1)

    let numCol=0

    if(coleccionName==="NuevosIngresos"){
        numCol=71
    }else if(coleccionName==="Recomendados"){
        numCol=73
    }else if(coleccionName==="MejoresVendedores"){
        numCol=73
    }

    const col=new FormData()
    col.append("idcoleccion",numCol)
    col.append("bypage",15)
    col.append("page",0)

    ColeccionAPI(
        col,
        "colecciones",
        "detail"
    ).then((res)=>{
      if(res.status==="success"){
        setColeccion(res.result)
        setProds(res.result.productos)
        setTotalPages(res.result.productos_total_paginas)
      }
  })
  }, [coleccionName]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPutSort("")
    setPutFilters([])
    setPags(1)
    if(putCategory!==""){
      let idCat=coleccion.productos_categorias.filter(e=>e.nombre===putCategory)
      idCat=idCat[0].idcategoria

      const catFilters = new FormData();
      catFilters.append('idcategoria', Number(idCat));

      ProdAPI(catFilters, 'categorias', 'get').then((res) => {
        if (res.status === 'success') {
          setFiltrosCategoria(res.result[0]);
        }
      });


      let numCol=0
      if(coleccionName==="NuevosIngresos"){
        numCol=71
      }else if(coleccionName==="Recomendados"){
          numCol=73
      }else if(coleccionName==="MejoresVendedores"){
          numCol=73
      }

      const col=new FormData()
      col.append("idcoleccion",numCol)
      col.append("idcategoria",idCat)
      col.append("bypage",15)
      col.append("page",0)
      // col.append("caracteristicas","12:764, 1:37")

      ColeccionAPI(
          col,
          "colecciones",
          "detail"
      ).then((res)=>{
        if(res.status==="success"){
          setProds(res.result.productos)
          setTotalPages(res.result.productos_total_paginas)
        }
      })
    }
  }, [putCategory]);// eslint-disable-line react-hooks/exhaustive-deps


  const buscarPage=(paramSearch,value)=>{
    setLoad(true)
    let numCol=0
    if(coleccionName==="NuevosIngresos"){
      numCol=71
    }else if(coleccionName==="Recomendados"){
        numCol=73
    }else if(coleccionName==="MejoresVendedores"){
        numCol=73
    }

    const catProd=new FormData()

    if(putCategory!==""){
      let idCat=coleccion.productos_categorias.filter(e=>e.nombre===putCategory)
      idCat=idCat[0].idcategoria
      catProd.append("idcategoria",Number(idCat))
    }

    catProd.append("idcoleccion",numCol)
    catProd.append("bypage",15)
    catProd.append("page",value)

    if(putSort==="Mas relevante primero"){
      catProd.append("order_type","desc")
      catProd.append("order","relevancia")
    }else if(putSort==="Menos relevante primero"){
      catProd.append("order_type","asc")
      catProd.append("order","relevancia")
    }else if(putSort==="Mayor precio primero"){
      catProd.append("order_type","desc")
      catProd.append("order","precio")
    }else if(putSort==="Menor precio primero"){
      catProd.append("order_type","asc")
      catProd.append("order","precio")
    }

    if(putFilters.length!==0){
      catProd.append("caracteristicas",filtrosFin)
    }

    ColeccionAPI(
      catProd,
      "colecciones",
      "detail"
    ).then((res)=>{
      if(res.status==="success"){
        setProds(res.result.productos)
      }
      setLoad(false)
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    })
  }

  const handleAplicarFiltros = () => {
    setPags(1)
    setLoad2(true)
    let array = [];
    for (let i = 0; i < putFilters.length; i++) {
      array.push(`${putFilters[i].idName}:${putFilters[i].id}`);
    }
    setFiltrosFin(array.toString());

    if (putFilters.length !== 0 || putSort !== '') {
        const prod=new FormData()

        let numCol=0
        if(coleccionName==="NuevosIngresos"){
          numCol=71
        }else if(coleccionName==="Recomendados"){
            numCol=73
        }else if(coleccionName==="MejoresVendedores"){
            numCol=73
        }

        if(putCategory!==""){
          let idCat=coleccion.productos_categorias.filter(e=>e.nombre===putCategory)
          idCat=idCat[0].idcategoria
          prod.append("idcategoria",Number(idCat))
        }

        prod.append("idcoleccion",numCol)

        prod.append("bypage",15)
        prod.append("page",0)

        if(putSort==="Mas relevante primero"){
          prod.append("order_type","desc")
          prod.append("order","relevancia")
        }else if(putSort==="Menos relevante primero"){
          prod.append("order_type","asc")
          prod.append("order","relevancia")
        }else if(putSort==="Mayor precio primero"){
          prod.append("order_type","desc")
          prod.append("order","precio")
        }else if(putSort==="Menor precio primero"){
          prod.append("order_type","asc")
          prod.append("order","precio")
        }

        if(putFilters.length!==0){
          prod.append("caracteristicas",array.toString())
        }

        ProdAPI(
          prod,
          "colecciones",
          "detail"
        ).then((res)=>{
          setLoad2(false)
          if (res.status === 'success') {
            setProds(res.result.productos);
            setTotalPages(res.result.productos_total_paginas);
          }
        })
    }
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
          spacing={8}
        >
          <Grid item xs={12} sm={12} md={3}>
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
                            <Stack direction='row' spacing={1}>
                              <ChipFilterCategories
                                filteredCategory={res}
                                key={index}
                                putFilters={putFilters}
                                setPutFilters={setPutFilters}
                                setProds={setProds}
                                ProdAPI={ProdAPI}
                                setTotalPages={setTotalPages}
                                categorias={categorias}
                              />
                            </Stack>
                          );
                        })}
                        <Filter 
                          setPutCategory={setPutCategory} 
                          putCategory={putCategory} 
                          filtros={filtrosCategoria} 
                          setPutFilters={setPutFilters} 
                          putFilters={putFilters} 
                          putSort={putSort} 
                          setPutSort={setPutSort} 
                          coleccion={coleccion}
                          handleAplicarFiltros={handleAplicarFiltros}
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
                    <Stack direction='row' spacing={1}>
                      <ChipFilterCategories
                        filteredCategory={res}
                        key={index}
                        putFilters={putFilters}
                        setPutFilters={setPutFilters}
                        setProds={setProds}
                        ProdAPI={ProdAPI}
                        setTotalPages={setTotalPages}
                        categorias={categorias}
                      />
                    </Stack>
                  );
                })}
                <Filter 
                  setPutCategory={setPutCategory} 
                  putCategory={putCategory} 
                  filtros={filtrosCategoria} 
                  setPutFilters={setPutFilters} 
                  putFilters={putFilters} 
                  putSort={putSort} 
                  setPutSort={setPutSort} 
                  coleccion={coleccion}
                  handleAplicarFiltros={handleAplicarFiltros}
                />
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            {load2 ? <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}><Loader spin={"spinnerG"}/></div>:
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
                        {product.imagenes.length !== 0 &&
                          <ProductCard
                          key={index}
                          imageCard={product.imagenes[0].imagen_vertical}
                          productName={product.nombre}
                          productPrice={product.precio}
                          idProducto={product.idproducto}
                          tag={product.tag}
                          datosTienda={product.tienda}
                          precioOferta={product.precio_oferta}
                          />
                        }
                      </>
                    );
                  })
                ) : 
                  <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}>
                    <Loader spin={"spinnerG"}/>
                  </div>
                }
              </Box>
            } 
            {prods.length!==0 && totalPages>1 && coleccionName && (
              <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >
                <Pagination cantidad={totalPages} buscarPage={buscarPage} pags={pags} setPags={setPags}/>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SearchProductsResults;
