import React from "react"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import { useLocation } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import PopUpNotis from "./PopUpNotis";

const MisOfertas = () =>{
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)

    return(
        <div className="misOfertasContainer">
            <Breadcrumbs links={pathnames}/>
            <div className="container">
                <p className="title">MIS OFERTAS</p>
                <div className="cardsContainer">
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                    <div className="card">
                        
                    </div>
                </div>
                <p className="volver">
                    <ArrowBackIosNew sx={{fontSize:"10px"}}/>
                    VOLVER A MI PERFIl
                </p>
            </div>
            <PopUpNotis></PopUpNotis>
        </div>
    )
}

export default MisOfertas