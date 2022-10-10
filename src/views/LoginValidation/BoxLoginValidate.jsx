import { TextField } from '@mui/material'
import React from 'react'

const BoxLoginValidate = () => {
  return (
    <div className='boxValidateContainer'>
        <p className='validateTitle'>VALIDÁ TU CUENTA</p>
        <p className='descriptionText'>
            Te mandamos un código a la dirección de 
            email sabrinagodoy@gmail.com para que valides tu cuenta
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
        <p className='resendText'>
            Reenviar email de validación.
        </p>
        </div>
  )
}

export default BoxLoginValidate