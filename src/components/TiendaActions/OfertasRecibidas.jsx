import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import vacio from "../../assets/img/ofertasVacio.svg";
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../Loader/Loader";
import { apiFetch } from "../../apiFetch/apiFetch";

const OfertasRecibidas = () => {
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const [filtroSelecc, setFiltroSelecc] = useState({
    id: 3,
    nombre: "Realizada",
  });

  useEffect(() => {
    if (userLog) {
      setLoading(true);
      let array = [];
      const form = new FormData();
      form.append("idcliente", userLog);
      form.append("estado", filtroSelecc.id);
      apiFetch(form, "ofertas", "all_saler").then((res) => {
        if (res.status === "success") {
          for (const ii in res.result) {
            array.push(res.result[ii]);
          }
          setOfertas(array);
          setLoading(false);
        } else {
          if (
            res.status === "error" &&
            res.result === "La tienda no tiene ofertas"
          ) {
            setLoading(false);
          } else {
            console.log("error");
            setError(true);
            setLoading(false);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog, filtroSelecc]);

  const estados = {
    /* 0: "Sin definir", */
    1: "Solicitada",
    2: "En proceso",
    3: "Realizada",
    4: "Cancelada",
    5: "Rechazada",
  };

  return (
    <div className="ofertasContainer">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="container">
          <div className="ofertasSections">
            <div className="firstLine">
              <p className="title">OFERTAS RECIBIDAS</p>
            </div>
            <div className="ofertasList">
              {loading ? (
                <div
                  style={{
                    height: "50vh",
                    marginTop: "42px",
                    width: "100%",
                    display: "flex",
                    maxWidth: "1066px",
                    justifyContent: "center",
                  }}
                >
                  <Loader spin={"spinnerM"} />
                </div>
              ) : !error ? (
                ofertas.length > 0 ? (
                  ofertas.map((venta, id) => {
                    return (
                      <>
                        <div key={id} className="desktopCard">
                          <div className="data">
                            <img
                              src={venta.producto.imagenes[0].imagen_cuadrada}
                              alt="cardImage"
                            />
                            <div>
                              <p className="title">{venta.nombreProd}</p>
                              <div>
                                {/* <p className="offert">
                                  Precio: <span>${venta.monto}</span>
                                </p> */}
                                <p className="offert">
                                  Oferta: <span>${venta.oferta}</span>
                                </p>
                              </div>
                              <p className="date">
                                Fecha: <span>{venta.fecha}</span>
                              </p>
                              <p className="state">{venta.estado}</p>
                            </div>
                          </div>
                          <div className="rigthSide">
                            <p className="monto">${venta.monto}</p>
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
                        <div className="mobileCard">
                          <img
                            src={venta.producto.imagenes[0].imagen_cuadrada}
                            className="productImg"
                            alt="cardImage"
                          />
                          <div>
                            <p className="productoTitle">{venta.nombreProd}</p>
                            <div className="offerts">
                              {/* <p className="offert">
                                Precio: <span>${venta.monto}</span>
                              </p> */}
                              <p className="offert">
                                Oferta: <span>${venta.oferta}</span>
                              </p>
                            </div>
                            <p className="productoDate">{venta.fecha}</p>
                            <p className="productoState">
                              Estado: {venta.estado}
                            </p>
                          </div>
                          <img
                            src={basura}
                            className="trashICon"
                            alt="basuraIcon"
                          />
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="perfilVacio">
                    <div>
                      <img src={vacio} alt="LOGO" />
                      <p>{`No tienes ofertas en estado "${filtroSelecc.nombre}"`}</p>
                      <Button onClick={() => navigate(`/`)}>IR A INICIO</Button>
                    </div>
                  </div>
                )
              ) : (
                <div className="perfilVacio">
                  <div>
                    <img src={vacio} alt="LOGO" />
                    <p>
                      Error al traer operaciones. Vuelva a intentar en un
                      momento
                    </p>
                    <Button onClick={() => navigate(`/`)}>IR A INICIO</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bottomContainer">
            <div className="bottonSection">
              <div className="returnLink" onClick={() => navigate(`/MiTienda`)}>
                <img src={leftArrow} alt="leftArrow" />
                <p>VOLVER A MI TIENDA</p>
              </div>
              <Select
                displayEmpty
                className="selectInput"
                onChange={(e) => setFiltroSelecc(e.target.value)}
                value={filtroSelecc.nombre}
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
                {Object.keys(estados).map((key, i) => {
                  return (
                    <MenuItem
                      key={key}
                      value={{
                        id: key,
                        nombre: estados[key],
                      }}
                      sx={{ fontSize: "14px", color: "#969696" }}
                      className="selectOption"
                    >
                      {estados[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default OfertasRecibidas;
