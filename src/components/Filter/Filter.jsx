import React, { useState, Fragment, useEffect } from 'react';
import {
  Divider,
  // Box,
  // TextField,
  Collapse,
  ListItemText,
  List,
  ListSubheader,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  FormControlLabelStyled,
  // ListItemPriceRangeStyled,
  ListItemStyled,
  ListItemTextStyled,
} from './styles';
import theme from '../../styles/theme';
import { useParams } from 'react-router-dom';

const Filter = (props) => {
  const [openFilter, setOpenFilter] = useState({
    sort: false,
    categoriasCol: true,
  });

  const { keyword, search } = useParams();

  const putFilters = props.putFilters;
  const setPutFilters = props.setPutFilters;
  const putSort = props.putSort;
  const setPutSort = props.setPutSort;
  const filtros = props.filtros.caracteristicas;
  const coleccion = props.coleccion;
  const putCategory = props.putCategory;
  const setPutCategory = props.setPutCategory;
  const handleAplicarFiltros = props.handleAplicarFiltros;
  const ProdAPI=props.ProdAPI
  const setProds=props.setProds
  const categorias=props.categorias
  const setTotalPages=props.setTotalPages
  const rangoPrecio=props.rangoPrecio
  const setRangoPrecio=props.setRangoPrecio

  useEffect(() => {
    if (filtros !== undefined) {
      addFilters();
    }
  }, [filtros]); // eslint-disable-line react-hooks/exhaustive-deps

  const addFilters = () => {
    for (let i = 0; i < filtros.length; i++) {
      setOpenFilter((currentState) => {
        return { ...currentState, [filtros[i].nombre]: false };
      });
    }
  };

  const handleClick = (filter) => {
    setOpenFilter({ ...openFilter, [filter]: !openFilter[filter] });
  };

  const handleChangeSort = (e) => {
    setPutSort(e.target.value);
  };

  
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 297,
        bgcolor: 'transparent',
        fontFamily: theme.typography.fontFamily,
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader
          component='div'
          id='nested-list-subheader'
          sx={{
            bgcolor: 'transparent',
            fontSize: theme.typography.fontSize[9],
            paddingLeft: 0,
            paddingBottom: '22px',
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {props.children}
        </ListSubheader>
      }
    >
      <Button
        className='botonAplicarFiltros'
        disabled={
          putSort === '' && putFilters.length === 0 
            ? true
            : false
        }
        sx={{
          background:
            putSort === '' && putFilters.length === 0
              ? '#998edb'
              : "#443988",
        }}
        onClick={() => handleAplicarFiltros()}
      >
        Aplicar
      </Button>

      <Divider />
      <ListItemStyled onClick={() => handleClick('sort')}>
        <ListItemText primary='Ordenar por' sx={ListItemTextStyled} />
        {openFilter.sort ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.sort} timeout='auto' unmountOnExit>
        <List component='div'>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue=''
            name='radio-buttons-group'
            onChangeCapture={(e) => handleChangeSort(e)}
          >
            <FormControlLabel
              value='Mas relevante primero'
              checked={putSort === 'Mas relevante primero' ? true : false}
              control={<Radio />}
              label='Mas relevante primero'
              sx={FormControlLabelStyled}
            />
            <FormControlLabel
              value='Menos relevante primero'
              checked={putSort === 'Menos relevante primero' ? true : false}
              control={<Radio />}
              label='Menos relevante primero'
              sx={FormControlLabelStyled}
            />
            <FormControlLabel
              value='Mayor precio primero'
              checked={putSort === 'Mayor precio primero' ? true : false}
              control={<Radio />}
              label='Mayor precio primero'
              sx={FormControlLabelStyled}
            />
            <FormControlLabel
              value='Menor precio primero'
              checked={putSort === 'Menor precio primero' ? true : false}
              control={<Radio />}
              label='Menor precio primero'
              sx={FormControlLabelStyled}
            />
          </RadioGroup>
        </List>
      </Collapse>
      {putSort !== '' && (
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[3],
            fontWeight: theme.typography.fontWeightRegular,
            color: theme.palette.tertiary.main,
          }}
        >
          {putSort}
        </Typography>
      )}
      <Divider />

      {coleccion !== undefined && coleccion.length !== 0 && (
        <Fragment>
          <ListItemStyled onClick={() => handleClick('categoriasCol')}>
            <ListItemText primary='Categorias' sx={ListItemTextStyled} />
            {openFilter.categoriasCol ? <ExpandLess /> : <ExpandMore />}
          </ListItemStyled>
          <Collapse
            in={openFilter.categoriasCol}
            timeout='auto'
            unmountOnExit
            className='scrollFilter'
            sx={{
              maxHeight: '60vh',
              overflowY: 'scroll',
            }}
          >
            {coleccion.productos_categorias.map((res2, i2) => {
              return (
                <Fragment key={i2}>
                  {res2.nombre !== 'ROPA' &&
                    res2.nombre !== 'CALZADO' &&
                    res2.nombre !== 'ACCESORIOS' &&
                    res2.nombre !== 'BELLEZA' && (
                      <List component='div' sx={{ paddingLeft: '4px' }}>
                        <FormControlLabel
                          label={res2.nombre}
                          control={
                            <Radio
                              checked={
                                putCategory === res2.nombre ? true : false
                              }
                              name={res2.valor}
                              onClick={(e) => {
                                setPutCategory(res2.nombre);
                              }}
                            />
                          }
                          sx={FormControlLabelStyled}
                        />
                      </List>
                    )}
                </Fragment>
              );
            })}
          </Collapse>
          <Divider />
        </Fragment>
      )}

      {filtros !== undefined && search===undefined &&
        coleccion === undefined &&
        filtros.map((res, i) => {
          return (
            <Fragment key={i}>
              <ListItemStyled onClick={() => handleClick(res.nombre)}>
                <ListItemText primary={res.nombre} sx={ListItemTextStyled} />
                {openFilter[res.nombre] ? <ExpandLess /> : <ExpandMore />}
              </ListItemStyled>
              <Collapse
                in={openFilter[res.nombre]}
                timeout='auto'
                unmountOnExit
                className='scrollFilter'
                sx={{
                  maxHeight: '60vh',
                  overflowY: 'scroll',
                }}
              >
                {res.valores.map((res2, i2) => {
                  return (
                    <List component='div' key={i2}>
                      <FormControlLabel
                        label={res2.valor}
                        control={
                          <Checkbox
                            checked={putFilters.find(
                              (element) => element.nombre === res2.valor,
                            )}
                            name={res2.valor}
                            onClick={(e) => {
                              if (putFilters.length !== 0) {
                                let oldArray = putFilters.filter(
                                  (element) => element.nombre === e.target.name,
                                );
                                let newArray = putFilters.filter(
                                  (element) => element.nombre !== e.target.name,
                                );
                                if (oldArray.length === 0) {
                                  setPutFilters([
                                    ...newArray,
                                    {
                                      nombre: e.target.name,
                                      id: res2.idcaracteristicavalor,
                                      idName: res2.idcaracteristica,
                                    },
                                  ]);
                                } else {
                                  if(newArray.length===0){
                                    const catProd = new FormData();
                                    let idCat = '';
                                    idCat = categorias.find(
                                      (e) => e.nombre.toString().trim() === keyword.replaceAll('&', '/'),
                                    );
                                    catProd.append('idcategoria', idCat.idcategoria);
                                    catProd.append('bypage', 15);
                                    catProd.append('page', 0);
                                    ProdAPI(catProd, 'productos', 'search').then((res) => {
                                      if (res.status === 'success') {
                                        setProds(res.result.productos);
                                        setTotalPages(res.result.total_paginas);
                                      }
                                    });
                                  }
                                  setPutFilters(newArray);
                                }
                              } else {
                                setPutFilters([
                                  {
                                    nombre: e.target.name,
                                    id: res2.idcaracteristicavalor,
                                    idName: res2.idcaracteristica,
                                  },
                                ]);
                              }
                            }}
                          />
                        }
                        sx={FormControlLabelStyled}
                      />
                    </List>
                  );
                })}
              </Collapse>
              <Divider />
            </Fragment>
          );
        })}
      {filtros !== undefined && search===undefined &&
        coleccion !== undefined &&
        filtros.map((res, i) => {
          return (
            <Fragment key={i}>
              <ListItemStyled onClick={() => handleClick(res.nombre)}>
                <ListItemText primary={res.nombre} sx={ListItemTextStyled} />
                {openFilter[res.nombre] ? <ExpandLess /> : <ExpandMore />}
              </ListItemStyled>
              <Collapse
                in={openFilter[res.nombre]}
                timeout='auto'
                unmountOnExit
                className='scrollFilter'
                sx={{
                  maxHeight: '60vh',
                  overflowY: 'scroll',
                }}
              >
                {res.valores.map((res2, i2) => {
                  return (
                    <List component='div' key={i2}>
                      <FormControlLabel
                        label={res2.valor}
                        control={
                          <Checkbox
                            checked={putFilters.find(
                              (element) => element.nombre === res2.valor,
                            )}
                            name={res2.valor}
                            onClick={(e) => {
                              if (putFilters.length !== 0) {
                                let oldArray = putFilters.filter(
                                  (element) => element.nombre === e.target.name,
                                );
                                let newArray = putFilters.filter(
                                  (element) => element.nombre !== e.target.name,
                                );
                                if (oldArray.length === 0) {
                                  setPutFilters([
                                    ...newArray,
                                    {
                                      nombre: e.target.name,
                                      id: res2.idcaracteristicavalor,
                                      idName: res2.idcaracteristica,
                                    },
                                  ]);
                                } else {
                                  setPutFilters(newArray);
                                }
                              } else {
                                setPutFilters([
                                  {
                                    nombre: e.target.name,
                                    id: res2.idcaracteristicavalor,
                                    idName: res2.idcaracteristica,
                                  },
                                ]);
                              }
                            }}
                          />
                        }
                        sx={FormControlLabelStyled}
                      />
                    </List>
                  );
                })}
              </Collapse>
              <Divider />
            </Fragment>
          );
        })}

      <List component="div" sx={{ paddingTop: "16px", paddingBottom: "24px" }}>
        <ListItemText primary="Rango de precio"/>
        <Box sx={{ display: "flex" }}>
          <TextField
            id="min-price"
            label="$ Minimo"
            variant="outlined"
            sx={{ mr: "16px", fontSize: "13px", width: "120px",mt:"6px" }}
            value={rangoPrecio!==undefined && rangoPrecio.min!==0?rangoPrecio.min:""}
            onChangeCapture={()=>{
              setRangoPrecio(
                {
                  min:document.getElementById("min-price").value,
                  max:document.getElementById("max-price").value
                }
              )
            }}
            size="small"
            inputProps={{ maxLength: 6 }}
          />
          <TextField
            id="max-price"
            label="$ Maximo"
            variant="outlined"
            sx={{ fontSize: "13px", width: "120px",mt:"6px" }}
            value={rangoPrecio!==undefined && rangoPrecio.max!==0?rangoPrecio.max:""}
            onChangeCapture={()=>{
              setRangoPrecio(
                {
                  min:document.getElementById("min-price").value,
                  max:document.getElementById("max-price").value
                }
              )
            }}
            size="small"
            inputProps={{ maxLength: 6 }}
            />
        </Box>
      </List> 
    </List>
  );
};

export default Filter;
