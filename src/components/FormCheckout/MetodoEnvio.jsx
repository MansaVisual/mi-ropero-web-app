import { Button, Radio} from "@mui/material"
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import oca from "../../assets/img/OCA.png"
import React, {useState} from "react"

const MetodoEnvio=({typeForm})=>{
    const [check,setCheck]=useState("")

    const defaultCheck = (type) =>{
        if(check===""){
            return false
        }else if(check===type){
            return true
        }
    }

    const onClickCheck = (type)=>{
        setCheck(type)
    }

    return(
        <div className="metodoEnvio">
            <h2 className="TituloCartCheck" style={{width:"100%"}} id="datos">Método de envío</h2>

            <div className="domicilioEntrega">
                <p className="domicilioTitle">Domicilio de entrega</p>
                <div className="card">
                    <div>
                        <h3>Cuenca 3440. CABA Comuna 17 (C1417).</h3>
                        <h3>Entre Francisco Beiró y José P. Varela.</h3>
                        <h3>Puerta Violeta. Tocar fuerte el timbre.</h3>
                    </div>
                    <Button className="boton">
                        MODIFICAR
                    </Button>
                </div>
            </div>
            
            <div className="domicilioEntrega" onClick={()=>onClickCheck("moto")}>
                <p className="domicilioTitle">Seleccione un método de envío *</p>
                <div className={`card metodos ${check === "moto" && "radioSelected"}`}>
                    <Radio 
                        className="radio"
                        checked={defaultCheck("moto")}
                        id="radioButton1"
                        name="radioButton"
                    />
                    <TwoWheelerIcon color="primary" className="botonLogo"/>
                    <div>
                        <p className="title">Envío en motmo (sólo disponible en CABA)</p>
                        <p className="subtitle">Tu compra llegará en 24hs hábiles. En fecha festivas o especiales pueden surgir demoras.<br/>
                            Nos pondremos en contacto para coordinar el envío.
                        </p>
                        <p className="subtitle"></p>
                    </div>
                    <p style={{whiteSpace:"nowrap"}} className="precio"></p>
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
                    <HomeIcon color="primary" className="botonLogo"/>
                    <div>
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
                    <StorefrontIcon color="primary" className="botonLogo"/>
                    <div>
                        <p className="title">
                            <img src={oca} alt="OCA" />
                            Entrega en sucursal
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
                <Button className="botonContinuar">
                    CONTINUAR
                </Button>
            </div>
        </div>
    )
}

export default MetodoEnvio