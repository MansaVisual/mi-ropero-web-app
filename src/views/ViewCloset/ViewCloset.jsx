import React, { useState,useEffect,useContext } from "react";
import {
  Grid,
  Typography,
  Box,
  Rating,
  useMediaQuery,
  Modal,
  Fade,
  Backdrop,
  Container,
  Stack,
} from "@mui/material";
import Filter from "../../components/Filter/Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation, useParams } from "react-router-dom";
import ChipFilterCategories from "../../components/ChipFilterCategories/ChipFilterCategories";
import Pagination from "../../components/Pagination/Pagination";
import IconGroupText from "../../components/IconGroupText/IconGroupText";
import { FilterButton } from "../../components/ActionButton/ActionButton";
import theme from "../../styles/theme";
import { UseProdsContext } from "../../context/ProdsContext";
import Loader from "../../components/Loader/Loader";

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

const ViewCloset = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const {ProdAPI,categorias}=useContext(UseProdsContext)
  const [buscandoRoperos,setBuscandoRoperos]=useState(true)

  const {closetId, nombre}=useParams()

  const [tienda,setTienda]=useState([])

  const [totalPages,setTotalPages]=useState(0)
  const [pags,setPags]=useState(1)

  const [putFilters, setPutFilters] = useState([]);
  const [putSort, setPutSort] = useState('');
  const [rangoPrecio,setRangoPrecio]=useState({min:0,max:999999})
  const [filtrosCategoria,setFiltrosCategoria]=useState([])
  const [putCategory,setPutCategory]=useState("")
  const [coleccion,setColeccion]=useState([])
  const [filtrosFin, setFiltrosFin] = useState("");


  useEffect(() => {
    if(closetId!==undefined){
      const ropero = new FormData()
      ropero.append("idtienda",closetId)
      ropero.append("page",0)
      ropero.append("bypage",15)
      ProdAPI(
        ropero,
        "tiendas",
        "detail"
        ).then((res)=>{
          if(res.status==="success"){
            let arrayCol=[]
            for(const i in res.result.search_productos_categorias){
              for(const ii in res.result.search_productos_categorias[i].hijas){
                arrayCol.push(res.result.search_productos_categorias[i].hijas[ii])
              }
            }
            setColeccion({productos_categorias:arrayCol})
            setTienda(res.result)
            setTotalPages(res.result.search_productos_total_paginas)
          }
          setBuscandoRoperos(false)
        })
    }
  }, [closetId]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setBuscandoRoperos(true)
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    setPutSort("")
    setPutFilters([])
    setPags(1)
    if(putCategory!==""){
      let idCat=coleccion.productos_categorias.filter(e=>e.Nombre===putCategory)
      idCat=idCat[0].idcategoria

      const catFilters = new FormData();
      catFilters.append('idcategoria', Number(idCat));

      ProdAPI(catFilters, 'categorias', 'get').then((res) => {
        if (res.status === 'success') {
          setFiltrosCategoria(res.result[0]);
        }
      });

      const col=new FormData()
      col.append("idtienda",closetId)
      col.append("idcategoria",idCat)
      col.append("bypage",15)
      col.append("page",0)

      ProdAPI(
          col,
          "tiendas",
          "detail"
      ).then((res)=>{
        if(res.status==="success"){
          setTienda(res.result)
          setTotalPages(res.result.productos_total_paginas)
        }
        setBuscandoRoperos(false)
      })
    }
  }, [putCategory]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const buscarPage = (paramSearch, value) => {
    setBuscandoRoperos(true)
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const catProd = new FormData();
    let idCat = '';
    if(putSort==="Mas relevante primero"){
      catProd.append("order_type","desc")
      catProd.append("order","idproducto")
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

    if(rangoPrecio.min!==0 || rangoPrecio.max!==0){
      catProd.append("precio_desde",rangoPrecio.min)
      catProd.append("precio_hasta",rangoPrecio.max)
    }

    if(putCategory){
      idCat = categorias.find(
        (e) => e.nombre.toString().trim() === putCategory,
      );
      catProd.append('idcategoria', idCat.idcategoria);
    }

    catProd.append("idtienda",closetId)
    catProd.append('bypage', 15);
    
    catProd.append('page', value);

    ProdAPI(catProd, 'tiendas', 'detail').then((res) => {
      if (res.status === 'success') {
        setTienda(res.result);
      }
      setBuscandoRoperos(false)
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    });
  };

  const handleAplicarFiltros = () => {
    setBuscandoRoperos(true)
    setPags(1)
    let array = [];
    for (let i = 0; i < putFilters.length; i++) {
      array.push(`${putFilters[i].idName}:${putFilters[i].id}`);
    }
    setFiltrosFin(array.toString());

    if (putFilters.length !== 0 || putSort !== '' || rangoPrecio.min!==0 || rangoPrecio.max!==0) {
        const prod=new FormData()
        let idCat=[]

        if(rangoPrecio.min!==0 || rangoPrecio.max!==0){
          prod.append("precio_desde",rangoPrecio.min)
          prod.append("precio_hasta",rangoPrecio.max)
        }

        if(putCategory!==""){
          idCat = categorias.find(
            (e) => e.nombre.toString().trim() === putCategory,
          );
  
          prod.append('idcategoria', idCat.idcategoria);
        }

        prod.append("idtienda",closetId)
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
          "tiendas",
          "detail"
        ).then((res)=>{
          if (res.status === 'success') {
            setTienda(res.result);
            setTotalPages(res.result.search_productos_total_paginas);
          }
          setBuscandoRoperos(false)
        })
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2}
        sx={{ px: isMobile || isMobileBigScreen ? "16px" : "74px", py: "40px" }}
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
                  }}
                >
                  {nombre}
                </Typography>
                <Box sx={{ ml: "25px" }}>
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
                        
                          {/* <Typography
                            sx={{
                              fontSize: theme.typography.fontSize[2],
                              fontWeight: theme.typography.fontWeightRegular,
                              textDecoration: "underline",
                              mt: "12px",
                              mb: "16px",
                            }}
                          >
                            Limpiar filtros
                          </Typography> */}
                        </Box>
                        {putFilters.map((res, index) => {
                          return (
                            <Stack direction='row' spacing={1}>
                              <ChipFilterCategories
                                filteredCategory={res}
                                key={index}
                                putFilters={putFilters}
                                setPutFilters={setPutFilters}
                                setProds={setTienda}
                                ProdAPI={ProdAPI}
                                setTotalPages={setTotalPages}
                                categorias={categorias}
                                clase={"tiendas"}
                                metodo={"detail"}
                                putCategory={putCategory}
                                closetId={closetId}
                              />
                            </Stack>
                          );
                        })}
                        <Filter 
                          setPutCategory={setPutCategory} 
                          putCategory={putCategory} 
                          filtros={filtrosCategoria} 
                          setPutFilters={setPutFilters} 
                          coleccion={coleccion}
                          putFilters={putFilters} 
                          putSort={putSort} 
                          setPutSort={setPutSort}
                          handleAplicarFiltros={handleAplicarFiltros}
                          rangoPrecio={rangoPrecio}
                          setRangoPrecio={setRangoPrecio}
                        />
                      </Box>
                    </Fade>
                  </Modal>
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[4],
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.tertiary.main,
                    my: "24px",
                  }}
                >
                  La tienda aún no tiene calificaciones
                </Typography>
                <Box sx={{ mb: "36px" }}>
                  <Rating name="read-only" readOnly value={5} size="large" />
                </Box>
              </Box>
              <IconGroupText prod={undefined} prod2={tienda}/>
            </Box>
          ) : (
            <>
              <Box sx={{ mt: "16px" }}>
                <Breadcrumbs links={pathnames} />
              </Box>
              {/* <Typography
                sx={{
                  fontSize: theme.typography.fontSize[2],
                  fontWeight: theme.typography.fontWeightRegular,
                  textDecoration: "underline",
                  mt: "12px",
                  mb: "16px",
                }}
              >
                Limpiar todos los filtros
              </Typography> */}
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize[9],
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.primary.main,
                  mb: "16px",
                }}
              >
                {nombre}
              </Typography>
              <Rating name="read-only" readOnly value={5} size="large" />
              <IconGroupText prod={undefined} prod2={tienda}/>
              {putFilters.map((res, index) => {
                return (
                  <Stack direction='row' spacing={1}>
                    <ChipFilterCategories
                      filteredCategory={res}
                      key={index}
                      putFilters={putFilters}
                      setPutFilters={setPutFilters}
                      setTienda={setTienda}
                      ProdAPI={ProdAPI}
                      setTotalPages={setTotalPages}
                      categorias={categorias}
                      clase={"tiendas"}
                      metodo={"detail"}
                      putCategory={putCategory}
                      closetId={closetId}
                    />
                  </Stack>
                );
              })}
              <Filter 
                setPutCategory={setPutCategory} 
                putCategory={putCategory} 
                filtros={filtrosCategoria} 
                setPutFilters={setPutFilters} 
                coleccion={coleccion}
                putFilters={putFilters} 
                putSort={putSort} 
                setPutSort={setPutSort} 
                handleAplicarFiltros={handleAplicarFiltros}
                rangoPrecio={rangoPrecio}
                setRangoPrecio={setRangoPrecio}
              />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          {buscandoRoperos ? <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}><Loader spin={"spinnerG"}/></div> :
            <Grid
              container
              columns={{ xs: 1, sm: 2, md: 3 }}
              justifyContent="flex-start"
              spacing={5}
              sx={{
                ml: isMobile || isMobileBigScreen ? 0 : "30px",
              }}
            >
              {tienda.length!==0  && tienda.search_productos.map((item, index) => {return(
                <Grid item xs="auto" md="auto" key={index}>
                  <ProductCard
                    imageCard={item.imagenes[0].imagen_vertical}
                    productName={item.nombre}
                    idProducto={item.idproducto}
                    productPrice={item.precio}
                    precioOferta={item.precio_oferta}
                  />
                </Grid>
              )})}
            </Grid>
          }
          {!buscandoRoperos &&
            <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "40px",
            }}
            >
              <Pagination cantidad={totalPages} buscarPage={buscarPage} pags={pags} setPags={setPags}/>
            </Box>
          }
          </Grid>
      </Grid>
    </Container>
  );
};

export default ViewCloset;
