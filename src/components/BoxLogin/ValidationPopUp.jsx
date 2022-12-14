import { Button } from '@mui/material';
import React,{useState} from 'react'
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from '../../assets/img/MRlogoModal.png'
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import { apiFetch } from '../../apiFetch/apiFetch';

const ValidationPopUp = ({setSendCod}) => {
    const user = JSON.parse(localStorage.getItem("sendCodMiRopero"))
    localStorage.removeItem("sendCodMiRopero")
  
    const [load,setLoad]=useState(false)

    const handleSendMail=()=>{
        setLoad(true)
        const loginUser = new FormData()
        loginUser.append('idcliente', user.id)
        apiFetch(
            loginUser,
            "clientes",
            "validate_send"
            ).then((res)=>{
                setLoad(false)
                if(res.status==="success"){
                    Swal.fire({
                        title:'CÓDIGO ENVIADO',
                        text:"Revise su correo electrónico",
                        icon:'info',
                        confirmButtonText: 'ACEPTAR',
                    })
                }else{
                    Swal.fire({
                        title:'OCURRIÓ UN ERROR',
                        text:"No se pudo enviar el código. Volvé a intentarlo",
                        icon:'error',
                        confirmButtonText: 'ACEPTAR',
                    })
                }
            }
        )
    }

    return (
        <div className="restorePasswordPopUp">
            <div className="fondoPopUp" onClick={()=>setSendCod(false)}></div>
                <div className="popUp">
                    <div className="popUpContainer">
                        <img src={MRlogoModal} alt="logo" className="logoModal"/>
                        <p className="popUpTitle">EL CÓDIGO DE VALIDACIÓN SE ENVIÓ CORRECTAMENTE</p>
                        <p className="popUpDescription">
                            Deberia llegarte en menos de 2 minutos en tu email, 
                            si luego de ese tiempo no lo recibiste hace <span className='spanLink' style={{cursor:"pointer"}}
                            onClick={()=>{handleSendMail()}}>click acá</span>.
                        </p>
                        {load?<Loader spin={"spinnerS"}/>:null}
                        <div className='buttonContainer'>
                            <Button className="continuar" onClick={()=>setSendCod(false)}>CONTINUAR</Button>
                        </div>
                        <img
                            onClick={() => setSendCod(false)}
                            src={cruz} 
                            alt="CRUZ" className="cruz" 
                        />
                </div>
            </div>
        </div>
    )
}

export default ValidationPopUp