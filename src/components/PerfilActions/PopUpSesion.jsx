import React from 'react'
import { Button } from '@mui/material';
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from '../../assets/img/isologo.png'

const PopUpSesion = () => {

  return (
    <div className="PopUpPerfil">
        <div className="fondoPopUp" 
            // onClick={()=>setRestorePassword(false)}
        ></div>
            <div className="popUp">
                <div className="popUpContainer">
                    <img src={MRlogoModal} alt="logo" className="logoModal"/>
                    <p className="popUpTitle">¿Seguro querés cerrar sesión?</p>
                    <p className="popUpDescription">
                        Luego podrás ingresar con tu cuenta de Mi Ropero, Google o Facebook.
                    </p>
                    <div className='buttonContainer'>
                        <Button className="volver" >CANCELAR</Button>
                        <Button className="recordar">CERRAR SESIÓN</Button>
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

export default PopUpSesion