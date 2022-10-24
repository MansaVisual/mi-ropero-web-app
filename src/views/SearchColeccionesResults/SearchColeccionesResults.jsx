import React, { useState, useEffect,useContext } from "react";
import {
  Backdrop,
  Box,
  Container,
  Fade,
  Grid,
  Link,
  Modal,
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
import Loader from "../../components/Loader/Loader";
import { UseColeccionContext } from "../../context/ColeccionesContext";
import banner from "../../assets/img/bannermvp4.png"

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
  const [load,setLoad]=useState(false)
  
  const [prods,setProds]=useState([])
  const [buscandoProds,setBuscandoProds]=useState(true)
  const [filtrosCategoria,setFiltrosCategoria]=useState([])

  const [totalPages,setTotalPages]=useState(0)

  const [coleccion,setColeccion]=useState([])
  const [prodsColeccion,setProdsColeccion]=useState([])

  const [putCategory,setPutCategory]=useState("")
  const [putFilters,setPutFilters]=useState([])
  const [putSort,setPutSort]=useState("")

    // colleciones all
    // destacadas banner pirncipal id=66
    // primerscroll nuevosingresos id=71
    // segundoscroll recomendados id=73
    // segundoscroll recomendados 

  useEffect(() => {
    // filter products by keyword entered in search bar
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    setProds([])

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
    col.append("page",1)

    ColeccionAPI(
        col,
        "colecciones",
        "detail"
    ).then((res)=>{
      if(res.status==="success"){console.log(res)
        setColeccion(res.result)
        setProds(res.result.productos)
        setTotalPages(res.result.productos_total_paginas)
      }
  })
  }, [coleccionName]);// eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    if(putCategory!==""){
      let numCol=0
      if(coleccionName==="NuevosIngresos"){
        numCol=71
      }else if(coleccionName==="Recomendados"){
          numCol="73"
      }else if(coleccionName==="MejoresVendedores"){
          numCol="73"
      }

      
      let idCat=coleccion.productos_categorias.filter(e=>e.nombre===putCategory)
      idCat=idCat[0].idcategoria

      const col=new FormData()
      col.append("idcoleccion",numCol)
      col.append("idcategoria",idCat)
      col.append("bypage",15)
      col.append("page",1)
      // col.append("caracteristicas","12:764, 1:37")

      ColeccionAPI(
          col,
          "colecciones",
          "detail"
      ).then((res)=>{
        if(res.status==="success"){console.log(res.result)
          setProds(res.result.productos)
          setFiltrosCategoria(res.result)
          setTotalPages(res.result.productos_total_paginas)
        }
      })
    }
  }, [putCategory]);// eslint-disable-line react-hooks/exhaustive-deps


  const buscarPage=(value)=>{
    setLoad(true)
    const catProd=new FormData()

    let idCat=coleccion.productos_categorias.filter(e=>e.nombre===putCategory)
    idCat=idCat[0].idcategoria

    catProd.append("idcategoria",idCat.idcategoria)
    catProd.append("bypage",15)
    catProd.append("page",value)

    ColeccionAPI(
      catProd,
      "productos",
      "search"
    ).then((res)=>{
      setBuscandoProds(false)
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
                        <Filter filtros={filtrosCategoria}/>
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
                {putFilters.map((res,i)=>{
                  return(
                    <>

                    </>
                  )
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
                />
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
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
                    <ProductCard
                      key={index}
                      imageCard={product.imagenes[0].imagen_vertical}
                      productName={product.nombre}
                      productPrice={product.precio}
                      idProducto={product.idproducto}
                      tag={product.tag}
                      datosTienda={product.tienda}
                      tiendaID={product.idtienda}
                      precioOferta={product.precio_oferta}
                      />
                  );
                })
              ) : 
                <>
                  {buscandoProds?<Loader spin={"spinnerG"}/>:null}
                </>
              }
            </Box>
            {load && <div style={{width:"100%",display:"flex",justifyContent:"center",marginBottom:"16px"}}><Loader spin={"spinnerM"}/></div>}
            {prods.length!==0 && totalPages>1 && coleccionName && (
              <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >
                <Pagination cantidad={totalPages} buscarPage={buscarPage}/>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ mt: "40px", textAlign: "center" }}>
              <Chip primary>Productos relacionados</Chip>
            </Box>
            <Box sx={{ mt: "24px", mb: "28px" }}>
              <SliderProd contenido={[]}/>
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
