import React, {useContext} from "react"
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Button, useMediaQuery } from "@mui/material";
import oca from "../../assets/img/OCA.png"
import theme from "../../styles/theme";
import { UseCartContext } from "../../context/CartContext";
import { UseFormContext } from "../../context/FormContext";

const Tarjeta = ({setTypeNav,setMetodoEnvio,direccion})=>{
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
    const {carrito}=useContext(UseCartContext)
    const {setCostoSucDom,setCostoSucSuc}=useContext(UseFormContext)

    return(
        <div className="tarjetaContenedor">
            <h2 className="TituloCartCheck" style={{width:"100%"}} id="datos">Resumen</h2>

            <div className="productos">
                <p>Productos</p>
                <div className="prodsContainer">
                    {carrito.map((prod,i)=>{
                        return(
                            <div className="prodCard" key={i}>
                                <div className="fotoProd" style={{backgroundImage:`url(${prod.producto_imagen})`}}/>
                                <div>
                                    <p>{prod.producto_nombre}</p>
                                    <p className="roperoDe">{prod.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="domicilioMetodo">
                <p className="title">Domicilio de entrega</p>
                <div className="card">
                    <div>
                    <h3>
                            {direccion.calle} {direccion.numero}. {direccion.provincia === "Capital Federal" ? "CABA" : direccion.provincia} {direccion.localidad} ({direccion.codigo_postal}). 
                        </h3>
                        <h3>
                            {direccion.entre_calle_1!=="" && "Entre"} {direccion.entre_calle_1!==""&& direccion.entre_calle_1} {direccion.entre_calle_1!=="" && "y"} {direccion.entre_calle_2!==""&& direccion.entre_calle_2}
                        </h3>
                        <h3>
                            {direccion.informacion_adicional}
                        </h3>
                    </div>
                    <BorderColorOutlinedIcon className="botonMobile"/>
                    <Button className="boton" onClick={()=>{setTypeNav("info");setMetodoEnvio("");setCostoSucDom(false);setCostoSucSuc(false)}}>
                        MODIFICAR
                    </Button>
                </div>
            </div>

            <div className="domicilioMetodo">
                <p className="title">Método de envío</p>
                <div className="card">
                    <div>
                        <p>
                            <img src={oca} alt="OCA"/>
                            Entrega a domicilio
                        </p>
                        <h3>Cuenca 3440. CABA Comuna 17 (C1417). Entre Francisco Beiró y José P. Varela.</h3>
                        <h3>Puerta Violeta. Tocar fuerte el timbre.</h3>
                    </div>
                    <BorderColorOutlinedIcon className="botonMobile"/>
                    <Button className="boton" onClick={()=>setTypeNav("envio")}>
                        MODIFICAR
                    </Button>
                </div>
            </div>

            <div className="domicilioMetodo">
                <p className="title">Método de pago</p>
                <div className="card">
                    <div>
                        <h3>Al oprimir IR A PAGAR se abrirá Mercado Pago.</h3>
                        <h3>Podrás pagar con tarjeta de crédito, débito o efectivo, entre otras opciones disponibles.</h3>
                        <h3>Las operacones de Mi Ropero son gestionadas por SWAPVA SAS.</h3>
                    </div>
                </div>
            </div>

            {isDesktop &&
                <>
                    <div className="botones">
                        <Button className="botonVolver" onClick={()=>setTypeNav("envio")}>
                            VOLVER
                        </Button>
                        <Button className="botonPagar" onClick={()=>setTypeNav("check")}>
                            IR A PAGAR
                        </Button>
                        <p className="botonVolverMobile" onClick={()=>setTypeNav("envio")}>VOLVER</p>
                    </div>
                    <p className="terminos">Al oprimir IR A PAGAR se aceptan los <span className="terminosLink">términos y condiciones</span> de Mi Ropero</p>
                </>
            }
        </div>
    )
}

export default Tarjeta