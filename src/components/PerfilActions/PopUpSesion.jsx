import React,{useContext} from 'react';
import { Button } from '@mui/material';
import cruz from '../../assets/img/cruz.png';
import MRlogoModal from '../../assets/img/isologo.png';
import { UseLoginContext } from '../../context/LoginContext';

const PopUpSesion = ({ setCloseSession }) => {

  const {setUserLog}=useContext(UseLoginContext)

  const handleCerrarSesion=()=>{
    localStorage.clear("idClienteRopero")
    setUserLog("")
    window.location.replace('https://www.miropero.ar/')
  }

  return (
    <div className='PopUpPerfil'>
      <div className='fondoPopUp' onClick={() => setCloseSession(false)}></div>
      <div className='popUp'>
        <div className='popUpContainer'>
          <img src={MRlogoModal} alt='logo' className='logoModal' />
          <p className='popUpTitle'>¿Seguro querés cerrar sesión?</p>
          <p className='popUpDescription'>
            Luego podrás ingresar con tu cuenta de Mi Ropero, Google o Facebook.
          </p>
          <div className='buttonContainer'>
            <Button onClick={() => setCloseSession(false)} className='volver'>
              CANCELAR
            </Button>
            <Button className='recordar' onClick={()=>handleCerrarSesion()}>CERRAR SESIÓN</Button>
          </div>
          <img
            onClick={() => setCloseSession(false)}
            src={cruz}
            alt='CRUZ'
            className='cruz'
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpSesion;
