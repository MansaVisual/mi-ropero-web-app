import { Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Radio, Select, TextField } from "@mui/material"
import React, {useState,useContext,useEffect} from "react"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { handleClick, handleChangeForm, onFocus, chargeForm } from "./funciones";
import { UseFormContext } from "../../context/FormContext";
import Loader from "../Loader/Loader";
import PopUpInfoDir from "./PopUpInfoDir";


const InfoContact=({
    setTypeNav,form,setForm,setSucursales,saveDirecc,setSaveDirecc,
    direccion,setDireccion,provincias,setProvincias,usaDireccionCargada,setUsaDireccionCargada
})=>{
    const {FormAPI}=useContext(UseFormContext)
    
    const [direccionesCargadas,setDireccionesCargadas]=useState([])
    const [direccionCargada,setDireccionCargada]=useState(null)
    const [buscandoDir,setBuscandoDir]=useState(false)

    let clase = "formObligatorio"
    let clase2 = "formObligatorioTitle"

    useEffect(() => {
        FormAPI(
            "",
            "direcciones",
            "provincias"
        ).then((res)=>{
            if(res.status==="success"){
                setProvincias(res.result)
            }
        })

        const formDirecciones = new FormData()
        formDirecciones.append('idcliente', 68)
        FormAPI(
            formDirecciones,
            "direcciones",
            "all"
        ).then((res)=>{
            if(res.status==="success"){
                setDireccionesCargadas(res.result)
            }else{
                console.log("ARREGLAR ERROR NO TIENE DIRECCION")
            }
        })

        if(form.length!==0 && !usaDireccionCargada){
            chargeForm(form,setProvincia)
        }else if(form.length!==0 && usaDireccionCargada){
            document.getElementById("nombreApellido").value=form.nombreApellido
            document.getElementById("telefono").value=form.telefono
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(direccionCargada!==null){
            setDireccion(direccionCargada)
        }
    },[direccionCargada])// eslint-disable-line react-hooks/exhaustive-deps

    const [provincia, setProvincia] = useState('');
    const [loader,setLoader]=useState(false)

    const [campoObligatorio,setCampoObligatorio]=useState(false)
    const [errorPhone,setErrorPhone]=useState(false)
    const [errorCodPostal,setErrorCodPostal]=useState(false)
    const [errorDireccion,setErrorDireccion]=useState(false)
    const [errorDirCargada,setErrorDirCargada]=useState(false)
    const [errorRecargarDir,setErrorRecargarDir]=useState(false)

    const [viewDireccion,setViewDireccion]=useState(false)
    const [resDirecciones,setResDirecciones]=useState([])


    const handleChange = (event) => {
        setProvincia(event.target.value)
        setForm({...form,provincia:event.target.value})
    }

    const checkForm = async()=>{
        setBuscandoDir(true)
        setLoader(true)
        let res = false
        let resFinal = true
        setErrorRecargarDir(false)

        if(usaDireccionCargada && direccionCargada === null){
            setErrorDirCargada(true)
            setBuscandoDir(false)
            setLoader(false)
            scrollTop()
            return
        }
        if(direccionCargada===null){
            res = handleClick(setCampoObligatorio,clase,clase2)
            resFinal = true
        }else if(document.getElementById("nombreApellido").value === ""){
            throwError("nombreApellido","labelNombreApellido")
            setLoader(false)
            scrollTop()
            setCampoObligatorio(true)
            setBuscandoDir(false)
            return
        }
        if(res){
            setLoader(false)
            setBuscandoDir(false)
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
                    setBuscandoDir(false)
                }
            })

            const formCodPostal = new FormData()
            if(direccionCargada !== null){
                formCodPostal.append('codigo_postal', direccion.codigo_postal)
            }else{
                formCodPostal.append('codigo_postal', document.getElementById("codigoPostal").value)
            }
            await FormAPI(
                formCodPostal,
                "operaciones",
                "get_oca_offices"
            ).then((res)=>{
                if(res.status==="error"){
                    resFinal = false
                    if(direccionCargada===null){
                        setErrorCodPostal(true)
                        setBuscandoDir(false)
                        throwError("codigoPostal","labelCodigoPostal")
                    }else{
                        setErrorRecargarDir(true)
                        setBuscandoDir(false)
                    }
                }else{
                    setSucursales(res.result)
                }
            })
        }
        if(resFinal){
            setLoader(false)
            if(direccionCargada===null){
                validarDireccion()
            }else{
                setTypeNav("envio")
            }
        }else{
            setLoader(false)
            scrollTop()
        }
    }

    const throwError =(id1,id2)=>{
        if(id1==="provincia"){
            if(!document.getElementById(id1).classList.contains(clase)){
                document.getElementById(id1).parentNode.classList.add(clase)
                document.getElementById(id2).classList.add(clase2)
            }
        }else{
            if(!document.getElementById(id1).classList.contains(clase)){
                document.getElementById(id1).classList.add(clase)
                document.getElementById(id2).classList.add(clase2)
            }
        }
    }
    const validarDireccion=()=>{
        const formDireccion = new FormData()
        if(direccionCargada!==null){
            formDireccion.append('calle',direccion.calle)
            formDireccion.append('numero',direccion.numero)
            formDireccion.append('provincia',direccion.provincia)
            formDireccion.append('localidad',direccion.localidad)
            formDireccion.append('codigo_postal',direccion.codigo_postal)
        }else{
            formDireccion.append('calle',document.getElementById("calle").value)
            formDireccion.append('numero',document.getElementById("alturaKM").value)
            formDireccion.append('provincia',document.getElementById("provincia").nextSibling.value)
            formDireccion.append('localidad',document.getElementById("barrioLocalidad").value)
            formDireccion.append('codigo_postal',document.getElementById("codigoPostal").value)
        }
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
                setBuscandoDir(false)
                setLoader(false)
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
    const scrollTop = (param)=>{
        if(param!==undefined){
            setTimeout(() => {
                window.scrollTo({
                    top: param,
                    behavior: 'auto'
                })
            }, 0);
        }
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
            {errorDirCargada &&
                <div className="errorBox">
                    <CancelOutlinedIcon color="secondary" className="cruz"/>
                    <p>Debe seleccionar una dirección</p>
                </div>
            }
            {errorRecargarDir &&
                <div className="errorBox">
                    <CancelOutlinedIcon color="secondary" className="cruz"/>
                    <p>Ocurrió un error de validación. Vuelva a intentarlo</p>
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

            <div className="selectorDireccion">
                <div className="selectorContainer" onClick={()=>{
                    if(!buscandoDir){
                        setSaveDirecc(usaDireccionCargada)
                        setUsaDireccionCargada(!usaDireccionCargada)
                        setDireccionCargada(null);
                        setErrorDirCargada(false);
                        setProvincia("");
                    }
                }}>
                    <FormControlLabel
                        name="sucursal"
                        control={<Checkbox sx={{fontSize:"24px"}}/>}
                        id="nuevaDir"
                        checked={usaDireccionCargada?true:false}
                        value="setDireccion"
                        disabled={buscandoDir ? true : false}
                    />
                    <label className="labelForm" htmlFor="nuevaDir" style={{cursor:"pointer"}}>
                        Utilizar una de mis direcciónes
                    </label>
                </div>
            </div>

            {!usaDireccionCargada ? 
                <>
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
                            <Select 
                                placeholder="Ciudad Autónoma de Buenos Aires"
                                size="small"
                                defaultValue={"ejemplo"}
                                value={provincia===""?"ejemplo":provincia}
                                onClickCapture={(e)=>scrollTop(e.clientY)}
                                onChange={(e)=>{handleChange(e);setErrorDireccion(false);setCampoObligatorio(false)}}
                                onFocus={(e)=>onFocus(e,clase,clase2,"labelProvincia")}
                                id="provincia"
                                className={`inputForm selector `}
                                sx={{
                                    "& div":{fontSize:"14px",color:provincia===""?"#BABCBE":"#423B3C"},
                                    height:42,                                                                                                       
                                }}
                                MenuProps={{
                                    style: {
                                       maxHeight: 150,
                                    }                                           
                                }} 
                            >
                                <MenuItem 
                                    disabled 
                                    key={"ejemplo"} 
                                    value={"ejemplo"} 
                                    sx={{fontSize:"14px",color:"#969696"}} 
                                    >
                                    {"Seleccioná una provincia"}
                                </MenuItem>
                                {provincias.map((option) => (
                                    <MenuItem key={option.idprovincia} value={option.idprovincia} sx={{fontSize:"14px",color:"#969696"}}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
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
                                multiline
                                rows={4} 
                                placeholder="Puerta roja, timbre blanco"
                                size="small"
                                className="inputForm textarea"
                                id="comentario"
                                disabled={buscandoDir?true:false}
                                onChangeCapture={()=>{if(!buscandoDir){handleChangeForm(setForm,form)}}}
                               /*  inputProps={{ maxLength: 70 }} */
                                ></TextField>
                        </div>
                        <InputLabel className="subLabelForm" sx={{whiteSpace:"initial"}}>Agregar información útil para encontrar la dirección.</InputLabel>
                    </div>
                    
                    <div className="firstLine" style={{justifyContent:"flex-start"}}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked sx={{fontSize:"24px"}}/>}
                            onChange={()=>setSaveDirecc(!saveDirecc)}
                            label="Guardar esta dirección para volver a usarla en otra compra"
                            className="checkDirecc"
                            />
                    </div>
                </>
            :
                <div className="contenedorDirecciones">
                    {direccionesCargadas.map(dir=>{
                        return(
                            <div className="cards" key={dir.iddireccion} onClick={()=>{!buscandoDir && setDireccionCargada(dir);setErrorDirCargada(false)}}>
                                <Radio
                                    disabled={buscandoDir && true}
                                    name="sucursal"
                                    id="nuevaDir"
                                    checked={direccion!==null && direccion.iddireccion===dir.iddireccion ? true : false}
                                    value={dir.iddireccion}
                                />
                                <p className="labelForm" htmlFor="nuevaDir">
                                    {dir.calle} {dir.numero}. {dir.provincia === "Capital Federal" ? "CABA" : dir.provincia}, {dir.localidad} ({dir.codigo_postal}).
                                    {dir.entre_calle_1!=="" && "Entre"} {dir.entre_calle_1!==""&& dir.entre_calle_1} {dir.entre_calle_1!=="" && "y"} {dir.entre_calle_2!==""&& dir.entre_calle_2}
                                    {dir.informacion_adicional}
                                </p>
                            </div>
                        )
                    })}
                </div>
            }
            
            {loader ?
                <div style={{marginTop:"16px"}}>
                    <Loader spin={"spinnerG"}/>
                </div>
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
                form={form}
                setBuscandoDir={setBuscandoDir}
            />}
        </div>
    )
}

export default InfoContact