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


const MetodoEnvio=({setTypeNav,sucursalEntrega,setSucursalEntrega,check,setCheck,sucursales,form})=>{
    const {FormAPI}=useContext(UseFormContext)

    FormAPI("","operaciones","get_medios_envio").then(res=>console.log(res))

    const [viewSucursales,setViewSucursales]=useState(false)
    const [setSucursal,setSetSucursal]=useState(false)
    const [envioMoto,setEnvioMoto]=useState(false)

    useEffect(() => {
        if(form.provincia==="CABA"){
            setEnvioMoto(true)
        }
    }, [form]);

    const defaultCheck = (type) =>{
        if(check===""){
            return false
        }else if(check===type){
            return true
        }
    }
    const defaultCheckSucursal = (type) =>{
        if(sucursalEntrega===""){
            return false
        }else if(sucursalEntrega===type){
            return true
        }
    }
    const onClickCheck = (type)=>{
        setCheck(type)
    }
    const onClickCheckSucursal = (type)=>{
        if(type===""){
            setSetSucursal(false)
            setSucursalEntrega(type)
        }else{
            setSucursalEntrega(type)
        }
    }


    const handleClickContinuar = ()=>{
        if(check==="ocaSucursal"){
            setSetSucursal(true)
        }else if(check===""){
            alert("ELIJA UN METODO")
        }else{
            alert("APROBADO")
            setTypeNav("tarjeta")
        }
    }
    const handleClickSetSucusarl=()=>{
        if(sucursalEntrega===""){
            alert("DEBE ELEGIR UNO")
        }else{
            alert("OK")
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
                        <h3>Cuenca 3440. CABA Comuna 17 (C1417).</h3>
                        <h3>Entre Francisco Beiró y José P. Varela.</h3>
                        <h3>Puerta Violeta. Tocar fuerte el timbre.</h3>
                    </div>
                    <BorderColorOutlinedIcon className="botonMobile"/>
                    <Button className="boton" onClick={()=>setTypeNav("info")}>
                        MODIFICAR
                    </Button>
                </div>
            </div>
            
            <div className={`domicilioEntrega ${!envioMoto && "disabled"}`} onClick={envioMoto ? ()=>onClickCheck("moto") : null}>
                <p className="domicilioTitle">Seleccione un método de envío *</p>
                <div className={`card metodos ${check === "moto" && "radioSelected"}`}>
                    {envioMoto ?
                        <Radio 
                            className="radio"
                            checked={defaultCheck("moto")}
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
                    <p style={{whiteSpace:"nowrap",width:"57px"}} className="precio"></p>
                </div>
            </div>
            <div className="domicilioEntrega" onClick={()=>onClickCheck("ocaDomicilio")}>
                <div className={`card metodos ${check === "ocaDomicilio" && "radioSelected"}`}>
                    <Radio 
                        className="radio"
                        checked={defaultCheck("ocaDomicilio")}
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
                    <p style={{whiteSpace:"nowrap"}} className="precio">$ 908,83</p>
                </div>
            </div>
            
            <div className="domicilioEntrega" onClick={()=>onClickCheck("ocaSucursal")}>
                <div className={`card metodos ${check === "ocaSucursal" && "radioSelected"}`}>
                    <Radio 
                        className="radio"
                        checked={defaultCheck("ocaSucursal")}
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
                    <p style={{whiteSpace:"nowrap"}} className="precio">$ 908,83</p>
                </div>
            </div>
            
            <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                <Button className="botonContinuar" onClick={()=>handleClickContinuar()}>
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