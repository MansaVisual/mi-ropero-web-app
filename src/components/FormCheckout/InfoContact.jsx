import { Button, Checkbox, FormControlLabel, InputLabel, MenuItem, TextField } from "@mui/material"
import React, {useState,useContext,useEffect} from "react"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { handleClick, handleChangeForm, onFocus, chargeForm } from "./funciones";
import { UseFormContext } from "../../context/FormContext";
import Loader from "../Loader/Loader";
import PopUpInfoDir from "./PopUpInfoDir";


const provincias = ['BUENOS AIRES','CÓRDOBA','TUCUMÁN','ENTRE RÍOS','SALTA','JUJUY','MENDOZA',
                    'CORRIENTES','SAN JUAN','NEUQUÉN','SAN LUIS','CHUBUT',
                    'MISIONES','TIERRA DEL FUEGO','LA PAMPA','SANTA FE','CHACO','RÍO NEGRO',
                    'FORMOSA','SANTA CRUZ','LA RIOJA','CATAMARCA','SANTIAGO DEL ESTERO'
                    ]

const InfoContact=({setTypeNav,form,setForm,setSucursales,saveDirecc,setSaveDirecc,direccion,setDireccion})=>{
    const {FormAPI}=useContext(UseFormContext)
    
    let clase = "formObligatorio"
    let clase2 = "formObligatorioTitle"

    useEffect(() => {
        if(form.length!==0){
            chargeForm(form,setProvincia)
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const [provincia, setProvincia] = useState('');
    const [loader,setLoader]=useState(false)

    const [campoObligatorio,setCampoObligatorio]=useState(false)
    const [errorPhone,setErrorPhone]=useState(false)
    const [errorCodPostal,setErrorCodPostal]=useState(false)
    const [errorDireccion,setErrorDireccion]=useState(false)

    const [viewDireccion,setViewDireccion]=useState(false)
    const [resDirecciones,setResDirecciones]=useState([])

    const handleChange = (event) => {
        setProvincia(event.target.value)
        setForm({...form,provincia:event.target.value})
    }

    const checkForm = async()=>{

        setLoader(true)
        const res = handleClick(setCampoObligatorio,clase,clase2)
        let resFinal = true
        if(res){
            setLoader(false)
            return
        }else{
                
            const formPhone = new FormData()
            formPhone.append('telefono', document.getElementById("telefono").value)
            await FormAPI(
                formPhone,
                "clientes",
                "validate_phone"
            ).then((res)=>{
                if(res.status==="error"){
                    resFinal = false
                    setErrorPhone(true)
                    throwError("telefono","labelTelefono")
                }
            })

            const formCodPostal = new FormData()
            formCodPostal.append('codigo_postal', document.getElementById("codigoPostal").value)
            await FormAPI(
                formCodPostal,
                "operaciones",
                "get_oca_offices"
            ).then((res)=>{
                if(res.status==="error"){
                    resFinal = false
                    setErrorCodPostal(true)
                    throwError("codigoPostal","labelCodigoPostal")
                }else{
                    setSucursales(res.result)
                }
            })
        }
        if(resFinal){
            setLoader(false)
            validarDireccion()
        }else{
            setLoader(false)
            scrollTop()
        }
    }

    const throwError =(id1,id2)=>{
        if(!document.getElementById(id1).classList.contains(clase)){
            document.getElementById(id1).classList.add(clase)
            document.getElementById(id2).classList.add(clase2)
        }
    }
    const validarDireccion=()=>{
        const formDireccion = new FormData()
        formDireccion.append('calle',document.getElementById("calle").value)
        formDireccion.append('numero',document.getElementById("alturaKM").value)
        formDireccion.append('provincia',document.getElementById("provincia").nextSibling.value)
        formDireccion.append('localidad',document.getElementById("barrioLocalidad").value)
        formDireccion.append('codigo_postal',document.getElementById("codigoPostal").value)
        FormAPI(
            formDireccion,
            "direcciones",
            "normalize"
        ).then(async(res)=>{
            if(res.status==="success" && res.result[0].calle!=="" && res.result[0].numero!==""){
                scrollTop()
                await setResDirecciones(res.result)
                setViewDireccion(true)
            }else{
                setErrorDireccion(true)
                throwError("calle","labelCalle")
                throwError("alturaKM","labelAlturaKM")
                throwError("provincia","labelProvincia")
                throwError("barrioLocalidad","labelBarrioLocalidad")
                throwError("codigoPostal","labelCodigoPostal")
                scrollTop()
            }
        })
    }
    const scrollTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleFinForm = ()=>{
        if(direccion!==""){
            setTypeNav("envio")
        }
    }

    return(
        <div className="formCheckout">
            <h2 className="TituloCartCheck" style={{width:"100%"}} id="datos">Datos de contacto</h2>
            
            {campoObligatorio &&
                <div className="errorBox">
                    <CancelOutlinedIcon color="secondary" className="cruz"/>
                    <p>Debe completar los campos obligatorios para avanzar</p>
                </div>
            }
            {errorPhone &&
                <div className="errorBox">
                    <CancelOutlinedIcon color="secondary" className="cruz"/>
                    <p>El número de telefono no es válido.</p>
                </div>
            }
            {errorCodPostal &&
                <div className="errorBox">
                    <CancelOutlinedIcon color="secondary" className="cruz"/>
                    <p>El código postal no se pudo validar. Vuelva a intentarlo</p>
                </div>
            }
            {errorDireccion &&
                <div className="errorBox">
                    <CancelOutlinedIcon color="secondary" className="cruz"/>
                    <p>No se encontró la direccion establecida.</p>
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
                        onChangeCapture={()=>{handleChangeForm(setForm,form);setCampoObligatorio(false)}}
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
                        onChangeCapture={()=>{handleChangeForm(setForm,form);setErrorPhone(false);setCampoObligatorio(false)}}
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
                        onChangeCapture={()=>{handleChangeForm(setForm,form);setErrorDireccion(false);setCampoObligatorio(false)}}
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
                            onChangeCapture={()=>{handleChangeForm(setForm,form);setErrorDireccion(false);setCampoObligatorio(false)}}
                            onFocus={(e)=>onFocus(e,clase,clase2,"labelAlturaKM")}
                            type="number"
                        ></TextField>
                    </div>
                    <div className="inputs">
                        <InputLabel className="labelForm">Piso</InputLabel>
                        <TextField 
                            placeholder="5"
                            size="small"
                            className="inputFormEspecial"
                            id="piso"
                            onChangeCapture={()=>handleChangeForm(setForm,form)}
                        ></TextField>
                    </div>
                    <div className="inputs">
                        <InputLabel className="labelForm">Dpto.</InputLabel>
                        <TextField 
                            placeholder="C"
                            size="small"
                            className="inputFormEspecial"
                            id="depto"
                            onChangeCapture={()=>handleChangeForm(setForm,form)}
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
                        value={provincia===""?"ejemplo":provincia}
                        onChange={(e)=>{handleChange(e);setErrorDireccion(false);setCampoObligatorio(false)}}
                        onFocus={(e)=>onFocus(e,clase,clase2,"labelProvincia")}
                        id="provincia"
                        className={`inputForm`}
                        sx={{"& div":{fontSize:"14px",color:provincia===""&&"#BABCBE"}}}
                    >
                        <MenuItem disabled key={"ejemplo"} value={"ejemplo"} sx={{fontSize:"14px",color:"#969696"}}>
                            {"Ciudad Autónoma de Buenos Aires"}
                        </MenuItem>
                        {provincias.sort().map((option) => (
                            <MenuItem key={option} value={option} sx={{fontSize:"14px",color:"#969696"}}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="margenInput">
                    <InputLabel className="labelForm" id="labelBarrioLocalidad">Localidad / Barrio *</InputLabel>
                    <TextField 
                        placeholder={provincia===""?"Primero debes ingresar una provincia":"Mar del Plata"}
                        disabled={provincia==="" ? true : false}
                        size="small"
                        className={`inputForm`}
                        id="barrioLocalidad"
                        onChangeCapture={()=>{handleChangeForm(setForm,form);setErrorDireccion(false);setCampoObligatorio(false)}}
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
                        onChangeCapture={()=>handleChangeForm(setForm,form)}
                    ></TextField>
                </div>
                <div className="margenInput">
                    <InputLabel className="labelForm">Entrecalle 2</InputLabel>
                    <TextField 
                        placeholder="Rodriguez Peña"
                        size="small"
                        className="inputForm"
                        id="entrecalle2"
                        onChangeCapture={()=>handleChangeForm(setForm,form)}
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
                        onChangeCapture={()=>{handleChangeForm(setForm,form);setErrorCodPostal(false);setErrorDireccion(false);setCampoObligatorio(false)}}
                        onFocus={(e)=>onFocus(e,clase,clase2,"labelCodigoPostal")}
                    ></TextField>
                </div>
                <a href="https://www.correoargentino.com.ar/formularios/cpa" target={"_blank"} rel="noreferrer">No sé mi código postal</a>
            </div>

            <div className="firstLine" style={{display:"flex",flexDirection:"column"}}>
                <div className="contenedorTextarea">
                    <InputLabel className="labelForm" sx={{marginTop:"24px",marginBottom:"12px"}}>Información adicional</InputLabel>
                    <TextField 
                        placeholder="Puerta roja, timbre blanco"
                        size="small"
                        className="inputForm textarea"
                        id="comentario"
                        onChangeCapture={()=>handleChangeForm(setForm,form)}
                        inputProps={{ maxLength: 70 }}
                    ></TextField>
                </div>
                <InputLabel className="subLabelForm" sx={{whiteSpace:"initial"}}>Agregar información útil para encontrar la dirección.</InputLabel>
            </div>
            
            <div className="firstLine" style={{justifyContent:"flex-start"}}>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    onChange={()=>setSaveDirecc(!saveDirecc)}
                    label="Guardar esta dirección para volver a usarla en otra compra"
                    className="checkDirecc"
                />
            </div>
            
            {loader ?
                <Loader/>
            :
                <div className="botonEnvio">
                    <Button
                        onClick={()=>checkForm()}
                        >
                        IR A ENVÍO
                    </Button>
                </div>
            }

            {viewDireccion && <PopUpInfoDir
                direccion={direccion}
                setDireccion={setDireccion}
                setViewDireccion={setViewDireccion}
                resDirecciones={resDirecciones}
                handleFinForm={handleFinForm}
            />}
        </div>
    )
}

export default InfoContact