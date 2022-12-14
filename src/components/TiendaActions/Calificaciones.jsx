import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import lupaGrande from "../../assets/img/lupaGrande.png";
import StarIcon from "@mui/icons-material/Star";
import leftArrow from "../../assets/img/leftArrow.png";
import { Grid, MenuItem, Rating, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import Loader from "../Loader/Loader";

const Calificaciones = () => {
  const navigate = useNavigate();
  const { userLog } = useContext(UseLoginContext);

  const [selected, setSelected] = useState("mejor valoración");
  const stateList = ["mejor valoración", "menor valoración"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [calificaciones, setCalificaciones] = useState([]);
  const [califFiltradas, setCalifFiltradas] = useState([]);

  useEffect(() => {
    if (userLog) {
      setLoading(true);
      const data = new FormData();
      data.append("idcliente", Number(userLog));
      apiFetch(data, "calificaciones", "all").then((res) => {
        if (res.status === "success") {
          setCalificaciones(res.result);
          setLoading(false);
        } else {
          if (
            res.status === "error" &&
            res.result === "La tienda no tiene calificaciones"
          ) {
            setLoading(false);
          } else {
            setError(true);
            setLoading(false);
          }
        }
      });
    }
  }, [userLog]);

  useEffect(() => {
    if (calificaciones.length > 0) {
      let listaCalif = calificaciones;
      if (selected === "mejor valoración") {
        listaCalif.sort(function (a, b) {
          return b - a;
        });
        setCalifFiltradas(listaCalif.filter((msg) => msg.estado === "2"));
      }
      if (selected === "menor valoración") {
        listaCalif.sort(function (a, b) {
          return a - b;
        });
        setCalifFiltradas(listaCalif.filter((msg) => msg.estado === "2"));
      }
    }
  }, [calificaciones, selected]);

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
              {loading ? (
                <div
                  style={{
                    height: "50vh",
                    marginTop: "42px",
                    width: "100%",
                    maxWidth: "895px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Loader spin={"spinnerM"} />
                </div>
              ) : !error ? (
                califFiltradas.length > 0 ? (
                  califFiltradas.map((data, id) => {
                    return (
                      <>
                        <div key={id} className="desktopCard">
                          <div className="data">
                            <div>
                              <p className="id">
                                Operacion: <span>{data.idoperacion}</span>
                              </p>
                              <p className="name">Fecha: {data.fecha}</p>
                              <p className="review">"{data.mensaje}"</p>
                            </div>
                          </div>
                          <div className="rigthSide">
                            <Rating
                              name="text-feedback"
                              value={Number(data.estrellas)}
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
                          </div>
                        </div>
                        <div key={`mobile${id}`} className="mobileCard">
                          <div>
                            <p className="messageTitle">
                              Operacion: <span>{data.idoperacion}</span>
                            </p>
                            <p className="messageState">Fecha: {data.fecha}</p>
                            <p className="discountLink">"{data.mensaje}"</p>
                            <Rating
                              name="text-feedback"
                              value={Number(data.estrellas)}
                              readOnly
                              precision={0.5}
                              icon={
                                <StarIcon
                                  style={{ width: "15px", height: "15px" }}
                                ></StarIcon>
                              }
                              emptyIcon={
                                <StarIcon
                                  style={{
                                    opacity: 0.55,
                                    width: "15px",
                                    height: "15px",
                                  }}
                                />
                              }
                            />
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="perfilVacio">
                    <div>
                      <img src={lupaGrande} alt="LOGO" />
                      <p>No tienes calificaciones de momento</p>
                      <Button onClick={() => navigate(`/Mi&Tienda`)}>
                        IR A MI TIENDA
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <div className="perfilVacio">
                  <div>
                    <img src={lupaGrande} alt="LOGO" />
                    <p>
                      Error al traer calificaciones. Vuelva a intentar en un
                      momento
                    </p>
                    <Button onClick={() => navigate(`/Mi&Tienda`)}>
                      IR A MI TIENDA
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bottomContainer">
            <div className="bottomSection">
              <div
                className="returnLink"
                onClick={() => navigate(`/Mi&Tienda`)}
              >
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
        </div>
      </Grid>
    </div>
  );
};

export default Calificaciones;
