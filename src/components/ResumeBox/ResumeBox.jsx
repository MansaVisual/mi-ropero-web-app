import { Button, TextField } from "@mui/material"
import React,{useState} from "react"
import { useNavigate } from "react-router-dom";

const ResumeBox = ({stateForm,botonPago})=>{
    const navigate = useNavigate();

    const [codigo,setCodigo]=useState("")
    const [codigoValido,setCodigoValido]=useState(true)


    const handleChange= ()=>{
        const cod = document.getElementById("codigo").value
        setCodigoValido(true)
        setCodigo(cod)
    }
    const handleClick = ()=>{
        setCodigoValido(true)
        if(codigo!==""){
            alert(codigo)
        }else{
            document.getElementById("codigo").focus()
            setCodigoValido(false)
        }
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
                    <p className="subtitulo subtituloDesc">Código de descuento / Giftcard</p>
                    <div className="inputButton">
                        <TextField placeholder="INGRESAR CÓDIGO"
                            size="small"
                            id="codigo"
                            color={`${codigoValido ? "primary" : "secondary"}`}
                            onChangeCapture={()=>handleChange()}
                            ></TextField>
                        <Button
                            className="screen1000-codigo"
                            onClick={()=>handleClick()}
                            >
                            VALIDAR
                        </Button>
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