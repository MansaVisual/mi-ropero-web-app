import React, { useEffect, useState, useContext } from "react";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import { useNavigate } from "react-router-dom";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import vacio from "../../assets/img/comprasVacio.png";
import Loader from "../Loader/Loader";

const Ventas = () => {
  const navigate = useNavigate();
  const { tiendaData } = useContext(UseMiTiendaContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [filtroSelecc, setFiltroSelecc] = useState("Pago realizado");

  const estados = [
    "Pendiente de pago",
    "Pago realizado",
    "Error en pago",
    "Pago devuelto",
    "Plazo de pago vencido",
    "En calificacion",
    "Finalizada",
  ];

  let itemEstadoSelecc = "";

  for (const item in estados) {
    if (estados[item] === filtroSelecc) {
      itemEstadoSelecc = item;
    }
  }

  useEffect(() => {
    if (tiendaData) {
      setLoading(true);

      let array = [];

      const data = new FormData();
      data.append("vendedor_id", tiendaData.idtienda);
      data.append("estado", itemEstadoSelecc);
      data.append("page", 0);
      data.append("bypage", 10);
      apiFetch(data, "operaciones", "all_saler").then((res) => {
        console.log(res.status);
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
            console.log("error");
            setError(true);
            setLoading(false);
          }
        }
      });
    }
  }, [tiendaData, filtroSelecc]);

  const array = [
    {
      img: foto,
      idCompra: "MRO-0000001375",
      fecha: "9/8/2022  15:09:22 hs",
      estado: "Pago realizado",
      monto: 2000,
    },
  ];

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
                ventas ? (
                  ventas.map((venta, id) => {
                    return (
                      <>
                        <div key={id} className="desktopCard">
                          <div className="data">
                            <img src={venta.img} alt="cardImage" />
                            <div>
                              <p className="title">#ID: {venta.idCompra}</p>
                              <p className="date">Fecha: {venta.fecha}</p>
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
                        <div key={`mobile${id}`} className="mobileCard">
                          <img
                            src={venta.img}
                            className="productImg"
                            alt="cardImage"
                          />
                          <div>
                            <p className="messageTitle">
                              #ID: {venta.idCompra}
                            </p>
                            <p className="messageState">Fecha: {venta.fecha}</p>
                            <p className="state">{venta.estado}</p>
                            <p className="monto">${venta.monto}</p>
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
                      <p>{`No tienes ventas en estado ${filtroSelecc}`}</p>
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
                value={filtroSelecc}
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
                {estados.map((option) => (
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
