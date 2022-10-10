import React from 'react'
import { Button } from '@mui/material';
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from '../../assets/img/isologo.png'

const PopUpNotis = () => {

  return (
    <div className="PopUpPerfil">
        <div className="fondoPopUp" 
            // onClick={()=>setRestorePassword(false)}
        ></div>
            <div className="popUp">
                <div className="popUpContainer">
                    <img src={MRlogoModal} alt="logo" className="logoModal"/>
                    <p className="popUpTitle">¿Seguro querés dejar de recibir notificaciones?</p>
                    <p className="popUpDescription">
                    Las notificaciones se usan para avisarte si hacés una venta, recibís mensajes, ofertas, etc.
                    Si las desactivás no recibirás toda esta información.
                    </p>
                    <div className='buttonContainer'>
                        <Button className="volver" >CANCELAR</Button>
                        <Button className="recordar">DEJAR DE RECIBIR</Button>
                    </div>
                    <img
                        // onClick={() => setRestorePassword(false)}
                        src={cruz} 
                        alt="CRUZ" className="cruz" 
                    />
            </div>
        </div>
    </div>
  )
}

export default PopUpNotis