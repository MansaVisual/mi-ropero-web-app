import React, { useState,useContext } from "react";
import Banner from "../../assets/img/bannerPng.png";
import bannerXS from "../../assets/img/bannerXS.png";
import iconHide from "../../assets/img/iconHide.svg";
import iconShow from "../../assets/img/iconShow.svg";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import Loader from "../Loader/Loader";

const TiendaBanner = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [showMoney, setShowMoney] = useState(false);
  const {saldoCuenta}=useContext(UseMiTiendaContext)

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
            <span className="subTitle">VER MI TIENDA</span>
          </div>
          <div className="moneyCount">
            <div>
              <p>Cuenta corriente</p>
              {!saldoCuenta ? 
                <div
                  style={{
                    marginTop: "24px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Loader spin={"spinnerM"} />
                </div>
              :
                <span>{showMoney ? saldoCuenta : "$**.***.**"}</span>
                }
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
            <button>SOLICITAR TRANSFERENCIA</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiendaBanner;
