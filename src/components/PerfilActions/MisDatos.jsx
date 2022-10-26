import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { UseLoginContext } from '../../context/LoginContext';
import { UsePerfilContext } from '../../context/PerfilContext';
import Loader from '../Loader/Loader';

const MisDatos = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  const { infoUser, userLog } = useContext(UseLoginContext);
  const { PerfilAPI } = useContext(UsePerfilContext);

  const [caracteristicasFavs, setCaracteristicasFavs] = useState([]);

  const [arrayGeneros, setArrayGeneros] = useState([]);

  
  const [genero, setGenero] = useState('0');
  const [talleRopa, setTalleRopa] = useState('');
  const [marcasPreferidas, setMarcasPreferidas] = useState([]);
  const [estiloRopa, setEstiloRopa] = useState([]);
  const [tipoRopa, setTipoRopa] = useState([]);

  const [idTalleRopa, setIdTalleRopa] = useState('');
  const [idMarcasPreferidas, setIdMarcasPreferidas] = useState([]);
  const [idEstiloRopa, setIdEstiloRopa] = useState([]);
  const [idTipoRopa, setIdTipoRopa] = useState([]);

  const [caracteristicasFin, setCaracteristicasFin] = useState([]);

  const handleMultipleSelect = (value, setValue, prevArray, value2, setValue2, prevArray2) => {
    if (prevArray.length === 0) {
      setValue([...prevArray, value]);
      setValue2([...prevArray2, value2]);
    }
    if (prevArray.length > 0) {
      for (let i = 0; i < prevArray.length; i++) {
        if (value === prevArray[i]) {
          setValue(prevArray.filter((item) => item !== prevArray[i]));
          setValue2(prevArray2.filter((item) => item !== prevArray2[i]));
          return;
        } else {
          if (prevArray.length < 3) {
            setValue([...prevArray, value]);
            setValue2([...prevArray2, value2]);
          }
        }
      }
    }
  };



  useEffect(() => {
    PerfilAPI('', 'clientes', 'get_sexos').then((res) => {
      if (res.status === 'success') {
        let array = [];
        for (const gen in res.result) {
          array.push(res.result[gen]);
        }
        setArrayGeneros(array);
      }
    });
    PerfilAPI('', 'clientes', 'get_caracteristicas_favoritas').then((res) => {
      if (res.status === 'success') {
        setCaracteristicasFavs(res.result);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (infoUser.length !== 0) {
      setGenero(infoUser.sexo );
    }
  }, [infoUser]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const coma1=idMarcasPreferidas.length!==0?",":""
    const coma2=idTipoRopa.length!==0?",":""
    const coma3=idEstiloRopa.length!==0?",":""

    setCaracteristicasFin(idTalleRopa+coma1+idMarcasPreferidas+coma2+idTipoRopa+coma3+idEstiloRopa)
  }, [talleRopa,marcasPreferidas,tipoRopa,estiloRopa]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(caracteristicasFin)
  /*   const [scroll, setScroll] = useState(0);

  const [stopScroll, setStopScroll] = useState(false); */

  /*   useEffect(() => {
    if (stopScroll) {
      window.onscroll = () => window.scrollTo(0, 0);
    } else {
      window.onscroll = null;
    }
  }, [stopScroll]); */

  /*   const onScroll = (e) => {
         setScroll(e.target.documentElement.scrollTop);
     

    if (document.getElementById('ropa').getAttribute('aria-expanded')) {
      if (document.getElementById('menu-') !== null) {
        console.log('asdw');
        console.log(document.getElementById('menu-'));
        document.getElementById('menu-').style.display = 'none';
      }
     console.log('qwe');
      console.log(document.getElementById('ropa').attributes);
      document.getElementById('ropa').attributes[
        'aria-expanded'
      ].nodeValue = false; 
    }
  };

  window.addEventListener('scroll', onScroll); */

  const handleGrabarCambios = () => {
    if (document.getElementById('nombre').value === '') {
      ScrollTop();
      alert('Debe completar el campo Nombre');
      return;
    }
    if (document.getElementById('apellido').value === '') {
      ScrollTop();
      alert('Debe completar el campo Apellido');
      return;
    }
    if (document.getElementById('email').value === '') {
      ScrollTop();
      alert('Debe completar el campo Email');
      return;
    }

    const formPhone = new FormData();
    formPhone.append('telefono', document.getElementById('telefono').value);
    PerfilAPI(formPhone, 'clientes', 'validate_phone').then((res) => {
      if (res.status === 'error') {
        alert('Error en la validación de telefono');
        return;
      }
    });

    const mail = new FormData();
    mail.append('idcliente', userLog);
    mail.append('nombre', document.getElementById('nombre').value);
    mail.append('apellido', document.getElementById('apellido').value);
    mail.append('email', document.getElementById('email').value);
    mail.append('email_old', infoUser.email);
    mail.append('telefono', document.getElementById('telefono').value);
    mail.append('sexo', genero/* arrayGeneros.indexOf(genero) */);
    mail.append('clave', "prueba");
    mail.append("caracteristicas_favoritas",caracteristicasFin)
    console.log(Object.fromEntries(mail))


    PerfilAPI(mail, 'clientes', 'update').then((res) => {

       if (res.status === 'success') {
        console.log(res)
        /* navigate(`/perfil`) */
      } else{
        console.log(res)
      }
    });
  };


  console.log(infoUser)

  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='misDatosContainer'>
      <Breadcrumbs links={pathnames} />
      <p className='title'>MIS DATOS</p>
      {infoUser.length === 0 ? (
        <div style={{ height: '50vh', marginTop: '18px' }}>
          <Loader spin={'spinnerM'} />
        </div>
      ) : (
        <>
          <div className='inputContainer'>
            <div className='inputBox'>
              <p className='labelInput'>Nombre *</p>
              <TextField
                color='primary'
                className='input'
                size='small'
                placeholder='Sabrina'
                id='nombre'
                defaultValue={infoUser.nombre}
              />
            </div>
            <div className='inputBox'>
              <p className='labelInput'>Apellido *</p>
              <TextField
                color='primary'
                className='input'
                size='small'
                placeholder='Godoy'
                id='apellido'
                defaultValue={infoUser.apellido}
              />
            </div>
          </div>
          <div className='inputContainer'>
            <div className='inputBox'>
              <p className='labelInput'>Email *</p>
              <TextField
                color='primary'
                className='input'
                size='small'
                placeholder='sabrinagodoy@gmail.com'
                type='email'
                id='email'
                defaultValue={infoUser.email}
              />
              <p className='bottomText'>
                Te registraste en el sitio utilizando Facebook, y es por eso que
                la dirección de email no puede modificarse.
              </p>
            </div>
            <div className='inputBox'>
              <p className='labelInput'>Teléfono *</p>
              <TextField
                color='primary'
                className='input'
                size='small'
                placeholder='+54  011 - 4417 - 8005'
                type='number'
                id='telefono'
                defaultValue={infoUser.telefono}
              />
              <p className='bottomText'>
                Llamarán a este número si hay algún problema con el envío.
              </p>
            </div>
          </div>
          <div className='inputContainer'>
            <div className='inputBox'>
              <p className='labelInput'>Género *</p>
              <Select
                color='primary'
                className='selectInput'
                size='small'
                onChange={(e) => setGenero(arrayGeneros.indexOf(e.target.value))}
                //value={infoUser.genero === '0' ? 'ejemplo' : genero}
                value={arrayGeneros[Number(genero)]}
                /* defaultValue={infoUser.genero === '0' ? 'ejemplo' : genero} */
                sx={{
                  '& div': {
                    fontSize: '14px',
                    color: infoUser.genero === '' ? '#BABCBE' : '#423B3C',
                    fontWeight: '400',
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
              >
                <MenuItem
                  disabled
                  key='ejemplo'
                  value='ejemplo'
                  sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
                >
                  {'Seleccione una opción'}
                </MenuItem>
                {arrayGeneros.length !== 0 &&
                  arrayGeneros.map((res, i) => {
                    return (
                      <MenuItem value={res} key={i}>
                        {res}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className='inputBox' />
          </div>
          <div className='textContainer'>
            <p className='title'>Queremos saber más de vos</p>
            <p className='subTitle'>
              Esta información la utilizamos para enviarte los nuevos ingresos
              de tus productos favoritos.
            </p>
          </div>
          <div className='inputContainer'>
            <div className='inputBox'>
              <p className='labelInput'>¿Qué talle de ropa usas?</p>
              <Select
                displayEmpty
                color='primary'
                className='selectInput'
                size='small'
                value={talleRopa}
                renderValue={(selected) => {
                  if (selected === '') {
                    return <em>Seleccioná una opción</em>;
                  }
                  return selected;
                }}
                sx={{
                  '& div': {
                    fontSize: '14px',
                    color: talleRopa.length === 0 ? '#BABCBE' : '#423B3C',
                    fontWeight: '400',
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
              >
                <MenuItem
                  disabled
                  value=''
                  sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
                >
                  <em>Seleccioná una opción</em>
                </MenuItem>
                {caracteristicasFavs.length !== 0 &&
                  caracteristicasFavs[0].valores.map((option, i) => {return(
                    <MenuItem
                      key={i}
                      value={option.valor}
                      sx={{ fontSize: '14px', color: '#969696' }}
                      onClick={() => {setTalleRopa(option.valor);setIdTalleRopa(option.idcaracteristicavalor)}}
                    >
                      {option.valor}
                    </MenuItem>
                  )})}
              </Select>
            </div>

            <div className='inputBox'>
              <p className='labelInput'>
                ¿Cuáles son tus marcas de ropa preferidas?
              </p>
              <Select
                multiple
                displayEmpty
                color='primary'
                className='selectInput'
                size='small'
                value={marcasPreferidas}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Seleccioná de 1 a 3 opciones</em>;
                  }
                  return selected.join(', ');
                }}
                sx={{
                  '& div': {
                    fontSize: '14px',
                    color:
                      marcasPreferidas.length === 0 ? '#BABCBE' : '#423B3C',
                    fontWeight: '400',
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
              >
                <MenuItem
                  disabled
                  value=''
                  sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
                >
                  <em>Seleccioná una opción</em>
                </MenuItem>
                {caracteristicasFavs.length !== 0 &&
                  caracteristicasFavs[1].valores.map((option, i) => (
                    <MenuItem
                      key={i}
                      value={option.valor}
                      sx={{ fontSize: '14px', color: '#969696' }}
                      onClick={() =>{
                        handleMultipleSelect(
                          option.valor,
                          setMarcasPreferidas,
                          marcasPreferidas,
                          option.idcaracteristicavalor,
                          setIdMarcasPreferidas,
                          idMarcasPreferidas
                        )}
                      }
                    >
                      {option.valor}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </div>
          <div className='inputContainer'>
            <div className='inputBox'>
              <p className='labelInput'>¿Cuáles son tus estilos preferidos?</p>
              <Select
                multiple
                displayEmpty
                color='primary'
                className='selectInput'
                size='small'
                value={estiloRopa}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Seleccioná de 1 a 3 opciones</em>;
                  }
                  return selected.join(', ');
                }}
                sx={{
                  '& div': {
                    fontSize: '14px',
                    color: estiloRopa.length === 0 ? '#BABCBE' : '#423B3C',
                    fontWeight: '400',
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
              >
                <MenuItem
                  disabled
                  key={'ejemplo'}
                  value={'ejemplo'}
                  sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
                >
                  {'Seleccioná de 1 a 3 opciones'}
                </MenuItem>
                {caracteristicasFavs.length !== 0 &&
                  caracteristicasFavs[2].valores.map((option, i) => (
                    <MenuItem
                      key={i}
                      value={option.valor}
                      sx={{ fontSize: '14px', color: '#969696' }}
                      onClick={() =>{
                        handleMultipleSelect(
                          option.valor,
                          setEstiloRopa,
                          estiloRopa,
                          option.idcaracteristicavalor,
                          setIdEstiloRopa,
                          idEstiloRopa
                        )}
                      }
                    >
                      {option.valor}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div className='inputBox'>
              <p className='labelInput'>¿Qué tipo de ropa preferís?</p>
              <Select
                multiple
                displayEmpty
                color='primary'
                className='selectInput'
                size='small'
                value={tipoRopa}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Seleccioná de 1 a 2 opciones</em>;
                  }
                  return selected.join(', ');
                }}
                sx={{
                  '& div': {
                    fontSize: '14px',
                    color: tipoRopa.length === 0 ? '#BABCBE' : '#423B3C',
                    fontWeight: '400',
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 150,
                  },
                }}
              >
                <MenuItem
                  disabled
                  key={'ejemplo'}
                  value={'ejemplo'}
                  sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
                >
                  {'Seleccioná de 1 a 3 opciones'}
                </MenuItem>
                {caracteristicasFavs.length !== 0 &&
                  caracteristicasFavs[3].valores.map((option, i) => (
                    <MenuItem
                      key={i}
                      value={option.valor}
                      sx={{ fontSize: '14px', color: '#969696' }}
                      onClick={() =>{
                        handleMultipleSelect(
                          option.valor,
                          setTipoRopa,
                          tipoRopa,
                          option.idcaracteristicavalor,
                          setIdTipoRopa,
                          idTipoRopa
                        )}
                      }
                    >
                      {option.valor}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </div>
          <div className='buttonContainer'>
            <Button className='leftButton' onClick={() => navigate(`/perfil`)}>
              VOLVER
            </Button>
            <Button
              className='rightButton'
              onClick={() => handleGrabarCambios()}
            >
              GRABAR CAMBIOS
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MisDatos;
