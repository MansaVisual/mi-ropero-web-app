import React, {useState,useContext} from "react";
import { Box, Button, Grid, IconButton, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ResumeBox from "../../components/ResumeBox/ResumeBox";
import basura from "../../assets/img/basura.png"
import cart from "../../assets/img/cartVacio.png"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "../../styles/scss/styles.scss"
import ProdsRelation from "../../components/ProdsRelation/ProdsRelation";
import { UseCartContext } from "../../context/CartContext";
import cruz from "../../assets/img/cruz.png";
import Loader from "../../components/Loader/Loader";

const Cart = () => {
    const navigate = useNavigate();

    const {CartAPI,carrito,buscandoCart}=useContext(UseCartContext)

    const [eliminar,setEliminar]=useState(false)
    const [prodEliminar,setProdEliminar]=useState(null)

    
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)
    const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

    
    const handleEliminar = (prod)=>{
        setProdEliminar(prod)
        setEliminar(true)
    }

    const handleEliminarFinal = async()=>{
        const eliminar = new FormData()
        eliminar.append('telefono', prodEliminar)
        await CartAPI(
            eliminar,
            "carritos",
            "delete"
        ).then((res)=>{
            if(res.status==="success"){
                setEliminar(false)
            }else{
                alert("Ocurrio un error")
            }
        })
    }

    return(
        <>
            <Box container className="Breadcrumbs">
                <Breadcrumbs links={pathnames} />
            </Box>
            <Grid
                container
                className="gridContainer"
            >
                <Grid item xs={12} sm={12} lg={carrito.length!== 0 ? 9 : 12} 
                    sx={{
                        paddingRight: isDesktop ? "32px" : "0px"
                    }}>
                    <h2 className="TituloCartCheck">Carrito de  compras</h2>
                    {carrito.length !== 0 ?
                        <>
                            {carrito.map((prod,i)=>{
                                return(
                                    <div className="contenedorCarritoResumen">
                                        <div className="fotoTitle">
                                            <div className="fotoProd" style={{backgroundImage:`url(${prod.producto_imagen})`}}/>
                                            <div className="titleDescription">
                                                <h3>{prod.producto_nombre}</h3>
                                                <p className="description">
                                                    {prod.description}
                                                </p>
                                                <div className="preciosDeleteMobile">
                                                    {prod.producto.precio_oferta !== "0.00" ? <p style={{textDecoration:"line-through"}} className="precioDesc">$ 15.000</p> : <div style={{width:"52px"}}></div>}
                                                    <p className="precioProd">$ {prod.producto.precio}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preciosDelete">
                                            {prod.producto.precio_oferta !== "0.00" ? <p style={{textDecoration:"line-through"}} className="precioDesc">$ 15.000</p> : <div style={{width:"52px"}}></div>}
                                            <p className="precioProd">$ {prod.producto.precio}</p>
                                        </div>
                                        <IconButton
                                                aria-label="delete"
                                                className="botonBorrar"
                                                sx={{
                                                    fontSize: isDesktop ? "2.3vw" : isMobileBigScreen ? "30px" : "35px"
                                                }}
                                                onClick={()=>handleEliminar(prod.producto_id)}
                                                >
                                                <img src={basura} alt="BORRAR"/>
                                        </IconButton>
                                    </div>
                                )
                            })}
                        </>
                        :
                            <>
                                {buscandoCart ? <Loader spin={"spinnerG"}/> :
                                    <div className="cartVacio">
                                        <img src={cart} alt="CART"
                                            style={{
                                                fontSize: "65px",
                                                marginTop: "12px"
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
                            </>
                    }
                    <p className="carritoVolver" onClick={()=>navigate("/")}>
                        <ArrowBackIosNewIcon sx={{fontSize:"10px"}}/>
                        VOLVER
                    </p>
                </Grid>
                
                {carrito.length !== 0 && 
                    <Grid item md={6} lg={3}
                    sx={{
                        margin: "0px auto",
                        boxShadow:"-10px -10px 30px rgba(223, 229, 239, 0.25), 10px 10px 30px rgba(223, 229, 239, 0.25);",
                        borderRadius:"10px 10px 20px 20px;",
                        backgroundColor:"#FDFEFF",
                        height:"100%",
                    }}
                    >
                        <ResumeBox stateForm={true} botonPago={true}/>
                    </Grid>
                }

                <ProdsRelation/>
                
            </Grid>
            {eliminar &&
                <div className="cartElimianrPopUp">
                    <div className="fondoPopUp" onClick={()=>setEliminar(false)}></div>
                    <div className="popUp">
                        <img src={basura} alt="BORRAR" style={{marginTop:"28px"}} className="basuraLogo"/>
                        <p>¿Seguro que quieres eliminar este producto de tu carrito?</p>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",marginBottom:"24px"}}>
                            <Button className="cancelar" onClick={()=>setEliminar(false)}>CANCELAR</Button>
                            <Button className="eliminar" onClick={()=>handleEliminarFinal()}>ELIMINAR</Button>
                        </div>
                        <img src={cruz} alt="CRUZ" className="cruz" onClick={()=>setEliminar(false)}/>
                    </div>
                </div>
            }
        </>
    )
}

export default Cart