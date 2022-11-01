import React, {Fragment,useState,useContext} from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import isologo from "../../assets/img/isologo.png";
import theme from "../../styles/theme";
import Loader from "../Loader/Loader";
import { UseProdsContext } from "../../context/ProdsContext";
import Swal from "sweetalert2";
import { UseLoginContext } from "../../context/LoginContext";

const PopUpOfertaPP = ({open,setOpen,prod})=>{
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const { ProdAPI } = useContext(UseProdsContext);
    const { userLog } = useContext(UseLoginContext);

    const [aparece,setAparece]=useState(true)
    const [load, setLoad] = useState(false);
    const [ data, setData ] = useState(
        {
            amount: 0,
            comment: "",
        }
    );

    const handleSubmit=()=>{
        if(data.amount>(prod.precio_oferta!=="0.00"?prod.precio_oferta:prod.precio)){
            setAparece(false)
            Swal.fire({
                title:'MONTO INCORRECTO',
                text:`El monto debe ser mayor a $0 y menor a $${prod.precio_oferta!=="0.00"?prod.precio_oferta:prod.precio}`,
                icon:'info',
                confirmButtonText: 'ACEPTAR',
            }).then(()=>setAparece(true))
            document.getElementById("oferta").focus()
            return
        }
        setLoad(true);
        const oferta = new FormData();
        oferta.append("idcliente", 3214234324);
        oferta.append("idproducto", prod.idproducto);
        oferta.append("oferta", data.amount);
        oferta.append("mensaje", data.comment);

        ProdAPI(oferta, "ofertas", "insert").then((res) => {
        if (res.status === "success") {
            setTimeout(() => {
            setLoad(false);
            setOpen(false)
            Swal.fire({
                title:'OFERTA ENVIADA',
                text:"",
                icon:'success',
                confirmButtonText: 'ACEPTAR',
              })
            }, 1000);
        } else {
            setTimeout(() => {
            setLoad(false);
            setAparece(false)
            Swal.fire({
                title:'OFERTA NO ENVIADA',
                text:"Ocurrió un error. Vuelva a intentarlo",
                icon:'error',
                confirmButtonText: 'ACEPTAR',
              }).then(()=>setAparece(true))
            }, 1000);
        }
        });
    }

    const handleOnChange = (e,type)=>{
        if(type==="oferta"){
            setData({
                amount:e.target.value===""?0:e.target.value,
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
                <div className="setSucursales" style={{display:aparece?"flex":"none"}}>
                    <div className="fondoPopUp" onClick={()=>{setOpen(false)}}></div>
                    <div className="popUp popUpOferta">
                        <CancelIcon color="tertiary" className="cross" onClick={()=>{setOpen(false)}}/>
                        <img src={isologo} alt="SHOP" color="primary" className="botonLogo"/>
                        <p className="titleOferta">¡OFERTÁ!</p>
                        <p className="parrafo">Ingresá el monto que querés pagar por este producto. Recordá que debe ser mayor a $0 y menor a ${prod.precio_oferta!=="0.00"?prod.precio_oferta:prod.precio}</p>

                        <p className="titleOfertaInput">Monto de la oferta*</p>
                        <TextField
                            id="oferta"
                            className="ofertaInput"
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

                        <p className="titleCommentInput">Comentarios</p>
                        <TextField
                            className="commentInput"
                            margin="dense"
                            type="text"
                            onChange={(e)=>handleOnChange(e,"comentario")}
                            value={data.comment === "" ? "" : data.comment}
                            placeholder={
                                "Ingresar mensaje"
                            }
                            multiline
                            sx={{
                                minWidth: isMobile || isMobileBigScreen ? "290px" : "430px",
                                maxWidth: isMobile || isMobileBigScreen ? "290px" : "430px",
                                "& textarea": {
                                padding: "4px 8px",
                                height: isMobile || isMobileBigScreen ? "60px !important" : "75px !important" ,
                                boxSizing: "border-box",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                borderRadius: "8px",
                                },
                            }}
                            inputProps={{ maxLength: 220 }}
                        />

                        <Box className="botones">

                            {load ? (
                                <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems:"center",
                                    height:"100px"
                                }}
                                >
                                <Loader spin={"spinnerM"} />
                                </div>
                            ) : (<>
                                <Button
                                    onClick={()=>{setOpen(false)}}
                                    className="cancelar"
                                >CANCELAR</Button>
                                <Button
                                    onClick={()=>handleSubmit()}
                                    noHover={true}
                                    className={(data.amount === 0 || data.comment==="")?"ofertaDisabled":"oferta"}
                                    disabled={(data.amount === 0 || data.comment==="")?true:false}
                                >HACER OFERTA</Button>
                            </>)}
                        </Box>
                    </div>
                </div>
            }
        </>
    )
}

export default PopUpOfertaPP