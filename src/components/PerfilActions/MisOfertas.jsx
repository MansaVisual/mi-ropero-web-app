import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import Basura from "../../assets/img/basura.png";
import { UsePerfilContext } from "../../context/PerfilContext";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../Loader/Loader";
import { Button, MenuItem, Select } from "@mui/material";
import vacio from "../../assets/img/ofertasVacio.png";
import PopUpBorrarOferta from "./PopUpBorrarOferta";

const MisOfertas = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);
  const { handleOfertasRealizadas, ofertasRealizadas, ofertasFinBusqueda } =
    useContext(UsePerfilContext);

  const [borrarOferta, setBorrarOferta] = useState(false);

  const [filtroSelecc, setFiltroSelecc] = useState("en proceso de evaluacion");
  const [ofertaId, setOfertaId] = useState(false);

  useEffect(() => {
    if (userLog !== "") {
      handleOfertasRealizadas(userLog, filtroSelecc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog, filtroSelecc]);

  const stateTypes = [
    "en proceso de evaluacion",
    "Rechazada por el vendedor",
    "Cancelada por el comprador",
    "Aceptado",
    "vencida",
  ];

  /*   const estados=[
    'Sin definir',
    'en proceso de evaluacion',
    'Rechazada por el vendedor',
    'Cancelada por el comprador',
    'Aceptado',
    'vencida'
  ] */

  return (
    <div className="misOfertasContainer">
      <Breadcrumbs links={pathnames} />
      <div className="container">
        <div className="firstLine">
          <p className="title">MIS OFERTAS</p>
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
        <div className="cardsContainer">
          {!ofertasFinBusqueda ? (
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
          ) : ofertasRealizadas.length > 0 ? (
            ofertasRealizadas?.map((producto) => {
              return (
                <div className="desktopCard">
                  <div className="productoData">
                    <img
                      src={producto.producto.imagenes[0].imagen_cuadrada}
                      alt="cardImage"
                    />
                    <div>
                      <p className="productoTitle">
                        {producto.producto.nombre}
                      </p>
                      <p className="productoDate">{producto.fecha}</p>
                      <p className="productoState">{producto.estado_text}</p>
                    </div>
                  </div>
                  <div className="ofertaData">
                    <p className="oferta">OFERTA</p>
                    <p className="monto">${producto.oferta}</p>
                    <img
                      onClick={() => {
                        setBorrarOferta(true);
                        setOfertaId(producto.idoferta);
                      }}
                      className="basuraIcon"
                      src={Basura}
                      alt="BasuraIcon"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="perfilVacio">
              <div>
                <img src={vacio} alt="LOGO" />
                <p>Aún no tienes ofertas realizadas</p>
                <Button onClick={() => navigate(`/`)}>VER PRODUCTOS</Button>
              </div>
            </div>
          )}
          {ofertasRealizadas.map((producto) => {
            return (
              <div className="mobileCard">
                <img
                  src={producto.img}
                  className="productImg"
                  alt="cardImage"
                />
                <div>
                  <p className="productoTitle">{producto.titulo}</p>
                  <p className="productoDate">{producto.fecha}</p>
                  <div>
                    <span className="firstSpan">OFERTA</span>
                    <span className="secondSpan">${producto.oferta}</span>
                  </div>
                  <p className="productoState">{producto.estado}</p>
                </div>
                <img src={Basura} className="trashICon" alt="basuraIcon" />
              </div>
            );
          })}
        </div>
        <p className="volver" onClick={() => navigate(`/perfil`)}>
          <ArrowBackIosNew sx={{ fontSize: "10px" }} />
          VOLVER A MI PERFIl
        </p>
      </div>
      {borrarOferta && (
        <PopUpBorrarOferta
          setBorrarOferta={setBorrarOferta}
          ofertaId={ofertaId}
          userLog={userLog}
        />
      )}
    </div>
  );
};

export default MisOfertas;
