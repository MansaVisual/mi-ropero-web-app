import React from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import shop from "../../assets/img/shop.png"
import { Button, Radio } from "@mui/material";
import oca from "../../assets/img/OCA.png"

const PopUpLocalidad = ({infoLoc,setPopLoc,infoLocFinal,setInfoLocFinal})=>{

    return(
        <>
            {infoLoc!==undefined &&
                <div className="setSucursales">
                    <div className="fondoPopUp" onClick={()=>{setPopLoc(false)}}></div>
                    <div className="popUp">
                        <CancelIcon color="tertiary" className="cross" onClick={()=>{setPopLoc(false)}}/>
                        <img src={shop} alt="SHOP" color="primary" className="botonLogo"/>
                        <img src={oca} alt="OCA" />
                        <p>Sucursales más próximas al domicilio elegido.</p>
                        <div className="cardContainer">
                            {infoLoc.map((loc,i)=>{
                                return(
                                    <div key={i} className={`cardSucursal ${infoLocFinal===loc.IdCentroImposicion && "selected"}`} onClick={()=>setInfoLocFinal(loc)}>
                                        <Radio
                                            name="localidad"
                                            id={loc.idlocalidad}
                                            checked={infoLocFinal.length!==0 && infoLocFinal.idlocalidad===loc.idlocalidad ? true:false}
                                            />
                                        {loc.nombre}, {loc.codigo_postal}
                                    </div>
                                )
                            })}
                        </div>
                        <Button className={infoLocFinal.length===0?"botonContinuarDisabled":"botonContinuar"} disabled={infoLocFinal.length===0?true:false} onClick={()=>{setPopLoc(false)}}>
                            CONTINUAR
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default PopUpLocalidad