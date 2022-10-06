import React from 'react'
import { Button, TextField } from '@mui/material';
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from '../../assets/img/MRlogoModal.png'

const RestorePopUp = ({setRestorePassword}) => {
  return (
    <div className="restorePasswordPopUp">
        <div className="fondoPopUp" onClick={()=>setRestorePassword(false)}></div>
            <div className="popUp">
                <div className="popUpContainer">
                    <img src={MRlogoModal} alt="logo" className="logoModal"/>
                    <p className="popUpTitle">OLVIDÉ MI CONTRASEÑA</p>
                    <p className="popUpDescription">Ingresa la dirección de email con la que te registraste
                        para recuperar tu contraseña de acceso
                    </p>
                    <TextField
                        color="primary"
                        className="popUpTextField"
                        size="small"
                        placeholder="nombre@dominio.com"
                        InputProps={{
                            style: {fontSize: 15} 
                            }}
                        />
                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                        <Button className="volver" >VOLVER</Button>
                        <Button className="recordar">RECORDAR</Button>
                    </div>
                    <img
                        onClick={() => setRestorePassword(false)}
                        src={cruz} 
                        alt="CRUZ" className="cruz" 
                    />
            </div>
        </div>
    </div>
  )
}

export default RestorePopUp