import { Button, TextField } from "@mui/material"
import React,{useState,useContext} from "react"
import { useNavigate } from "react-router-dom";
import { UseFormContext } from "../../context/FormContext";
import Loader from "../Loader/Loader";

const ResumeBox = ({stateForm,botonPago,codDesc,setCodDesc,form})=>{
    const navigate = useNavigate();
    const {FormAPI}=useContext(UseFormContext)

    const [errorCodigo,setErrorCodigo]=useState(false)
    const [codigoValido,setCodigoValido]=useState(false)

    const [loader,setLoader]=useState(false)

    const handleChange= ()=>{
        const cod = document.getElementById("codigo").value
        setCodDesc(cod)
    }

    const handleClick = ()=>{
        setLoader(true)
        const formCodigo = new FormData()

        formCodigo.append('idcliente', 1231)
        formCodigo.append('codigo', document.getElementById("codigo").value)
        formCodigo.append('monto', 1231)
        formCodigo.append('idprovincia', 1)
        FormAPI(
            formCodigo,
            "promociones",
            "get_code"
        ).then((res)=>{
            if(res.status==="error"){
                setErrorCodigo(true)
                setCodigoValido(false)
                setLoader(false)
            }else if(res.status==="success"){
                setErrorCodigo(false)
                setCodigoValido(true)
                setLoader(false)
            }
        })
    }

    return(
        <div className="resumeBox">
            <div className="box firstBox">
                <p className="subtitulo">999 Productos</p>
                <p className="subtitulo p14">$ 130.561</p>
            </div>
            <div className="box">
                <p className="subtitulo">Envío</p>
                <p className="subtitulo p14">GRATIS</p>
            </div>
            {!stateForm && 
                <div className="boxInput">
                    <p className="subtitulo subtituloDesc" style={{color:errorCodigo ? "#FF3F20" : codigoValido ? "#13b574" : null}}>Código de descuento / Giftcard</p>
                    <div className="inputButton" style={{alignItems:errorCodigo ? "flex-start" : codigoValido ? "flex-start" : null}}>
                        <TextField placeholder="INGRESAR CÓDIGO"
                            size="small"
                            id="codigo"
                            onChangeCapture={()=>handleChange()}
                            onFocus={()=>setErrorCodigo(false)}
                            className={errorCodigo ? "inputCodigoError" : codigoValido ? "inputValido" : "inputCodigo"}
                            helperText={errorCodigo ? "Código incorrecto" : codigoValido ? "Código correcto" : null}
                        ></TextField>
                        {!loader ?
                            <Button
                                className="screen1000-codigo"
                                onClick={()=>handleClick()}
                                sx={{mt:errorCodigo ? "-20px" : codigoValido ? "-20px" : null}}
                            >
                                VALIDAR
                            </Button>
                        :
                            <Button
                                className="screen1000-codigo"
                                onClick={()=>handleClick()}
                                sx={{marginTop:errorCodigo ? "-20px" : codigoValido ? "-20px" : null,}}
                            >
                                <Loader spin={"spinnerS"} white={"spinnerWhite"}/>
                            </Button>
                        }
                    </div>
                </div>
            }
            <div className="box">
                <p className="subtitulo subtituloTotal">TOTAL:</p>
                <p className="subtitulo subtituloTotal">$ 127.199</p>
            </div>
            <div className="banner screen1000-banner" style={{marginBottom:stateForm && "24px",marginTop:stateForm && "16px"}}>
                BANNER
            </div>
            {botonPago && 
                <div className="botonFinalizar">
                    <Button
                        onClick={()=>navigate("/checkout")}
                        >
                        FINALIZAR COMPRA
                    </Button>
                </div>
            }
        </div>
    )
}

export default ResumeBox