import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import foto from "../../assets/img/fotoProd.png";
import basura from "../../assets/img/basura.png";
import StarIcon from "@mui/icons-material/Star";
import { Button, Grid, MenuItem, Rating, Select } from "@mui/material";
import leftArrow from "../../assets/img/leftArrow.png";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import { apiFetch } from "../../apiFetch/apiFetch";

const Transferencias = () => {
  const navigate = useNavigate();
  const { tiendaData } = useContext(UseMiTiendaContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [transferencias, setTransferencias] = useState([]);
  const [filtroSelecc, setFiltroSelecc] = useState("Pago realizado");

  let itemEstadoSelecc = "";

  const [selected, setSelected] = useState("mejor valoración primero");

  const array = [
    {
      fecha_alta: "15/03/2017",
      idoperacion: "MRO-0000001375",
      total: "163.199",
      estado_text: "SOLICITADA ",
      fecha_notificacion: "15/03/2017",
    },
    {
      fecha_alta: "15/03/2017",
      idoperacion: "MRO-0000001375",
      total: "163.199",
      estado_text: "SOLICITADA ",
      fecha_notificacion: "15/03/2017",
    },
  ];
  const stateList = ["mejor valoración primero", "en espera"];

  useEffect(() => {
    if (tiendaData) {
      setLoading(true);
      setError(false);
      setTransferencias([]);

      let array = [];

      const data = new FormData();
      data.append("idcliente", tiendaData.idtienda);
      data.append("estado", itemEstadoSelecc);
      apiFetch(data, "transferencias", "get_estados").then((res) => {
        console.log(res);
        if (res.status === "success") {
          for (const ii in res.result.operaciones) {
            array.push(res.result.operaciones[ii]);
          }
          setLoading(false);
          setTransferencias(array);
        } else {
          if (
            res.status === "error" &&
            res.result === "No se encontraron operaciones"
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
  }, [tiendaData, filtroSelecc]);

  const formatoFecha = (fecha) => {
    const fechaSinHora = fecha.substring(0, 10);
    const [year, month, day] = fechaSinHora.split("-");

    const formatoFinal = `${day} / ${month} / ${year}`;
    return formatoFinal;
  };
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
                  {array.map((compra, i) => {
                    return (
                      <tr index={i} className="dataRow">
                        <th>{/* formatoFecha( */ compra.fecha_alta /* ) */}</th>
                        <th>{compra.idoperacion}</th>
                        <th>${compra.total}</th>
                        <th className="estatusColumn">
                          <span>{compra.estado_text}</span>
                          <span>
                            {
                              /* formatoFecha( */ compra.fecha_notificacion /* ) */
                            }
                          </span>
                        </th>
                        {/* <th>
                        <Button
                          className="tableButton"
                          onClick={() => {
                              setCompraId(compra.idoperacion); 
                            navigate(`/perfil/MIS COMPRAS DETALLE`);
                          }}
                        >
                          VER COMPRA
                        </Button>
                      </th> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="responsiveData">
                {array.map((compra, i) => {
                  return (
                    <div key={i} className="compra">
                      <div>
                        <span>FECHA DE COMPRA</span>
                        <span>
                          {/* formatoFecha( */ compra.fecha_alta /* ) */}
                        </span>
                      </div>
                      <div>
                        <span>N° DE PEDIDO</span>
                        <span>{compra.idoperacion}</span>
                      </div>
                      <div>
                        <span>MONTO TOTAL</span>
                        <span>{compra.total}</span>
                      </div>
                      <div>
                        <span>ESTADO:</span>
                        <span>{compra.estado_text}</span>
                      </div>
                      {/* <Button
                      className="comprasButton"
                      onClick={() => {
                        setCompraId(compra.idoperacion); 
                        navigate(`/perfil/MIS COMPRAS DETALLE`);
                      }}
                    >
                      VER COMPRA
                    </Button> */}
                    </div>
                  );
                })}
              </div>
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

export default Transferencias;
