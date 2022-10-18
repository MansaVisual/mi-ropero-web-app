import { Button } from '@mui/material';
import React,{useContext} from 'react'
import cruz from "../../assets/img/cruz.png";
import MRlogoModal from '../../assets/img/MRlogoModal.png'
import { UseLoginContext } from '../../context/LoginContext';

const ValidationPopUp = ({setSendCod}) => {
    const {LoginAPI}=useContext(UseLoginContext)
    const user = JSON.parse(localStorage.getItem("sendCodMiRopero"))
  
    const handleSendMail=()=>{
        const loginUser = new FormData()
        loginUser.append('idcliente', user.id)
        LoginAPI(
            loginUser,
            "clientes",
            "validate_send"
            ).then((res)=>{
                if(res.status==="success"){
                    alert("Se envió el código")
                }else{
                    alert("No se pudo enviar el código. Vuelva a intentarlo")
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
                            onClick={()=>handleSendMail()}>click acá</span>.
                        </p>
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