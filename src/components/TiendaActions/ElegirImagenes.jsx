import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import fotoFrente from "../../assets/img/fotoFrente.svg";
import fotoTrasera from "../../assets/img/fotoFrente.svg";
import editIcon from "../../assets/img/editIcon.svg";
import addButton from "../../assets/img/addButton.svg";
import infoIcon from "../../assets/img/infoIcon.svg";

const ElegirImagenes = () => {
  const navigate = useNavigate();
  return (
    <div className="elegirImgContainer">
      <div className="container">
        <Breadcrumbs links={["MI TIENDA", "PRODUCTOS"]} />
        <span className="title">IMAGENES</span>
        <div className="ImgSections">
          <div className="section">
            <div className="imgBox">
              <img src={fotoFrente} alt="fotoFrente" />
              <img className="editButton" src={editIcon} alt="edit" />
            </div>
            <div className="bottomContainer">
              <span>Foto frente</span>
              <div class="tooltip">
                <img src={infoIcon} alt="infoIcon" />
                <span>
                  Mostrá la prenda de frente, que se vean bien los colores,
                  estampas y detalles.
                </span>
              </div>
            </div>
            <p className="bottomText">(obligatoria)</p>
          </div>
          <div className="section">
            <div className="imgBox">
              <p>Agregar imagen</p>
              <img src={fotoTrasera} alt="fotoTrasera" />
            </div>
            <div className="bottomContainer">
              <span>Foto trasera</span>
              <img src={infoIcon} alt="info" />
            </div>
            <p className="bottomText">(opcional)</p>
          </div>
          <div className="section">
            <div className="imgBox">
              <p>Agregar video</p>
              <img src={fotoTrasera} alt="fotoTrasera" />
            </div>
            <div className="bottomContainer">
              <span>Video</span>
              <img src={infoIcon} alt="info" />
            </div>
            <p className="bottomText">(opcional)</p>
          </div>
          <div className="section">
            <div className="imgBox">
              <p>Agregar imagen</p>
              <img src={fotoTrasera} alt="fotoTrasera" />
            </div>
            <div className="bottomContainer">
              <span>Foto detalle</span>
              <img src={infoIcon} alt="info" />
            </div>
            <p className="bottomText">(opcional)</p>
          </div>
          <div className="section">
            <div className="imgBox">
              <p>Agregar imagen</p>
              <img src={fotoTrasera} alt="fotoTrasera" />
            </div>
            <div className="bottomContainer">
              <span>Foto extra</span>
              <img src={infoIcon} alt="info" />
            </div>
            <p className="bottomText">(opcional)</p>
          </div>
          <div className="section">
            <div className="imgBox">
              <img className="addButton" src={addButton} alt="fotoTrasera" />
            </div>
            <div className="bottomContainer">
              <span>Agregar foto extra</span>
              <img src={infoIcon} alt="info" />
            </div>
            <p className="bottomText">(opcional)</p>
          </div>
        </div>
        <div className="buttonContainer">
          <button
            onClick={() => {
              navigate(`/MiTienda/CARACTERISTICAS`);
            }}
          >
            IR A CARACTERÍSTICAS
          </button>
        </div>
        <div className="returnLink" onClick={() => navigate(`/MiTienda/TIPO`)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A SUBCATEGORÍA</p>
        </div>
      </div>
    </div>
  );
};

export default ElegirImagenes;
