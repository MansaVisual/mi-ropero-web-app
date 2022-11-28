import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { apiFetch } from "../../apiFetch/apiFetch";
import Loader from "../Loader/Loader";

const Caracteristicas = ({ form, setForm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [caracteristicas, setCaracteristicas] = useState({});
  const [errorObligatorio, setErrorObligatorio] = useState(false);
  const [campoError, setCampoError] = useState("");
  const [data, setData] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState([]);
  const [idCaracteristica, setIdCaracteristica] = useState({});
  const [valueSeleccionado, setValueSeleccionado] = useState([]);
  const [valueSeleccionado2, setValueSeleccionado2] = useState([]);

  useEffect(() => {
    if (!form.categoriaId) {
      navigate(`/MiTienda/CATEGORIA`);
      return;
    }
    const dir = new FormData();
    dir.append("idcategoria", form.categoriaId);
    let caract = {};
    if (form.caracteristicas.length === 0) {
      apiFetch(dir, "categorias", "get").then((res) => {
        setData(res.result[0].caracteristicas);
        for (let i = 0; i < res.result[0].caracteristicas.length; i++) {
          let obj = res.result[0].caracteristicas[i].nombre;
          caract[obj] = [];
        }
        setCaracteristicas(caract);
        setIdCaracteristica(caract);
      });
    } else {
      apiFetch(dir, "categorias", "get").then((res) => {
        setData(res.result[0].caracteristicas);
        setCaracteristicas(form.caracteristicas);
        setIdCaracteristica(form.idCaracteristicaOld);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event, value) => {
    setCampoError("");
    setValueSeleccionado(event.target.value);
    setValueSeleccionado2(value);
    setErrorObligatorio(false);
    if (value.valores_multiples === "0") {
      setCaracteristicas((prevState) => ({
        ...prevState,
        [value.nombre]: [event.target.value],
      }));
    } else {
      let i = caracteristicas[value.nombre];
      let ii = [];
      const busqueda = i.find((e) => e === event.target.value);

      if (busqueda !== undefined) {
        ii = i.filter((e) => e !== event.target.value);
        setCaracteristicas((prevState) => ({
          ...prevState,
          [value.nombre]: ii,
        }));
      } else {
        if (event.target.value.length <= 3) {
          setCaracteristicas((prevState) => ({
            ...prevState,
            [value.nombre]: event.target.value,
          }));
        }
      }
    }
  };

  useEffect(() => {
    arrayIdCaracteristicas();
  }, [estadoSeleccionado]); // eslint-disable-line react-hooks/exhaustive-deps

  const arrayIdCaracteristicas = () => {
    if (valueSeleccionado2.length !== 0) {
      if (valueSeleccionado2.valores_multiples === "0") {
        setIdCaracteristica((prevState) => ({
          ...prevState,
          [valueSeleccionado2.nombre]: [estadoSeleccionado],
        }));
      } else {
        let i = idCaracteristica[valueSeleccionado2.nombre];
        let ii = [];
        const busqueda = i.find((e) => e === estadoSeleccionado);

        if (busqueda !== undefined) {
          ii = i.filter((e) => e !== estadoSeleccionado);
          setIdCaracteristica((prevState) => ({
            ...prevState,
            [valueSeleccionado2.nombre]: ii,
          }));
        } else {
          if (valueSeleccionado.length <= 3) {
            setIdCaracteristica((prevState) => ({
              ...prevState,
              [valueSeleccionado2.nombre]: i.concat(estadoSeleccionado),
            }));
          }
        }
      }
    }
  };

  const handleSubmit = () => {
    const obligatorio = data.filter((info) => info.es_obligatoria === "1");

    for (let i = 0; i < obligatorio.length; i++) {
      for (const item in caracteristicas) {
        if (
          obligatorio[i].nombre === item &&
          caracteristicas[item].length === 0
        ) {
          setCampoError(item);
          setErrorObligatorio(true);
          scrollTop();
          return;
        }
      }
    }
    if (!errorObligatorio) {
      let array = [];
      for (const i in idCaracteristica) {
        if (idCaracteristica[i] !== undefined)
          for (const ii in idCaracteristica[i]) {
            array = array.concat([idCaracteristica[i][ii]]);
          }
      }
      setForm((prevState) => ({
        ...prevState,
        caracteristicas: caracteristicas,
        idCaracteristica: array,
        idCaracteristicaOld: idCaracteristica,
      }));
      navigate(`/MiTienda/DETALLES`);
    }
  };

  const scrollTop = (param) => {
    if (param !== undefined) {
      setTimeout(() => {
        window.scrollTo({
          top: param,
          behavior: "auto",
        });
      }, 0);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log(form);

  for (const i in form.imagenes) {
    console.log(form.imagenes[i]);
  }

  return (
    <div className="caractContainer">
      <div className="container">
        <Breadcrumbs links={pathnames} />
        <span className="title">CARACTERÍSTICAS</span>
        <span className="subtitle">
          Podés seleccionar varias opciones en cada caso.
        </span>
        {errorObligatorio && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>Ingresar campo obligatorio "{campoError}"</p>
          </div>
        )}
        <div className="inputContainer">
          {data.length === 0 ? (
            <div
              style={{
                marginTop: "24px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Loader spin={"spinnerG"} />
            </div>
          ) : (
            data.map((select) => {
              return (
                <div className="inputBox">
                  <p className="labelInput" id="label">
                    {select.nombre} {select.es_obligatoria === "1" ? "*" : ""}
                  </p>
                  <Select
                    displayEmpty
                    multiple={select.valores_multiples === "0" ? false : true}
                    className="selectInput"
                    placeholder={`Selecciona ${select.nombre}`}
                    size="small"
                    id={select.nombre}
                    value={caracteristicas[select.nombre]}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return (
                          <em>
                            {select.valores_multiples === "0"
                              ? `Selecciona ${select.nombre}`
                              : "Seleccioná de 1 a 3 opciones"}
                          </em>
                        );
                      }
                      return selected.join(", ");
                    }}
                    onChange={(event) => {
                      handleChange(event, select);
                    }}
                    sx={{
                      "& div": {
                        fontSize: "14px",
                        color:
                          select.caractValue === "" ? "#BABCBE" : "#423B3C",
                        fontWeight: "400",
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
                      key={"ejemplo"}
                      value={"ejemplo"}
                      sx={{
                        fontSize: "14px",
                        color: "#BABCBE",
                        fontWeight: "400",
                      }}
                    >
                      {`Selecciona ${select.nombre}`}
                    </MenuItem>
                    {select.valores.length > 0 &&
                      select.valores.map((option, i) => {
                        if (option === "") {
                          return null;
                        }
                        return (
                          <MenuItem
                            key={i}
                            value={option.valor}
                            /* `${option.idcaracteristica}:${option.idcaracteristicavalor}` */
                            onClick={() => {
                              if (
                                estadoSeleccionado ===
                                `${option.idcaracteristica}:${option.idcaracteristicavalor}`
                              ) {
                                arrayIdCaracteristicas();
                              } else {
                                setEstadoSeleccionado(
                                  `${option.idcaracteristica}:${option.idcaracteristicavalor}`
                                );
                              }
                            }}
                            sx={{ fontSize: "14px", color: "#969696" }}
                          >
                            {option.valor}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>
              );
            })
          )}
        </div>
        <div className="buttonContainer">
          <button onClick={() => handleSubmit()}>IR A DETALLES</button>
        </div>
        <div
          className="returnLink"
          onClick={() => navigate(`/MiTienda/IMAGENES`)}
        >
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A IMAGENES</p>
        </div>
      </div>
    </div>
  );
};

export default Caracteristicas;
