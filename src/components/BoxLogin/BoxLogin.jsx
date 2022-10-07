import React, {useState} from "react"
import { Button, InputAdornment, TextField } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleLogo from '../../assets/img/google.png'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RestorePopUp from "./RestorePopUp";
import ValidationPopUp from "./ValidationPopUp";


const BoxLogin = ()=>{
    const [showPassword, setShowPassword] = useState(false)
    const [restorePassword, setRestorePassword] = useState(false)
    const [confirmValidation, setconfirmValidation] = useState(true)

    return(
    <>
        <div className="boxLoginContianer">
            <p className="title">Continuar con Google o Facebook</p>
            <div className="buttonWrapper">
                <div>  
                    <Button className="botonGoogle" /* endIcon={<GoogleIcon/> }*/>INGRESAR CON GOOGLE</Button>
                    <img src={GoogleLogo} className="googleICon" alt="googleICon" /> 
                </div>   
                <Button className="botonFB" endIcon={<FacebookIcon/>}>INGRESAR CON FACEBOOK</Button>
            </div>

            <p className="title">Continuar con tu email</p>
            <div className="inputContainer">
                <div className="inputBox">
                    <p className="labelInput">Dirección de correo electrónico *</p>
                    <TextField
                        color="primary"
                        className="input"
                        size="small"
                        placeholder="sabrinagodoy@gmail.com"
                        InputProps={{
                            style: {fontSize: 15} 
                          }}
                    />
                </div>
                <div className="inputBox2">
                    <p className="labelInput">Contraseña *</p>
                    <TextField
                        color="primary"
                        className="inputP"
                        size="small"
                        placeholder={showPassword ? "" : "● ● ● ● ● ● ● ● ● ● ●"}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {showPassword ? 
                                <Visibility sx={{fontSize:"20px"}} onClick={()=>setShowPassword(!showPassword)}/> 
                                : <VisibilityOff sx={{fontSize:"20px"}} onClick={()=>setShowPassword(!showPassword)}/>
                                }
                              </InputAdornment>
                            ),
                            style: {fontSize: 15} 
                          }}
                    />
                    <p onClick={() => setRestorePassword(true)} className="olvidoContraseña">Olvidé mi contraseña</p>
                </div>
            </div>
            <div className="buttonContainer">
                <Button className="botonIngresar">INGRESAR</Button>
                <Button className="botonRegistrate">REGISTRATE</Button>          
            </div>              
        </div>
        {restorePassword &&
                <RestorePopUp setRestorePassword={setRestorePassword}/>
        }
        {confirmValidation &&
                <ValidationPopUp setconfirmValidation={setconfirmValidation}/>
        }
    </>
    )
}


export default BoxLogin