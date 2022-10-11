import React from "react"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
// import PopUpEliminar from "./PopUpEliminar";
// import PopUpNotis from "./PopUpNotis";
// import PopUpSesion from "./PopUpSesion";

const MisOfertas = () =>{
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)
    const navigate = useNavigate()

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
                <p className="volver" onClick={()=>navigate(`/perfil`)}>
                    <ArrowBackIosNew sx={{fontSize:"10px"}}/>
                    VOLVER A MI PERFIl
                </p>
            </div>
            {/* <PopUpNotis></PopUpNotis> */}
            {/* <PopUpSesion></PopUpSesion> */}
            {/* <PopUpEliminar></PopUpEliminar> */}
        </div>
    )
}

export default MisOfertas