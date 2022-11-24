import React from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import shop from "../../assets/img/shop.png"
import oca from "../../assets/img/OCA.png"

const PopUpSucursales = ({setViewSucursales,sucursales})=>{
    return(
        <div className="verSucursales">
            <div className="fondoPopUp" onClick={()=>setViewSucursales(false)}></div>
            <div className="popUp">
                <CancelIcon color="tertiary" className="cross" onClick={()=>setViewSucursales(false)}/>
                <img src={shop} alt="SHOP" color="primary" className="botonLogo"/>
                <img src={oca} alt="OCA" />
                <p>Sucursales más próximas al domicilio elegido.</p>
                <div className="cardContainer">
                    {sucursales.map((sucursal,i)=>{
                        return(
                            <div className="cardSucursal" key={sucursal+i}>
                                {sucursal.Calle} {sucursal.Numero}, {sucursal.Localidad}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PopUpSucursales