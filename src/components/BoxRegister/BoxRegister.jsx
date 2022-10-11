import React,{ useState } from 'react'
import { Button, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";

const BoxRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  return (
    <div className='boxRegisterContainer'>
          <p className='registerTitle'>REGISTRATE</p>
        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput">Nombre y apellido *</p>
              <TextField
                color="primary"
                className="input"
                size="small"
                placeholder="Sabrina Godoy"
                />
          </div>
          <div className="inputBox2">
            <p className="labelInput">Dirección de correo electrónico *</p>
            <TextField
              color="primary"
              className="input"
              size="small"
              placeholder="nombre@dominio.com"
            />
          </div>
        </div>
        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput">Contraseña *</p>
              <TextField
                color="primary"
                className="passwordInput"
                size="small"
                placeholder={showPassword ? "" : "● ● ● ● ● ● ● ● ● ● ●"}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? 
                      <Visibility sx={{fontSize:"20px",cursor:"pointer"}} onClick={()=>setShowPassword(!showPassword)}/> 
                      : <VisibilityOff sx={{fontSize:"20px",cursor:"pointer"}} onClick={()=>setShowPassword(!showPassword)}/>
                      }
                    </InputAdornment>
                  ),
                  style: {fontSize: 15} 
              }}
                />
          </div>
          <div className="inputBox2">
            <p className="labelInput">Confirmar contraseña *</p>
            <TextField
              color="primary"
              className="passwordInput"
              size="small"
              placeholder={showPassword2 ? "" : "● ● ● ● ● ● ● ● ● ● ●"}
              type={showPassword2 ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword2 ? 
                    <Visibility sx={{fontSize:"20px",cursor:"pointer"}} onClick={()=>setShowPassword2(!showPassword2)}/> 
                    : <VisibilityOff sx={{fontSize:"20px",cursor:"pointer"}} onClick={()=>setShowPassword2(!showPassword2)}/>
                    }
                  </InputAdornment>
                ),
                style: {fontSize: 15} 
              }}
            />
          </div>
        </div>
        <div className="buttonContainer">
          <Button className="left-button" onClick={()=>navigate("/login")}>VOLVER</Button>
          <Button className="right-button">REGISTRATE</Button>
        </div>
        <p className='bottomText'>
          Al oprimir REGISTRÁTE se aceptan los <span className='spanLink' style={{cursor:"pointer"}}>términos y condiciones</span> de Mi Ropero.
        </p>
    </div>
  )
}

export default BoxRegister