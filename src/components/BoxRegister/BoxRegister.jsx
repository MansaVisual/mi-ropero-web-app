import React,{ useState,useContext } from 'react'
import { Button, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Loader from '../Loader/Loader';
import { UseLoginContext } from '../../context/LoginContext';

const BoxRegister = () => {
  const navigate = useNavigate();
  const {LoginAPI}=useContext(UseLoginContext)

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const [errorPass,setErrorPass]=useState(false)
  const [campoObligatorio,setCampoObligatorio]=useState(false)
  const [errorNewMail,setErrorNewMail]=useState(false)
  const [load,setLoad]=useState(false)


  const handleRegistrar=async()=>{
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
    // navigate("/validacionLogin")
    const loginUser = new FormData()
    loginUser.append('email', document.getElementById("email").value)
    loginUser.append('clave', document.getElementById("password").value)
    loginUser.append('nombre', document.getElementById("nombreApellido").value)
    loginUser.append('apellido', "test")
    await LoginAPI(
      loginUser,
      "clientes",
      "insert"
      ).then(async(res)=>{
        console.log(res)
        if(res.status==="success"){
          const validateCod = new FormData()
          validateCod.append("idcliente",res.result.idcliente)
          await LoginAPI(
            validateCod,
            "clientes",
            "validate_send"
            ).then((res)=>{
              setLoad(false)
              if(res.status==="success"){
              localStorage.setItem("sendCodMiRopero",res.result.idcliente)
              navigate("/validacionLogin")
            }else{
              alert("Ocurrió un problema. Vuelva a intentarlo")
            }
          })
        }else{
          if(res.result==="El email ya se encuentra registrado"){
            setErrorNewMail(true)
            setLoad(false)
          }
        }
    })

    // const loginUserE = new FormData()
    // loginUserE.append('idcliente', "24903")
    // await LoginAPI(
    //     loginUserE,
    //     "clientes",
    //     "delete"
    // ).then((res)=>{
    //     console.log(res)
    // })
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
        {errorNewMail &&
          <div style={{width:"662px"}}>
              <div className="errorBox">
                  <CancelOutlinedIcon color="secondary" className="cruz"/>
                  <p>El mail ya se encuentra en uso.</p>
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
            <p className="labelInput" style={{color:(campoObligatorio || errorNewMail)&&"#FF3F20"}}>Dirección de correo electrónico *</p>
            <TextField
              color={(campoObligatorio || errorNewMail)?"secondary":"primary"}
              className="input"
              size="small"
              placeholder="nombre@dominio.com"
              id="email"
              onChangeCapture={()=>{setCampoObligatorio(false);setErrorNewMail(false)}}
              inputProps={{
                style:{border:(campoObligatorio || errorNewMail)&&"1px solid #FF3F20"}
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
          <Button className="left-button" onClick={load?null:()=>navigate("/login")}>VOLVER</Button>
          {load ?
            <div style={{marginTop:"24px",marginLeft:"32px"}}>
                <Loader spin={"spinnerM"}/>
            </div>
          :
            <Button className="right-button" onClick={load?null:()=>handleRegistrar()}>REGISTRATE</Button>
          }
        </div>
        <p className='bottomText'>
          Al oprimir REGISTRÁTE se aceptan los <span className='spanLink' style={{cursor:"pointer"}}>términos y condiciones</span> de Mi Ropero.
        </p>
    </div>
  )
}

export default BoxRegister