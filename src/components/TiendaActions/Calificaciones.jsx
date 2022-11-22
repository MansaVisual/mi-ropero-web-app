import React, { useState, useEffect, useContext } from "react";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import foto from "../../assets/img/fotoProd.png";
import error from "../../assets/img/error.png";
import basura from "../../assets/img/basura.png";
import StarIcon from "@mui/icons-material/Star";
import leftArrow from "../../assets/img/leftArrow.png";
import { Grid, MenuItem, Rating, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";

const Calificaciones = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("mejor valoración primero");

  const { calificacionesList } = useContext(UseMiTiendaContext);

  useEffect(() => {
    calificacionesList();
  }, []);

  const array = [
    {
      img: foto,
      id: 1371,
      nombre: "Marcelo Moda",
      reseña:
        "“El producto está igual a lo que decía la publicación, estoy más que satisfecho con la compra”",
      rating: 3.5,
    },
  ];
  const stateList = ["mejor valoración primero", "en espera"];
  return (
    <div className="calificacionesContainer">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="container">
          <div className="calificacionesSections">
            <div className="firstLine">
              <p className="title">CALIFICACIONES</p>
            </div>
            <div className="calificacionesList">
              {array.map((venta, id) => {
                return (
                  <div key={id} className="desktopCard">
                    <div className="data">
                      <img src={venta.img} alt="cardImage" />
                      <div>
                        <p className="id">
                          Operacion: <span>{venta.id}</span>
                        </p>
                        <p className="name">{venta.nombre}</p>
                        <p className="review">{venta.reseña}</p>
                      </div>
                    </div>
                    <div className="rigthSide">
                      <Rating
                        name="text-feedback"
                        value={venta.rating}
                        readOnly
                        precision={0.5}
                        icon={
                          <StarIcon
                            style={{ width: "20px", height: "20px" }}
                          ></StarIcon>
                        }
                        emptyIcon={
                          <StarIcon
                            style={{
                              opacity: 0.55,
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        }
                      />
                      <img
                        onClick={() => {
                          /* setBorrarMsj(true);
                      setMensajeId(mensaje.idmensaje); */
                        }}
                        className="basuraIcon"
                        src={basura}
                        alt="BasuraIcon"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bottomContainer">
            <div className="returnLink" onClick={() => navigate(`/MiTienda`)}>
              <img src={leftArrow} alt="leftArrow" />
              <p>VOLVER A MI TIENDA</p>
            </div>
            <Select
              displayEmpty
              className="selectInput"
              onChange={(e) => setSelected(e.target.value)}
              value={selected}
              renderValue={(selected) => {
                if (selected === "") {
                  return <em>Seleccioná una opción</em>;
                }
                return selected;
              }}
              sx={{
                "& div": {
                  fontSize: "14px",
                  fontWeight: "400",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                },
                height: 42,
              }}
            >
              <MenuItem
                disabled
                value=""
                className="selectOption"
                sx={{ fontSize: "14px", color: "#BABCBE", fontWeight: "400" }}
              >
                <em>Seleccioná </em>
              </MenuItem>
              {stateList.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{ fontSize: "14px", color: "#969696" }}
                  className="selectOption"
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Calificaciones;
