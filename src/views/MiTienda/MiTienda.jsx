import React, { useEffect, useContext } from 'react';
import banner from '../../assets/img/bannermvp4.png';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import BoxLogin from '../../components/BoxLogin/BoxLogin';
import { useLocation } from 'react-router-dom';
import logoRopero from '../../assets/img/logoLogin.png';
import { Grid } from '@mui/material';


const MiTienda = () => {

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
    </div>
  );
};

export default MiTienda;
