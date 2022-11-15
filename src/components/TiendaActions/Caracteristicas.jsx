import React, { useState, useEffect, useContext } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useNavigate } from "react-router-dom";
import { UsePerfilContext } from "../../context/PerfilContext";

const Caracteristicas = () => {
  const navigate = useNavigate();

  const [generosList, setGenerosList] = useState([]);

  const [genero, setGenero] = useState("");
  const [talle, setTalle] = useState("");
  const [colores, setColores] = useState("");

  const { PerfilAPI } = useContext(UsePerfilContext);

  useEffect(() => {
    PerfilAPI("", "clientes", "get_sexos").then((res) => {
      console.log(res);
      if (res.status === "success") {
        let array = [""];
        for (const gen in res.result) {
          array.push(res.result[gen]);
        }
        setGenerosList(array);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectList = [
    {
      label: "Género *",
      placeholder: "Seleccionar género(s)",
      multiple: false,
      options: [
        {
          name: "Hombre",
          id: "10:1",
        },
        {
          name: "Mujer",
          id: "10:2",
        },
        {
          name: "Otros",
          id: "10:3",
        },
      ],
      caractValue: genero,
      changeFunction: setGenero,
    },
    {
      label: "Talle *",
      placeholder: "Seleccionar talle(s)",
      options: [
        {
          name: "xs",
          id: "20:1",
        },
        {
          name: "sm",
          id: "20:2",
        },
        {
          name: "md",
          id: "20:3",
        },
      ],
      caractValue: talle,
      changeFunction: setTalle,
    },
    {
      label: "Color/es *",
      placeholder: "Seleccionar color/es ",
      multiple: true,
      options: [
        {
          name: "rojo",
          id: "30:1",
        },
        {
          name: "verde",
          id: "30:2",
        },
        {
          name: "amarillo",
          id: "30:3",
        },
        {
          name: "rojo",
          id: "30:1",
        },
        {
          name: "verde",
          id: "30:2",
        },
        {
          name: "amarillo",
          id: "30:3",
        },
        {
          name: "rojo",
          id: "30:1",
        },
        {
          name: "verde",
          id: "30:2",
        },
        {
          name: "amarillo",
          id: "30:3",
        },
      ],
      caractValue: colores,
      changeFunction: setColores,
    },
  ];

  const handleChange = (event, changeFunction) => {
    changeFunction(event.target.value);
  };

  console.log(generosList);

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
            {selectList.map((select) => {
              return (
                <div className="inputBox">
                  <p className="labelInput" id="labelProvincia">
                    {select.label}
                  </p>
                  <Select
                    /* {...(select.multiple && {multiple:multiple})} */
                    displayEmpty
                    className="selectInput"
                    placeholder={select.placeholder}
                    size="small"
                    id="provincia"
                    value={
                      select.caractValue === "" ? "ejemplo" : select.caractValue
                    }
                    onChange={(event) => {
                      handleChange(event, select.changeFunction);
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
                      {select.placeholder}
                    </MenuItem>
                    {select.options.length > 0 &&
                      select.options.map((option, i) => (
                        <MenuItem
                          key={i}
                          value={option.id}
                          sx={{ fontSize: "14px", color: "#969696" }}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
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
