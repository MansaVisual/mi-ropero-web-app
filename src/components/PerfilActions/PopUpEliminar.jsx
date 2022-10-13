import React from 'react';
import { Button } from '@mui/material';
import cruz from '../../assets/img/cruz.png';
import MRlogoModal from '../../assets/img/isologo.png';

const PopUpEliminar = ({ setDeleteAccount }) => {
  return (
    <div className='PopUpPerfil'>
      <div className='fondoPopUp' onClick={() => setDeleteAccount(false)}></div>
      <div className='popUp'>
        <div className='popUpContainer'>
          <img src={MRlogoModal} alt='logo' className='logoModal' />
          <p className='popUpTitle'>¿Seguro querés eliminar tu cuenta?</p>
          <p className='popUpDescription'>
            Se perderán todos los datos y no podrán ser recuperados luego.
          </p>
          <div className='buttonContainer'>
            <Button onClick={() => setDeleteAccount(false)} className='volver'>
              CANCELAR
            </Button>
            <Button className='recordar'>ELIMINAR CUENTA</Button>
          </div>
          <img
            onClick={() => setDeleteAccount(false)}
            src={cruz}
            alt='CRUZ'
            className='cruz'
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpEliminar;
