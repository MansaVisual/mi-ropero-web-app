import React, { useState, useContext, useEffect } from 'react';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import leftArrow from '../../../assets/img/leftArrow.png';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { UseFormContext } from '../../../context/FormContext';
import { UseLoginContext } from '../../../context/LoginContext';
import { handleInputChange, onFocus } from './direccFunciones';

const NuevaDireccion = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();

  const { FormAPI } = useContext(UseFormContext);
  const { userLog } = useContext(UseLoginContext);

  const [form, setForm] = useState([]);

  let clase = 'formObligatorio';
  let clase2 = 'formObligatorioTitle';

  useEffect(() => {
    FormAPI('', 'direcciones', 'provincias').then((res) => {
      if (res.status === 'success') {
        setProvincias(res.result);
      }
    });

    /* const formDirecciones = new FormData();
    formDirecciones.append('idcliente', userLog);
    FormAPI(formDirecciones, 'direcciones', 'all').then((res) => {
      if (res.status === 'success') {
        setDireccionesCargadas(res.result);
      }
    });

    if (form.length !== 0 && !usaDireccionCargada) {
      chargeForm(form, setProvincia);
    } else if (form.length !== 0 && usaDireccionCargada) {
      document.getElementById('nombreApellido').value = form.nombreApellido;
      document.getElementById('telefono').value = form.telefono;
    } */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [provincias, setProvincias] = useState([]);
  const [loader, setLoader] = useState(false);

  const [campoObligatorio, setCampoObligatorio] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorCodPostal, setErrorCodPostal] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorDirCargada, setErrorDirCargada] = useState(false);
  const [errorRecargarDir, setErrorRecargarDir] = useState(false);
  const [errorLocalidad, setErrorLocalidad] = useState(false);

  const [viewDireccion, setViewDireccion] = useState(false);
  const [resDirecciones, setResDirecciones] = useState([]);

  const [provincia, setProvincia] = useState([]);

  const [infoLoc, setInfoLoc] = useState([]);
  const [infoLocFinal, setInfoLocFinal] = useState([]);
  const [popLoc, setPopLoc] = useState(false);
  const [changeLoc, setChangeLoc] = useState(false);

  const handleProvinciaInput = (event) => {
    setProvincia(event.target.value);
    setForm({ ...form, provincia: event.target.value });
    if (event.target.value === 1) {
      document.getElementById('barrioLocalidad').value = 'CAPITAL FEDERAL';
    }
  };

  const handleChangeLoc = () => {
    if (document.getElementById('barrioLocalidad') !== 'CAPITAL FEDERAL') {
      if (document.getElementById('barrioLocalidad').value.length >= 3) {
        setInfoLocFinal([]);
        if (changeLoc) {
          const localidad = new FormData();
          localidad.append('idprovincia', provincia);
          localidad.append(
            'string',
            document.getElementById('barrioLocalidad').value,
          );
          FormAPI(localidad, 'direcciones', 'localidades').then((res) => {
            if (res.status === 'error') {
              setErrorLocalidad(true);
              scrollTop();
            } else if (res.status === 'success') {
              setPopLoc(true);
              setInfoLoc(res.result);
            }
          });
        }
      }
    }
  };

  const checkNuevaDireccion = async () => {
    if (document.getElementById('alias').value === '') {
      throwError('alias', 'labelAlias');
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
    }
    if (document.getElementById('telefono').value === '') {
      throwError('telefono', 'labelTelefono');
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
    } else {
      const formPhone = new FormData();
      formPhone.append('telefono', document.getElementById('telefono').value);
      await FormAPI(formPhone, 'clientes', 'validate_phone').then((res) => {
        if (res.status === 'error') {
          /* resFinal = false */
          setErrorPhone(true);
          throwError('telefono', 'labelTelefono');
          /* setBuscandoDir(false) */
          scrollTop();
        } else {
          console.log('telefono valido');
        }
      });
    }
    if (document.getElementById('calle').value === '') {
      throwError('calle', 'labelCalle');
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
    }
    if (document.getElementById('alturaKM').value === '') {
      throwError('alturaKM', 'labelAlturaKM');
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
    }
  };

  const scrollTop = (param) => {
    if (param !== undefined) {
      setTimeout(() => {
        window.scrollTo({
          top: param,
          behavior: 'auto',
        });
      }, 0);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const throwError = (id1, id2) => {
    if (id1 === 'provincia') {
      if (!document.getElementById(id1).classList.contains(clase)) {
        document.getElementById(id1).parentNode.classList.add(clase);
        document.getElementById(id2).classList.add(clase2);
      }
    } else {
      if (!document.getElementById(id1).classList.contains(clase)) {
        document.getElementById(id1).classList.add(clase);
        document.getElementById(id2).classList.add(clase2);
      }
    }
  };

  return (
    <div className='nuevaDirecContainer'>
      <Breadcrumbs links={pathnames} />
      <div className='titleSection'>
        <p className='title'>NUEVA DIRECCION</p>
      </div>
      {campoObligatorio && (
        <div className='errorBox'>
          <CancelOutlinedIcon color='secondary' className='cruz' />
          <p>Debe completar los campos obligatorios para avanzar</p>
        </div>
      )}
      {errorPhone && (
        <div className='errorBox'>
          <CancelOutlinedIcon color='secondary' className='cruz' />
          <p>El número de telefono no es válido.</p>
        </div>
      )}
      {errorCodPostal && (
        <div className='errorBox'>
          <CancelOutlinedIcon color='secondary' className='cruz' />
          <p>El código postal no se pudo validar. Vuelva a intentarlo</p>
        </div>
      )}
      {errorDireccion && (
        <div className='errorBox'>
          <CancelOutlinedIcon color='secondary' className='cruz' />
          <p>No se encontró la direccion establecida.</p>
        </div>
      )}
      {errorDirCargada && (
        <div className='errorBox'>
          <CancelOutlinedIcon color='secondary' className='cruz' />
          <p>Debe seleccionar una dirección</p>
        </div>
      )}
      {errorRecargarDir && (
        <div className='errorBox'>
          <CancelOutlinedIcon color='secondary' className='cruz' />
          <p>Ocurrió un error de validación. Vuelva a intentarlo</p>
        </div>
      )}
      {errorLocalidad && (
        <div className='errorBox'>
          <CancelOutlinedIcon color='secondary' className='cruz' />
          <p>Localidad no encontrada. Vuelva a intentarlo</p>
        </div>
      )}

      <div className='inputContainer'>
        <div className='inputBox'>
          <p className='labelInput' id='labelAlias'>
            Alias
          </p>
          <TextField
            color='primary'
            className='input'
            size='small'
            id='alias'
            placeholder='Casa, trabajo, etc.'
            onChangeCapture={(e) => {
              handleInputChange(form, setForm);
              setCampoObligatorio(false);
            }}
            onFocus={(e) => onFocus(e, clase, clase2, 'labelAlias')}
            sx={{
              '& .MuiOutlinedInput-root:hover': {
                '& > fieldset': {
                  borderColor: campoObligatorio && '#FF3F20',
                },
              },
            }}
          />
        </div>
        <div className='inputBox'>
          <p className='labelInput' id='labelTelefono'>
            Teléfono de contacto *
          </p>
          <TextField
            color='primary'
            className='input'
            size='small'
            id='telefono'
            placeholder='+54  11 - 4417 - 8005'
            onChangeCapture={() => {
              handleInputChange(form, setForm);
              setCampoObligatorio(false);
              setErrorPhone(false);
            }}
            onFocus={(e) => onFocus(e, clase, clase2, 'labelTelefono')}
            sx={{
              '& .MuiOutlinedInput-root:hover': {
                '& > fieldset': {
                  borderColor: campoObligatorio && '#FF3F20',
                },
              },
            }}
          />
          <p className='bottomText'>
            Llamarán a este número si hay algún problema con el envío.
          </p>
        </div>
      </div>
      <div className='inputContainer'>
        <div className='inputBox'>
          <p className='labelInput' id='labelCalle'>
            Calle
          </p>
          <TextField
            color='primary'
            className='input'
            size='small'
            id='calle'
            placeholder='123'
            onChangeCapture={(e) => {
              handleInputChange(form, setForm);
              setCampoObligatorio(false);
              setErrorDireccion(false);
            }}
          />
          <p className='bottomText'>Domicilio de entrega </p>
        </div>
        <div className='inputBoxLocation'>
          <div>
            <p className='labelInput' id='labelAlturaKM'>
              Altura/Km *
            </p>
            <TextField
              color='primary'
              className='locationInput'
              size='small'
              id='alturaKM'
              placeholder='5'
              onChangeCapture={(e) => {
                handleInputChange(form, setForm);
                setCampoObligatorio(false);
                setErrorDireccion(false);
              }}
            />
          </div>
          <div>
            <p className='labelInput'>Piso</p>
            <TextField
              color='primary'
              className='locationInput'
              size='small'
              id='piso'
              placeholder='3'
              onChangeCapture={() => {
                handleInputChange(form, setForm);
                setCampoObligatorio(false);
              }}
            />
          </div>
          <div>
            <p className='labelInput'>Dpto.</p>
            <TextField
              color='primary'
              className='locationInput'
              size='small'
              id='depto'
              placeholder='2'
              onChangeCapture={(e) => {
                handleInputChange(form, setForm);
                setCampoObligatorio(false);
              }}
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
            placeholder='Ciudad Autónoma de Buenos Aires'
            size='small'
            onChange={(e) => {
              handleProvinciaInput(e);
              setErrorDireccion(false);
              setCampoObligatorio(false);
            }}
            value={provincia === '' ? '' : provincia}
            onFocus={(e) => onFocus(e, clase, clase2, 'labelProvincia')}
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
              key={''}
              value={''}
              sx={{ fontSize: '14px', color: '#BABCBE', fontWeight: '400' }}
            >
              {'Seleccione una opción'}
            </MenuItem>
            {provincias.map((option) => (
              <MenuItem
                key={option.idprovincia}
                value={option.idprovincia}
                sx={{ fontSize: '14px', color: '#969696' }}
              >
                {option.nombre}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className='inputBox'>
          <p className='labelInput' id='labelBarrioLocalidad'>
            Localidad / Barrio *
          </p>
          <TextField
            placeholder={
              provincia === '' && 'Primero debes ingresar una provincia'
            }
            disabled={provincia === '' ? true : false}
            color='primary'
            className='input'
            size='small'
            id='barrioLocalidad'
            onChangeCapture={(e) => {
              handleInputChange(form, setForm);
              setCampoObligatorio(false);
              setErrorDireccion(false);
              setChangeLoc(true);
              setErrorLocalidad(false);
            }}
            onFocus={(e) => onFocus(e, clase, clase2, 'labelBarrioLocalidad')}
            onBlur={() => handleChangeLoc()}
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
            id='entrecalle1'
            placeholder='Avenida Callao'
            onChangeCapture={() => {
              handleInputChange(form, setForm);
            }}
          />
        </div>
        <div className='inputBox'>
          <p className='labelInput'>Entrecalle 2</p>
          <TextField
            color='primary'
            className='input'
            size='small'
            id='entrecalle2'
            placeholder='Rodríguez Peña'
            onChangeCapture={(e) => {
              handleInputChange(form, setForm);
            }}
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
              id='codigoPostal'
              placeholder='1428'
              onChangeCapture={(e) => {
                handleInputChange(form, setForm);
                setErrorCodPostal(false);
                setErrorDireccion(false);
                setCampoObligatorio(false);
              }}
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
            id='infoAdicional'
            color='primary'
            className='textArea'
            size='small'
            placeholder='Ejemplo: Barrio Privado San Martín, Puerta roja, etc.'
            onChangeCapture={() => {
              handleInputChange(form, setForm);
              setCampoObligatorio(false);
            }}
            inputProps={{ maxLength: 50 }}
          />
          <p className='bottomText'>
            Agregar información útil para encontrar la dirección.
          </p>
        </div>
      </div>
      <div className='buttonContainer'>
        <Button className='leftButton' onClick={() => navigate(`/perfil`)}>
          CANCELAR
        </Button>
        <Button className='rightButton' onClick={() => checkNuevaDireccion()}>
          GUARDAR DIRECCIÓN
        </Button>
      </div>

      <div className='returnLink' onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt='leftArrow' />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default NuevaDireccion;