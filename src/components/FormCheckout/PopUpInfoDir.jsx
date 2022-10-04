import React, {Fragment} from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import home from "../../assets/img/home.png"
import { Button, Radio } from "@mui/material";

const PopUpInfoDir = ({direccion,setDireccion,setViewDireccion,resDirecciones,handleFinForm})=>{
    return(
        <>
            {resDirecciones!==undefined &&
                <div className="setSucursales">
                    <div className="fondoPopUp" onClick={()=>{setViewDireccion(false);setDireccion({})}}></div>
                    <div className="popUp">
                        <CancelIcon color="tertiary" className="cross" onClick={()=>{setViewDireccion(false);setDireccion({})}}/>
                        <img src={home} alt="SHOP" color="primary" className="botonLogo"/>
                        <p>Seleccione su domicilio.</p>
                        <div className="cardContainer">
                            {resDirecciones.map(dir=>{
                                console.log(dir)
                                return(
                                    <Fragment key={dir.raw_data}>
                                        {dir.numero!=="" && dir.calle!=="" &&
                                            <div className={`cardSucursal ${direccion.raw_data !== undefined && direccion.raw_data === dir.raw_data && "selected"}`} onClick={()=>setDireccion(dir)}>
                                                <Radio
                                                    name="sucursal"
                                                    id={dir.raw_data}
                                                    checked={direccion.raw_data !== undefined && direccion.raw_data === dir.raw_data ? true : false}
                                                />
                                                <label>
                                                    {dir.calle} {dir.numero}, {dir.provincia}, {dir.localidad} {dir.codigo_postal}
                                                </label>
                                            </div>
                                        }
                                    </Fragment>
                                )
                            })}
                        </div>
                        <Button className={Object.keys(direccion).length === 0?"botonContinuarDisabled":"botonContinuar"} disabled={Object.keys(direccion).length === 0?true:false} onClick={()=>handleFinForm()}>
                            CONTINUAR
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default PopUpInfoDir