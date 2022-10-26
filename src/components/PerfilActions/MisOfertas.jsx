import React, { useContext, useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from '@mui/icons-material';
import Sweater from '../../assets/img/Sweater.png';
import Basura from '../../assets/img/basura.png';
import { UsePerfilContext } from '../../context/PerfilContext';
import { UseLoginContext } from '../../context/LoginContext';
import Loader from '../Loader/Loader';
import { Button } from '@mui/material';
import vacio from "../../assets/img/ofertasVacio.png"

const MisOfertas = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);
  const { handleOfertasRealizadas, ofertasRealizadas,ofertasFinBusqueda } =
    useContext(UsePerfilContext);

  useEffect(() => {
    if (userLog !== '') {
      handleOfertasRealizadas(userLog);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog]);

  const array = [
    {
      img: Sweater,
      titulo:
        'Buzo campera Fila aeroflat microfibra nuevo modelo 2022. Perfecto estado',
      fecha: 'Fecha: 21/7/2022 11:08:20',
      estado: 'En proceso de evaluación',
      oferta: 200,
    },
    {
      img: Sweater,
      titulo:
        'Buzo campera Fila aeroflat microfibra nuevo modelo 2022. Perfecto estado',
      fecha: 'Fecha: 21/7/2022 11:08:20',
      estado: 'En proceso de evaluación',
      oferta: 200,
    },
    {
      img: Sweater,
      titulo:
        'Buzo campera Fila aeroflat microfibra nuevo modelo 2022. Perfecto estado',
      fecha: 'Fecha: 21/7/2022 11:08:20',
      estado: 'En proceso de evaluación',
      oferta: 200,
    },
  ];

  const estados=[
    'Sin definir',
    'en proceso de evaluacion',
    'Rechazada por el vendedor',
    'Cancelada por el comprador',
    'Aceptado',
    'vencida'
  ]

  return (
    <div className='misOfertasContainer'>
      <Breadcrumbs links={pathnames} />
      <div className='container'>
        <p className='title'>MIS OFERTAS</p>
        <div className='cardsContainer'>
          {!ofertasFinBusqueda ? (
            <div style={{ height: '50vh', marginTop: '42px', width:"100%",display:"flex",justifyContent:"center" }}>
              <Loader spin={'spinnerM'} />
            </div> 
          ) : ofertasRealizadas.length > 0 ?
            ofertasRealizadas?.map((producto) => {
              return (
                <div className='desktopCard'>
                  <div className='productoData'>
                    <img src={producto.producto.imagenes[0].imagen_cuadrada} alt='cardImage' />
                    <div>
                      <p className='productoTitle'>{producto.producto.nombre}</p>
                      <p className='productoDate'>{producto.fecha}</p>
                      <p className='productoState'>{producto.estado_text}</p>
                    </div>
                  </div>
                  <div className='ofertaData'>
                    <p className='oferta'>OFERTA</p>
                    <p className='monto'>${producto.oferta}</p>
                    <img src={Basura} alt='BasuraIcon' />
                  </div>
                </div>
              );
            })
          :
            <div className='perfilVacio'>
              <div>
                <img src={vacio} alt="LOGO" />
                <p>Aún no tienes ofertas realizadas</p>
                <Button onClick={()=>navigate(`/`)}>
                  VER PRODUCTOS
                </Button>
              </div>
            </div>
          }
          {array.map((producto) => {
            return (
              <div className='mobileCard'>
                <img
                  src={producto.img}
                  className='productImg'
                  alt='cardImage'
                />
                <div>
                  <p className='productoTitle'>{producto.titulo}</p>
                  <p className='productoDate'>{producto.fecha}</p>
                  <div>
                    <span className='firstSpan'>OFERTA</span>
                    <span className='secondSpan'>${producto.oferta}</span>
                  </div>
                  <p className='productoState'>{producto.estado}</p>
                </div>
                <img src={Basura} className='trashICon' alt='basuraIcon' />
              </div>
            );
          })}
        </div>
        <p className='volver' onClick={() => navigate(`/perfil`)}>
          <ArrowBackIosNew sx={{ fontSize: '10px' }} />
          VOLVER A MI PERFIl
        </p>
      </div>
    </div>
  );
};

export default MisOfertas;
