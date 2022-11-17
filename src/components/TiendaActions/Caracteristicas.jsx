import React, { useState, useEffect, useContext } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useNavigate } from "react-router-dom";
import { UsePerfilContext } from "../../context/PerfilContext";

const Caracteristicas = ({ form, setForm }) => {
  const navigate = useNavigate();

  const { PerfilAPI } = useContext(UsePerfilContext);
  const [caracteristicas, setCaracteristicas] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const dir = new FormData();
    dir.append("idcategoria", 1);
    let caract = {};
    PerfilAPI(dir, "categorias", "get").then((res) => {
      setData(res.result[0].caracteristicas);
      for (let i = 0; i < res.result[0].caracteristicas.length; i++) {
        let obj = res.result[0].caracteristicas[i].nombre;
        caract[obj] = [];
      }
      setCaracteristicas(caract);
    });
  }, []);

  const handleChange = (event, value) => {
    if (value.valores_multiples === "0") {
      console.log("entra");
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
          console.log(i, event.target.value);
          setCaracteristicas((prevState) => ({
            ...prevState,
            [value.nombre]: event.target.value,
          }));
        }
      }
    }
  };

  console.log(caracteristicas);
  return (
    <Grid className="gridContainer">
      <div className="caractContainer">
        <div className="container">
          <Breadcrumbs links={["MI TIENDA", "DETALLES"]} />
          <span className="title">CARACTERÍSTICAS</span>
          <span className="subtitle">
            Podés seleccionar varias opciones en cada caso.
          </span>

          <div className="inputContainer">
            {data.map((select) => {
              /* let valor = caracteristicas.find((e) => select.nombre === e);
              console.log(valor); */
              return (
                <div className="inputBox">
                  <p className="labelInput" id="labelProvincia">
                    {select.nombre}
                  </p>
                  <Select
                    displayEmpty
                    multiple={select.valores_multiples === "0" ? false : true}
                    className="selectInput"
                    placeholder={`Selecciona ${select.nombre}`}
                    size="small"
                    id={select.nombre}
                    value={
                      caracteristicas[select.nombre] /* .length === 0
                        ? "ejemplo"
                        : caracteristicas[select.nombre] */
                    }
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Seleccioná de 1 a 3 opciones</em>;
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
          <div
            className="returnLink"
            onClick={() => navigate(`/MiTienda/IMAGENES`)}
          >
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A CARACTERÍSTICAS</p>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Caracteristicas;
