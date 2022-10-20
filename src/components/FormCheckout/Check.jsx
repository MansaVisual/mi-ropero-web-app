import React,{useEffect,useState,useContext} from "react"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UseFormContext } from "../../context/FormContext";
import { UseLoginContext } from "../../context/LoginContext";

const CheckForm = ({estadoCompra})=>{
    const [metodoEnvio,setMetodoEnvio]=useState("")
    const navigate = useNavigate();

    const {FormAPI}=useContext(UseFormContext)
    const {userLog}=useContext(UseLoginContext)

    useEffect(() => {
        if(userLog!==""){
            setMetodoEnvio(JSON.parse(localStorage.getItem("metodoEnvioMiRopero")))
            const saveDireccion = JSON.parse(localStorage.getItem("saveDireccionMiRopero"))
            
            if(saveDireccion){
                const direccion = JSON.parse(localStorage.getItem("newDireccionMiRopero"))
                
                const dir = new FormData()
                dir.append("idcliente",userLog)
                dir.append("nombre",direccion.calle+" "+direccion.numero)
                dir.append("codigo_postal",direccion.codigo_postal)
                dir.append("provincia",direccion.provincia)
                dir.append("idprovincia",direccion.idprovincia)
                dir.append("idlocalidad",direccion.idlocalidad)
                dir.append("calle",direccion.calle)
                dir.append("numero",direccion.numero)
                dir.append("piso",direccion.piso)
                dir.append("departamento",direccion.departamento)
                dir.append("entre_calle_1",direccion.entre_calle_1)
                dir.append("entre_calle_2",direccion.entre_calle_2)
                dir.append("informacion_adicional",direccion.informacion_adicional)
                dir.append("normalized",direccion.raw_data)
                FormAPI(
                    dir,
                    "direcciones",
                    "insert"
                )
            }
        }
    }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className="checkContainer">
            {estadoCompra==="success" ?
                <>
                    <CheckCircleOutlineOutlinedIcon className="botonCheck"/>
                    <p className="felicidades">¡Felicidades!</p>
                    <p>Tu pago se procesó correctamente</p>

                    <div className="card">
                        <WhatsAppIcon className="logoWhap"/>
                        <p>
                            {metodoEnvio==="1"?"Nos comunicaremos con vos por Whatsapp a la brevedad para coordinar la entrega.":
                            "En el detalle de tu compra podrás ir viendo el seguimiento de la entrega por OCA."}
                        </p>
                    </div>

                    <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>

                    <Button className="misCompras" onClick={()=>navigate("/perfil/MIS COMPRAS")}>
                        IR A MIS COMPRAS
                    </Button>
                </>
            :
                <>
                    {estadoCompra==="error" ?
                        <>
                            <CancelOutlinedIcon className="botonError"/>
                            <p className="felicidades">¡Que lástima!</p>
                            <p>Algo no salió como esperábamos. Volvé a intentarlo.</p>
                            
                            <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>
                            
                            <Button className="misComprasFail" onClick={()=>navigate("/carrito")}>
                                VOLVER AL CARRITO
                            </Button>
                        </>
                    :
                        <>
                            <InfoOutlinedIcon className="botonInfo"/>
                            <p className="felicidades">¡Te esperamos!</p>
                            <p>La compra se encuentra "pendiente" hasta que se realice el pago.</p>
                            
                            <div className="fotoBannerCheckMobile screen1000-bannerCheckMobile"/>
                            
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