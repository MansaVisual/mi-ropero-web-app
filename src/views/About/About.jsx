import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import logoMR from "../../assets/img/isologoMR-grande.png";
import about1 from "../../assets/img/about1.png";
import about2 from "../../assets/img/about2.png";
import isologo from "../../assets/img/isologo.png";
import MRlogoGrande from "../../assets/img/MRlogoGrande.png";
import downloadGoogle from "../../assets/img/downloadGoogle.png";
import downloadApple from "../../assets/img/downloadApple.png";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";

const About = () => {
  return (
    <div className="aboutContainer">
      <div className="breadCrumbs">
        <Breadcrumbs links={["ACERCA DE MI ROPERO"]} />
      </div>
      <div className="bodySection">
        <div className="banner">
          <div className="leftInfo">
            <img src={logoMR} alt="logoMR" />
            <p className="topText">
              Vendé lo que no usas y comprá lo que querés.
            </p>
            <p className="bottomText">Todo desde Mi Ropero</p>
            <button>MIRÁ NUESTRO VIDEO PRESENTACIÓN</button>
          </div>
          <img src={about1} alt="about1Img" />
        </div>
        <div className="bannerFooter">
          <div className="linkContainer">
            <p>¿CÓMO FUNCIONA?</p>
            <p>FAQs</p>
          </div>
          <div>
            <img src={downloadApple} alt="appleStore" />
            <img src={downloadGoogle} alt="googlePlay" />
          </div>
        </div>
        <div className="infoSection">
          <p className="infoTitle">¿Cómo funciona?</p>
          <div className="stepsContainer">
            <div>
              <p className="leftText">DESCARGÁ LA APP</p>
              <div className="circle">
                <p>1</p>
              </div>
              <p className="rightText">Disponible para iOS y Android</p>
            </div>
            <div>
              <p className="leftText">VENDÉ LO QUE NO USÁS</p>
              <div className="circle">
                <p>2</p>
              </div>
              <p className="rightText">Vendés. Enviás. Cobrás.</p>
            </div>
            <div>
              <p className="leftText">COMPRÁ LO QUE QUERÉS</p>
              <div className="circle">
                <p>3</p>
              </div>
              <p className="rightText">Comprás. Recibís. Disfrutás.</p>
            </div>
          </div>
          <div className="benefits">
            <img src={about2} alt="benefitSection" />
            <div className="benefitList">
              <img src={isologo} alt="logoMR" />
              <ul className="list">
                <li>Plataforma ágil y fácil de usar.</li>
                <li>Acceso a la compra y venta. </li>
                <li>Buenos precios.</li>
                <li>Se cobra el 18% de comisión de la venta.</li>
                <li>
                  Vas a encontrar ropa de todos los géneros y todos los talles.
                </li>
                <li>
                  Se ofrece envío en el día en moto en CABA comprando antes de
                  las 14 hs o para el dia siguiente y envíos por OCA a todo el
                  país.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="videoSection">
          <YoutubeEmbed />
        </div>
        <div className="bottomSection">
          <img src={MRlogoGrande} alt="mrLogo" />
          <p>Vendé lo que no usas y comprá lo que querés.</p>
          <button>VOLVER A LA TIENDA</button>
        </div>
      </div>
    </div>
  );
};

export default About;
