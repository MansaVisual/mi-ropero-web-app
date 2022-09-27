import React from "react"
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Button } from "@mui/material";
import oca from "../../assets/img/OCA.png"

const products = [
    {
      id: 1,
      title: "Buzo campera Fila aeroflat microfibra sie nuevo modelo 2022. Perfecto estado.",
      description:"El ropero de Romialaniz",
      price: 280000,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      id: 2,
      description:"El ropero de Romialaniz",
      title: "Pantalon nuevo 2022",
      price: 1200,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
      {
        id: 2,
        description:"El ropero de Romialaniz",
        title: "Pantalon nuevo 2022",
        price: 1200,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
      {
        description:"El ropero de Romialaniz",
        id: 3,
        title: "Remera negra 2022",
        price: 3000,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      },
]

const Tarjeta = ({setTypeNav})=>{
    return(
        <div className="tarjetaContenedor">
            <h2 className="TituloCartCheck" style={{width:"100%"}} id="datos">Método de envío</h2>

            <div className="productos">
                <p>Productos</p>
                <div className="prodsContainer">
                    {products.map((prod,i)=>{
                        return(
                            <div className="prodCard">
                                <div className="fotoProd" style={{backgroundImage:`url(${prod.image})`}}/>
                                <div>
                                    <p>{prod.title}</p>
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
                        <h3>Cuenca 3440. CABA Comuna 17 (C1417). Entre Francisco Beiró y José P. Varela.</h3>
                        <h3>Puerta Violeta. Tocar fuerte el timbre.</h3>
                    </div>
                    <BorderColorOutlinedIcon className="botonMobile"/>
                    <Button className="boton">
                        MODIFICAR
                    </Button>
                </div>
            </div>

            <div className="domicilioMetodo">
                <p className="title">Productos</p>
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
                    <Button className="boton">
                        MODIFICAR
                    </Button>
                </div>
            </div>

            <div className="domicilioMetodo">
                <p className="title">Productos</p>
                <div className="card">
                    <div>
                        <h3>Al oprimir IR A PAGAR se abrirá Mercado Pago.</h3>
                        <h3>Podrás pagar con tarjeta de crédito, débito o efectivo, entre otras opciones disponibles.</h3>
                        <h3>Las operacones de Mi Ropero son gestionadas por SWAPVA SAS.</h3>
                    </div>
                </div>
            </div>

            <div className="botones">
                <Button className="botonVolver" onClick={()=>setTypeNav("envio")}>
                    VOLVER
                </Button>
                <Button className="botonPagar">
                    IR A PAGAR
                </Button>
                <p className="botonVolverMobile" onClick={()=>setTypeNav("envio")}>VOLVER</p>
            </div>
            <p className="terminos">Al oprimir IR A PAGAR se aceptan los <span className="terminosLink">términos y condiciones</span> de Mi Ropero</p>
        </div>
    )
}

export default Tarjeta