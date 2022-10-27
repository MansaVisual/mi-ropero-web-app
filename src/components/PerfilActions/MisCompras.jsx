import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { Button, MenuItem, Select } from "@mui/material";
import { UsePerfilContext } from "../../context/PerfilContext";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../Loader/Loader";
import vacio from "../../assets/img/comprasVacio.png";

const MisCompras = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);
  const { handleComprasRealizadas, comprasRealizadas, comprasFinBusqueda } =
    useContext(UsePerfilContext);

  const [filtroSelecc, setFiltroSelecc] = useState("Pago realizado");

  useEffect(() => {
    if (userLog !== "") {
      handleComprasRealizadas(userLog, filtroSelecc);
    }
  }, [userLog, filtroSelecc]); // eslint-disable-line react-hooks/exhaustive-deps

  const stateTypes = [
    "Pendiente de pago",
    "Pago realizado",
    "Error en pago",
    "Pago devuelto",
    "Plazo de pago vencido",
    "En calificacion",
    "Finalizada",
  ];

  /*  3  => 'Pendiente de pago',
   4  => 'Pago realizado',
   5  => 'Error en pago',
   7  => 'Pago devuelto',
   9  => 'Plazo de pago vencido',
   10 => 'En calificacion',
   11 => 'Finalizada' */

  return (
    <div className="misComprasContainer">
      <Breadcrumbs links={pathnames} />
      <div className="firstLine">
        <p className="title">MIS COMPRAS</p>
        <div className="inputBox">
          <Select
            displayEmpty
            color="primary"
            className="selectInput"
            size="small"
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
            {stateTypes.map((option) => (
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
      {/*  <div className="comprasContainer">
        {!comprasFinBusqueda ? (
          <div
            style={{
              height: "50vh",
              marginTop: "42px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader spin={"spinnerM"} />
          </div>
        ) : comprasRealizadas.length > 0 ? (
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
                {comprasRealizadas.map((compra) => {
                  return (
                    <tr className="dataRow">
                      <th>{compra.fecha}</th>
                      <th>{compra.id}</th>
                      <th>${compra.monto}</th>
                      <th className="estatusColumn">
                        <span>{compra.estado.codigo}</span>
                        <span>{compra.estado.fecha}</span>
                      </th>
                      <th>
                        <Button className="tableButton">VER COMPRA</Button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="responsiveData">
              {comprasRealizadas.map((compra) => {
                return (
                  <div className="compra">
                    <div>
                      <span>FECHA DE COMPRA</span>
                      <span>{compra.fecha}</span>
                    </div>
                    <div>
                      <span>N° DE PEDIDO</span>
                      <span>{compra.id}</span>
                    </div>
                    <div>
                      <span>MONTO TOTAL</span>
                      <span>{compra.monto}</span>
                    </div>
                    <div>
                      <span>ESTADO:</span>
                      <span>{compra.estado.codigo}</span>
                      <span>{compra.estado.fecha}</span>
                    </div>
                    <Button
                      className="comprasButton"
                      onClick={() => navigate(`/perfil/MIS COMPRAS DETALLE`)}
                    >
                      VER COMPRA
                    </Button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="perfilVacio">
            <div>
              <img src={vacio} alt="LOGO" />
              <p>Aún no tienes compras realizadas</p>
              <Button onClick={() => navigate(`/`)}>IR A INICIO</Button>
            </div>
          </div>
        )}
      </div> */}
      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default MisCompras;
