import React, { useEffect, useState, useContext } from "react";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import { useNavigate } from "react-router-dom";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import { apiFetch } from "../../apiFetch/apiFetch";
import vacio from "../../assets/img/comprasVacio.png";
import isologo from "../../assets/img/MRlogoGrande.png";
import Loader from "../Loader/Loader";
import { UseLoginContext } from "../../context/LoginContext";

const Ventas = () => {
  const navigate = useNavigate();
  const { userLog } = useContext(UseLoginContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [filtroSelecc, setFiltroSelecc] = useState("Pago realizado");

  const estados = {
    3: "Pendiente de pago",
    4: "Pago realizado",
    5: "Error en pago",
    7: "Pago devuelto",
    9: "Plazo de pago vencido",
    10: "En calificacion",
    11: "Finalizada",
  };

  let itemEstadoSelecc = "";

  for (const item in estados) {
    if (estados[item] === filtroSelecc) {
      itemEstadoSelecc = item;
    }
  }

  useEffect(() => {
    if (userLog) {
      setLoading(true);
      setError(false);
      setVentas([]);

      let array = [];

      const data = new FormData();
      data.append("vendedor_id", userLog);
      data.append("estado", itemEstadoSelecc);
      data.append("page", 0);
      data.append("bypage", 10);
      apiFetch(data, "operaciones", "all_saler").then((res) => {
        if (res.status === "success") {
          for (const ii in res.result.operaciones) {
            array.push(res.result.operaciones[ii]);
          }
          setLoading(false);
          setVentas(array);
        } else {
          if (
            res.status === "error" &&
            res.result === "No se encontraron operaciones"
          ) {
            setLoading(false);
          } else {
            setError(true);
            setLoading(false);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog, filtroSelecc]);

  const estadosSelect = [
    "Pendiente de pago",
    "Pago realizado",
    "Error en pago",
    "Pago devuelto",
    "Plazo de pago vencido",
    "En calificacion",
    "Finalizada",
  ];

  // const formatoFecha = (fecha) => {
  //   const fechaSinHora = fecha.substring(0, 10);
  //   const [year, month, day] = fechaSinHora.split("-");

  //   const formatoFinal = `${day} / ${month} / ${year}`;
  //   return formatoFinal;
  // };

  return (
    <div className="ventasContainer">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="container">
          <div className="ventasSections">
            <div className="firstLine">
              <p className="title">VENTAS</p>
            </div>
            <div className="ventasList">
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
                ventas.length > 0 ? (
                  ventas.map((venta, id) => {
                    return (
                      <>
                        <div key={id} className="desktopCard">
                          <div className="data">
                            <img
                              src={
                                venta.productos.length > 0
                                  ? venta.productos[0].imagenes[0]
                                  : isologo
                              }
                              alt="cardImage"
                            />
                            <div>
                              <p className="title">#ID: {venta.idoperacion}</p>
                              <p className="date">Fecha: {venta.fecha_alta}</p>
                              <p className="state">{venta.estado_text}</p>
                            </div>
                          </div>
                          <div className="rigthSide">
                            <p className="monto">${venta.total}</p>
                            {/* <img
                              onClick={() => {
                                setBorrarMsj(true);
                      setMensajeId(mensaje.idmensaje);
                              }}
                              className="basuraIcon"
                              src={basura}
                              alt="BasuraIcon"
                            /> */}
                          </div>
                        </div>
                        <div key={`mobile${id}`} className="mobileCard">
                          <img
                            src={
                              venta.productos.length > 0
                                ? venta.productos[0].imagenes[0]
                                : isologo
                            }
                            className="productImg"
                            alt="cardImage"
                          />
                          <div>
                            <p className="messageTitle">
                              #ID: {venta.idoperacion}
                            </p>
                            <p className="messageState">
                              Fecha: {venta.fecha_alta}
                            </p>
                            <p className="state">{venta.estado_text}</p>
                            <p className="monto">${venta.total}</p>
                          </div>
                          {/* <img
                            src={basura}
                            className="trashICon"
                            alt="basuraIcon"
                          /> */}
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="perfilVacio">
                    <div>
                      <img src={vacio} alt="LOGO" />
                      <p>{`No tienes ventas en estado "${filtroSelecc}"`}</p>
                      <Button onClick={() => navigate(`/Mi&Tienda`)}>
                        IR A MI TIENDA
                      </Button>
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
                    <Button onClick={() => navigate(`/Mi&Tienda`)}>
                      IR A MI TIENDA
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bottomContainer">
            <div className="bottonSection">
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
                onChange={(e) => setFiltroSelecc(e.target.value)}
                value={filtroSelecc}
                renderValue={(selected) => {
                  if (selected === "") {
                    return <em>Seleccion?? una opci??n</em>;
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
                  <em>Seleccion?? </em>
                </MenuItem>
                {estadosSelect.map((option) => (
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

export default Ventas;
