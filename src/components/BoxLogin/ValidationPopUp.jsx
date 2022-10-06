import { Button, TextField } from '@mui/material';
import React from 'react'
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from '../../assets/img/MRlogoModal.png'

const ValidationPopUp = ({setconfirmValidation}) => {
  return (
    <div className="restorePasswordPopUp">
    <div className="fondoPopUp" onClick={()=>setconfirmValidation(false)}></div>
        <div className="popUp">
            <div className="popUpContainer">
                <img src={MRlogoModal} alt="logo" className="logoModal"/>
                <p className="popUpTitle">EL CÓDIGO DE VALIDACIÓN SE ENVIÓ CORRECTAMENTE</p>
                <p className="popUpDescription">
                    Deberia llegarte en menos de 2 minutos en tu email, 
                    sino luego de ese tiempo no lo recibiste hace click acá.
                </p>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",marginBottom:"24px"}}>
                    <Button className="volver" >CANCELAR</Button>
                    <Button className="recordar">CONTINUAR</Button>
                </div>
                <img
                    onClick={() => setconfirmValidation(false)}
                    src={cruz} 
                    alt="CRUZ" className="cruz" 
                />
        </div>
    </div>
</div>
  )
}

export default ValidationPopUp