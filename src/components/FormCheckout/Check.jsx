import React from "react"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from "@mui/material";

const CheckForm = ({setTypeNav,estadoCompra})=>{
    return(
        <div className="checkContainer">
            {estadoCompra ?
                <>
                    <CheckCircleOutlineOutlinedIcon className="botonCheck"/>
                    <p className="felicidades">¡Felicidades!</p>
                    <p>Tu pago se procesó correctamente</p>

                    <div className="card">
                        <WhatsAppIcon className="logoWhap"/>
                        <p>Nos comunicaremos con vos por Whatsapp a la brevedad para coordinar la entrega.</p>
                    </div>

                    <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>

                    <Button className="misCompras">
                        IR A MIS COMPRAS
                    </Button>
                </>
            :
                <>
                    <CancelOutlinedIcon className="botonError"/>
                    <p className="felicidades">¡Que lástima!</p>
                    <p>Algo no salió como esperabamos. Vuelva a intentarlo</p>

                    <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>

                    <Button className="misComprasFail" onClick={()=>setTypeNav("tarjeta")}>
                        VOLVER
                    </Button>
                </>
            }
            
        </div>
    )
}

export default CheckForm    