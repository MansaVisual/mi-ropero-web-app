import { Button, TextField } from "@mui/material"
import React,{useState,useContext,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { UseCartContext } from "../../context/CartContext";
import { UseFormContext } from "../../context/FormContext";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../Loader/Loader";

const ResumeBox = ({stateForm,botonPago,codDesc,setCodDesc,metodoEnvio})=>{
    const navigate = useNavigate();

    const {userLog}=useContext(UseLoginContext)
    const {FormAPI,costoSucDom,costoSucSuc,costoMoto}=useContext(UseFormContext)
    const {costoCarrito,cantidadCarrito}=useContext(UseCartContext)

    const [errorCodigo,setErrorCodigo]=useState(false)
    const [codigoValido,setCodigoValido]=useState(false)

    const [loader,setLoader]=useState(false)

    const [codigo,setCodigo]=useState("")
    const [costoEnvio,setCostoEnvio]=useState(false)
    const [costoFinal,setCostoFinal]=useState(false)
    const [costoDesc,setCostoDesc]=useState(false)

    const [debe,setDebe]=useState(0)
    const [haber,setHaber]=useState(0)
    const [balance,setBalance]=useState(0)

    useEffect(()=>{
        const cuentaCorriente=new FormData()
        cuentaCorriente.append("idcliente",userLog)
        FormAPI(
            cuentaCorriente,
            "cuentascorrientes",
            "balance"
        ).then((res)=>{
            if(res.status==="success"){
                setDebe(6000)
                setHaber(100)
            }
        })
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        setBalance(debe-haber)
    },[debe,haber]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let costoEnv=metodoEnvio==="345837"?costoSucDom:metodoEnvio==="345838"?costoSucSuc:metodoEnvio==="1"?costoMoto.precio:0
        setCostoEnvio(Number(costoEnv).toFixed(2))
        setCostoFinal(costoCarrito+Number(costoEnv))
    }, [metodoEnvio]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(codigo!==""){
            setCostoDesc(codigo.result.monto)
        }
    },[codigo]);// eslint-disable-line react-hooks/exhaustive-deps



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
                        {costoCarrito===0?<Loader spin={"spinnerS"}/>:`$ ${costoCarrito.toFixed(2)}`}
                    </p>
                }
            </div>
            {codigoValido && codigo.result.tipo_text==="Aplica a productos" && 
                <div className="box">
                    <p className="subtitulo">Descuento</p>
                    <p className="subtitulo p14">
                        - $ {
                            codigo.result.tipo_descuento==="1"?
                                costoCarrito-costoDesc>0?costoDesc:costoCarrito.toFixed(2)
                            :codigo.result.tipo_descuento==="2"&&
                            costoDesc==="100.00"?costoCarrito.toFixed(2):(costoCarrito*costoDesc/100).toFixed(2)
                        }
                    </p>
                </div>
            }


            {metodoEnvio!=="" && 
                <div className="box">
                    <p className="subtitulo">Envío</p>
                    <p className="subtitulo p14">$ {costoEnvio}</p>
                </div>
            }
            {codigoValido && codigo.result.tipo_text==="Aplica a envio" && 
                <div className="box">
                    <p className="subtitulo">Descuento</p>
                    <p className="subtitulo p14">
                        - $ {
                            codigo.result.tipo_descuento==="1"?
                                costoEnvio-costoDesc>0?costoDesc:costoEnvio
                            :codigo.result.tipo_descuento==="2"&&
                            costoDesc==="100.00"?costoEnvio:(costoEnvio*costoDesc/100).toFixed(2)
                        }
                    </p>
                </div>
            }


            {balance!==0 && !stateForm && 
                <div className="box">
                    <p className="subtitulo">Saldo disponible</p>
                    <p className="subtitulo p14">$ {balance.toFixed(2)}</p>
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
                            costoCarrito===0?<Loader spin={"spinnerS"}/>:`$ ${costoCarrito.toFixed(2)}`
                        :
                            `$ ${costoFinal.toFixed(2)}`
                        }
                    </p>
                }
            </div>

            {codigoValido && 
                <div className="box" style={{marginTop:"-12px"}}>
                    <p style={{margin:"0px"}} className="subtitulo">Descuento</p>
                    <p className="subtitulo subtituloTotal" style={{color:"#969696",fontWeight:"600"}}>
                        {
                            codigo.result.tipo_text==="Aplica a productos"?
                                `- $ ${
                                    codigo.result.tipo_descuento==="1"?
                                        costoCarrito-costoDesc>0?costoDesc:costoCarrito.toFixed(2)
                                    :codigo.result.tipo_descuento==="2"&&
                                    costoDesc==="100.00"?costoCarrito.toFixed(2):(costoCarrito*costoDesc/100).toFixed(2)
                                }`
                            :codigo.result.tipo_text==="Aplica a envio"?
                                `- $ ${
                                    codigo.result.tipo_descuento==="1"?
                                        costoEnvio-costoDesc>0?costoDesc:costoEnvio
                                    :codigo.result.tipo_descuento==="2"&&
                                        costoDesc==="100.00"?costoEnvio:(costoEnvio*costoDesc/100).toFixed(2)
                                }`
                            :codigo.result.tipo_text==="Aplica a productos + envio"&&
                            `- $ ${
                                codigo.result.tipo_descuento==="1"?
                                    costoFinal-costoDesc>0?costoDesc:costoFinal.toFixed(2)
                                :codigo.result.tipo_descuento==="2"&&
                                    costoDesc==="100.00"?costoFinal.toFixed(2):(costoFinal*costoDesc/100).toFixed(2)
                            }`
                        }
                    </p>
                </div>
            }

            {balance!==0 && !stateForm && 
                <div className="box" style={{marginTop:"-12px"}}>
                    <p style={{margin:"0px"}} className="subtitulo">Saldo usado</p>
                    <p className="subtitulo subtituloTotal" style={{color:"#969696",fontWeight:"600"}}>
                        {
                            codigoValido?
                                codigo.result.tipo_text==="Aplica a productos"?
                                    `- $ ${
                                        codigo.result.tipo_descuento==="1"?
                                            costoFinal-(costoDesc>costoCarrito?costoCarrito:costoDesc)-balance>0?balance.toFixed(2):costoDesc>costoCarrito?(costoFinal-costoCarrito).toFixed(2):(costoFinal-costoDesc).toFixed(2)
                                        :codigo.result.tipo_descuento==="2"&&
                                            costoDesc==="100.00"?
                                                costoEnvio-balance>0?balance.toFixed(2):costoEnvio
                                            :costoFinal-(costoCarrito*costoDesc/100)-balance>0?balance.toFixed(2):(costoFinal-(costoCarrito*costoDesc/100)).toFixed(2)
                                    }`
                                :codigo.result.tipo_text==="Aplica a envio"?
                                    `- $ ${
                                        codigo.result.tipo_descuento==="1"?
                                            costoFinal-(costoDesc>costoEnvio?costoEnvio:costoDesc)-balance>0?balance.toFixed(2):costoDesc>costoEnvio?(costoFinal-costoEnvio).toFixed(2):(costoFinal-costoDesc).toFixed(2)
                                        :codigo.result.tipo_descuento==="2"&&
                                            costoDesc==="100.00"?
                                                costoCarrito-balance>0?balance.toFixed(2):costoCarrito
                                            :costoFinal-(costoEnvio*costoDesc/100)-balance>0?balance.toFixed(2):(costoFinal-(costoEnvio*costoDesc/100)).toFixed(2)
                                    }`
                                :codigo.result.tipo_text==="Aplica a productos + envio"&&
                                `- $ ${
                                    codigo.result.tipo_descuento==="1"?
                                        costoFinal-(costoDesc>costoFinal?costoFinal:costoDesc)-balance>0?balance.toFixed(2):costoDesc>costoFinal?0:(costoFinal-costoDesc).toFixed(2)
                                    :codigo.result.tipo_descuento==="2"&&
                                        costoDesc==="100.00"?
                                            0
                                        :costoFinal-(costoFinal*costoDesc/100)-balance>0?balance.toFixed(2):(costoFinal-(costoFinal*costoDesc/100)).toFixed(2)
                                }`
                            : `$ ${(costoFinal-balance).toFixed(2)<0?costoFinal:(balance).toFixed(2)}`
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
                        {
                            codigo.result.tipo_text==="Aplica a productos"?
                            `$ ${
                                codigo.result.tipo_descuento==="1"?
                                    costoFinal-(costoDesc>costoCarrito?costoCarrito:costoDesc)-balance>0?costoFinal-(costoDesc>costoCarrito?costoCarrito:costoDesc)-balance:0
                                :codigo.result.tipo_descuento==="2"&&
                                    costoDesc==="100.00"?
                                        costoEnvio-balance>0?costoEnvio-balance:0
                                    :costoFinal-(costoCarrito*costoDesc/100)-balance>0?costoFinal-(costoCarrito*costoDesc/100)-balance:0
                            }`
                            :codigo.result.tipo_text==="Aplica a envio"?
                                `$ ${
                                    codigo.result.tipo_descuento==="1"?
                                        costoFinal-(costoDesc>costoEnvio?costoEnvio:costoDesc)-balance>0?costoFinal-(costoDesc>costoEnvio?costoEnvio:costoDesc)-balance:0
                                    :codigo.result.tipo_descuento==="2"&&
                                        costoDesc==="100.00"?
                                            costoCarrito-balance>0?costoCarrito-balance:0
                                        :costoFinal-(costoEnvio*costoDesc/100)-balance>0?costoFinal-(costoEnvio*costoDesc/100)-balance:0
                                }`
                            :codigo.result.tipo_text==="Aplica a productos + envio"&&
                            `$ ${
                                codigo.result.tipo_descuento==="1"?
                                    costoFinal-(costoDesc>costoFinal?costoFinal:costoDesc)-balance>0?costoFinal-(costoDesc>costoFinal?costoFinal:costoDesc)-balance:0
                                :codigo.result.tipo_descuento==="2"&&
                                    costoDesc==="100.00"?
                                        0
                                    :costoFinal-(costoFinal*costoDesc/100)-balance>0?costoFinal-(costoFinal*costoDesc/100)-balance:0
                            }`
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