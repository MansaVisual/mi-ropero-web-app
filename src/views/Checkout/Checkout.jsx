import { Button, Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system"
import React,{useState,useEffect,useContext} from "react"
import { useLocation,useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import "../../styles/scss/styles.scss"
import theme from "../../styles/theme";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ResumeBox from "../../components/ResumeBox/ResumeBox";
import NavBarForm from "../../components/NavBarForm/NavBarForm";
import InfoContact from "../../components/FormCheckout/InfoContact";
import MetodoEnvio from "../../components/FormCheckout/MetodoEnvio";
import Tarjeta from "../../components/FormCheckout/Tarjeta";
import CheckForm from "../../components/FormCheckout/Check";
import { UseLoginContext } from "../../context/LoginContext";
import { UseCartContext } from "../../context/CartContext";
import ReactGA from "react-ga4";

const Checkout = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)
    const {userLog}=useContext(UseLoginContext)
    const {carrito,buscandoCart}=useContext(UseCartContext)

    const [typeNav,setTypeNav]=useState("info")
    const [form,setForm]=useState([])

    const [sucursalEntrega,setSucursalEntrega]=useState("")
    const [sucursales,setSucursales]=useState([])
    const [provincias,setProvincias]=useState([])
    const [direccion,setDireccion]=useState({})
    const [saveDirecc,setSaveDirecc]=useState(true)
    const [usaDireccionCargada,setUsaDireccionCargada]=useState(false)

    // METODO MOTO = 1
    // METODO OCA=>DOM = 345837
    // METODO OCA=>OCA = 345838
    const [metodoEnvio,setMetodoEnvio]=useState("")
    const [codDesc,setCodDesc]=useState("")

    const [estadoCompra,setEstadoCompra]=useState("")

    const [num,setNum]=useState(1)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [typeNav]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
        if(num===1){
            setNum(2)
        }
    }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(!buscandoCart && carrito.length===0){
            navigate("/")
        }
    }, [carrito,buscandoCart]);// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(()=>{
        if(num!==1){
            if(userLog===""){
                navigate("/login")
            }else{
                let query = new URLSearchParams(window.location.search)
                const idCompra = JSON.parse(localStorage.getItem("idCompraAnalytics"))
                if(query.get("status")==="success"){
                    setEstadoCompra("success")
                    ReactGA.event("purchase", {
                        user:userLog,
                        transaction_id:idCompra
                    });
                    setTypeNav("check")
                }else if(query.get("status")==="pending"){
                    setEstadoCompra("pending")
                    ReactGA.event("purchase", {
                        user:userLog,
                        transaction_id:idCompra
                    });
                    setTypeNav("check")
                }else if(query.get("status")==="failure"){
                    setEstadoCompra("error")
                    setTypeNav("check")
                }
                reactAnalytics()
            }
        }
      },[num])// eslint-disable-line react-hooks/exhaustive-deps

    
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

    const reactAnalytics=async()=>{
        await ReactGA.event("begin_checkout", {
            user:userLog
        });
    }

    const onNextForm=(type)=>{
        setTypeNav(type)
    }
    
    const clickVolver = async(type)=>{
        if(type==="carrito"){
            navigate("/carrito")
        }else{
            setTypeNav(type)
        }
    }


    return(
        <>
            <Box container className="Breadcrumbs">
                <Breadcrumbs links={pathnames} />
            </Box>
            <Grid
                container
                className="gridContainer"
                style={{justifyContent: "center"}}
            >

                <Grid item xs={12} sm={12} lg={typeNav==="envio" ? 8 : 9} 
                    sx={{
                        paddingRight: isDesktop ? "32px" : "0px",
                    }}
                    className="problemaMaxWidthCheckout"
                >
                    <NavBarForm typeNav={typeNav} onNextForm={onNextForm} />




                    {typeNav === "info" ? <InfoContact
                        setTypeNav={setTypeNav}
                        form={form}
                        setForm={setForm}
                        setSucursales={setSucursales}
                        saveDirecc={saveDirecc}
                        setSaveDirecc={setSaveDirecc}
                        direccion={direccion}
                        setDireccion={setDireccion}
                        provincias={provincias}
                        setProvincias={setProvincias}
                        usaDireccionCargada={usaDireccionCargada}
                        setUsaDireccionCargada={setUsaDireccionCargada}
                        /> : null}

                    {typeNav === "envio" ? <MetodoEnvio 
                        setTypeNav={setTypeNav} 
                        sucursalEntrega={sucursalEntrega} 
                        setSucursalEntrega={setSucursalEntrega} 
                        sucursales={sucursales}
                        form={form}
                        metodoEnvio={metodoEnvio}
                        setMetodoEnvio={setMetodoEnvio}
                        direccion={direccion}
                    /> : null}

                    {typeNav === "tarjeta" ? <Tarjeta
                        setTypeNav={setTypeNav}
                        type
                        codDesc={codDesc}
                        setCodDesc={setCodDesc}
                        form={form}
                        direccion={direccion}
                        setMetodoEnvio={setMetodoEnvio}
                        metodoEnvio={metodoEnvio}
                        sucursalEntrega={sucursalEntrega}
                        sucursales={sucursales}
                        saveDirecc={saveDirecc}
                    /> : null}

                    {typeNav === "check" ? <CheckForm 
                        setTypeNav={setTypeNav}
                        saveDirecc={saveDirecc}
                        direccion={direccion}
                        form={form}
                        estadoCompra={estadoCompra}
                    /> : null}





                    {typeNav !== "tarjeta" && typeNav !== "check" &&
                    <p className="carritoVolver" 
                        onClick={typeNav==="info" ? ()=>clickVolver("carrito")
                        : typeNav==="envio" ? ()=>{clickVolver("info");setDireccion({})}
                        : typeNav==="tarjeta" ? ()=>clickVolver("envio")
                        : typeNav==="check" ? ()=>clickVolver("tarjeta") : null
                    }
                    >
                        <ArrowBackIosNewIcon sx={{fontSize:"10px"}}/>
                        VOLVER
                    </p>
                    }
                </Grid>
                
                <Grid item xs={typeNav !== "check" ? 10 : 12} sm={6} md={6} lg={3}
                    sx={{
                        margin: typeNav === "envio" ? "0px 0px 0px 70px" : "0px",
                        boxShadow:"-10px -10px 30px rgba(223, 229, 239, 0.25), 10px 10px 30px rgba(223, 229, 239, 0.25);",
                        borderRadius:"10px 10px 20px 20px;",
                        backgroundColor:"#FDFEFF",
                        height:"100%",
                    }}
                    className="maxWidthResumeBox"
                >
                    {
                    typeNav !== "check" ?
                        <ResumeBox
                            stateForm={typeNav==="tarjeta"?false:true}
                            botonPago={false}
                            codDesc={codDesc}
                            setCodDesc={setCodDesc}
                            form={form}
                            metodoEnvio={metodoEnvio}
                        />
                    :   
                        <div className="fotoBannerCheck screen1000-bannerCheck"/>
                    }
                </Grid>
                
                {typeNav==="tarjeta" && !isDesktop &&
                    <Grid xs={12}>
                        <div className="botones">
                            <Button className="botonVolver" onClick={()=>setTypeNav("envio")}>
                                VOLVER
                            </Button>
                            <Button className="botonPagar" onClick={()=>setTypeNav("check")}>
                                IR A PAGAR
                            </Button>
                            <p className="botonVolverMobile" onClick={()=>setTypeNav("envio")}>VOLVER</p>
                        </div>
                        <p className="terminos">Al oprimir IR A PAGAR se aceptan los <span className="terminosLink">t??rminos y condiciones</span> de Mi Ropero</p>
                    </Grid>
                }

            </Grid>
        </>
    )
}

export default Checkout