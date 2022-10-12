import { TextField } from '@mui/material'
import React,{useContext} from 'react'
import { UseLoginContext } from '../../context/LoginContext';

const BoxLoginValidate = () => {
  const {LoginAPI}=useContext(UseLoginContext)
  const user = JSON.parse(localStorage.getItem("sendCodMiRopero"))
  
  const handleSendMail=()=>{
    const loginUser = new FormData()
    loginUser.append('idcliente', user.id)
    LoginAPI(
        loginUser,
        "clientes",
        "validate_send"
        ).then((res)=>{
            console.log(res)
            if(res.status==="success"){
                alert("Se envió el código")
            }else{
                alert("No se pudo enviar el código. Vuelva a intentarlo")
            }
        }
    )
  }
  return (
    <div className='boxValidateContainer'>
      <p className='validateTitle'>VALIDÁ TU CUENTA</p>
      <p className='descriptionText'>
          Te mandamos un código a la dirección de 
          email {user.mail} para que valides tu cuenta
      </p>
      <div className="inputBox">
          <p className="labelInput">Código de validación</p>
            <TextField
              color="primary"
              className="input"
              size="small"
              placeholder="● ● ● ●"
              />
      </div>
      <p className='resendText' onClick={()=>handleSendMail()}>
          Reenviar email de validación.
      </p>
    </div>
  )
}

export default BoxLoginValidate