import React,{useEffect,useState} from "react"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button } from "@mui/material";

const CheckForm = ({setTypeNav,estadoCompra})=>{
    const [metodoEnvio,setMetodoEnvio]=useState("")

    useEffect(() => {
        setMetodoEnvio(JSON.parse(localStorage.getItem("metodoEnvioMiRopero")))

        if(estadoCompra==="success"){
            const saveDireccion = JSON.parse(localStorage.getItem("saveDireccionMiRopero"))
            
            if(saveDireccion){
                const direccion = JSON.parse(localStorage.getItem("newDireccionMiRopero"))
                const dir = new FormData()
                dir.append("int",68)
                dir.append("nombre",direccion.calle+" "+direccion.numero)
                dir.append("codigo_postal",direccion.codigo_postal)
                dir.append("provincia",direccion.provincia)
                // dir.append("",direccion.)
                // dir.append("",direccion.)
                dir.append("calle",direccion.calle)
                dir.append("numero",direccion.numero)
                dir.append("piso",direccion.piso)
                dir.append("departamento",direccion.departamento)
                dir.append("entre_calle_1",direccion.entre_calle_1)
                dir.append("entre_calle_2",direccion.entre_calle_2)
                dir.append("informacion_adicional",direccion.informacion_adicional)
                // dir.append("",direccion.)
            }
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className="checkContainer">
            {estadoCompra==="success" ?
                <>
                    <CheckCircleOutlineOutlinedIcon className="botonCheck"/>
                    <p className="felicidades">¡Felicidades!</p>
                    <p>Tu pago se procesó correctamente</p>

                    <div className="card">
                        <WhatsAppIcon className="logoWhap"/>
                        <p>
                            {metodoEnvio==="1"?"Nos comunicaremos con vos por Whatsapp a la brevedad para coordinar la entrega.":
                            "En el detalle de tu compra podrás ir viendo el seguimiento de la entrega por OCA."}
                        </p>
                    </div>

                    <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>

                    <Button className="misCompras">
                        IR A MIS COMPRAS
                    </Button>
                </>
            :
                <>
                    {estadoCompra==="error" ?
                        <>
                            <CancelOutlinedIcon className="botonError"/>
                            <p className="felicidades">¡Que lástima!</p>
                            <p>Algo no salió como esperabamos. Vuelva a intentarlo.</p>
                            
                            <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>
                            
                            <Button className="misComprasFail" onClick={()=>setTypeNav("tarjeta")}>
                                VOLVER
                            </Button>
                        </>
                    :
                        <>
                            <InfoOutlinedIcon className="botonInfo"/>
                            <p className="felicidades">¡Te estamos esperando!</p>
                            <p>La compra esta en estado "pendiente".</p>
                            
                            <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>
                            
                            <Button className="misComprasFail">
                                ACEPTAR
                            </Button>
                        </>
                    }
                </>
            }
        </div>
    )
}

export default CheckForm    