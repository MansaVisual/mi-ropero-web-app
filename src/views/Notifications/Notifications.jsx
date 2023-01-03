import React, { useState, useEffect, useContext } from "react";
import { Box, Button, MenuItem, Select } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/img/leftArrow.png";
import MRlogoGrande from "../../assets/img/MRlogoGrande.png";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../../components/Loader/Loader";
import mensaje from "../../assets/img/mensajesVacio.png";
import Pagination from "../../components/Pagination/Pagination";
import { apiFetch } from "../../apiFetch/apiFetch";

const Notifications = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();
  const typeNotifications = ["no leídas", "ver leídas"];
  const [notificationsType, setNotificationsType] = useState("no leídas");
  const [notis, setNotis] = useState([]);
  const [totalPages, settotalPages] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pags, setPags] = useState(1);
  const { userLog } = useContext(UseLoginContext);

  const [num,setNum]=useState(1)

  useEffect(()=>{
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, 1000);
    if(num===1){
        setNum(2)
    }
},[])// eslint-disable-line react-hooks/exhaustive-deps

useEffect(()=>{
  if(num!==1){
      if(userLog===""){
          navigate("/login")
      }
  }
},[num])// eslint-disable-line react-hooks/exhaustive-deps

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
      notis.append("bypage", 10);
      notis.append("page", 0);
      notis.append("estado", type);
      notis.append("idcliente", userLog);
      apiFetch(notis, "pushs", "all").then((res) => {
        setLoading(false);
        if (res.status === "success") {
          setNotis(res.result.mensajes);
          settotalPages(res.result.total_paginas);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog, notificationsType]);


  const buscarPage = (paramSearch, value) => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    let type;
    if (notificationsType === "no leídas") {
      type = 1;
    } else {
      type = 2;
    }
    const notis = new FormData();
    notis.append("bypage", 10);
    notis.append("page", value);
    notis.append("estado", type);
    notis.append("idcliente", userLog);
    apiFetch(notis, "pushs", "all").then((res) => {
      if (res.status === "success") {
        setNotis(res.result.mensajes);
      }
      setLoading(false);
    });
  };

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
            onChange={(e) => {setPags(1);setNotificationsType(e.target.value)}}
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
      <div className="notifContainer">
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
          notis.map((item, i) => {
            let url = "";
            let buscarI = "";
            let id = "";
            let itemURL = item.url;

            if (i <= 7) {
              if (itemURL.indexOf("/app/profile-showroom/sales") !== -1) {
                //-----------------------|-------------------------
                url = "/Mi&Tienda/VENTAS";
              } else if (itemURL.indexOf("/app/profile/messages?id=") !== -1) {
                //---------------|---------------------------------
                buscarI = itemURL.indexOf("/app/profile/messages?id=");
                id = itemURL.substring(buscarI + 25, itemURL.length);
                url = `/perfil/MIS MENSAJES/${id}`;
              } else if (
                itemURL.indexOf("/app/profile-showroom/offers") !== -1
              ) {
                //------------------|------------------------------
                url="/Mi&Tienda/OFERTAS%20RECIBIDAS"
              } else if (itemURL.indexOf("idproducto=") !== -1) {
                //--------------------------------|----------------
                let buscarI2 = itemURL.indexOf("&backLink");
                buscarI = itemURL.indexOf("idproducto=");
                id = itemURL.substring(buscarI + 11, buscarI2);
                url = `/productoCard/${id}`;
              } else if (itemURL.indexOf("/app/profile/offers") !== -1) {
                //-------------------|-----------------------------
                if(item.titulo==="Rechazaron tu oferta"){
                  url = "/perfil/OFERTAS REALIZADAS/rechazadas";
                }else if(item.titulo==="Aceptaron tu oferta"){
                  url = "/perfil/OFERTAS REALIZADAS/aceptadas";
                } else if(item.titulo==="¡No te la pierdas!"){
                  url = `/perfil/OFERTAS REALIZADAS/aceptadas`;
                }
              } else if (
                itemURL.indexOf("/app/profile/buys-detail?idoperacion=") !== -1
              ) {
                //---------------|---------------------------------
                buscarI = itemURL.indexOf(
                  "/app/profile/buys-detail?idoperacion="
                );
                id = itemURL.substring(buscarI + 45, itemURL.length);
                url = `/perfil/MIS COMPRAS/${id}`;
              } else if (itemURL.indexOf("idtienda=") !== -1) {
                //---------------|---------------------------------
                buscarI = itemURL.indexOf("idtienda=");
                id = itemURL.substring(buscarI + 9, itemURL.length);
                const llamada = new FormData();
                llamada.append("idcliente", userLog);
                llamada.append("idtienda", id);
                apiFetch(llamada, "tiendas", "detail").then((res) => {
                  if (res.status === "success") {
                    url = `/roperos/${id}/${res.result.nombre}`;
                  } else {
                    url = "/roperos";
                  }
                });
              } else if (
                itemURL.indexOf("/app/profile-showroom/offers") !== -1
              ) {
                //-------------------|-----------------------------
                url = "/Mi&Tienda/OFERTAS%20RECIBIDAS";
              } else if (
                itemURL.indexOf("/app/profile-showroom/transfers") !== -1
              ) {
                //------------------|------------------------------
                url = "/Mi&Tienda/TRANSFERENCIAS";
              } else if (itemURL.indexOf("/app/cart") !== -1) {
                //--------------------------|----------------------
                url = "/carrito";
              } else if (itemURL.indexOf("/app/profile-showroom") !== -1) {
                //--------------------|----------------------------
                url = "/Mi&Tienda";
              } else if (itemURL === "#") {
                url = false;
              } else {
                //--------------------|-----------------------------
                url = itemURL;
              }
            }
            return (
              <>
                <div
                  className="desktopCard"
                  key={i}
                  onClick={
                    (url === false || url==="")
                      ? null
                      : () => {
                        const not = new FormData()
                        not.append("idpush",item.idpush)
                        apiFetch(
                          not,
                          "pushs",
                          "readed"
                        )
                        window.location.assign(`${url}`)}
                  }
                >
                  <div className="notiData">
                    <div>
                      <img src={MRlogoGrande} alt="mrLogo" />
                    </div>
                    <div>
                      <p className="notiTitle">{item.titulo}</p>
                      <p className="notiDate">{formatoFecha(item.fecha)}</p>
                      <p className="notiMessage">{item.texto}</p>
                    </div>
                  </div>
                </div>
                <div
                  key={`mobile${i}`}
                  className="mobileCard"
                  onClick={
                    url === false
                      ? null
                      : () => window.location.assign(`${url}`)
                  }
                >
                  <img src={MRlogoGrande} alt="mrLogo" />
                  <div>
                    <p className="notiTitle">{item.titulo}</p>
                    <p className="notiDate">{formatoFecha(item.fecha)}</p>
                    <p className="notiMessage">{item.texto}</p>
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
      </div>
      {notis.length !== 0 && totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "895px",
            width: "100%",
            marginTop: "3rem",
          }}
        >
          <Pagination
            cantidad={totalPages}
            buscarPage={buscarPage}
            pags={pags}
            setPags={setPags}
          />
        </Box>
      )}
      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  );
};

export default Notifications;
