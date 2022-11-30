import {
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
  handleClick,
  handleChangeForm,
  onFocus,
  chargeForm,
} from './funciones';
import Loader from '../Loader/Loader';
import PopUpInfoDir from './PopUpInfoDir';
import PopUpLocalidad from './PopUpLocalidad';
import { UseLoginContext } from '../../context/LoginContext';
import { apiFetch } from '../../apiFetch/apiFetch';

const InfoContact = ({
  setTypeNav,
  form,
  setForm,
  setSucursales,
  saveDirecc,
  setSaveDirecc,
  direccion,
  setDireccion,
  provincias,
  setProvincias,
  usaDireccionCargada,
  setUsaDireccionCargada,
}) => {
  const { userLog,infoUser } = useContext(UseLoginContext);

  const [direccionesCargadas, setDireccionesCargadas] = useState([]);
  const [direccionCargada, setDireccionCargada] = useState(null);
  const [buscandoDir, setBuscandoDir] = useState(false);

  const [loader2, setLoader2] = useState(true);

  let clase = 'formObligatorio';
  let clase2 = 'formObligatorioTitle';

  useEffect(() => {
    apiFetch('', 'direcciones', 'provincias').then((res) => {
      if (res.status === 'success') {
        setProvincias(res.result);
      }
    });

    if (form.length !== 0 && !usaDireccionCargada) {
      chargeForm(form, setProvincia);
    } else if (form.length !== 0 && usaDireccionCargada) {
      document.getElementById('nombreApellido').value = form.nombreApellido;
      document.getElementById('telefono').value = form.telefono;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userLog !== '') {
      const formDirecciones = new FormData();
      formDirecciones.append('idcliente', userLog);
      apiFetch(formDirecciones, 'direcciones', 'all').then((res) => {
        setLoader2(false);
        if (res.status === 'success') {
          setDireccionesCargadas(res.result);
        }
      });
      if (form.length !== 0 && !usaDireccionCargada) {
        chargeForm(form, setProvincia);
      } else if (form.length !== 0 && usaDireccionCargada) {
        document.getElementById('nombreApellido').value = form.nombreApellido;
        document.getElementById('telefono').value = form.telefono;
      }
    }
  }, [userLog]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (direccionCargada !== null) {
      setDireccion(direccionCargada);
    }
  }, [direccionCargada]); // eslint-disable-line react-hooks/exhaustive-deps

  const [provincia, setProvincia] = useState('');

  useEffect(() => {
    if (provincia === '1') {
      document.getElementById('barrioLocalidad').value = 'CAPITAL FEDERAL';
    }
  }, [provincia]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleChange = (event) => {
    setProvincia(event.target.value);
    setForm({ ...form, provincia: event.target.value });
  };

  const [infoLoc, setInfoLoc] = useState([]);
  const [infoLocFinal, setInfoLocFinal] = useState([]);
  const [popLoc, setPopLoc] = useState(false);
  const [changeLoc, setChangeLoc] = useState(false);

  useEffect(() => {
    if (!popLoc && infoLocFinal.length !== 0) {
      document.getElementById('codigoPostal').value =
        infoLocFinal.codigo_postal;
      document.getElementById('barrioLocalidad').value = infoLocFinal.nombre;
    }
  }, [popLoc]); // eslint-disable-line react-hooks/exhaustive-deps

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
          apiFetch(localidad, 'direcciones', 'localidades').then((res) => {
            if (res.status === 'error') {
              throwError('barrioLocalidad', 'labelBarrioLocalidad');
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

  const checkForm = async () => {
    setBuscandoDir(true);
    setLoader(true);
    let res = false;
    let resFinal = true;
    setErrorRecargarDir(false);

    if (infoLocFinal.length === 0 && !usaDireccionCargada) {
      if (document.getElementById('barrioLocalidad').value !== "CAPITAL FEDERAL") {
        throwError('barrioLocalidad', 'labelBarrioLocalidad'); 
        scrollTop();
        setBuscandoDir(false);
        setErrorLocalidad(true);
        setLoader(false);
        return;
      }
    }

    if (usaDireccionCargada && direccionCargada === null) {
      setErrorDirCargada(true);
      setBuscandoDir(false);
      setLoader(false);
      scrollTop();
      return;
    }

    if (direccionCargada === null) {
      res = handleClick(setCampoObligatorio, clase, clase2);
      resFinal = true;
    } else if (document.getElementById('nombreApellido').value === '') {
      throwError('nombreApellido', 'labelNombreApellido');
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
      setBuscandoDir(false);
      return;
    }
    if (res) {
      setLoader(false);
      setBuscandoDir(false);
      return;
    } else {
      const formPhone = new FormData();
      formPhone.append('telefono', document.getElementById('telefono').value);
      await apiFetch(formPhone, 'clientes', 'validate_phone').then((res) => {
        if (res.status === 'error') {
          resFinal = false;
          setErrorPhone(true);
          throwError('telefono', 'labelTelefono');
          setBuscandoDir(false);
        }
      });

      const formCodPostal = new FormData();
      if (direccionCargada !== null) {
        formCodPostal.append('codigo_postal', direccion.codigo_postal);
      } else {
        formCodPostal.append(
          'codigo_postal',
          document.getElementById('codigoPostal').value,
        );
      }
      await apiFetch(formCodPostal, 'operaciones', 'get_oca_offices').then(
        (res) => {
          if (res.status === 'error') {
            resFinal = false;
            if (direccionCargada === null) {
              setErrorCodPostal(true);
              setBuscandoDir(false);
              throwError('codigoPostal', 'labelCodigoPostal');
            } else {
              setErrorRecargarDir(true);
              setBuscandoDir(false);
            }
          } else {
            setSucursales(res.result);
          }
        },
      );
    }
    if (resFinal) {
      setLoader(false);
      validarDireccion();
    } else {
      setLoader(false);
      scrollTop();
    }
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
  const validarDireccion = async() => {
    const formDireccion = new FormData();

    if (direccionCargada !== null) {
      formDireccion.append('calle', direccion.calle);
      formDireccion.append('numero', direccion.numero);
      formDireccion.append('provincia', direccion.provincia);
      formDireccion.append('localidad', direccion.localidad);
      formDireccion.append('codigo_postal', direccion.codigo_postal);
      await setForm({...form,
        nombreApellido:document.getElementById("nombreApellido").value,
        telefono:document.getElementById("telefono").value,
        calle:direccion.calle,
        alturaKM:direccion.numero,
        piso:direccion.piso,
        depto:direccion.departamento,
        barrioLocalidad:direccion.localidad,
        entrecalle1:direccion.entre_calle_1,
        entrecalle2:direccion.entre_calle_2,
        codigoPostal:direccion.codigo_postal,
        comentario:direccion.informacion_adicional,
    })
    } else {
      formDireccion.append('calle', document.getElementById('calle').value);
      formDireccion.append('numero', document.getElementById('alturaKM').value);
      formDireccion.append(
        'provincia',
        document.getElementById('provincia').innerHTML,
      );
      formDireccion.append(
        'localidad',
        document.getElementById('barrioLocalidad').value,
      );
      formDireccion.append(
        'codigo_postal',
        document.getElementById('codigoPostal').value,
      );
    }

    apiFetch(formDireccion, 'direcciones', 'normalize').then(async (res) => {
      if (
        res.status === 'success' &&
        res.result[0].calle !== '' &&
        res.result[0].numero !== ''
      ) {
        scrollTop();
        await setResDirecciones(res.result);
        setViewDireccion(true);
      } else {
        setBuscandoDir(false);
        setLoader(false);
        setErrorDireccion(true);
        throwError('calle', 'labelCalle');
        throwError('alturaKM', 'labelAlturaKM');
        throwError('provincia', 'labelProvincia');
        throwError('barrioLocalidad', 'labelBarrioLocalidad');
        throwError('codigoPostal', 'labelCodigoPostal');
        scrollTop();
      }
    });
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

  const handleFinForm = () => {
    if (direccion !== '') {
      setTypeNav('envio');
    }
  };

  return (
    <div className='formCheckout'>
      <h2 className='TituloCartCheck' style={{ width: '100%' }} id='datos'>
        Datos de contacto
      </h2>

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
      {infoUser.length===0 ? 
        <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}>
          <Loader spin={'spinnerG'} />
        </div>
      :<>
      <div className='firstLine' style={{ marginTop: '12px' }}>
        <div className='margenInput margenInputEspecial'>
          <InputLabel className='labelForm' id='labelNombreApellido'>
            Nombre y Apellido ¿A quién se entrega? *
          </InputLabel>
          <TextField
            placeholder='Nombre Apellido'
            size='small'
            className={`inputForm`}
            defaultValue={infoUser!==undefined?infoUser.nombre+" "+infoUser.apellido:""}
            id='nombreApellido'
            onChangeCapture={() => {
              handleChangeForm(setForm, form);
              setCampoObligatorio(false);
            }}
            onFocus={(e) => onFocus(e, clase, clase2, 'labelNombreApellido')}
            sx={{
              '& .MuiOutlinedInput-root:hover': {
                '& > fieldset': {
                  borderColor: campoObligatorio && '#FF3F20',
                },
              },
            }}
          ></TextField>
          <InputLabel className='subLabelForm' sx={{ whiteSpace: 'initial' }}>
            Como aparece en el DNI
          </InputLabel>
        </div>
        <div className='margenInput'>
          <InputLabel className='labelForm' id='labelTelefono'>
            Telefono de contacto *
          </InputLabel>
          <TextField
            placeholder='011589210'
            size='small'
            className={`inputForm`}
            id='telefono'
            defaultValue={infoUser!==undefined?infoUser.telefono:""}
            onChangeCapture={() => {
              handleChangeForm(setForm, form);
              setErrorPhone(false);
              setCampoObligatorio(false);
            }}
            onFocus={(e) => onFocus(e, clase, clase2, 'labelTelefono')}
            type='number'
            sx={{
              '& .MuiOutlinedInput-root:hover': {
                '& > fieldset': {
                  borderColor: (campoObligatorio || errorPhone) && '#FF3F20',
                },
              },
            }}
          ></TextField>
          <InputLabel className='subLabelForm' sx={{ whiteSpace: 'initial' }}>
            Llamarán a este número si hay algún problema con el envío
          </InputLabel>
        </div>
      </div>

      {loader2 && (
        <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}>
          <Loader spin={'spinnerM'} />
          <br />
        </div>
      )}
      {direccionesCargadas.length !== 0 && (
        <div className='selectorDireccion'>
          <div
            className='selectorContainer'
            onClick={() => {
              if (!buscandoDir) {
                setSaveDirecc(usaDireccionCargada);
                setUsaDireccionCargada(!usaDireccionCargada);
                setDireccionCargada(null);
                setErrorDirCargada(false);
                setProvincia('');
              }
            }}
          >
            <FormControlLabel
              name='sucursal'
              control={<Checkbox sx={{ fontSize: '24px' }} />}
              id='nuevaDir'
              checked={usaDireccionCargada ? true : false}
              value='setDireccion'
              disabled={buscandoDir ? true : false}
            />
            <label
              className='labelForm'
              htmlFor='nuevaDir'
              style={{ cursor: 'pointer' }}
            >
              Utilizar una de mis direcciónes
            </label>
          </div>
        </div>
      )}

      {!usaDireccionCargada ? (
        <>
          <div className='firstLine'>
            <div className='margenInput margenInputEspecial'>
              <InputLabel className='labelForm' id='labelCalle'>
                Calle *
              </InputLabel>
              <TextField
                placeholder='Avenida Anta'
                size='small'
                className={`inputForm`}
                id='calle'
                onChangeCapture={() => {
                  handleChangeForm(setForm, form);
                  setErrorDireccion(false);
                  setCampoObligatorio(false);
                }}
                onFocus={(e) => onFocus(e, clase, clase2, 'labelCalle')}
                sx={{
                  '& .MuiOutlinedInput-root:hover': {
                    '& > fieldset': {
                      borderColor:
                        (campoObligatorio || errorDireccion) && '#FF3F20',
                    },
                  },
                }}
              ></TextField>
              <InputLabel className='subLabelForm' sx={{ whiteSpace: 'wrap' }}>
                Domicilio de entrega
              </InputLabel>
            </div>

            <div className='AlturaPisoDepto margenInput'>
              <div className='inputs'>
                <InputLabel className='labelForm' id='labelAlturaKM'>
                  Altura/Km *
                </InputLabel>
                <TextField
                  placeholder='1770'
                  size='small'
                  className='inputFormEspecial'
                  id='alturaKM'
                  onChangeCapture={() => {
                    handleChangeForm(setForm, form);
                    setErrorDireccion(false);
                    setCampoObligatorio(false);
                  }}
                  onFocus={(e) => onFocus(e, clase, clase2, 'labelAlturaKM')}
                  type='number'
                  sx={{
                    '& .MuiOutlinedInput-root:hover': {
                      '& > fieldset': {
                        borderColor:
                          (campoObligatorio || errorDireccion) && '#FF3F20',
                      },
                    },
                  }}
                ></TextField>
              </div>
              <div className='inputs'>
                <InputLabel className='labelForm'>Piso</InputLabel>
                <TextField
                  placeholder='5'
                  size='small'
                  className='inputFormEspecial'
                  id='piso'
                  onChangeCapture={() => handleChangeForm(setForm, form)}
                ></TextField>
              </div>
              <div className='inputs'>
                <InputLabel className='labelForm'>Dpto.</InputLabel>
                <TextField
                  placeholder='C'
                  size='small'
                  className='inputFormEspecial'
                  id='depto'
                  onChangeCapture={() => handleChangeForm(setForm, form)}
                ></TextField>
              </div>
            </div>
          </div>

          <div className='firstLine'>
            <div className='margenInput margenInputEspecial'>
              <InputLabel className='labelForm' id='labelProvincia'>
                Provincia *
              </InputLabel>
              <Select
                placeholder='Ciudad Autónoma de Buenos Aires'
                size='small'
                defaultValue={'ejemplo'}
                value={provincia === '' ? 'ejemplo' : provincia}
                onClickCapture={(e) => scrollTop(e.clientY)}
                onChange={(e) => {
                  setProvincia('');
                  document.getElementById('barrioLocalidad').value = '';
                  handleChange(e);
                  setErrorDireccion(false);
                  setCampoObligatorio(false);
                }}
                onFocus={(e) => onFocus(e, clase, clase2, 'labelProvincia')}
                id='provincia'
                className={`inputForm selector `}
                sx={{
                  '& div': {
                    fontSize: '14px',
                    color: provincia === '' ? '#BABCBE' : '#423B3C',
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 200,
                  },
                }}
              >
                <MenuItem
                  disabled
                  key={'ejemplo'}
                  value={'ejemplo'}
                  sx={{ fontSize: '14px', color: '#969696' }}
                >
                  {'Seleccioná una provincia'}
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
            <div className='margenInput'>
              <InputLabel className='labelForm' id='labelBarrioLocalidad'>
                Localidad / Barrio *
              </InputLabel>
              <TextField
                placeholder={
                  provincia === ''
                    ? 'Primero debes ingresar una provincia'
                    : 'Mar del Plata'
                }
                disabled={provincia === '' || provincia === '1' ? true : false}
                size='small'
                className={`inputForm`}
                id='barrioLocalidad'
                onChangeCapture={() => {
                  handleChangeForm(setForm, form);
                  setErrorDireccion(false);
                  setCampoObligatorio(false);
                  setChangeLoc(true);
                  setErrorLocalidad(false);
                }}
                onFocus={(e) =>
                  onFocus(e, clase, clase2, 'labelBarrioLocalidad')
                }
                onBlur={() => handleChangeLoc()}
                sx={{
                  '& .MuiOutlinedInput-root:hover': {
                    '& > fieldset': {
                      borderColor:
                        (campoObligatorio ||
                          errorDireccion ||
                          errorLocalidad) &&
                        '#FF3F20',
                    },
                  },
                }}
              ></TextField>
            </div>
          </div>

          <div className='firstLine'>
            <div className='margenInput margenInputEspecial'>
              <InputLabel className='labelForm'>Entrecalle 1</InputLabel>
              <TextField
                placeholder='Avenida Callao'
                size='small'
                className='inputForm'
                id='entrecalle1'
                onChangeCapture={() => handleChangeForm(setForm, form)}
              ></TextField>
            </div>
            <div className='margenInput'>
              <InputLabel className='labelForm'>Entrecalle 2</InputLabel>
              <TextField
                placeholder='Rodriguez Peña'
                size='small'
                className='inputForm'
                id='entrecalle2'
                onChangeCapture={() => handleChangeForm(setForm, form)}
              ></TextField>
            </div>
          </div>

          <div className='firstLine codPostalContainer'>
            <div className='codPostal'>
              <InputLabel className='labelForm' id='labelCodigoPostal'>
                Código Postal *
              </InputLabel>
              <TextField
                placeholder='1428'
                size='small'
                className={`inputForm`}
                id='codigoPostal'
                onChangeCapture={() => {
                  handleChangeForm(setForm, form);
                  setErrorCodPostal(false);
                  setErrorDireccion(false);
                  setCampoObligatorio(false);
                }}
                onFocus={(e) => onFocus(e, clase, clase2, 'labelCodigoPostal')}
                sx={{
                  '& .MuiOutlinedInput-root:hover': {
                    '& > fieldset': {
                      borderColor:
                        (campoObligatorio ||
                          errorCodPostal ||
                          errorDireccion) &&
                        '#FF3F20',
                    },
                  },
                }}
              ></TextField>
            </div>
            <a
              href='https://www.correoargentino.com.ar/formularios/cpa'
              target={'_blank'}
              rel='noreferrer'
            >
              No sé mi código postal
            </a>
          </div>

          <div
            className='firstLine'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div className='contenedorTextarea'>
              <InputLabel
                className='labelForm'
                sx={{ marginTop: '24px', marginBottom: '12px' }}
              >
                Información adicional
              </InputLabel>
              <TextField
                multiline
                rows={4}
                placeholder='Puerta roja, timbre blanco'
                size='small'
                className='inputForm textarea'
                id='comentario'
                disabled={buscandoDir ? true : false}
                onChangeCapture={() => {
                  if (!buscandoDir) {
                    handleChangeForm(setForm, form);
                  }
                }}
                inputProps={{ maxLength: 100 }}
              ></TextField>
            </div>
            <InputLabel className='subLabelForm' sx={{ whiteSpace: 'initial' }}>
              Agregar información útil para encontrar la dirección.
            </InputLabel>
          </div>

          <div className='firstLine' style={{ justifyContent: 'flex-start' }}>
            <FormControlLabel
              control={<Checkbox defaultChecked sx={{ fontSize: '24px' }} />}
              onChange={() => setSaveDirecc(!saveDirecc)}
              label='Guardar esta dirección para volver a usarla en otra compra'
              className='checkDirecc'
            />
          </div>
        </>
      ) : (
        <div className='contenedorDirecciones'>
          {direccionesCargadas.map((dir) => {
            return (
              <div
                className='cards'
                key={dir.iddireccion}
                onClick={() => {
                  !buscandoDir && setDireccionCargada(dir);
                  setErrorDirCargada(false);
                }}
              >
                <Radio
                  disabled={buscandoDir && true}
                  name='sucursal'
                  id='nuevaDir'
                  checked={
                    direccion !== null &&
                    direccion.iddireccion === dir.iddireccion
                      ? true
                      : false
                  }
                  value={dir.iddireccion}
                />
                <p className='labelForm' htmlFor='nuevaDir'>
                  {dir.calle} {dir.numero}.{' '}
                  {dir.provincia === 'Capital Federal' ? 'CABA' : dir.provincia}
                  , {dir.localidad} ({dir.codigo_postal}).
                  {dir.entre_calle_1 !== '' && 'Entre'}{' '}
                  {dir.entre_calle_1 !== '' && dir.entre_calle_1}{' '}
                  {dir.entre_calle_1 !== '' && 'y'}{' '}
                  {dir.entre_calle_2 !== '' && dir.entre_calle_2}
                  {dir.informacion_adicional}
                </p>
              </div>
            );
          })}
        </div>
      )}
      </>}

      {loader ? (
        <div style={{ marginTop: "24px",width:"100%",display:"flex",justifyContent:"center" }}>
          <Loader spin={'spinnerG'} />
        </div>
      ) : (
        <div className='botonEnvio'>
          <Button onClick={() => checkForm()}>CONTINUAR</Button>
        </div>
      )}

      {viewDireccion && (
        <PopUpInfoDir
          direccion={direccion}
          setDireccion={setDireccion}
          provincia={provincia}
          setViewDireccion={setViewDireccion}
          resDirecciones={resDirecciones}
          handleFinForm={handleFinForm}
          form={form}
          setBuscandoDir={setBuscandoDir}
          infoLocFinal={infoLocFinal}
        />
      )}

      {popLoc && (
        <PopUpLocalidad
          infoLoc={infoLoc}
          setPopLoc={setPopLoc}
          infoLocFinal={infoLocFinal}
          setInfoLocFinal={setInfoLocFinal}
        />
      )}
    </div>
  );
};

export default InfoContact;
