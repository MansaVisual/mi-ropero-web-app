import React, { useState, useEffect, useContext } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/img/leftArrow.png";
import MRlogoGrande from "../../assets/img/MRlogoGrande.png";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../../components/Loader/Loader";
import mensaje from "../../assets/img/mensajesVacio.png";

const Notifications = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();
  const typeNotifications = ["no leídas", "ver leídas"];
  const [notificationsType, setNotificationsType] = useState("no leídas");
  const [notis, setNotis] = useState([]);

  const [loading, setLoading] = useState(true);

  const { userLog, LoginAPI } = useContext(UseLoginContext);

  useEffect(() => {
    if (userLog !== "") {
      let type;
      if (notificationsType === "no leídas") {
        type = 1;
      } else {
        type = 2;
      }
      setLoading(true);
      const notis = new FormData();
      notis.append("bypage", 15);
      notis.append("page", 0);
      notis.append("estado", type);
      notis.append("idcliente", 36);
      LoginAPI(notis, "pushs", "all").then((res) => {
        console.log(res);
        setLoading(false);
        if (res.status === "success") {
          setNotis(res.result.mensajes);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog /* , typeNotifications */]);

  const formatoFecha = (fecha) => {
    const hora = fecha.substring(11, 16);
    const fechaSinHora = fecha.substring(0, 10);
    const [year, month, day] = fechaSinHora.split("-");

    const formatoFinal = `Fecha: ${day} / ${month} / ${year} ${hora} Hs.`;
    return formatoFinal;
  };
  return (
    <div className="notifications">
      <Breadcrumbs links={pathnames} />
      <div className="firstLine">
        <p className="title">MIS NOTIFICACIONES</p>
        <div className="inputBox">
          <Select
            displayEmpty
            color="primary"
            className="selectInput"
            size="small"
            onChange={(e) => setNotificationsType(e.target.value)}
            value={notificationsType}
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
            {typeNotifications.map((option) => (
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
      <div className="mensajesContainer">
        {loading ? (
          <div
            style={{
              height: "50vh",
              marginTop: "42px",
              width: "100%",
              maxWidth: "895px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader spin={"spinnerM"} />
          </div>
        ) : notis.length > 0 ? (
          notis.map((noti, id) => {
            return (
              <>
                <div
                  key={id}
                  className="desktopCard"
                  /* onClick={() => {
                    navigate(`/perfil/MI CHAT`);
                  }} */
                >
                  <div className="mensajeData">
                    <div>
                      <img src={MRlogoGrande} alt="mrLogo" />
                    </div>
                    <div>
                      <p className="messageTitle">{noti.titulo}</p>
                      <p className="messageDate">{formatoFecha(noti.fecha)}</p>
                      <p className="messageMessage">{noti.texto}</p>
                      {/* <p className="messageState">
                        {typeNotifications[Number(noti.estado)]}
                      </p> */}
                    </div>
                  </div>
                </div>
                <div
                  key={`mobile${id}`}
                  className="mobileCard"
                  onClick={() => {
                    navigate(`/perfil/MI CHAT`);
                  }}
                >
                  <div>
                    <p className="messageTitle">{noti.titulo}</p>
                    <p className="messageDate">{formatoFecha(noti.fecha)}</p>
                    <p className="messageMessage">{noti.texto}</p>
                    {/* <p className="messageState">
                      {typeNotifications[Number(noti.estado)]}
                    </p> */}
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className="perfilVacio">
            <div>
              <img src={mensaje} alt="LOGO" />
              <p>Aún no tienes notificaciones </p>
              <Button onClick={() => navigate(`/`)}>IR A INICIO</Button>
            </div>
          </div>
        )}
        {/* {mensajesFiltrados.length !== 0 && totalPages > 1  && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pagination
                  cantidad={totalPages}
                  buscarPage={buscarPage}
                  pags={pags}
                  setPags={setPags}
                />
              </Box>
            )} */}
      </div>
      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default Notifications;
