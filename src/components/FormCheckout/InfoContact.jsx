import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React, {useState} from "react"

const currencies = ['BUENOS AIRES','CORDOBA','TUCUMAN','ENTRE RIOS','SALTA','JUJUY','MENDOZA','CORDOBA','TUCUMAN','ENTRE RIOS','SALTA','JUJUY','MENDOZA','CORDOBA','TUCUMAN','ENTRE RIOS','SALTA','JUJUY','MENDOZA']

const InfoContact=({typeForm})=>{
    const [currency, setCurrency] = useState('');

    const handleChange = (event) => {
      setCurrency(event.target.value)
    }

    return(
        <div className="formCheckout">
            <h2 className="TituloCartCheck" style={{width:"100%"}}>Datos de contacto</h2>
            
            <div className="firstLine">
                <div className="margenInput margenInputEspecial">
                    <InputLabel className="labelForm">Nombre y Apellido ¿A quién se entrega? *</InputLabel>
                    <TextField 
                        placeholder="Nombre Apellido"
                        size="small"
                        className="inputForm"
                    ></TextField>
                    <InputLabel className="subLabelForm" sx={{whiteSpace:"initial"}}>Como aparece en el DNI</InputLabel>
                </div>
                <div className="margenInput">
                    <InputLabel className="labelForm">Telefono de contacto *</InputLabel>
                    <TextField 
                        placeholder="+54 011 - 4417 - 8054"
                        size="small"
                        className="inputForm"
                    ></TextField>
                    <InputLabel className="subLabelForm" sx={{whiteSpace:"initial"}}>Llamarán a este número si hay algún problema con el envío</InputLabel>
                </div>
            </div>

            <div className="firstLine">
                <div className="margenInput margenInputEspecial">
                    <InputLabel className="labelForm">Calle</InputLabel>
                    <TextField 
                        placeholder="Nombre Apellido"
                        size="small"
                        className="inputForm"
                    ></TextField>
                    <InputLabel className="subLabelForm" sx={{whiteSpace:"wrap"}}>Domicilio de entrega</InputLabel>
                </div>

                <div className="AlturaPisoDepto margenInput">
                    <div className="inputs">
                        <InputLabel className="labelForm">Altura/Km *</InputLabel>
                        <TextField 
                            placeholder="1770"
                            size="small"
                            className="inputFormEspecial"
                        ></TextField>
                    </div>
                    <div className="inputs">
                        <InputLabel className="labelForm">Piso</InputLabel>
                        <TextField 
                            placeholder="5"
                            size="small"
                            className="inputFormEspecial"
                        ></TextField>
                    </div>
                    <div className="inputs">
                        <InputLabel className="labelForm">Dpto.</InputLabel>
                        <TextField 
                            placeholder="C"
                            size="small"
                            className="inputFormEspecial"
                        ></TextField>
                    </div>
                </div>
            </div>

            <div className="firstLine">
                <div className="margenInput margenInputEspecial">
                    <InputLabel className="labelForm">Provincia *</InputLabel>
                    <TextField 
                        placeholder="Ciudad Autónoma de Buenos Aires"
                        size="small"
                        select
                        defaultValue={"ejemplo"}
                        value={currency===""?"ejemplo":currency}
                        onChange={handleChange}
                        className="inputForm"
                        sx={{"& div":{fontSize:"14px",color:currency===""&&"#BABCBE"}}}
                    >
                        <MenuItem disabled key={"ejemplo"} value={"ejemplo"} sx={{fontSize:"14px",color:"#969696"}}>
                            {"Ciudad Autónoma de Buenos Aires"}
                        </MenuItem>
                        {currencies.map((option) => (
                            <MenuItem key={option} value={option} sx={{fontSize:"14px",color:"#969696"}}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="margenInput">
                    <InputLabel className="labelForm">Localidad / Barrio *</InputLabel>
                    <TextField 
                        placeholder={currency===""?"Primero debes ingresar una provincia":"Mar del Plata"}
                        disabled={currency==="" ? true : false}
                        size="small"
                        className="inputForm"
                    ></TextField>
                </div>
            </div>

            <div className="firstLine">
                <div className="margenInput margenInputEspecial">
                    <InputLabel className="labelForm">Entrecalle 1</InputLabel>
                    <TextField 
                        placeholder="Avenida Callao"
                        size="small"
                        className="inputForm"
                    ></TextField>
                </div>
                <div className="margenInput">
                    <InputLabel className="labelForm">Entrecalle 2</InputLabel>
                    <TextField 
                        placeholder="Rodriguez Peña"
                        size="small"
                        className="inputForm"
                    ></TextField>
                </div>
            </div>

            <div className="firstLine codPostalContainer">
                <div className="codPostal">
                    <InputLabel className="labelForm">Código Postal *</InputLabel>
                    <TextField 
                        placeholder="1428"
                        size="small"
                        className="inputForm"
                    ></TextField>
                </div>
                <a href="/">No sé mi código postal</a>
            </div>

            <div className="firstLine" style={{display:"flex",flexDirection:"column"}}>
                <div>
                    <InputLabel className="labelForm" sx={{marginTop:"24px",marginBottom:"12px"}}>Información adicional</InputLabel>
                    <TextField 
                        placeholder="Puerta roja, timbre blanco"
                        size="small"
                        className="inputForm textarea"
                        inputProps={{ maxLength: 70 }}
                    ></TextField>
                </div>
                <InputLabel className="subLabelForm" sx={{whiteSpace:"wrap"}}>Agregar información útil para encontrar la dirección.</InputLabel>
            </div>

            <div className="botonEnvio">
                <Button
                    // onClick={()=>navigate("/checkout")}
                    >
                    IR A ENVÍO
                </Button>
            </div>
        </div>
    )
}

export default InfoContact