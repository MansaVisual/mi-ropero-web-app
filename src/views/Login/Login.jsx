import React, { useEffect, useContext } from 'react';
import banner from '../../assets/img/bannermvp4.png';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import BoxLogin from '../../components/BoxLogin/BoxLogin';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import logoRopero from '../../assets/img/logoLogin.png';
import { Grid } from '@mui/material';
import { UseLoginContext } from '../../context/LoginContext';
import Swal from 'sweetalert2';
import logo from "../../assets/img/isologo.png"

const Login = () => {
  const { loginStorage } = useContext(UseLoginContext);

  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { redireccionCompra } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    loginStorage().then((res) => {
      if (res !== null) {
        navigate('/');
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(redireccionCompra!==undefined){
      Swal.fire({
        title: "¡SUMATE A LA MODA CIRCULAR!",
        text: "Para comprar y vender fácilmente necesitás ingresar a Mi Ropero",
        iconHtml: `<img src=${logo} alt="LOGO">`,
        customClass: {
          icon: 'no-border',
          container:"popUpLoginAlert"
        },
        confirmButtonText: "CONTINUAR",
      });
    }
  }, [redireccionCompra]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid>
      <div className='bannerLoginTop'>
        <img src={banner} alt='banner' className='banner' />
        <div className='container'>
          <img src={logoRopero} alt='LOGO' className='logo' />
          <p>VENDÉ LO QUE NO USÁS Y COMPRÁ LO QUE QUERÉS</p>
        </div>
      </div>
      <div className='loginContainer'>
        <div className='loginBreadcrumbs'>
          <Breadcrumbs links={pathnames} />
        </div>
        <BoxLogin />
      </div>
      <div className='bannerLoginBottom'>
        <img src={banner} alt='banner' className='banner' />
        <div className='container'>
          <img src={logoRopero} alt='LOGO' className='logo' />
          <p>VENDÉ LO QUE NO USÁS Y COMPRÁ LO QUE QUERÉS</p>
        </div>
      </div>
    </Grid>
  );
};

export default Login;
