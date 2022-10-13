import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import leftArrow from '../../assets/img/leftArrow.png';
import greyLeftArrow from '../../assets/img/GreyLeftArrow.png';
import greyRightArrow from '../../assets/img/GreyRightArrow.png';

const compra = {
  fecha: '15 / 03 / 2017',
  id: 'MRO-00000001375',
  monto: 163.199,
  estado: {
    codigo: 'PAGO REALIZADO',
    fecha: '17/03/3017',
  },
  tienda: 'El Ropero de Margaret Recicla!. Reutiliza!. Second Chance',
  productos: [
    {
      nombreProducto:
        'Buzo campera Fila aeroflat microfibra nuevo modelo 2022. Perfecto estado',
      precio: '3.199',
    },
    {
      nombreProducto: 'Campera dama rosa',
      precio: '3.199',
    },
  ],
  descuentos: '998',
  total: '110000',
  metodoPago: 'Mercado pago WEB',
  metodoEnvio: 'Entrega en moto 24hs',
  direccion: {
    calle: 'Cuenca',
    numero: '3440',
    provincia: 'Capital Federal',
    localidad: 'Comuna 11',
    codigo_postal: '3000',
    entre_calle_1: 'Francisco veiro',
    entre_calle_2: 'jose p varela',
    informacion_adicional: 'puerta morada, toque timbre',
  },
};

const DetalleCompra = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  return (
    <div className='detalleCompraContainer'>
      <Breadcrumbs links={pathnames} />
      <p className='title'>{compra.id}</p>
      <p className='responsiveTitle'>COMPRA {compra.id}</p>
      <div className='detailSection'>
        <div className='headerDetail'>
          <div className='leftArrowSection' onClick={() => navigate(`/perfil`)}>
            <img src={greyLeftArrow} alt='leftArrow' />
            <p>VER COMPRA ANTERIOR</p>
          </div>
          <p className='headerTitle'>RESUMEN DE COMPRA</p>
          <div
            className='rightArrowSection'
            onClick={() => navigate(`/perfil`)}
          >
            <p>VER COMPRA SIGUIENTE</p>
            <img src={greyRightArrow} alt='leftArrow' />
          </div>
        </div>
        <div className='bodyDetail'>
          <div className='fecha'>
            <p>FECHA DE COMPRA</p>
            <span>{compra.fecha}</span>
          </div>
          <div className='id'>
            <p>#ID DE PEDIDO</p>
            <span>{compra.id}</span>
          </div>
          <div className='tienda'>
            <p>TIENDA</p>
            <span>{compra.tienda}</span>
          </div>
          <div className='productos'>
            <p>PRODUCTOS</p>
            <div className='productoContainer'>
              {compra.productos.map((producto) => {
                return (
                  <>
                    <div>
                      <span>{producto.nombreProducto}</span>
                      <span>${producto.precio}</span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className='descuentos'>
            <p>DESCUENTOS</p>
            <span>-${compra.descuentos}</span>
          </div>
          <div className='total'>
            <p>TOTAL</p>
            <span>${compra.total}</span>
          </div>
          <div className='pago'>
            <p>PAGO</p>
            <span>{compra.metodoPago}</span>
          </div>
          <div className='envio'>
            <p>ENVÍO</p>
            <div>
              <span>{compra.metodoEnvio}</span>
              <span>
                {compra.direccion.calle} {compra.direccion.numero}
              </span>
              <span>
                {compra.direccion.provincia} {compra.direccion.localidad}{' '}
                {compra.direccion.codigo_postal}
              </span>
              {compra.direccion.entre_calle_1 &&
                compra.direccion.entre_calle_2 && (
                  <span>
                    Entre {compra.direccion.entre_calle_1} y{' '}
                    {compra.direccion.entre_calle_2}
                  </span>
                )}
              <span> {compra.direccion.informacion_adicional}</span>
            </div>
          </div>
        </div>
        <div className='footerDetail'>
          <div className='leftArrowSection' onClick={() => navigate(`/perfil`)}>
            <img src={greyLeftArrow} alt='leftArrow' />
            <p>VER COMPRA ANTERIOR</p>
          </div>
          <div
            className='rightArrowSection'
            onClick={() => navigate(`/perfil`)}
          >
            <p>VER COMPRA SIGUIENTE</p>
            <img src={greyRightArrow} alt='leftArrow' />
          </div>
        </div>
        <div className='returnLink' onClick={() => navigate(`/perfil`)}>
          <img src={leftArrow} alt='leftArrow' />
          <p>VOLVER A MI PERFIL</p>
        </div>
      </div>
    </div>
  );
};

export default DetalleCompra;
