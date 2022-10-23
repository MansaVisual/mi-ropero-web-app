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
  const { handleBuscarDirecciones, direccionesGuardadas, setDireccionSelecc } =
    useContext(UsePerfilContext);

  const [adressOption, setAdressOption] = useState(false);
  const [direccionesUsuario, setDireccionesUsuario] = useState([]);
  const [loading, setLoading] = useState(true);

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
        ) : direccionesGuardadas.length > 0 ? (
          direccionesGuardadas.map((direccion, index) => {
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
