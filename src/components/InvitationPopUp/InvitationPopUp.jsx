import { Button } from '@mui/material'
import React from 'react'
import MRlogoModal from '../../assets/img/MRlogoModal.png'
import cruz from "../../assets/img/cruz.png";



const InvitationPopUp = ({setconfirmInvitation}) => {
  return (
    <div className="invitationPopUp">
    <div className="fondoPopUp" onClick={()=>setconfirmInvitation(false)}></div>
        <div className="popUp">
            <div className="popUpContainer">
                <img src={MRlogoModal} alt="logo" className="logoModal"/>
                <p className="popUpTitle">¡HOLA! Para comprar, ingresá a tu cuenta</p>
                <div className='buttonContainer'>
                    <Button className="cancelar">VOLVER</Button>
                    <Button className="continuar">INGRESAR</Button>
                </div>
                <img
                    onClick={() => setconfirmInvitation(false)}
                    src={cruz} 
                    alt="CRUZ" className="cruz" 
                />
        </div>
    </div>
</div>
  )
}

export default InvitationPopUp