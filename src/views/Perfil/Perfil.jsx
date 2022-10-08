import React, { useState } from "react"
import { Grid } from "@mui/material"
import MiPerfil from "../../components/PerfilActions/MiPerfil";
import MisOfertas from "../../components/PerfilActions/MisOfertas";

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
        </Grid>
    )
}

export default Perfil