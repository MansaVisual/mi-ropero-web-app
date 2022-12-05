import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import MRlogoModal from "../../assets/img/isologo.png";
import downloadGoogle from "../../assets/img/downloadGoogle.png";
import downloadApple from "../../assets/img/downloadApple.png";
import { Link } from "@mui/material";

const NavBarPopUp = ({ setOpenVenderPop }) => {
  return (
    <div className="PopUpStyle">
      <div className="fondoPopUp" onClick={() => setOpenVenderPop(false)}></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            setOpenVenderPop(false);
          }}
        />
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">¿Querés vender en Mi Ropero?</p>
          <p className="popUpDescription" style={{ marginTop: "8px" }}>
            ¡Descargá la App y subí tus prendas!
          </p>

          <div className="buttonContainer">
            <Link href="https://apps.apple.com/us/app/mi-ropero/id1515990319">
              <img src={downloadApple} alt="appleStore" />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=biz.pupila.MiRopero">
              <img src={downloadGoogle} alt="googlePlay" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarPopUp;
