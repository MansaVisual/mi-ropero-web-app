import React, { useState } from "react"
import { Grid } from "@mui/material"
import MiPerfil from "../../components/PerfilActions/MiPerfil";
import MisOfertas from "../../components/PerfilActions/MisOfertas";
import MisDatos from "../../components/PerfilActions/MisDatos";

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
        </Grid>
    )
}

export default Perfil