import React, { useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useLocation, useNavigate } from 'react-router-dom';
import tienda from "../../assets/img/tienda.png"
import { Button } from '@mui/material';
import leftArrow from "../../assets/img/leftArrow.png";

const MiTienda = () => {
    const navigate = useNavigate();

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='TiendaContainer'>
        <div className='breadcumbs'>
            <Breadcrumbs links={pathnames} />
        </div>
        <div className='contenedorInfo'>
            <p className='title'>¡ABRÍ TU TIENDA!</p>
            <p className='text'>Publica tu primer producto para habilitar tu tienda en Mi Ropero</p>
            <img src={tienda} alt="TIENDA"/>
            <Button className="agregarProd">
                AGREGAR PRODUCTO
            </Button>
        </div>
        <div className="returnLink" onClick={() => navigate(`/perfil`)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A INICIO</p>
        </div>
    </div>
  );
};

export default MiTienda;
