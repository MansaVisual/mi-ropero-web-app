import { Button, TextField } from "@mui/material"
import React,{useState,useContext} from "react"
import { useNavigate } from "react-router-dom";
import { UseCartContext } from "../../context/CartContext";
import { UseFormContext } from "../../context/FormContext";
import Loader from "../Loader/Loader";

const ResumeBox = ({stateForm,botonPago,codDesc,setCodDesc})=>{
    const navigate = useNavigate();

    const {FormAPI}=useContext(UseFormContext)
    const {costoCarrito,cantidadCarrito}=useContext(UseCartContext)

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
        formCodigo.append('codigo', codDesc)
        formCodigo.append('monto', 1800)
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
                <p className="subtitulo">{cantidadCarrito} Productos</p>
                {costoCarrito === false ?
                    <div className="subtitulo p14">
                        <Loader spin={"spinnerS"}/>
                    </div>
                :
                    <p className="subtitulo p14">$ {costoCarrito}</p>
                }
            </div>
            <div className="box">
                <p className="subtitulo">Envío</p>
                <p className="subtitulo p14">GRATIS</p>
            </div>
            {!stateForm ?
                <div className="boxInput">
                    <p className="subtitulo subtituloDesc">Código de descuento / Giftcard</p>
                    <div className="inputButton" style={{alignItems:errorCodigo ? "flex-start" : codigoValido ? "flex-start" : null,justifyContent:"space-between"}}>
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
                            >
                                VALIDAR
                            </Button>
                        :
                            <Button
                                className="screen1000-codigo"
                                sx={{marginTop:errorCodigo ? "0px" : codigoValido ? "0px" : null,}}
                            >
                                <Loader spin={"spinnerS"} white={"spinnerWhite"}/>
                            </Button>
                        }
                    </div>
                </div>
            :
                <div className="editorResumeBox"></div>
            }
            <div className="box">
                <p className="subtitulo subtituloTotal">TOTAL:</p>
                {costoCarrito === false ?
                    <div className="subtitulo p14">
                        <Loader spin={"spinnerS"}/>
                    </div>
                :
                    <p className="subtitulo subtituloTotal total"
                    style={{
                        textDecoration:codigoValido && "line-through",
                        color:codigoValido && "#969696"
                    }}>
                        $ {costoCarrito}
                    </p>
                }
            </div>
            {codigoValido && 
                <div className="box">
                    <p></p>
                    <p className="subtitulo subtituloTotal" style={{marginTop:"-24px"}}>$ 120.000</p>
                </div>
            }
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