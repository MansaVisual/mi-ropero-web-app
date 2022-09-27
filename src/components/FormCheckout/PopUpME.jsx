import React from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import StorefrontIcon from '@mui/icons-material/Storefront';
import oca from "../../assets/img/OCA.png"

const PopUpSucursales = ({setSucursales,sucursaless})=>{
    return(
        <div className="verSucursales">
            <div className="fondoPopUp" onClick={()=>setSucursales(false)}></div>
            <div className="popUp">
                <CancelIcon color="tertiary" className="cross" onClick={()=>setSucursales(false)}/>
                <StorefrontIcon color="primary" className="botonLogo"/>
                <img src={oca} alt="OCA" />
                <p>Sucursales más próximas al domicilio elegido.</p>
                <div className="cardContainer">
                    {sucursaless.map(sucursal=>{
                        return(
                            <div className="cardSucursal">
                                {sucursal}
                            </div>
                        )
                    })}
                    {sucursaless.map(sucursal=>{
                        return(
                            <div className="cardSucursal">
                                {sucursal}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PopUpSucursales