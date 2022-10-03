import { Button, TextField } from "@mui/material"
import React from "react"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const BoxLogin = ()=>{

    return(
        <div className="boxLoginContianer">
            <p className="title">Continuar con Google o Facebook</p>
            <div>
                <Button className="boton" endIcon={<GoogleIcon />}>INGRESAR CON GOOGLE</Button>
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
                    />
                </div>
                <div className="inputBox2">
                    <p className="labelInput">Contraseña *</p>
                    <TextField
                        color="primary"
                        className="inputP"
                        size="small"
                        placeholder=" ● ● ● ● ● ● ● ● ●"
                        type={"password"}
                    />
                    <p className="olvidoContraseña">Olvidé mi constraseña</p>
                </div>
            </div>

            <Button />
            <Button />
        </div>
    )
}


export default BoxLogin