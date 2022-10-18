import React, { useState } from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const MisDatos = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  /*   const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(menuOpen);
  }, [menuOpen]); */

  const talles = ['sm', 'md', 'lg'];

  const marcas = ['adidas', 'nike', 'puma'];

  const tipodeRopa = ['deportiva', 'casual', 'formal'];

  const estilodeRopa = [
    'hippie',
    'urbano',
    'formal',
    'hippie',
    'urbano',
    'formal',
    'hippie',
    'urbano',
    'formal',
  ];

  const [genero, setGenero] = useState('');
  const [talleRopa, setTalleRopa] = useState('');
  const [marcasPreferidas, setMarcasPreferidas] = useState([]);
  const [estiloRopa, setEstiloRopa] = useState([]);
  const [tipoRopa, setTipoRopa] = useState([]);

  const handleMultipleSelect = (e, setValue) => {
    const {
      target: { value },
    } = e;
    setValue(typeof value === 'string' ? value.split(',') : value);
  };

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

  return (
    <div className='misDatosContainer'>
      <Breadcrumbs links={pathnames} />
      <p className='title'>MIS DATOS</p>
      <div className='inputContainer'>
        <div className='inputBox'>
          <p className='labelInput'>Nombre *</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            placeholder='Sabrina'
          />
        </div>
        <div className='inputBox'>
          <p className='labelInput'>Apellido *</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            placeholder='Godoy'
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
          />
          <p className='bottomText'>
            Te registraste en el sitio utilizando Facebook, y es por eso que la
            dirección de email no puede modificarse.
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
            onChange={(e) => setGenero(e.target.value)}
            value={genero === '' ? 'ejemplo' : genero}
            sx={{
              '& div': {
                fontSize: '14px',
                color: genero === '' ? '#BABCBE' : '#423B3C',
                fontWeight: '400',
              },
              height: 42,
            }}
          >
            <MenuItem
              disabled
              key={'ejemplo'}
              value={'ejemplo'}
              sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
            >
              {'Seleccione una opción'}
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div className='inputBox' />
      </div>
      <div className='textContainer'>
        <p className='title'>Queremos saber más de vos</p>
        <p className='subTitle'>
          Esta información la utilizamos para enviarte los nuevos ingresos de
          tus productos favoritos.
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
            onChange={(e) => setTalleRopa(e.target.value)}
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
          >
            <MenuItem
              disabled
              value=''
              sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
            >
              <em>Seleccioná una opción</em>
            </MenuItem>
            {talles.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ fontSize: '14px', color: '#969696' }}
              >
                {option}
              </MenuItem>
            ))}
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
            onChange={(e) => handleMultipleSelect(e, setMarcasPreferidas)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Seleccioná de 1 a 3 opciones</em>;
              }
              return selected.join(', ');
            }}
            sx={{
              '& div': {
                fontSize: '14px',
                color: marcasPreferidas.length === 0 ? '#BABCBE' : '#423B3C',
                fontWeight: '400',
              },
              height: 42,
            }}
          >
            <MenuItem
              disabled
              value=''
              sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
            >
              <em>Seleccioná una opción</em>
            </MenuItem>
            {marcas.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ fontSize: '14px', color: '#969696' }}
              >
                {option}
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
            onChange={(e) => handleMultipleSelect(e, setEstiloRopa)}
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
          >
            <MenuItem
              disabled
              key={'ejemplo'}
              value={'ejemplo'}
              sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
            >
              {'Seleccioná de 1 a 3 opciones'}
            </MenuItem>
            {tipodeRopa.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ fontSize: '14px', color: '#969696' }}
              >
                {option}
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
            id='ropa'
            /*             onOpen={() => setStopScroll(true)}
            onClose={() => setStopScroll(false)} */
            onChange={(e) => handleMultipleSelect(e, setTipoRopa)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Seleccioná de 1 a 3 opciones</em>;
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
            {estilodeRopa.map((option, index) => (
              <MenuItem
                key={index}
                value={option}
                sx={{ fontSize: '14px', color: '#969696' }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className='buttonContainer'>
        <Button className='leftButton' onClick={() => navigate(`/perfil`)}>
          VOLVER
        </Button>
        <Button className='rightButton'>GRABAR CAMBIOS</Button>
      </div>
    </div>
  );
};

export default MisDatos;
