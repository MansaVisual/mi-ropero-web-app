import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import leftArrow from '../../assets/img/leftArrow.png';
import AdressCard from '../AddressCard/AdressCard';
import { UseLoginContext } from '../../context/LoginContext';
import Loader from '../Loader/Loader';
import { UsePerfilContext } from '../../context/PerfilContext';
import { Button } from '@mui/material';
import vacio from "../../assets/img/dirVacio.png"

const MisDirecciones = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);
  const { handleBuscarDirecciones, direccionesGuardadas,dirFinBusqueda } =
    useContext(UsePerfilContext);

  const [adressOption, setAdressOption] = useState(false);

  useEffect(() => {
    if (userLog !== '') {
      handleBuscarDirecciones(userLog);
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
      <div className='cardContainer'>
        {!dirFinBusqueda ? (
          <div style={{ height: '50vh', marginTop: '42px', width:"100%",display:"flex",justifyContent:"center" }}>
            <Loader spin={'spinnerM'} />
          </div>
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
          <div className='perfilVacio'>
            <div>
              <img src={vacio} alt="LOGO" />
              <p>Aún no tienes direcciones cargadas</p>
              <Button onClick={()=>navigate(`/perfil/NUEVA DIRECCION`)}>
                AGREGAR DIRECCIÓN
              </Button>
            </div>
          </div>
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
