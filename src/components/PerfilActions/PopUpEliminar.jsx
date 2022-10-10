import React from 'react'
import { Button } from '@mui/material';
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from '../../assets/img/isologo.png'

const PopUpEliminar = () => {

  return (
    <div className="PopUpPerfil">
        <div className="fondoPopUp" 
            // onClick={()=>setRestorePassword(false)}
        ></div>
            <div className="popUp">
                <div className="popUpContainer">
                    <img src={MRlogoModal} alt="logo" className="logoModal"/>
                    <p className="popUpTitle">¿Seguro querés eliminar tu cuenta?</p>
                    <p className="popUpDescription">
                        Se perderán todos los datos y no podrán ser recuperados luego.
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

export default PopUpEliminar