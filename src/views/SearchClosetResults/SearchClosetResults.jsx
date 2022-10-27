import React,{useEffect,useContext,useState} from "react";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import theme from "../../styles/theme";
import ClosetCard from "../../components/ClosetCard/ClosetCard";
import ClosetImagesCard from "../../components/ClosetImagesCard/ClosetImagesCard";
import Onboarding from "../../components/Onboarding/Onboarding";
import { UseProdsContext } from "../../context/ProdsContext";
import { StyledLink } from "../../components/Footer/styles";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";

const SearchClosetResults = () => {
  const { keyword } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const navigate=useNavigate()

  const {ProdAPI}=useContext(UseProdsContext)

  const [roperos,setRoperos]=useState([])
  const [buscandoRoperos,setBuscandoRoperos]=useState(true)

  const [totalPages,setTotalPages]=useState(0)
  const [totalProds,setTotalProds]=useState(0)

  const [bestRoperos,setBestRoperos]=useState([])

  const [pags,setPags]=useState(1)


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  useEffect(()=>{
    const bestR=new FormData()
    bestR.append("bypage",3)
    bestR.append("order_type","desc")
    ProdAPI(
      bestR,
      "tiendas",
      "featured"
    ).then((res)=>{if(res.status==="success"){setBestRoperos(res.result)}})

    const busqueda=new FormData()
    busqueda.append("page",0)
    busqueda.append("bypage",10)

    if(keyword!==undefined){
      busqueda.append("text",keyword)
    }
    ProdAPI(
      busqueda,
      "tiendas",
      "search"
    ).then((res)=>{
      if(res.status==="success"){
        setTotalProds(res.result.total)
        setRoperos(res.result.tiendas)
        setTotalPages(res.result.total_paginas)
      }
      setBuscandoRoperos(false)
    })
  },[keyword])// eslint-disable-line react-hooks/exhaustive-deps

  const buscarPage=(paramSearch,value)=>{

    const newPage=new FormData()
    if(keyword!==undefined){
      newPage.append("text",keyword)
    }

    newPage.append("bypage",10)
    newPage.append("page",value)

    ProdAPI(
      newPage,
      "tiendas",
      "search"
    ).then((res)=>{
      if(res.status==="success"){
        setRoperos(res.result.tiendas)
      }
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
            mb:"100px"
          }}
          spacing={5}
        >
          <Grid item xs={12} sm={12} md={3}>
            {isMobile || isMobileBigScreen ? (
              <Box sx={{ mt: "16px" }}>
                <Breadcrumbs links={pathnames} />
                {bestRoperos!==undefined && bestRoperos.length!==0 &&
                  <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[9],
                    fontWeight: theme.typography.fontWeightBold,
                    mb: "20px",
                    color: theme.palette.secondary.main,
                  }}
                  >
                    Top Roperos 🔥
                  </Typography>
                }
              </Box>
            ) : (
              <>
                <Box sx={{ mb: "24px" }}>
                  <Breadcrumbs links={pathnames} />
                </Box>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[5],
                    fontWeight: theme.typography.fontWeightRegular,
                    color: theme.palette.tertiary.main,
                  }}
                >
                  Busqueda de Roperos:
                </Typography>
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
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[4],
                    fontWeight: 400,
                    color: theme.palette.tertiary.main,
                    marginBottom: "30px",
                    marginTop: "16px",
                  }}
                >
                  Resultado: {totalProds!==undefined && totalProds} {totalProds!==undefined && totalProds===1?"ropero":"roperos"}
                </Typography>
                {bestRoperos!==undefined && bestRoperos.length!==0 &&
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[9],
                      fontWeight: theme.typography.fontWeightBold,
                      mb: "20px",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    Top Roperos 🔥
                  </Typography>
                }
                {bestRoperos!==undefined && bestRoperos.length!==0 && bestRoperos.map((option,i)=>{
                  return(
                    <>
                      {i<3 &&
                        <ClosetCard ropero={option}/>
                      }
                    </>
                  )
                })
                }
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            {!buscandoRoperos && roperos!==undefined && roperos.length===0 ?
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
                    onClick={()=>navigate("/")}
                  >
                    Ir al Inicio
                  </Typography>
                </StyledLink>
              </Box>
            : buscandoRoperos && <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}><Loader spin={"spinnerG"}/></div>}
            {roperos!==undefined && roperos.length!==0 &&
              <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
              }}
              >
                {roperos.map((ropero, index) => {return(
                  <ClosetImagesCard
                  key={index}
                  ropero={ropero}
                  keyword={keyword}
                  />
                  )})
                }
              </Box>
            }
            {roperos!==undefined && roperos.length!==0 && totalPages>1 && (
                <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop:"32px"
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

export default SearchClosetResults;
