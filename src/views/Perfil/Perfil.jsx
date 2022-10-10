import React, { useState } from "react"
import { Grid } from "@mui/material"
import MiPerfil from "../../components/PerfilActions/MiPerfil";
import MisOfertas from "../../components/PerfilActions/MisOfertas";
import MisDatos from "../../components/PerfilActions/MisDatos";
import MisFavoritos from "../../components/PerfilActions/MisFavoritos";
import MisDirecciones from "../../components/PerfilActions/MisDirecciones";

const Perfil = ()=>{

    const [typeNav, setTypeNav] = useState("miPerfil")



    return(
        <Grid
            className="gridContainer"
        >
            {typeNav === "miPerfil" &&
                <MiPerfil setTypeNav={setTypeNav}/>
            }
            {typeNav === "OFERTAS REALIZADAS" &&
                <MisOfertas/> 
            }
            {typeNav === "MIS DATOS" &&
                <MisDatos/> 
            }
            {typeNav === "MIS FAVORITOS" &&
                <MisFavoritos setTypeNav={setTypeNav}/> 
            }
            {typeNav === "MIS DIRECCIONES" &&
                <MisDirecciones setTypeNav={setTypeNav}/> 
            }
        </Grid>
    )
}

export default Perfil