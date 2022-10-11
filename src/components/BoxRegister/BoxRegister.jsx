import React,{ useState } from 'react'
import { Button, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Loader from '../Loader/Loader';

const BoxRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const [errorPass,setErrorPass]=useState(false)
  const [campoObligatorio,setCampoObligatorio]=useState(false)
  const [load,setLoad]=useState(false)

  const handleRegistrar=()=>{
    setErrorPass(false)
    setCampoObligatorio(false)
    setLoad(true)
    if(document.getElementById("nombreApellido").value==="" || document.getElementById("email").value===""
    || document.getElementById("password").value==="" || document.getElementById("password2").value===""){
      setCampoObligatorio(true)
      setLoad(false)
      return
    }
    if(document.getElementById("password").value!==document.getElementById("password2").value){
      setErrorPass(true)
      setLoad(false)
      return
    }
  }

  return (
    <div className='boxRegisterContainer'>
        <p className='registerTitle'>REGISTRATE</p>

        {campoObligatorio &&
          <div style={{width:"662px"}}>
              <div className="errorBox">
                  <CancelOutlinedIcon color="secondary" className="cruz"/>
                  <p>Debe completar los campos.</p>
              </div>
          </div>
        }
        {errorPass &&
          <div style={{width:"662px"}}>
              <div className="errorBox">
                  <CancelOutlinedIcon color="secondary" className="cruz"/>
                  <p>Las contraseñas no coinciden.</p>
              </div>
          </div>
        }

        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput" style={{color:campoObligatorio&&"#FF3F20"}}>Nombre y apellido *</p>
              <TextField
                color={campoObligatorio?"secondary":"primary"}
                className="input"
                size="small"
                placeholder="Sabrina Godoy"
                id="nombreApellido"
                onChangeCapture={()=>setCampoObligatorio(false)}
                inputProps={{
                  style:{border:campoObligatorio&&"1px solid #FF3F20"}
                }}
                />
          </div>
          <div className="inputBox2">
            <p className="labelInput" style={{color:campoObligatorio&&"#FF3F20"}}>Dirección de correo electrónico *</p>
            <TextField
              color={campoObligatorio?"secondary":"primary"}
              className="input"
              size="small"
              placeholder="nombre@dominio.com"
              id="email"
              onChangeCapture={()=>setCampoObligatorio(false)}
              inputProps={{
                style:{border:campoObligatorio&&"1px solid #FF3F20"}
              }}
            />
          </div>
        </div>
        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput" style={{color:(campoObligatorio || errorPass)&&"#FF3F20"}}>Contraseña *</p>
              <TextField
                color={(campoObligatorio || errorPass)?"secondary":"primary"}
                className="passwordInput"
                size="small"
                placeholder={showPassword ? "" : "● ● ● ● ● ● ● ● ● ● ●"}
                type={showPassword ? 'text' : 'password'}
                id="password"
                onChangeCapture={()=>{setCampoObligatorio(false);setErrorPass(false)}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? 
                      <Visibility sx={{fontSize:"20px",cursor:"pointer"}} onClick={()=>setShowPassword(!showPassword)}/> 
                      : <VisibilityOff sx={{fontSize:"20px",cursor:"pointer"}} onClick={()=>setShowPassword(!showPassword)}/>
                      }
                    </InputAdornment>
                  ),
                  style: {fontSize: 15,border:(campoObligatorio || errorPass)&&"1px solid #FF3F20"} 
              }}
                />
          </div>
          <div className="inputBox2">
            <p className="labelInput" style={{color:(campoObligatorio || errorPass)&&"#FF3F20"}}>Confirmar contraseña *</p>
            <TextField
              color={(campoObligatorio || errorPass)?"secondary":"primary"}
              className="passwordInput"
              size="small"
              placeholder={showPassword2 ? "" : "● ● ● ● ● ● ● ● ● ● ●"}
              id="password2"
              onChangeCapture={()=>{setCampoObligatorio(false);setErrorPass(false)}}
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
                style: {fontSize: 15,border:(campoObligatorio || errorPass)&&"1px solid #FF3F20"} 
              }}
            />
          </div>
        </div>
        <div className="buttonContainer">
          <Button className="left-button" onClick={()=>navigate("/login")}>VOLVER</Button>
          {load ?
            <div style={{marginTop:"24px",marginLeft:"32px"}}>
                <Loader spin={"spinnerM"}/>
            </div>
          :
            <Button className="right-button" onClick={()=>handleRegistrar()}>REGISTRATE</Button>
          }
        </div>
        <p className='bottomText'>
          Al oprimir REGISTRÁTE se aceptan los <span className='spanLink' style={{cursor:"pointer"}}>términos y condiciones</span> de Mi Ropero.
        </p>
    </div>
  )
}

export default BoxRegister