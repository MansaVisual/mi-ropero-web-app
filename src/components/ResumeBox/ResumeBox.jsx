import { Button, TextField } from "@mui/material"
import React,{useState,useContext,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { UseCartContext } from "../../context/CartContext";
import { UseFormContext } from "../../context/FormContext";
import Loader from "../Loader/Loader";

const ResumeBox = ({stateForm,botonPago,codDesc,setCodDesc,metodoEnvio})=>{
    const navigate = useNavigate();

    const {FormAPI,costoSucDom,costoSucSuc,costoMoto}=useContext(UseFormContext)
    const {costoCarrito,cantidadCarrito}=useContext(UseCartContext)

    const [errorCodigo,setErrorCodigo]=useState(false)
    const [codigoValido,setCodigoValido]=useState(false)

    const [loader,setLoader]=useState(false)

    const [codigo,setCodigo]=useState("")
    const [costoFinal,setCostoFinal]=useState(false)

    const [debe,setDebe]=useState(0)
    const [haber,setHaber]=useState(0)
    const [balance,setBalance]=useState(0)

    useEffect(()=>{
        const cuentaCorriente=new FormData()
        cuentaCorriente.append("idcliente",68)
        FormAPI(
            cuentaCorriente,
            "cuentascorrientes",
            "balance"
        ).then((res)=>{
            if(res.status==="success"){
                setDebe(res.result.debe)
                setHaber(res.result.haber)
            }
        })
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        setBalance(debe-haber)
        console.log(balance)
    },[debe,haber]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let costoEnv=metodoEnvio==="345837"?costoSucDom:metodoEnvio==="345838"?costoSucSuc:metodoEnvio==="1"?costoMoto.precio:0
        setCostoFinal(costoCarrito+Number(costoEnv))
    }, [metodoEnvio]);// eslint-disable-line react-hooks/exhaustive-deps



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
                setCodigo("")
            }else if(res.status==="success"){
                console.log(res)
                setErrorCodigo(false)
                setCodigoValido(true)
                setLoader(false)
                setCodigo(res)
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
                    <p className="subtitulo p14">
                        {costoCarrito===0?<Loader spin={"spinnerS"}/>:`$ ${costoCarrito}`}
                    </p>
                }
            </div>
            {metodoEnvio!=="" && 
                <div className="box">
                    <p className="subtitulo">Envío</p>
                    <p className="subtitulo p14">$ {metodoEnvio==="345837"?costoSucDom: metodoEnvio==="345838"?costoSucSuc:costoMoto.precio}</p>
                </div>
            }
            {balance!==0 && !stateForm && 
                <div className="box">
                    <p className="subtitulo">Saldo disponible</p>
                    <p className="subtitulo p14">$ {balance}</p>
                </div>
            }
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
                            sx={{      
                                "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": {
                                  borderColor:((errorCodigo)&& "#FF3F20")
                                }
                              }
                            }}
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
                        textDecoration:(codigoValido || (balance!==0 && !stateForm)) && "line-through",
                        color:(codigoValido || (balance!==0 && !stateForm)) && "#969696"
                    }}>
                        {metodoEnvio===""?
                            costoCarrito===0?<Loader spin={"spinnerS"}/>:`$ ${costoCarrito}`
                        :
                            `$ ${costoFinal}`
                        }
                    </p>
                }
            </div>

            {codigoValido && 
                <div className="box" style={{marginTop:"-12px"}}>
                    <p style={{margin:"0px"}}>Descuento</p>
                    <p className="subtitulo subtituloTotal" style={{textDecoration:"line-through",color:"#969696",fontWeight:"600"}}>
                        $ {codigo.result.tipo_descuento==="1"?codigo.result.monto>costoFinal?costoFinal:costoFinal-codigo.result.monto:codigo.result.tipo_descuento==="2"&&(costoFinal-costoFinal*codigo.result.monto/100).toFixed(2)}
                    </p>
                </div>
            }
            {codigoValido && balance===0 && 
                <div className="box">
                    <p></p>
                    <p className="subtitulo subtituloTotal" style={{marginTop:"-24px"}}>
                        $ {codigo.result.tipo_descuento==="1"?codigo.result.monto>costoFinal?costoFinal:costoFinal-codigo.result:codigo.result.tipo_descuento==="2"&&(costoFinal-costoFinal*codigo.result.monto/100).toFixed(2)}
                    </p>
                </div>
            }
            {balance!==0 && !stateForm && 
                <div className="box" style={{marginTop:"-12px"}}>
                    <p style={{margin:"0px"}}>Saldo usado</p>
                    <p className="subtitulo subtituloTotal" style={{textDecoration:"line-through",color:"#969696",fontWeight:"600"}}>
                        $ {codigoValido?
                            codigo.result.tipo_descuento==="1"?
                            (costoFinal-codigo.result.monto-balance).toFixed(2)<0?0:(costoFinal-codigo.result.monto-balance).toFixed(2):
                            codigo.result.tipo_descuento==="2"
                            &&(costoFinal-costoFinal*codigo.result.monto/100-balance).toFixed(2)<0?(costoFinal-(costoFinal-costoFinal*codigo.result.monto/100)).toFixed(2):(costoFinal-costoFinal*codigo.result.monto/100-balance).toFixed(2)
                        
                        :
                            (balance-costoFinal)<0?balance:(costoFinal)
                        }
                    </p>
                </div>
            }
            {balance!==0 && !stateForm && !codigoValido && 
                <div className="box">
                    <p></p>
                    <p className="subtitulo subtituloTotal" style={{marginTop:"-24px"}}>
                        $ {(costoFinal-balance).toFixed(2)<0?0:(costoFinal-balance).toFixed(2)}
                    </p>
                </div>
            }
            {balance!==0 && !stateForm && codigoValido && 
                <div className="box">
                    <p></p>
                    <p className="subtitulo subtituloTotal" style={{marginTop:"-40px"}}>
                        $ {codigo.result.tipo_descuento==="1"?
                            (costoFinal-codigo.result.monto-balance).toFixed(2)<0?0:(costoFinal-codigo.result.monto-balance).toFixed(2):
                            codigo.result.tipo_descuento==="2"
                            &&(costoFinal-costoFinal*codigo.result.monto/100-balance).toFixed(2)<0?0:(costoFinal-costoFinal*codigo.result.monto/100-balance).toFixed(2)
                        }
                    </p>
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