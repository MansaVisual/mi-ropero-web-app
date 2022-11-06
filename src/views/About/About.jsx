import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import logoMR from "../../assets/img/isologoMR-grande.png";
import about1 from "../../assets/img/about1.png";
import about2 from "../../assets/img/about2.png";
import MRlogoGrande from "../../assets/img/MRlogoGrande.png";
import downloadGoogle from "../../assets/img/downloadGoogle.png";
import downloadApple from "../../assets/img/downloadApple.png";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="aboutPage">
      <div className="breadCrumbs">
        <Breadcrumbs links={["ACERCA DE MI ROPERO"]} />
      </div>
      <div className="aboutContainer">
        <div className="bodySection">
          <div className="banner">
            <div className="leftInfo">
              <img src={logoMR} alt="logoMR" />
              <p className="topText">
                Vendé lo que no usas y comprá lo que querés.
              </p>
              <p className="bottomText">Todo desde Mi Ropero</p>
              <a href="#video">
                <button>MIRÁ NUESTRO VIDEO PRESENTACIÓN</button>
              </a>
            </div>
            <img src={about1} alt="about1Img" />
          </div>
          <div className="responsiveButtons">
            <button>MIRÁ NUESTRO VIDEO PRESENTACIÓN</button>
            <div>
              <Link href="https://apps.apple.com/us/app/mi-ropero/id1515990319">
                <img src={downloadApple} alt="appleStore" />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=biz.pupila.MiRopero">
                <img src={downloadGoogle} alt="googlePlay" />
              </Link>
            </div>
          </div>
          <div className="bannerFooter">
            <div className="linkContainer">
              <p>¿CÓMO FUNCIONA?</p>
              <p onClick={() => navigate("/FAQ")}>FAQs</p>
            </div>
            <div>
              <Link href="https://apps.apple.com/us/app/mi-ropero/id1515990319">
                <img src={downloadApple} alt="appleStore" />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=biz.pupila.MiRopero">
                <img src={downloadGoogle} alt="googlePlay" />
              </Link>
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
                <div className="redirectButtons">
                  <p className="rightText">Disponible para iOS y Android</p>
                  <div className="absoluteContainer">
                    <div>
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
            <div className="stepsResponsive">
              <div>
                <div className="circle">
                  <p>1</p>
                </div>
                <p className="firstText">DESCARGÁ LA APP</p>
                <p className="secondText">Disponible para iOS y Android</p>
                <div className="socialButtons">
                  <Link href="https://apps.apple.com/us/app/mi-ropero/id1515990319">
                    <img src={downloadApple} alt="appleStore" />
                  </Link>
                  <Link href="https://play.google.com/store/apps/details?id=biz.pupila.MiRopero">
                    <img src={downloadGoogle} alt="googlePlay" />
                  </Link>
                </div>
              </div>
              <div>
                <div className="circle">
                  <p>2</p>
                </div>
                <p className="firstText">VENDÉ LO QUE NO USÁS</p>
                <p className="secondText">Vendés. Enviás. Cobrás.</p>
              </div>
              <div>
                <div className="circle">
                  <p>3</p>
                </div>
                <p className="firstText">COMPRÁ LO QUE QUERÉS</p>
                <p className="secondText">Comprás. Recibís. Disfrutás.</p>
              </div>
            </div>
            <div className="benefits">
              <div>
                <img src={about2} alt="benefitSection" />
                <div>
                  <Link href="https://apps.apple.com/us/app/mi-ropero/id1515990319">
                    <img src={downloadApple} alt="appleStore" />
                  </Link>
                  <Link href="https://play.google.com/store/apps/details?id=biz.pupila.MiRopero">
                    <img src={downloadGoogle} alt="googlePlay" />
                  </Link>
                </div>
              </div>
              <div className="benefitList">
                <img src={MRlogoGrande} alt="logoMR" />
                <ul className="list">
                  <li>Plataforma ágil y fácil de usar.</li>
                  <li>Acceso a la compra y venta. </li>
                  <li>Buenos precios.</li>
                  <li>Se cobra el 18% de comisión de la venta.</li>
                  <li>
                    Vas a encontrar ropa de todos los géneros y todos los
                    talles.
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
          <div className="videoSection" id="video">
            <YoutubeEmbed />
          </div>
          {/* <div className="bottomSection">
            <img src={MRlogoGrande} alt="mrLogo" />
            <p>Vendé lo que no usas y comprá lo que querés.</p>
            <button>VOLVER A LA TIENDA</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
