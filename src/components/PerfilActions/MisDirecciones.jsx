import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import leftArrow from '../../assets/img/leftArrow.png';
import AdressCard from '../AddressCard/AdressCard';
import { UseLoginContext } from '../../context/LoginContext';
import Loader from '../Loader/Loader';
import { UsePerfilContext } from '../../context/PerfilContext';

const MisDirecciones = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);
  const { handleBuscarDirecciones, direccionesGuardadas } =
    useContext(UsePerfilContext);

  const [adressOption, setAdressOption] = useState(false);
  const [direccionesUsuario, setDireccionesUsuario] = useState([]);
  const [loading, setLoading] = useState(true);

  let prueba = [
    {
      calle: 'Francisco Beiró',
      numero: '2440',
      provincia: 'Capital Federal',
      localidad: 'Comuna 11',
      codigo_postal: 'C1417',
      entre_calle_1: 'Francisco Beiró ',
      entre_calle_2: 'José P. Varela',
      informacion_adicional:
        'Tocar fuerte el timbre hola holaaaa a  aaaaa eeeee',
    },
    {
      calle: 'cuenca',
      numero: '2440',
      provincia: 'Capital Federal',
      localidad: 'Comuna 11',
      codigo_postal: 'C1417',
      entre_calle_1: '',
      entre_calle_2: '',
      informacion_adicional: 'Tocar fuerte el timbre',
    },
    {
      calle: 'cuenca',
      numero: '2440',
      provincia: 'Capital Federal',
      localidad: 'Comuna 11',
      codigo_postal: 'C1417',
      entre_calle_1: 'Francisco Beiró',
      entre_calle_2: 'José P. Varela',
      informacion_adicional: '',
    },
  ];

  /*   Cuenca 3440. CABA Comuna 11 (C1417).
Entre Francisco Beiró y José P. Varela.
Puerta violeta. Tocar fuerte el timbre. */

  useEffect(() => {
    if (userLog !== '') {
      handleBuscarDirecciones(userLog);
      setLoading(false);
    }
  }, [userLog]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='misDireccContainer'>
      <Breadcrumbs links={pathnames} />
      <div className='titleContainer'>
        <p className='title'>MIS DIRECCIONES</p>
        <p
          className='addDirection'
          onClick={() => navigate(`/perfil/NUEVA DIRECCION`)}
        >
          Agregar dirección
        </p>
      </div>
      <p className='direcSubtitle'>Selecciona un domicilio *</p>
      <div className='cardContainer'>
        {loading ? (
          <Loader spin={'spinnerM'} />
        ) : prueba.length > 0 ? (
          prueba.map((direccion, index) => {
            return (
              <AdressCard
                key={index}
                direccion={direccion}
                setAdressOption={setAdressOption}
                adressOption={adressOption}
                index={index}
              />
            );
          })
        ) : (
          <p>no hay direcciones cargadas</p>
        )}
      </div>
      <div className='returnLink' onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt='leftArrow' />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default MisDirecciones;
