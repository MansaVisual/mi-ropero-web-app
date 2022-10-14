import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import leftArrow from '../../assets/img/leftArrow.png';
import { Button, MenuItem, Select, TextField } from '@mui/material';

const NuevaDireccion = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  const [provincia, setProvincia] = useState('');

  return (
    <div className='nuevaDirecContainer'>
      <Breadcrumbs links={pathnames} />
      <p className='title'>NUEVA DIRECCION</p>
      <div className='inputContainer'>
        <div className='inputBox'>
          <p className='labelInput'>Alias</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            placeholder='Casa, trabajo, etc.'
          />
        </div>
        <div className='inputBox'>
          <p className='labelInput'>Teléfono de contacto *</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            placeholder='+54  11 - 4417 - 8005'
          />
          <p className='bottomText'>
            Llamarán a este número si hay algún problema con el envío.
          </p>
        </div>
      </div>
      <div className='inputContainer'>
        <div className='inputBox'>
          <p className='labelInput'>Calle</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            placeholder='123'
          />
          <p className='bottomText'>Domicilio de entrega </p>
        </div>
        <div className='inputBoxLocation'>
          <div>
            <p className='labelInput'>Altura/Km *</p>
            <TextField
              color='primary'
              className='locationInput'
              size='small'
              placeholder='5'
            />
          </div>
          <div>
            <p className='labelInput'>Piso</p>
            <TextField
              color='primary'
              className='locationInput'
              size='small'
              placeholder='3'
            />
          </div>
          <div>
            <p className='labelInput'>Dpto.</p>
            <TextField
              color='primary'
              className='locationInput'
              size='small'
              placeholder='2'
            />
          </div>
        </div>
      </div>
      <div className='inputContainer'>
        <div className='inputBox'>
          <p className='labelInput'>Provincia *</p>
          <Select
            color='primary'
            className='selectInput'
            size='small'
            onChange={(e) => setProvincia(e.target.value)}
            value={provincia === '' ? 'ejemplo' : provincia}
            sx={{
              '& div': {
                fontSize: '14px',
                color: provincia === '' ? '#BABCBE' : '#423B3C',
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
        <div className='inputBox'>
          <p className='labelInput'>Localidad / Barrio *</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            placeholder='Primero debes ingresar una provincia'
          />
        </div>
      </div>
      <div className='inputContainer'>
        <div className='inputBox'>
          <p className='labelInput'>Entrecalle 1</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            placeholder='Avenida Callao'
          />
        </div>
        <div className='inputBox'>
          <p className='labelInput'>Entrecalle 2</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            placeholder='Rodríguez Peña'
          />
        </div>
      </div>
      <div className='inputContainer'>
        <div className='inputBox'>
          <p className='labelInput'>Código postal *</p>
          <div className='postalCode'>
            <TextField
              color='primary'
              className='input'
              size='small'
              placeholder='1428'
            />
            <span>No sé mi código postal</span>
          </div>
        </div>
      </div>
      <div className='inputContainer'>
        <div className='textAreaBox'>
          <span className='label1'>Información adicional</span>
          <span className='label2'> (máximo 500 caractéres)</span>
          <TextField
            multiline
            rows={4}
            color='primary'
            className='textArea'
            size='small'
            placeholder='Ejemplo: Barrio Privado San Martín, Puerta roja, etc.'
          />
          <p className='bottomText'>
            Agregar información útil para encontrar la dirección.
          </p>
        </div>
      </div>
      <div className='buttonContainer'>
        <Button className='leftButton'>CANCELAR</Button>
        <Button className='rightButton'>GUARDAR DIRECCIÓN</Button>
      </div>

      <div className='returnLink' onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt='leftArrow' />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default NuevaDireccion;
