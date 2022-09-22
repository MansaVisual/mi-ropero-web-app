import React, {useState} from "react";
import { Box, Grid, IconButton, Link, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Chip from "../../components/Chip/Chip";
import SliderProd from "../../components/SliderProd/SliderProd";
import theme from "../../styles/theme";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ResumeBox from "../../components/ResumeBox/ResumeBox";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "../../styles/scss/styles.scss"

const products = [
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
      id: 3,
      title: "Remera negra 2022",
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
        id: 3,
        title: "Remera negra 2022",
        price: 3000,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
]

const Cart = () => {
    const navigate = useNavigate();

    const [descuento,setDescuento]=useState(true)
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

    return(
        <>
        <Box container mt={"56px"} ml={"74px"}>
            <Breadcrumbs links={pathnames} />
        </Box>
        <Grid
            container
            sx={{ px: isMobile || isMobileBigScreen ? "16px" : "74px", my: "24px"}}
        >
            <Grid item xs={12} sm={12} lg={9} sx={{paddingRight: isDesktop && "32px"}}>
                <h2 className="carritoTitulo">Carrito de  compras</h2>
                {products.map((prod,i)=>{
                    return(
                        <div className="contenedorCarritoResumen">
                            <div className="fotoTitle">
                                <div className="fotoProd" style={{backgroundImage:`url(${prod.image})`}}/>
                                <div className="titleDescription">
                                    <h3>{prod.title}</h3>
                                    <p>{prod.description}</p>
                                </div>
                            </div>
                            <div className="preciosDelete">
                                {descuento ? <p style={{textDecoration:"line-through"}} className="precioDesc">$ 15.000</p> : <div style={{width:"52px"}}></div>}
                                <p className="precioProd">$ {prod.price}</p>
                                <IconButton
                                    aria-label="delete"
                                    sx={{
                                        fontSize: isDesktop ? "2.3vw" : "35px"
                                    }}
                                >
                                    <DeleteIcon color="secondary"/>
                                </IconButton>
                            </div>
                        </div>
                    )
                })}
                <p className="carritoVolver" onClick={()=>navigate("/")}>
                    <ArrowBackIosNewIcon sx={{fontSize:"10px"}}/>
                    VOLVER
                </p>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={3}
                sx={{
                    margin:"auto",
                    boxShadow:"-10px -10px 30px rgba(223, 229, 239, 0.25), 10px 10px 30px rgba(223, 229, 239, 0.25);",
                    borderRadius:"10px 10px 20px 20px;",
                    backgroundColor:"#FDFEFF",
                    height:"100%",
                }}
            >
                <ResumeBox/>
            </Grid>

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
        </>
    )
}

export default Cart