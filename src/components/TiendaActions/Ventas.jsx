import React, { useEffect, useState, useContext } from "react";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import { useNavigate } from "react-router-dom";
import { Grid, MenuItem, Select } from "@mui/material";
import { UseLoginContext } from "../../context/LoginContext";
import { apiFetch } from "../../apiFetch/apiFetch";

const Ventas = () => {
  const navigate = useNavigate();
  const { userLog } = useContext(UseLoginContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
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
    if (userLog) {
      setLoading(true);

      let array = [];

      const data = new FormData();
      data.append("vendedor_id", Number(userLog));
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
            res.result === "La tienda no operaciones"
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
  }, [userLog]);

  const array = [
    {
      img: foto,
      idCompra: "MRO-0000001375",
      fecha: "9/8/2022  15:09:22 hs",
      estado: "Pago realizado",
      monto: 2000,
    },
  ];

  const stateList = ["pago Realizado", "en espera"];

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
              {array.map((venta, id) => {
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
                        <p className="messageTitle">#ID: {venta.idCompra}</p>
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
              })}
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
