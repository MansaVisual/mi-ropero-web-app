import React from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import home from "../../assets/img/home.png"
import { Button, Radio } from "@mui/material";

const PopUpInfoDir = ({direccion,setDireccion,setViewDireccion,resDirecciones,handleFinForm})=>{
    return(
        <>
            {resDirecciones!==undefined &&
                <div className="setSucursales">
                    <div className="fondoPopUp" onClick={()=>{setViewDireccion(false)}}></div>
                    <div className="popUp">
                        <CancelIcon color="tertiary" className="cross" onClick={()=>{setViewDireccion(false)}}/>
                        <img src={home} alt="SHOP" color="primary" className="botonLogo"/>
                        <p>Seleccione su domicilio.</p>
                        <div className="cardContainer">
                            {resDirecciones.map(dir=>{
                                return(
                                    <>
                                        {dir.numero!=="" && dir.calle!=="" &&
                                            <div className={`cardSucursal ${direccion.raw_data===dir.raw_data && "selected"}`} onClick={()=>setDireccion(dir)}>
                                                <Radio
                                                    name="sucursal"
                                                    id={dir.raw_data}
                                                    checked={direccion.raw_data===dir.raw_data ? true : false}
                                                    />
                                                {dir.calle} {dir.numero}, {dir.provincia}, {dir.localidad} {dir.codigo_postal}
                                            </div>
                                        }
                                    </>
                                )
                            })}
                        </div>
                        <Button className="botonContinuar" onClick={()=>handleFinForm()}>
                            CONTINUAR
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default PopUpInfoDir