import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import leftArrow from '../../assets/img/leftArrow.png';
import { Button } from '@mui/material';
import { UsePerfilContext } from '../../context/PerfilContext';
import { UseLoginContext } from '../../context/LoginContext';
import Loader from '../Loader/Loader';

const MisCompras = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { userLog } = useContext(UseLoginContext);
  const { handleComprasRealizadas, comprasRealizadas } =
    useContext(UsePerfilContext);

  useEffect(() => {
    if (userLog !== '') {
      handleComprasRealizadas(userLog);
      setLoading(false);
    }
  }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

  const compras = [
    {
      fecha: '15 / 03 / 2017',
      id: 'MRO-00000001375',
      monto: 163.199,
      estado: {
        codigo: 'PAGO REALIZADO',
        fecha: '17/03/3017',
      },
    },
    {
      fecha: '15 / 03 / 2017',
      id: 'MRO-00000001375',
      monto: 163.199,
      estado: {
        codigo: 'PAGO REALIZADO',
        fecha: '17/03/3017',
      },
    },
    {
      fecha: '15 / 03 / 2017',
      id: 'MRO-00000001375',
      monto: 163.199,
      estado: {
        codigo: 'PAGO REALIZADO',
        fecha: '17/03/3017',
      },
    },
  ];

  return (
    <div className='misComprasContainer'>
      <Breadcrumbs links={pathnames} />
      <p className='title'>MIS COMPRAS</p>
      <div className='comprasContainer'>
        <table className='customTable'>
          <thead>
            <tr className='titleRow'>
              <th>FECHA DE COMPRA</th>
              <th># ID DE PEDIDO</th>
              <th>MONTO TOTAL</th>
              <th>ESTADO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loader spin={'spinnerM'} />
            ) : comprasRealizadas.length > 0 ? (
              comprasRealizadas.map((compra) => {
                return (
                  <tr className='dataRow'>
                    <th>{compra.fecha}</th>
                    <th>{compra.id}</th>
                    <th>${compra.monto}</th>
                    <th className='estatusColumn'>
                      <span>{compra.estado.codigo}</span>
                      <span>{compra.estado.fecha}</span>
                    </th>
                    <th>
                      <Button className='tableButton'>VER COMPRA</Button>
                    </th>
                  </tr>
                );
              })
            ) : (
              <p>No hay compras</p>
            )}
          </tbody>
        </table>
        <div className='responsiveData'>
          {compras.map((compra) => {
            return (
              <div className='compra'>
                <div>
                  <span>FECHA DE COMPRA</span>
                  <span>{compra.fecha}</span>
                </div>
                <div>
                  <span>N° DE PEDIDO</span>
                  <span>{compra.id}</span>
                </div>
                <div>
                  <span>MONTO TOTAL</span>
                  <span>{compra.monto}</span>
                </div>
                <div>
                  <span>ESTADO:</span>
                  <span>{compra.estado.codigo}</span>
                  <span>{compra.estado.fecha}</span>
                </div>
                <Button
                  className='comprasButton'
                  onClick={() => navigate(`/perfil/MIS COMPRAS DETALLE`)}
                >
                  VER COMPRA
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div className='returnLink' onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt='leftArrow' />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default MisCompras;
