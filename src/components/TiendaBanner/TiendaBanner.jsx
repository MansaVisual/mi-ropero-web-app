import React, { useState, useContext } from "react";
import Banner from "../../assets/img/bannerPng.png";
import iconHide from "../../assets/img/iconHide.svg";
import iconShow from "../../assets/img/iconShow.svg";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import Loader from "../Loader/Loader";
import PopUpTransferencia from "../TiendaActions/PopUpTransferencia";
import Swal from "sweetalert2";

const TiendaBanner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [showMoney, setShowMoney] = useState(false);
  const { saldoCuenta, tiendaData } = useContext(UseMiTiendaContext);

  const [transfPopUp, setTransfPopUp] = useState(false);

  return (
    <div className="bannerContainer">
      <div className="breadcrumbs">
        <Breadcrumbs links={pathnames} />
      </div>
      <div className="banner">
        <img className="bannerImg" src={Banner} alt="banner" />
        <div className="content">
          <div className="titleBox">
            <span className="title">{tiendaData.nombre}</span>
            {location.pathname.toUpperCase()!=="/MI&TIENDA" &&
              <span
              className="subTitle"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/Mi&Tienda")}
              >
                VER MI TIENDA
              </span>
            }
          </div>
          <div className="moneyCount">
            <div>
              <p>Cuenta corriente</p>
              {!saldoCuenta ? (
                <div
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: "-10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Loader spin={"spinnerS"} />
                </div>
              ) : (
                <span>{showMoney ? `$ ${new Intl.NumberFormat("de-DE").format(saldoCuenta)}` : "$ **.***.**"}</span>
              )}
              {showMoney ? (
                <img
                  src={iconHide}
                  alt="iconHide"
                  onClick={() => setShowMoney(false)}
                />
              ) : (
                <img
                  src={iconShow}
                  alt="iconShow"
                  onClick={() => setShowMoney(true)}
                />
              )}
            </div>
            <button
              onClick={() => {
                if (saldoCuenta < 100) {
                  Swal.fire({
                    title: "SALDO M??NIMO: $100",
                    icon: "info",
                    confirmButtonText: "CONTINUAR",
                  });
                } else {
                  setTransfPopUp(true);
                }
              }}
              style={{display:"flex",alignItems:"center",justifyContent:"center"}}
            >
              SOLICITAR TRANSFERENCIA
            </button>
          </div>
        </div>
      </div>
      {transfPopUp && <PopUpTransferencia setTransfPopUp={setTransfPopUp} />}
    </div>
  );
};

export default TiendaBanner;
