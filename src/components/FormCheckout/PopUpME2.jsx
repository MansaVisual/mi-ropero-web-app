import React from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import shop from "../../assets/img/shop.png"
import { Button, Radio } from "@mui/material";
import oca from "../../assets/img/OCA.png"

const PopUpSetSucursal = ({onClickCheckSucursal,defaultCheckSucursal,handleClickSetSucusarl,sucursalEntrega,sucursales})=>{
    return(
        <>
            {sucursales!==undefined &&
                <div className="setSucursales">
                    <div className="fondoPopUp" onClick={()=>{onClickCheckSucursal("")}}></div>
                    <div className="popUp">
                        <CancelIcon color="tertiary" className="cross" onClick={()=>{onClickCheckSucursal("")}}/>
                        <img src={shop} alt="SHOP" color="primary" className="botonLogo"/>
                        <img src={oca} alt="OCA" />
                        <p>Sucursales más próximas al domicilio elegido.</p>
                        <div className="cardContainer">
                            {sucursales.map((sucursal,i)=>{
                                return(
                                    <div className={`cardSucursal ${sucursalEntrega===sucursal+i && "selected"}`} onClick={()=>onClickCheckSucursal(sucursal+i)}>
                                        <Radio
                                            name="sucursal"
                                            id={sucursal+i}
                                            checked={defaultCheckSucursal(sucursal+i)}
                                            />
                                        {sucursal.Calle} {sucursal.Numero}, {sucursal.Localidad}
                                    </div>
                                )
                            })}
                        </div>
                        <Button className="botonContinuar" onClick={()=>handleClickSetSucusarl()}>
                            CONTINUAR
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default PopUpSetSucursal