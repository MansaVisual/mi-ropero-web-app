import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { Radio } from "@mui/material";

const ElegirTipo = ({ tipo, setTipo }) => {
  const navigate = useNavigate();

  const subcat = [
    {
      name: "abrigos",
      id: 1,
    },
    {
      name: "buzos",
      id: 2,
    },
    {
      name: "chalecos",
      id: 3,
    },
    {
      name: "pantalones",
      id: 4,
    },
    {
      name: "Ropa de dormir",
      id: 5,
    },
    {
      name: "trajes",
      id: 6,
    },
    {
      name: "bermuda/short",
      id: 7,
    },
    {
      name: "calzas",
      id: 8,
    },
    {
      name: "chombas",
      id: 9,
    },
    {
      name: "pilota",
      id: 10,
    },
    {
      name: "ropa interior",
      id: 11,
    },
    {
      name: "bermuda/short",
      id: 15,
    },
    {
      name: "calzas",
      id: 16,
    },
    {
      name: "chombas",
      id: 17,
    },
    {
      name: "pilota",
      id: 18,
    },
    {
      name: "ropa interior",
      id: 19,
    },
  ];

  console.log(tipo);

  return (
    <div className="elegirTipoContainer">
      <div className="container">
        <Breadcrumbs links={["MI TIENDA", "PRODUCTOS"]} />
        <span className="title">ROPA</span>
        <span className="subtitle">¿Cuál es la subcategoría del producto?</span>
        <div className="subTypeSection">
          {subcat.map((cat) => {
            return (
              <div className="subType">
                <Radio
                  checked={tipo === cat.id}
                  className="radio"
                  name="radioButton"
                  onClick={() => setTipo(cat.id)}
                />
                <span className={tipo === cat.id ? "selected" : "notSelected"}>
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="buttonContainer">
          <button
            onClick={() => {
              navigate(`/MiTienda/IMAGENES`);
            }}
          >
            IR A IMÁGENES
          </button>
        </div>
        <div
          className="returnLink"
          onClick={() => navigate(`/MiTienda/CATEGORIA`)}
        >
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A MI CATEGORIA</p>
        </div>
      </div>
    </div>
  );
};

export default ElegirTipo;
