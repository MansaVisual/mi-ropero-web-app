import React from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import { useNavigate } from "react-router-dom";

const OfertasRecibidas = () => {
  const navigate = useNavigate();

  const array = [
    {
      img: foto,
      nombreProd: "Conjunto Grisino (1 a 3 meses)",
      fecha: "9/8/2022  15:09:22 hs",
      estado: "Pago realizado",
      monto: 2000,
      oferta: 2500,
    },
  ];

  const stateList = ["pago Realizado", "en espera"];
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
              {array.map((venta, id) => {
                return (
                  <>
                    <div key={id} className="desktopCard">
                      <div className="data">
                        <img src={venta.img} alt="cardImage" />
                        <div>
                          <p className="title">{venta.nombreProd}</p>
                          <div>
                            <p className="offert">
                              Precio: <span>${venta.monto}</span>
                            </p>
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
                        src={venta.img}
                        className="productImg"
                        alt="cardImage"
                      />
                      <div>
                        <p className="productoTitle">{venta.nombreProd}</p>
                        <div className="offerts">
                          <p className="offert">
                            Precio: <span>${venta.monto}</span>
                          </p>
                          <p className="offert">
                            Oferta: <span>${venta.oferta}</span>
                          </p>
                        </div>
                        <p className="productoDate">{venta.fecha}</p>
                        <p className="productoState">Estado: {venta.estado}</p>
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
        </div>
      </Grid>
    </div>
  );
};

export default OfertasRecibidas;
