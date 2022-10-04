import React from "react"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from "@mui/material";

const CheckForm = ()=>{
    return(
        <div className="checkContainer">
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
            
        </div>
    )
}

export default CheckForm    