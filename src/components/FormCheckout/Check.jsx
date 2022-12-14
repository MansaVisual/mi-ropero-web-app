import React,{useEffect,useState,useContext} from "react"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import { apiFetch } from "../../apiFetch/apiFetch";

const CheckForm = ({estadoCompra})=>{
    const [metodoEnvio,setMetodoEnvio]=useState("")
    const navigate = useNavigate();

    const {userLog}=useContext(UseLoginContext)

    const [compraConSaldo0,setCompraConSaldo0]=useState(false)

    useEffect(() => {
        if(userLog!==""){
            setMetodoEnvio(JSON.parse(localStorage.getItem("metodoEnvioMiRopero")))
            const saveDireccion = JSON.parse(localStorage.getItem("saveDireccionMiRopero"))
            const compraFinal = localStorage.getItem("compraFinalizadaMP")
            if(compraFinal){
                setCompraConSaldo0(true)
                localStorage.removeItem("compraFinalizadaMP")
            }

            if(saveDireccion){

                const direccion = JSON.parse(localStorage.getItem("newDireccionMiRopero"))
                const dir = new FormData()
                dir.append("idcliente",userLog)
                dir.append("nombre",direccion.calle+" "+direccion.numero)
                dir.append("codigo_postal",direccion.codigo_postal)
                dir.append("provincia",direccion.provincia)
                dir.append("idprovincia",direccion.idprovincia)
                dir.append("localidad",direccion.localidad)
                dir.append("idlocalidad",direccion.idlocalidad)
                dir.append("calle",direccion.calle)
                dir.append("numero",direccion.numero)
                dir.append("piso",direccion.piso)
                dir.append("departamento",direccion.departamento)
                dir.append("entre_calle_1",direccion.entre_calle_1)
                dir.append("entre_calle_2",direccion.entre_calle_2)
                dir.append("informacion_adicional",direccion.informacion_adicional)
                dir.append("normalized",direccion.raw_data)
                apiFetch(
                    dir,
                    "direcciones",
                    "insert"
                )
                localStorage.removeItem("newDireccionMiRopero")
                localStorage.removeItem("metodoEnvioMiRopero")
                localStorage.removeItem("saveDireccionMiRopero")
                localStorage.removeItem("idCompraAnalytics")
            }
        }
    }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className="checkContainer">
            {(estadoCompra==="success" || compraConSaldo0) ?
                <>
                    <CheckCircleOutlineOutlinedIcon className="botonCheck"/>
                    <p className="felicidades">??Felicidades!</p>
                    <p>Tu pago se proces?? correctamente</p>

                    <div className="card">
                        <WhatsAppIcon className="logoWhap"/>
                        <p>
                            {metodoEnvio==="1"?"Nos comunicaremos con vos por Whatsapp a la brevedad para coordinar la entrega.":
                            "En el detalle de tu compra podr??s ir viendo el seguimiento de la entrega por OCA."}
                        </p>
                    </div>

                    {/* <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/> */}

                    <Button className="misCompras" onClick={()=>navigate("/perfil/MIS COMPRAS")}>
                        IR A MIS COMPRAS
                    </Button>
                </>
            :
                <>
                    {estadoCompra==="error" ?
                        <>
                            <CancelOutlinedIcon className="botonError"/>
                            <p className="felicidades">??Que l??stima!</p>
                            <p>Algo no sali?? como esper??bamos. Volv?? a intentarlo.</p>
                            
                            <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>
                            
                            <Button className="misComprasFail" onClick={()=>navigate("/carrito")}>
                                VOLVER AL CARRITO
                            </Button>
                        </>
                    :
                        <>
                            <InfoOutlinedIcon className="botonInfo"/>
                            <p className="felicidades">??Te esperamos!</p>
                            <p>La compra se encuentra "pendiente" hasta que se realice el pago.</p>
                            
                            {/* <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/> */}
                            
                            <Button className="misComprasFail" onClick={()=>navigate("/perfil/MIS COMPRAS")}>
                                IR A MIS COMPRAS
                            </Button>
                        </>
                    }
                </>
            }
        </div>
    )
}

export default CheckForm    