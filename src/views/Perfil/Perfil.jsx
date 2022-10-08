import { Grid } from "@mui/material"
import React from "react"
import MisOfertas from "../../components/PerfilActions/MisOfertas";

const Perfil = ()=>{


    return(
        <Grid
            sx={{
                padding:"0px 72px"
            }}
        >
            <MisOfertas/>
        </Grid>
    )
}

export default Perfil