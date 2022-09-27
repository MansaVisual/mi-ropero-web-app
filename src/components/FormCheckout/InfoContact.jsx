import { Button, InputLabel, MenuItem, TextField } from "@mui/material"
import React, {useState} from "react"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { handleClick, handleChangeForm, onFocus } from "./funciones";


const currencies = ['BUENOS AIRES','CORDOBA','TUCUMAN','ENTRE RIOS','SALTA','JUJUY','MENDOZA','CORRIENTES','SAN JUAN','NEUQUEN','TIERRA DEL FUEGO','SAN LUIS','CHUBUT']

const InfoContact=({typeForm})=>{
    const [currency, setCurrency] = useState('');
    const [form,setForm]=useState([])

    let clase = "formObligatorio"
    let clase2 = "formObligatorioTitle"

    const [errorInicial, setErrorInicial]=useState(false)
    const [campoObligatorio,setCampoObligatorio]=useState(false)

    const handleChange = (event) => {
        setCurrency(event.target.value)
        setForm({...form,provincia:event.target.value})
    }

    const checkForm = async()=>{
        await handleClick(form,setErrorInicial,setCampoObligatorio,campoObligatorio,clase,clase2)
    }

    return(
        <div className="formCheckout">
            <h2 className="TituloCartCheck" style={{width:"100%"}} id="datos">Datos de contacto</h2>
            
            {errorInicial &&
                <div className="errorBox">
                    <CancelOutlinedIcon color="secondary" className="cruz"/>
                    <p>Debe completar los campos del formulario para avanzar</p>
                </div>
            }
            {campoObligatorio &&
                <div className="errorBox">
                    <CancelOutlinedIcon color="secondary" className="cruz"/>
                    <p>Debe completar los campos obligatorios para avanzar</p>
                </div>
            }

            <div className="firstLine" style={{marginTop:"12px"}}>
                <div className="margenInput margenInputEspecial">
                    <InputLabel className="labelForm" id="labelNombreApellido">Nombre y Apellido ¿A quién se entrega? *</InputLabel>
                    <TextField 
                        placeholder="Nombre Apellido"
                        size="small"
                        className={`inputForm`}
                        id="nombreApellido"
                        onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                        onFocus={(e)=>onFocus(e,clase,clase2,"labelNombreApellido")}
                    ></TextField>
                    <InputLabel className="subLabelForm" sx={{whiteSpace:"initial"}}>Como aparece en el DNI</InputLabel>
                </div>
                <div className="margenInput">
                    <InputLabel className="labelForm" id="labelTelefono">Telefono de contacto *</InputLabel>
                    <TextField 
                        placeholder="011589210"
                        size="small"
                        className={`inputForm`}
                        id="telefono"
                        onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                        onFocus={(e)=>onFocus(e,clase,clase2,"labelTelefono")}
                        type="number"
                        
                    ></TextField>
                    <InputLabel className="subLabelForm" sx={{whiteSpace:"initial"}}>Llamarán a este número si hay algún problema con el envío</InputLabel>
                </div>
            </div>

            <div className="firstLine">
                <div className="margenInput margenInputEspecial">
                    <InputLabel className="labelForm" id="labelCalle">Calle</InputLabel>
                    <TextField 
                        placeholder="Avenida Anta"
                        size="small"
                        className={`inputForm`}
                        id="calle"
                        onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                        onFocus={(e)=>onFocus(e,clase,clase2,"labelCalle")}
                    ></TextField>
                    <InputLabel className="subLabelForm" sx={{whiteSpace:"wrap"}}>Domicilio de entrega</InputLabel>
                </div>

                <div className="AlturaPisoDepto margenInput">
                    <div className="inputs">
                        <InputLabel className="labelForm" id="labelAlturaKM">Altura/Km *</InputLabel>
                        <TextField 
                            placeholder="1770"
                            size="small"
                            className="inputFormEspecial"
                            id="alturaKM"
                            onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                            onFocus={(e)=>onFocus(e,clase,clase2,"labelAlturaKM")}
                        ></TextField>
                    </div>
                    <div className="inputs">
                        <InputLabel className="labelForm">Piso</InputLabel>
                        <TextField 
                            placeholder="5"
                            size="small"
                            className="inputFormEspecial"
                            id="piso"
                            onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                        ></TextField>
                    </div>
                    <div className="inputs">
                        <InputLabel className="labelForm">Dpto.</InputLabel>
                        <TextField 
                            placeholder="C"
                            size="small"
                            className="inputFormEspecial"
                            id="depto"
                            onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                        ></TextField>
                    </div>
                </div>
            </div>

            <div className="firstLine">
                <div className="margenInput margenInputEspecial">
                    <InputLabel className="labelForm" id="labelProvincia">Provincia *</InputLabel>
                    <TextField 
                        placeholder="Ciudad Autónoma de Buenos Aires"
                        size="small"
                        select
                        defaultValue={"ejemplo"}
                        value={currency===""?"ejemplo":currency}
                        onChange={(e)=>handleChange(e)}
                        onFocus={(e)=>onFocus(e,clase,clase2,"labelProvincia")}
                        id="provincia"
                        className={`inputForm`}
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
                    <InputLabel className="labelForm" id="labelBarrioLocalidad">Localidad / Barrio *</InputLabel>
                    <TextField 
                        placeholder={currency===""?"Primero debes ingresar una provincia":"Mar del Plata"}
                        disabled={currency==="" ? true : false}
                        size="small"
                        className={`inputForm`}
                        id="barrioLocalidad"
                        onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                        onFocus={(e)=>onFocus(e,clase,clase2,"labelBarrioLocalidad")}
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
                        id="entrecalle1"
                        onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                    ></TextField>
                </div>
                <div className="margenInput">
                    <InputLabel className="labelForm">Entrecalle 2</InputLabel>
                    <TextField 
                        placeholder="Rodriguez Peña"
                        size="small"
                        className="inputForm"
                        id="entrecalle2"
                        onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                    ></TextField>
                </div>
            </div>

            <div className="firstLine codPostalContainer">
                <div className="codPostal">
                    <InputLabel className="labelForm" id="labelCodigoPostal">Código Postal *</InputLabel>
                    <TextField 
                        placeholder="1428"
                        size="small"
                        className={`inputForm`}
                        id="codigoPostal"
                        onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                        onFocus={(e)=>onFocus(e,clase,clase2,"labelCodigoPostal")}
                    ></TextField>
                </div>
                <a href="/">No sé mi código postal</a>
            </div>

            <div className="firstLine" style={{display:"flex",flexDirection:"column"}}>
                <div className="contenedorTextarea">
                    <InputLabel className="labelForm" sx={{marginTop:"24px",marginBottom:"12px"}}>Información adicional</InputLabel>
                    <TextField 
                        placeholder="Puerta roja, timbre blanco"
                        size="small"
                        className="inputForm textarea"
                        id="comentario"
                        onChangeCapture={()=>handleChangeForm(setErrorInicial,setForm,form)}
                        inputProps={{ maxLength: 70 }}
                    ></TextField>
                </div>
                <InputLabel className="subLabelForm" sx={{whiteSpace:"initial"}}>Agregar información útil para encontrar la dirección.</InputLabel>
            </div>

            <div className="botonEnvio">
                <Button
                    onClick={()=>checkForm()}
                    >
                    IR A ENVÍO
                </Button>
            </div>
        </div>
    )
}

export default InfoContact