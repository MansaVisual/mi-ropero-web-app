import React, {Fragment,useState} from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import isologo from "../../assets/img/isologo.png";
import theme from "../../styles/theme";
import Loader from "../Loader/Loader";

const PopUpOfertaPP = ({open,setOpen,prod})=>{
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));


    const [load, setLoad] = useState(false);
    const [ data, setData ] = useState(
        {
          amount: 0,
          comment: "",
        }
    );

    const handleSubmit=()=>{

    }

    const handleOnChange = (e,type)=>{
        if(type==="oferta"){
            setData({
                amount:e.target.value,
                comment:data.comment
            })
        }else{
            setData({
                amount:data.amount,
                comment:e.target.value
            })
        }
    }

    return(
        <>
            {open!==undefined &&
                <div className="setSucursales">
                    <div className="fondoPopUp" onClick={()=>{setOpen(false)}}></div>
                    <div className="popUp popUpOferta" style={{maxWidth:"478px"}}>
                        <CancelIcon color="tertiary" className="cross" onClick={()=>{setOpen(false)}}/>
                        <img src={isologo} alt="SHOP" color="primary" className="botonLogo"/>
                        <p className="titleOferta">¡OFERTÁ!</p>
                        <p style={{textAlign:"center"}}>Ingresá el monto que querés pagar por este producto. Recordá que debe ser mayor a $0 y menor a ${prod.precio}</p>

                        <p>Monto de la oferta*</p>
                        <TextField
                            id="oferta"
                            margin="dense"
                            type="number"
                            placeholder="$ Ingresar valor"
                            onChange={(e)=>handleOnChange(e,"oferta")}
                            value={data.amount === 0 ? "" : data.amount}
                            sx={{
                            "& input": {
                                padding: "4px 8px",
                                height: "40px",
                                boxSizing: "border-box",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                borderRadius: "8px",
                                minWidth: "136px",
                            },
                            }}
                        />

                        <p>Comentarios</p>
                        <TextField
                            margin="dense"
                            type="text"
                            onChange={(e)=>handleOnChange(e,"comentario")}
                            value={data.comment === "" ? "" : data.comment}
                            placeholder={
                                "Ingresar mensaje"
                            }
                            multiline
                            sx={{
                                minWidth: isMobile || isMobileBigScreen ? "245px" : "430px",
                                maxWidth: isMobile || isMobileBigScreen ? "295px" : "430px",
                                "& textarea": {
                                padding: "4px 8px",
                                height: "95px !important",
                                boxSizing: "border-box",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                borderRadius: "8px",
                                },
                            }}
                        />

                        <Box>
                            <Button
                                onClick={()=>{setOpen(false)}}
                            >CANCELAR</Button>
                            {load ? (
                                <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                                >
                                <Loader spin={"spinnerM"} />
                                </div>
                            ) : (
                                <Button
                                    onClick={()=>handleSubmit()}
                                    noHover={true}
                                    className={(data.amount === 0 || data.comment==="")?"botonContinuarDisabled":"botonContinuar"}
                                    disabled={(data.amount === 0 || data.comment==="")?true:false}
                                >HACER OFERTA</Button>
                            )}
                        </Box>
                    </div>
                </div>
            }
        </>
    )
}

export default PopUpOfertaPP