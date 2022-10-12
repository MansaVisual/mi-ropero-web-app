import { Button, Radio} from "@mui/material"
import moto from "../../assets/img/moto.png"
import motoDisabled from "../../assets/img/motoDisabled.png"
import home from "../../assets/img/home.png"
import shop from "../../assets/img/shop.png"
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import oca from "../../assets/img/OCA.png"
import React, {useState,useEffect,useContext} from "react"
import PopUpSucursales from "./PopUpME";
import PopUpSetSucursal from "./PopUpME2";
import { UseFormContext } from "../../context/FormContext"
import Loader from "../Loader/Loader"


const MetodoEnvio=({setTypeNav,sucursalEntrega,setSucursalEntrega,metodoEnvio,sucursales,setMetodoEnvio,direccion})=>{
    const {costoSucDom,costoSucSuc,setCostos,setCostoSucDom,setCostoSucSuc,costoMoto}=useContext(UseFormContext)

    const [viewSucursales,setViewSucursales]=useState(false)
    const [setSucursal,setSetSucursal]=useState(false)
    const [envioMoto,setEnvioMoto]=useState(false)

    useEffect(()=>{
        if(costoMoto.precio!==undefined){
            setEnvioMoto(true)
        }else{
            setEnvioMoto(false)
        }
        if(costoSucDom===false && costoSucSuc===false){
            setCostos(direccion)
        }
    },[costoSucDom,costoSucSuc])// eslint-disable-line react-hooks/exhaustive-deps

    const defaultCheck = (type) =>{
        if(metodoEnvio===""){
            return false
        }else if(metodoEnvio===type){
            return true
        }else{
            return false
        }
    }
    const defaultCheckSucursal = (type) =>{
        if(sucursalEntrega===""){
            return false
        }else if(sucursalEntrega===type){
            return true
        }else{
            return false
        }
    }
    const onClickCheck = (type)=>{
        setMetodoEnvio(type)
    }
    const onClickCheckSucursal = (type)=>{
        if(type===""){
            setSetSucursal(false)
            setSucursalEntrega(type)
        }else{
            setSucursalEntrega(type)
        }
    }


    const handleClickContinuar =async ()=>{
        if(metodoEnvio==="345838"){
            setSetSucursal(true)
        }else if(metodoEnvio===""){
            alert("ELIJA UN METODO")
        }else{
            setViewSucursales(false)
            setTypeNav("tarjeta")
        }
    }
    const handleClickSetSucusarl=async()=>{
        if(sucursalEntrega===""){
            alert("DEBE ELEGIR UNO")
        }else{
            setViewSucursales(false)
            setTypeNav("tarjeta")
        }
    }
    return(
        <div className="metodoEnvio">
            <h2 className="TituloCartCheck" style={{width:"100%"}} id="datos">Método de envío</h2>

            <div className="domicilioEntrega">
                <p className="domicilioTitle">Domicilio de entrega</p>
                <div className="card firstCard">
                    <div>
                        <h3>
                            {direccion.calle} {direccion.numero}. {direccion.provincia === "Capital Federal" ? "CABA" : direccion.provincia} {direccion.localidad} ({direccion.codigo_postal}). 
                        </h3>
                        <h3>
                            {direccion.entre_calle_1!=="" && "Entre"} {direccion.entre_calle_1!==""&& direccion.entre_calle_1} {direccion.entre_calle_1!=="" && "y"} {direccion.entre_calle_2!==""&& direccion.entre_calle_2}
                        </h3>
                        <h3>
                            {direccion.informacion_adicional}
                        </h3>
                    </div>
                    <BorderColorOutlinedIcon className="botonMobile"/>
                    <Button className="boton" onClick={()=>{setTypeNav("info");setMetodoEnvio("");setCostoSucDom(false);setCostoSucSuc(false)}}>
                        MODIFICAR
                    </Button>
                </div>
            </div>
            
            <div className={`domicilioEntrega ${!envioMoto && "disabled"}`} onClick={envioMoto ? ()=>onClickCheck("1") : null}>
                <p className="domicilioTitle">Seleccione un método de envío *</p>
                <div className={`card metodos ${metodoEnvio === "1" && "radioSelected"}`}>
                    {envioMoto ?
                        <Radio 
                            className="radio"
                            checked={defaultCheck("1")}
                            id="radioButton1"
                            name="radioButton"
                        />
                        :
                        <>
                            <Radio className="radio" disabled></Radio>
                        </>
                    }
                    <img src={envioMoto ? moto : motoDisabled} alt="MOTO" color={`${envioMoto ? "primary" : "tertiary"}`} className="botonLogo"/>
                    <div>
                        <img src={moto} alt="MOTO" color="primary" className="botonLogoMobile"/>
                        <p className="title">Envío en moto (sólo disponible en CABA)</p>
                        {envioMoto ? 
                            <p className="subtitle">Tu compra llegará en 24hs hábiles. En fecha festivas o especiales pueden surgir demoras.<br/>
                                Nos pondremos en contacto para coordinar el envío.
                            </p>
                        :
                            <p className="subtitle">
                                Este método de envío no está disponible para el domicilio de entrega.
                            </p>
                        }
                        <p className="subtitle"></p>
                    </div>
                    {costoMoto === false ?
                        <div className="precio">
                            <Loader spin={"spinnerS"}/>
                        </div>
                    :   
                        <>
                            {costoMoto.precio!==undefined ? 
                                <p style={{whiteSpace:"nowrap",width:"57px"}} className="precio">$ {costoMoto.precio}</p>
                            :
                                <p style={{whiteSpace:"nowrap",width:"57px"}} className="precio"></p>  
                            }
                        </>
                    }
                    
                </div>
            </div>
            <div className="domicilioEntrega" onClick={costoSucDom===false ? null : ()=>onClickCheck("345837")}>
                <div className={`card metodos ${metodoEnvio === "345837" && "radioSelected"}`}>
                    <Radio
                        disabled={costoSucDom===false?true:false}
                        className="radio"
                        checked={defaultCheck("345837")}
                        id="radioButton2"
                        name="radioButton"
                    />
                    <img src={home} alt="HOME" color="primary" className="botonLogo"/>
                    <div>
                        <img src={home} alt="HOME" color="primary" className="botonLogoMobile"/>
                        <p className="title">
                            <img src={oca} alt="OCA" />
                            Entrega a domicilio
                        </p>
                        <p className="subtitle">
                            El pedido puede demorar de 5 a 10 días hábiles. Dependerá de la distancia entre las personas vendedoras y compradoras.<br/>
                            Una vez despachado te enviaremos el link de seguimiento.
                        </p>
                    </div>
                    {costoSucDom === false ?
                        <div className="precio">
                            <Loader spin={"spinnerS"}/>
                        </div>
                    :
                        <p style={{whiteSpace:"nowrap"}} className="precio">$ {costoSucDom}</p>
                    }
                </div>
            </div>
            
            <div className="domicilioEntrega" onClick={costoSucSuc===false ? null : ()=>onClickCheck("345838")}>
                <div className={`card metodos ${metodoEnvio === "345838" && "radioSelected"}`}>
                    <Radio
                        disabled={costoSucSuc===false?true:false}
                        className="radio"
                        checked={defaultCheck("345838")}
                        id="radioButton3"
                        name="radioButton"
                    />
                    <img src={shop} alt="SHOP" color="primary" className="botonLogo"/>
                    <div>
                        <img src={shop} alt="SHOP" color="primary" className="botonLogoMobile"/>
                        <p className="title">
                            <img src={oca} alt="OCA" />
                            Entrega en sucursal
                            <span onClick={()=>{setViewSucursales(true)}}>Ver sucursales</span>
                        </p>
                        <p className="subtitle">      
                            El pedido puede demorar de 5 a 10 días hábiles. Dependerá de la distancia entre las personas vendedoras y compradoras.<br/>
                            Una vez despachado te enviaremos el link de seguimiento.
                        </p>
                    </div>
                    {costoSucSuc === false ?
                        <div className="precio">
                            <Loader spin={"spinnerS"}/>
                        </div>
                    :
                        <p style={{whiteSpace:"nowrap"}} className="precio">$ {costoSucSuc}</p>
                    }
                </div>
            </div>
            
            <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                <Button className={metodoEnvio===""?"botonContinuarDisabled":"botonContinuar"} disabled={metodoEnvio===""?true:false} onClick={()=>handleClickContinuar()}>
                    CONTINUAR
                </Button>
            </div>



            {viewSucursales &&
                <PopUpSucursales setViewSucursales={setViewSucursales} sucursales={sucursales}/>
            }

            {setSucursal &&
                <PopUpSetSucursal
                    sucursales={sucursales}
                    onClickCheckSucursal={onClickCheckSucursal}
                    defaultCheckSucursal={defaultCheckSucursal}
                    handleClickSetSucusarl={handleClickSetSucusarl}
                    sucursalEntrega={sucursalEntrega}
                />
            }
        </div>
    )
}

export default MetodoEnvio