import React, { useState, useContext } from "react";
import Banner from "../../assets/img/bannerPng.png";
import bannerXS from "../../assets/img/bannerXS.png";
import iconHide from "../../assets/img/iconHide.svg";
import iconShow from "../../assets/img/iconShow.svg";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import Loader from "../Loader/Loader";
import PopUpTransferencia from "../TiendaActions/PopUpTransferencia";

const TiendaBanner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [showMoney, setShowMoney] = useState(false);
  const { saldoCuenta } = useContext(UseMiTiendaContext);

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
            <span className="title">El Ropero de Sandra</span>
            <span
              className="subTitle"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/MiTienda")}
            >
              VER MI TIENDA
            </span>
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
                <span>{showMoney ? `$ ${saldoCuenta}` : "$ **.***.**"}</span>
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
            <button onClick={() => setTransfPopUp(true)}>
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
