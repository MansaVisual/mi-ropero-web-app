import { Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system"
import React,{useState} from "react"
import { useLocation,useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import "../../styles/scss/styles.scss"
import theme from "../../styles/theme";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ResumeBox from "../../components/ResumeBox/ResumeBox";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const Checkout = ()=>{

    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)
    
    const [typeNav,setTypeNav]=useState("info")

    // const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
    // const isTablet = useMediaQuery(theme.breakpoints.up("md"));

    const onNextForm=()=>{
        
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
                    <div className="navForm">
                        <div style={{textAlign:"center"}} onClick={()=>onNextForm("info")}>
                            <InfoOutlinedIcon
                                className={`${typeNav==="info" ? "navEnabled" : "barraInferiorDisabled"}`}
                                sx={{fontSize:"32px"}}
                            />
                            <div className={`${typeNav==="info" ? "barraInferior" : "navDisabled"}`}></div>
                        </div>
                        <div style={{textAlign:"center"}} onClick={()=>onNextForm("envio")}>
                            <SystemUpdateAltOutlinedIcon 
                                className={`${typeNav==="envio" ? "navEnabled" : "navDisabled"}`} 
                                sx={{fontSize:"32px"}}
                            />
                            <div className={`${typeNav==="envio" ? "barraInferior" : "navDisabled"}`}></div>
                        </div>
                        <div style={{textAlign:"center"}} onClick={()=>onNextForm("tarjeta")}>
                            <CreditCardOutlinedIcon 
                                className={`${typeNav==="tarjeta" ? "navEnabled" : "navDisabled"}`} 
                                sx={{fontSize:"32px"}}
                            />
                            <div className={`${typeNav==="tarjeta" ? "barraInferior" : "navDisabled"}`}></div>
                        </div>
                        <div style={{textAlign:"center"}} onClick={()=>onNextForm("check")}>
                            <CheckCircleOutlineOutlinedIcon 
                                className={`${typeNav==="check" ? "navEnabled" : "navDisabled"}`} 
                                sx={{fontSize:"32px"}}
                            />
                            <div className={`${typeNav==="check" ? "barraInferior" : "navDisabled"}`}></div>
                        </div>
                    </div>

                    <h2 className="carritoTitulo">Carrito de  compras</h2>
                    <p className="carritoVolver" onClick={()=>navigate("/carrito")}>
                        <ArrowBackIosNewIcon sx={{fontSize:"10px"}}/>
                        VOLVER
                    </p>
                </Grid>
                
                <Grid item md={6} lg={3}
                sx={{
                    margin: "0px auto",
                    boxShadow:"-10px -10px 30px rgba(223, 229, 239, 0.25), 10px 10px 30px rgba(223, 229, 239, 0.25);",
                    borderRadius:"10px 10px 20px 20px;",
                    backgroundColor:"#FDFEFF",
                    height:"100%",
                }}
                >
                    <ResumeBox stateForm={true}/>
                </Grid>
            </Grid>
        </>
    )
}

export default Checkout