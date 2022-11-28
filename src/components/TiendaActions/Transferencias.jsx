import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import vacio from "../../assets/img/comprasVacio.png";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import leftArrow from "../../assets/img/leftArrow.png";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../Loader/Loader";

const Transferencias = () => {
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [transferencias, setTransferencias] = useState([]);
  const [filtroSelecc, setFiltroSelecc] = useState({
    id: 3,
    nombre: "Realizada",
  });

  const estados = {
    /* 0: "Sin definir", */
    1: "Solicitada",
    2: "En proceso",
    3: "Realizada",
    4: "Cancelada",
    5: "Rechazada",
  };

  useEffect(() => {
    if (userLog) {
      setLoading(true);
      setError(false);
      setTransferencias([]);

      const data = new FormData();
      data.append("idcliente", userLog);
      data.append("estado", filtroSelecc.id);
      apiFetch(data, "transferencias", "all").then((res) => {
        console.log(res);
        if (res.status === "success") {
          setLoading(false);
          setTransferencias(res.result);
        } else {
          if (
            res.status === "error" &&
            res.result === "El cliente no tiene transferencias"
          ) {
            setLoading(false);
            console.log("error1");
          } else {
            console.log("error2");
            setError(true);
            setLoading(false);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog, filtroSelecc]);

  const formatoFecha = (fecha) => {
    const fechaSinHora = fecha.substring(0, 10);
    const [year, month, day] = fechaSinHora.split("-");

    const formatoFinal = `${day} / ${month} / ${year}`;
    return formatoFinal;
  };

  console.log(transferencias);

  return (
    <div className="transferenciasContainer">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="container">
          <div className="sections">
            <div className="firstLine">
              <p className="title">TRANSFERENCIAS</p>
            </div>
            <div className="list">
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
                transferencias.length > 0 ? (
                  <>
                    <table className="customTable">
                      <thead>
                        <tr className="titleRow">
                          <th>FECHA DE COMPRA</th>
                          <th># ID DE PEDIDO</th>
                          <th>MONTO TOTAL</th>
                          <th>ESTADO</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {transferencias.map((compra, i) => {
                          return (
                            <tr index={i} className="dataRow">
                              <th>{formatoFecha(compra.fecha)}</th>
                              <th>{compra.idtransferencia}</th>
                              <th>${compra.monto}</th>
                              <th>{compra.estado_text}</th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="responsiveData">
                      {transferencias.map((compra, i) => {
                        return (
                          <div key={i} className="compra">
                            <div>
                              <span>FECHA DE COMPRA</span>
                              <span>{formatoFecha(compra.fecha)}</span>
                            </div>
                            <div>
                              <span>N° DE PEDIDO</span>
                              <span>{compra.idtransferencia}</span>
                            </div>
                            <div>
                              <span>MONTO TOTAL</span>
                              <span>{compra.monto}</span>
                            </div>
                            <div>
                              <span>ESTADO:</span>
                              <span>{compra.estado_text}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="perfilVacio">
                    <div>
                      <img src={vacio} alt="LOGO" />
                      <p>{`No tienes transferencias en estado "${filtroSelecc.nombre}"`}</p>
                      <Button onClick={() => navigate(`/MiTienda`)}>
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
                    <Button onClick={() => navigate(`/MiTienda`)}>
                      IR A MI TIENDA
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bottomContainer">
            <div className="bottomSection">
              <div className="returnLink" onClick={() => navigate(`/MiTienda`)}>
                <img src={leftArrow} alt="leftArrow" />
                <p>VOLVER A MI TIENDA</p>
              </div>
              <Select
                displayEmpty
                className="selectInput"
                onChange={(e) => {
                  setFiltroSelecc(e.target.value);
                }}
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

export default Transferencias;
