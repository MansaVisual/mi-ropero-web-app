import React from "react";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import { useNavigate } from "react-router-dom";
import { Grid, MenuItem, Select } from "@mui/material";

const Ventas = () => {
  const navigate = useNavigate();

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
              <button>AGREGAR PRODUCTO</button>
            </div>
            <div className="ventasList">
              {array.map((venta, id) => {
                return (
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
              /* onChange={(e) => setTypeMessage(e.target.value)}
            value={typeMessage} */
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

export default Ventas;
