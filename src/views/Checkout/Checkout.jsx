import { Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system"
import React,{useState,useEffect} from "react"
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

const Checkout = ()=>{

    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)
    
    const [typeNav,setTypeNav]=useState("info")
    const [form,setForm]=useState([])
    const [check,setCheck]=useState("")
    const [sucursalEntrega,setSucursalEntrega]=useState("")


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [typeNav]);

    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

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
            >

                <Grid item xs={12} sm={12} lg={9} 
                    sx={{
                        paddingRight: isDesktop ? "32px" : "0px"
                    }}
                >
                    <NavBarForm typeNav={typeNav} onNextForm={onNextForm} />

                    {typeNav === "info" ? <InfoContact setTypeNav={setTypeNav} form={form} setForm={setForm}/> : null}
                    {typeNav === "envio" ? <MetodoEnvio 
                        setTypeNav={setTypeNav} 
                        sucursalEntrega={sucursalEntrega} 
                        setSucursalEntrega={setSucursalEntrega} 
                        check={check} 
                        setCheck={setCheck}
                    /> : null}
                    {typeNav === "tarjeta" ? <Tarjeta setTypeNav={setTypeNav}/> : null}
                    {typeNav === "check" ? <CheckForm setTypeNav={setTypeNav}/> : null}

                    {typeNav !== "tarjeta" && typeNav !== "check" &&
                    <p className="carritoVolver" 
                        onClick={typeNav==="info" ? ()=>clickVolver("carrito")
                        : typeNav==="envio" ? ()=>clickVolver("info")
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
                    margin: "0px auto",
                    boxShadow:"-10px -10px 30px rgba(223, 229, 239, 0.25), 10px 10px 30px rgba(223, 229, 239, 0.25);",
                    borderRadius:"10px 10px 20px 20px;",
                    backgroundColor:"#FDFEFF",
                    height:"100%",
                }}
                >
                    {typeNav !== "check" ?
                        <ResumeBox stateForm={true}/>
                    :   
                        <div className="fotoBannerCheck screen1000-bannerCheck"/>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Checkout