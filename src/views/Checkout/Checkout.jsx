import { Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system"
import React,{useState} from "react"
import { useLocation,useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import "../../styles/scss/styles.scss"
import theme from "../../styles/theme";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ResumeBox from "../../components/ResumeBox/ResumeBox";
import NavBarForm from "../../components/NavBarForm/NavBarForm";

const Checkout = ()=>{

    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)
    
    const [typeNav,setTypeNav]=useState("info")

    // const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
    // const isTablet = useMediaQuery(theme.breakpoints.up("md"));

    const onNextForm=(type)=>{
        setTypeNav(type)
    }
    console.log(typeNav)

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

                    <h2 className="TituloCartCheck">Datos de contacto</h2>

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