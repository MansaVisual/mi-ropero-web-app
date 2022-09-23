import React, {useState} from "react";
import { Box, Button, Grid, IconButton, Link, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Chip from "../../components/Chip/Chip";
import SliderProd from "../../components/SliderProd/SliderProd";
import theme from "../../styles/theme";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ResumeBox from "../../components/ResumeBox/ResumeBox";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import "../../styles/scss/styles.scss"

const products = [
    {
      id: 1,
      title: "Buzo campera Fila aeroflat microfibra sie nuevo modelo 2022. Perfecto estado.",
      description:"El ropero de Romialaniz",
      price: 280000,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      id: 2,
      description:"El ropero de Romialaniz",
      title: "Pantalon nuevo 2022",
      price: 1200,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      id: 3,
      description:"El ropero de Romialaniz",
      title: "Remera negra 2022 de algodon y algunas tiras rojas y blancas a los costados y frente de las manguitas cortas",
      price: 3000,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
        id: 1,
        title: "Buzo campera Fila aeroflat microfibra nuevo modelo 2022. Perfecto estado.",
        description:"El ropero de Romialaniz",
        price: 280000,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
      {
        id: 2,
        description:"El ropero de Romialaniz",
        title: "Pantalon nuevo 2022",
        price: 1200,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
      {
        description:"El ropero de Romialaniz",
        id: 3,
        title: "Remera negra 2022",
        price: 3000,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
]

const Cart = () => {
    const navigate = useNavigate();

    const [eliminar,setEliminar]=useState(false)

    let descuento = true

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)
    const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
    const isTablet = useMediaQuery(theme.breakpoints.up("md"));

    const handleEliminar = (prod)=>{
        setEliminar(true)
    }

    return(
        <>
            <Box container className="cartBreadcrumbs">
                <Breadcrumbs links={pathnames} />
            </Box>
            <Grid
                container
                className="gridContainer"
            >
                <Grid item xs={12} sm={12} lg={products.length!== 0 ? 9 : 12} 
                    sx={{
                        paddingRight: isDesktop ? "32px" : "0px"
                    }}>
                    <h2 className="carritoTitulo">Carrito de  compras</h2>
                    {products.length !== 0 ?
                        <>
                            {products.map((prod,i)=>{
                                const newTitle = isDesktop ? prod.title.slice(0,70) : isMobileBigScreen ? prod.title.slice(0,50) : isTablet ? prod.title.slice(0,50) : prod.title.slice(0,90)
                                return(
                                    <div className="contenedorCarritoResumen">
                                        <div className="fotoTitle">
                                            <div className="fotoProd" style={{backgroundImage:`url(${prod.image})`}}/>
                                            <div className="titleDescription">
                                                <h3>
                                                    {newTitle}
                                                    {prod.title.length > 70 && isDesktop && !isTablet && "..."}
                                                    {prod.title.length > 50 && isTablet && "..."}
                                                    {prod.title.length > 90 && !isTablet && !isMobileBigScreen && "..."}
                                                    {prod.title.length > 50 && isMobileBigScreen && "..."}
                                                </h3>
                                                <p className="description">
                                                    {prod.description}
                                                </p>
                                                <div className="preciosDeleteMobile">
                                                    {descuento ? <p style={{textDecoration:"line-through"}} className="precioDesc">$ 15.000</p> : <div style={{width:"52px"}}></div>}
                                                    <p className="precioProd">$ {prod.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preciosDelete">
                                            {descuento ? <p style={{textDecoration:"line-through"}} className="precioDesc">$ 15.000</p> : <div style={{width:"52px"}}></div>}
                                            <p className="precioProd">$ {prod.price}</p>
                                        </div>
                                        <IconButton
                                                aria-label="delete"
                                                className="botonBorrar"
                                                sx={{
                                                    fontSize: isDesktop ? "2.3vw" : isMobileBigScreen ? "30px" : "35px"
                                                }}
                                                onClick={()=>handleEliminar(prod)}
                                                >
                                                <DeleteIcon color="secondary"/>
                                        </IconButton>
                                    </div>
                                )
                            })}
                        </>
                        :
                        <div className="cartVacio">
                            <ProductionQuantityLimitsIcon color="secondary"
                                sx={{
                                    fontSize: "65px",
                                    mt: "12px"
                                }}
                            />
                            <p>Tu carrito esta vacío</p>
                            <div className="seguirComprando">
                                <Button onClick={()=>navigate("/")}>
                                    SEGUIR COMPRANDO
                                </Button>
                            </div>
                        </div>
                    }
                    <p className="carritoVolver" onClick={()=>navigate("/")}>
                        <ArrowBackIosNewIcon sx={{fontSize:"10px"}}/>
                        VOLVER
                    </p>
                </Grid>
                
                {products.length !== 0 && 
                    <Grid item md={6} lg={3}
                    sx={{
                        margin: "0px auto",
                        boxShadow:"-10px -10px 30px rgba(223, 229, 239, 0.25), 10px 10px 30px rgba(223, 229, 239, 0.25);",
                        borderRadius:"10px 10px 20px 20px;",
                        backgroundColor:"#FDFEFF",
                        height:"100%",
                    }}
                    >
                        <ResumeBox/>
                    </Grid>
                }

                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ mt: "40px", textAlign: "center" }}>
                        <Chip primary>Productos relacionados</Chip>
                    </Box>
                    <Box sx={{ mt: "24px", mb: "28px" }}>
                        <SliderProd />
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
            {eliminar &&
                <div className="cartElimianrPopUp">
                    <div className="fondoPopUp" onClick={()=>setEliminar(false)}></div>
                    <div className="popUp">
                        <DeleteIcon color="secondary" sx={{fontSize:"32px",mt:"28px"}}/>
                        <p>¿Seguro que quieres eliminar este producto de tu carrito?</p>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",marginBottom:"24px"}}>
                            <Button className="cancelar" onClick={()=>setEliminar(false)}>CANCELAR</Button>
                            <Button className="eliminar">ELIMINAR</Button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Cart