import { InputLabel, TextField } from "@mui/material"
import React from "react"

const InfoContact=({typeForm})=>{
    return(
        <div className="formCheckout">
            <h2 className="TituloCartCheck" style={{width:"100%"}}>Datos de contacto</h2>
            <div className="margenInput" style={{marginRight:"12px"}}>
                <InputLabel className="labelForm">Nombre y Apellido ¿A quién se entrega? *</InputLabel>
                <TextField 
                    placeholder="Nombre Apellido"
                    size="small"
                    className="inputForm"
                ></TextField>
            </div>
            <div className="margenInput">
                <InputLabel className="labelForm">Telefono de contacto *</InputLabel>
                <TextField 
                    placeholder="+54 011 - 4417 - 8054"
                    size="small"
                    className="inputForm"
                ></TextField>
                <InputLabel className="subLabelForm">Llamarán a este número si hay algún problema con el envío</InputLabel>
            </div>
            <div className="margenInput" style={{marginRight:"6px"}}>
                <InputLabel className="labelForm">Calle</InputLabel>
                <TextField 
                    placeholder="Nombre Apellido"
                    size="small"
                    className="inputForm"
                ></TextField>
                <InputLabel className="subLabelForm">Domicilio de entrega</InputLabel>
            </div>

            <div className="AlturaPisoDepto margenInput">
                <div className="inputs">
                    <InputLabel className="labelForm">Calle</InputLabel>
                    <TextField 
                        placeholder="1770"
                        size="small"
                        className="inputFormEspecial"
                        sx={{width:"157px"}}
                    ></TextField>
                </div>
                <div className="inputs">
                    <InputLabel className="labelForm">Calle</InputLabel>
                    <TextField 
                        placeholder="5"
                        size="small"
                        className="inputFormEspecial"
                        sx={{width:"96px"}}
                    ></TextField>
                </div>
                <div className="inputs">
                    <InputLabel className="labelForm">Calle</InputLabel>
                    <TextField 
                        placeholder="C"
                        size="small"
                        className="inputFormEspecial"
                        sx={{width:"96px"}}
                    ></TextField>
                </div>
            </div>
        </div>
    )
}

export default InfoContact