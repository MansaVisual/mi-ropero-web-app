import React from "react"
import banner from "../../assets/img/bannermvp4.png"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import BoxLogin from "../../components/BoxLogin/BoxLogin"
import { useLocation } from "react-router-dom";
import logoRopero from "../../assets/img/logoLogin.png"
import { Grid } from "@mui/material";

const Login = ()=>{

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)

    return(
        <>
            <Grid>
                <div className="bannerLogin">
                    <img src={banner} alt="banner" className="banner"/>
                    <div className="container">
                        <img src={logoRopero} alt="LOGO" className="logo"/>
                        <p>VENDÉ LO QUE NO USÁS Y COMPRÁ LO QUE QUERÉS</p>
                    </div>
                </div>
                <div className="loginContainer">
                    <Breadcrumbs links={pathnames}/>

                    <BoxLogin />
                </div>
            </Grid>
        </>
    )
}

export default Login