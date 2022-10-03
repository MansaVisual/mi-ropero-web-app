import React from "react"
import banner from "../../assets/img/bannermvp4.png"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import BoxLogin from "../../components/BoxLogin/BoxLogin"
import { useLocation } from "react-router-dom";

const Login = ()=>{

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)

    return(
        <>
            <div className="bannerLogin">
                <img src={banner} alt="banner" />
            </div>
            <div className="loginContainer">
                <Breadcrumbs links={pathnames}/>

                <BoxLogin />
            </div>
        </>
    )
}

export default Login