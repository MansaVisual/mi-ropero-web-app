import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { apiFetch } from "../../apiFetch/apiFetch";

const Caracteristicas = ({ form, setForm }) => {
  const navigate = useNavigate();

  const [caracteristicas, setCaracteristicas] = useState({});
  const [errorObligatorio, setErrorObligatorio] = useState(false);
  const [campoError, setCampoError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const dir = new FormData();
    dir.append("idcategoria", 1);
    let caract = {};
    apiFetch(dir, "categorias", "get").then((res) => {
      setData(res.result[0].caracteristicas);
      for (let i = 0; i < res.result[0].caracteristicas.length; i++) {
        let obj = res.result[0].caracteristicas[i].nombre;
        caract[obj] = [];
      }
      setCaracteristicas(caract);
    });
  }, []);

  const handleChange = (event, value) => {
    setCampoError("");
    setErrorObligatorio(false);
    if (value.valores_multiples === "0") {
      console.log("entra");
      setCaracteristicas((prevState) => ({
        ...prevState,
        [value.nombre]: [event.target.value.valor],
      }));
    } else {
      let i = caracteristicas[value.nombre];
      let ii = [];
      const busqueda = i.find((e) => e === event.target.value.valor);
      if (busqueda !== undefined) {
        ii = i.filter((e) => e !== event.target.value.valor);
        setCaracteristicas((prevState) => ({
          ...prevState,
          [value.nombre]: ii,
        }));
      } else {
        if (event.target.value.length <= 3) {
          setCaracteristicas((prevState) => ({
            ...prevState,
            [value.nombre]: event.target.value.valor,
          }));
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
      setForm((prevState) => ({
        ...prevState,
        caracteristicas: caracteristicas,
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

  console.log(data);

  return (
    <Grid className="gridContainer">
      <div className="caractContainer">
        <div className="container">
          <Breadcrumbs links={["MI TIENDA", "DETALLES"]} />
          <span className="title">CARACTERÍSTICAS</span>
          <span className="subtitle">
            Podés seleccionar varias opciones en cada caso.
          </span>
          {errorObligatorio && (
            <div className="errorBox">
              <CancelOutlinedIcon color="secondary" className="cruz" />
              <p>Ingresar campo obligatorio "{campoError}</p>
            </div>
          )}
          <div className="inputContainer">
            {data.map((select) => {
              console.log(select);
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
                            value={option}
                            /* `${option.idcaracteristica}:${option.idcaracteristicavalor}` */
                            /*  value={option.valor} */
                            sx={{ fontSize: "14px", color: "#969696" }}
                          >
                            {option.valor}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>
              );
            })}
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
    </Grid>
  );
};

export default Caracteristicas;
