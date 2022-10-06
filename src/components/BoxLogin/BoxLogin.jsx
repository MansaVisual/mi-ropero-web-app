import React, {useState} from "react"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const BoxLogin = ()=>{
    const [showPassword, setShowPassword] = useState(false)

    return(
        <div className="boxLoginContianer">
            <p className="title">Continuar con Google o Facebook</p>
            <div>
                <Button className="boton" endIcon={<GoogleIcon/>}>INGRESAR CON GOOGLE</Button>
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
                        placeholder="● ● ● ● ● ● ● ● ● ● ●"
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
                    <p className="olvidoContraseña">Olvidé mi contraseña</p>
                </div>
            </div>

            <Button className="botonIngresar">INGRESAR</Button>
            <Button className="botonRegistrate">REGISTRATE</Button>
        </div>
    )
}


export default BoxLogin