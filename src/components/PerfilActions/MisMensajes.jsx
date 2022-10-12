import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import leftArrow from '../../assets/img/leftArrow.png';
import { Button } from '@mui/material';
import Sweater from '../../assets/img/Sweater.png';
import Basura from '../../assets/img/basura.png';

const MisMensajes = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  const array = [
    {
      img: Sweater,
      titulo:
        'Buzo campera Fila aeroflat microfibra nuevo modelo 2022. Perfecto estado',
      fecha: 'Fecha: 21/7/2022 11:08:20',
      mensaje: 'hola, queria saber si tiene bolsillos, gracias',
      estado: 'Leido',
    },
    {
      img: Sweater,
      titulo:
        'Buzo campera Fila aeroflat microfibra nuevo modelo 2022. Perfecto estado',
      fecha: 'Fecha: 21/7/2022 11:08:20',
      mensaje: 'hola, queria saber si tiene bolsillos, gracias',
      estado: 'pendiente de leer',
    },
    {
      img: Sweater,
      titulo:
        'Buzo campera Fila aeroflat microfibra nuevo modelo 2022. Perfecto estado',
      fecha: 'Fecha: 21/7/2022 11:08:20',
      mensaje: 'hola, queria saber si tiene bolsillos, gracias',
      estado: 'pendiente de leer',
    },
  ];

  return (
    <div className='misMensajesContainer'>
      <Breadcrumbs links={pathnames} />
      <p className='title'>MIS MENSAJES</p>
      <div className='mensajesContainer'>
        {array.map((mensaje) => {
          return (
            <div className='desktopCard'>
              <div className='mensajeData'>
                <img src={mensaje.img} alt='cardImage' />
                <div>
                  <p className='messageTitle'>{mensaje.titulo}</p>
                  <p className='messageDate'>{mensaje.fecha}</p>
                  <p className='messageMessage'>{mensaje.mensaje}</p>
                  <p className='messageState'>{mensaje.estado}</p>
                </div>
              </div>
              <img src={Basura} alt='BasuraIcon' />
            </div>
          );
        })}
        {array.map((mensaje) => {
          return (
            <div className='mobileCard'>
              <img src={mensaje.img} className='productImg' alt='cardImage' />
              <div>
                <p className='messageTitle'>{mensaje.titulo}</p>
                <p className='messageDate'>{mensaje.fecha}</p>
                <p className='messageMessage'>{mensaje.mensaje}</p>
                <p className='messageState'>{mensaje.estado}</p>
              </div>
              <img src={Basura} className='trashICon' alt='basuraIcon' />
            </div>
          );
        })}
      </div>
      <div className='returnLink' onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt='leftArrow' />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default MisMensajes;
