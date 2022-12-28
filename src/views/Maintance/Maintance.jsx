import React from "react";
import {
  FaGooglePlay,
  FaApple,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "@mui/material";
import logoMR from "../../assets/img/isologoMR-grande.png";

const Maintance = () => {
  return (
    <div className="maintanceContainer">
      <div className="bodySection">
        <img src={logoMR} alt="logo" />
        <p className="maintanceTitle">
          EN ESTE MOMENTO ESTAMOS TRABAJANDO PARA BRINDARTE UNA MEJOR
          EXPERIENCIA
        </p>
        <p className="maintanceSubtitle">¡Enseguida volvemos!</p>
        <div className="appContainer">
          <p className="appText">Podés descargar la app</p>
          <div className="buttonContainer">
            <Link
              href="https://apps.apple.com/us/app/mi-ropero/id1515990319"
              underline="none"
              target={"_blank"}
            >
              <div className="appButton">
                <FaApple className="appIcon" />
              </div>
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=biz.pupila.MiRopero"
              underline="none"
              target={"_blank"}
            >
              <div className="appButton">
                <FaGooglePlay className="appIcon" />
              </div>
            </Link>
          </div>
        </div>
        <p className="bottomText">Mientras tanto nos podés encontrar en</p>
        <div className="socialMediaSection">
          <Link
            href="https://www.facebook.com/miroperoapp"
            underline="none"
            target={"_blank"}
          >
            <div className="appButton">
              <FaFacebookF className="appIcon" />
            </div>
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCAFGxJMe8rJQ9LXYd26tnPQ"
            underline="none"
            target={"_blank"}
          >
            <div className="appButton">
              <FaYoutube className="appIcon" />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/miroperoapp"
            underline="none"
            target={"_blank"}
          >
            <div className="appButton">
              <FaInstagram className="appIcon" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Maintance;
