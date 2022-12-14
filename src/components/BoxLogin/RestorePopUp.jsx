import React,{useState} from 'react'
import { Button, InputLabel, TextField } from '@mui/material';
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from '../../assets/img/MRlogoModal.png'
import Loader from '../Loader/Loader';
import { apiFetch } from '../../apiFetch/apiFetch';
import Swal from 'sweetalert2';

const RestorePopUp = ({setRestorePassword}) => {

    const [campoObligatorio,setCampoObligatorio]=useState(false)
    const [errorMail,setErrorMail]=useState(false)
    const [load,setLoad]=useState(false)

    const handleOlvido = async() =>{
        setLoad(true)
        if(document.getElementById("mail").value===""){
            setCampoObligatorio(true)
            setLoad(false)
            return
        }
        const formMail=new FormData()
        formMail.append("email",document.getElementById("mail").value)
        await apiFetch(
            formMail,
            "clientes",
            "remember"
        ).then((res)=>{
            if(res.status==="success"){
                Swal.fire({
                    title: 'Se ha enviado un correo electrónico con un link para restrablecer la contraseña',
                    icon: "success",
                    confirmButtonText: "CONTINUAR",
                  }).then((res) => {
                      setLoad(false)
                      setRestorePassword(false)
                  });
            }else{
                setErrorMail(true)
                setLoad(false)
            }
        })
    }

  return (
    <div className="restorePasswordPopUp">
        <div className="fondoPopUp" onClick={()=>setRestorePassword(false)}></div>
            <div className="popUp">
                <div className="popUpContainer">
                    <img src={MRlogoModal} alt="logo" className="logoModal"/>
                    <p className="popUpTitle">OLVIDÉ MI CONTRASEÑA</p>
                    <p className="popUpDescription">Ingresa la dirección de email con la que te registraste
                        para recuperar tu contraseña de acceso
                    </p>
                    <TextField
                        color={campoObligatorio?"secondary":"primary"}
                        className="popUpTextField"
                        size="small"
                        placeholder="nombre@dominio.com"
                        onChangeCapture={()=>{setCampoObligatorio(false);setErrorMail(false)}}
                        id="mail"
                        disabled={load?true:false}
                        sx={{      
                            "& .MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                              borderColor:(campoObligatorio)&& "#FF3F20"
                            }
                          }
                        }}
                        InputProps={{
                            style: {fontSize: 15,border:campoObligatorio&&"1px solid #FF3F20"} 
                        }}
                    />
                    {campoObligatorio &&
                        <InputLabel className="subLabelForm">Completa el campo.</InputLabel>
                    }
                    {errorMail &&
                        <InputLabel className="subLabelForm">El mail es incorrecto. Vuelva a intentarlo</InputLabel>
                    }
                    <div className='buttonContainer'>
                        <Button className="volver" onClick={() => setRestorePassword(false)}>VOLVER</Button>
                        {load ?
                            <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}>
                                <Loader spin={"spinnerM"}/>
                            </div>
                        :
                            <Button className="recordar" onClick={()=>handleOlvido()}>RECORDAR</Button>
                        }
                    </div>
                    <img
                        onClick={() => setRestorePassword(false)}
                        src={cruz} 
                        alt="CRUZ" className="cruz" 
                    />
            </div>
        </div>
    </div>
  )
}

export default RestorePopUp