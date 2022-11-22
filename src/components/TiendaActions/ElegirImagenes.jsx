import React, { useState, useContext, useEffect } from "react";
import { UseProdsContext } from "../../context/ProdsContext";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import editIcon from "../../assets/img/editIcon.svg";
import infoIcon from "../../assets/img/infoIcon.svg";
import PopUpImg from "./PopUpImg";
import Loader from "../Loader/Loader";

const ElegirImagenes = ({ form, setForm }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [imgNecesarias, setImgNecesarias] = useState([]);
  const [imagenes, setImagenes] = useState({});

  const { categorias } = useContext(UseProdsContext);

  useEffect(() => {
    if (!form.categoriaId) {
      navigate(`/MiTienda/CATEGORIA`);
      return;
    }
    for (let i = 0; i < categorias.length; i++) {
      console.log(categorias[i].idcategoria, form.tipoId);
      if (categorias[i].idcategoria === form.tipoId) {
        let imagenes = {};
        setImgNecesarias(categorias[i].imagenes_necesarias);
        for (let i = 0; i < categorias[i].imagenes_necesarias.length; i++) {
          let obj = categorias[i].imagenes_necesarias.nombre;
          imagenes[obj] = null;
        }
        setImagenes(imagenes);
        return;
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(imagenes);

  return (
    <div className="elegirImgContainer">
      <div className="container">
        <Breadcrumbs links={["MI TIENDA", "PRODUCTOS"]} />
        <span className="title">IMAGENES</span>
        <div className="ImgSections">
          {imgNecesarias.length === 0 ? (
            <div
              style={{
                marginTop: "24px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Loader spin={"spinnerG"} />
            </div>
          ) : (
            imgNecesarias.map((section) => {
              return (
                <div className="section">
                  <div className="imgBox">
                    <img
                      /* src={form.imgFrente ? form.imgFrente : fotoFrente} */
                      src={section.imagen}
                      alt="foto"
                    />
                    <img
                      className="editButton"
                      src={editIcon}
                      alt="edit"
                      onClick={() => {
                        setSection("imgFrente");
                        setOpenPopUp(true);
                      }}
                    />
                  </div>
                  <div className="bottomContainer">
                    <span>{section.nombre}</span>
                    <div class="tooltip">
                      <img src={infoIcon} alt="infoIcon" />
                      <span>{section.descripcion}</span>
                    </div>
                  </div>
                  <p className="bottomText">
                    ({section.obligatoria === "1" ? "obligatoria" : "opcional"})
                  </p>
                </div>
              );
            })
          )}
          {/* <div className="section">
            <div className="imgBox">
              <img
                src={form.imgFrente ? form.imgFrente : fotoFrente}
                alt="fotoFrente"
              />
              <img
                className="editButton"
                src={editIcon}
                alt="edit"
                onClick={() => {
                  setSection("imgFrente");
                  setOpenPopUp(true);
                }}
              />
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
          </div> */}
          {/* <div className="section">
            <div className="imgBox">
              <p
                onClick={() => {
                  setSection("imgTrasera");
                  setOpenPopUp(true);
                }}
              >
                Agregar imagen
              </p>
              <img
                src={form.imgTrasera ? form.imgTrasera : fotoTrasera}
                alt="fotoTrasera"
              />
            </div>
            <div className="bottomContainer">
              <span>Foto trasera</span>
              <img src={infoIcon} alt="info" />
            </div>
            <p className="bottomText">(opcional)</p>
          </div> */}
          {/*  <div className="section">
            <div className="imgBox">
              <p>Agregar video</p> 
              <>
                <p for="file-upload" class="custom-file-upload">
                  CARGAR IMAGEN
                </p>
                <input
                  id="file-upload"
                  type="file"
                onChange={onFileChange} 
                  accept="video/*"
                />
              </>
              <img src={fotoTrasera} alt="fotoTrasera" />
            </div>
            <div className="bottomContainer">
              <span>Video</span>
              <img src={infoIcon} alt="info" />
            </div>
            <p className="bottomText">(opcional)</p>
          </div> */}
          {/* <div className="section">
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
          </div> */}
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
      {openPopUp && (
        <PopUpImg
          section={section}
          setOpenPopUp={setOpenPopUp}
          setForm={setForm}
          form={form}
        />
      )}
    </div>
  );
};

export default ElegirImagenes;
