import React, { useState, useContext, useEffect } from "react";
import { UseProdsContext } from "../../context/ProdsContext";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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
  const [errorObligatorio, setErrorObligatorio] = useState(false);
  const [campoError, setCampoError] = useState("");

  const { categorias } = useContext(UseProdsContext);

  useEffect(() => {
    if (!form.categoriaId) {
      navigate(`/MiTienda/CATEGORIA`);
      return;
    }
    for (let i = 0; i < categorias.length; i++) {
      if (categorias[i].idcategoria === form.tipoId) {
        let imagenes = {};
        setImgNecesarias(categorias[i].imagenes_necesarias);
        console.log(imgNecesarias);
        for (let j = 0; j < categorias[i].imagenes_necesarias.length; j++) {
          console.log(categorias[i].imagenes_necesarias);
          let obj = categorias[i].imagenes_necesarias[j].nombre;
          console.log(obj);
          imagenes[obj] = null;
        }
        console.log(imagenes);
        setImagenes(imagenes);
        return;
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    for (let i = 0; i < imgNecesarias.length; i++) {
      if (imgNecesarias[i].obligatoria === "1") {
        for (const key in imagenes) {
          console.log(key);
          if (imgNecesarias[i].nombre === key) {
            setErrorObligatorio(true);
            setCampoError(key);
          }
        }
      }
    }
    /*  navigate(`/MiTienda/CARACTERISTICAS`); */
  };

  return (
    <div className="elegirImgContainer">
      <div className="container">
        <Breadcrumbs links={["MI TIENDA", "PRODUCTOS"]} />
        <span className="title">IMAGENES</span>
        {errorObligatorio && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>Ingresar campo obligatorio "{campoError}"</p>
          </div>
        )}
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
            imgNecesarias.map((imgBox) => {
              return (
                <div className="section">
                  <div className="imgBox">
                    <img
                      src={
                        imagenes[imgBox.nombre]
                          ? imagenes[imgBox.nombre]
                          : imgBox.imagen
                      }
                      alt="foto"
                    />
                    <img
                      className="editButton"
                      src={editIcon}
                      alt="edit"
                      onClick={() => {
                        setSection(imgBox.nombre);
                        setOpenPopUp(true);
                      }}
                    />
                  </div>
                  <div className="bottomContainer">
                    <span>{imgBox.nombre}</span>
                    <div class="tooltip">
                      <img src={infoIcon} alt="infoIcon" />
                      <span>{imgBox.descripcion}</span>
                    </div>
                  </div>
                  <p className="bottomText">
                    ({imgBox.obligatoria === "1" ? "obligatoria" : "opcional"})
                  </p>
                </div>
              );
            })
          )}
        </div>
        <div className="buttonContainer">
          <button onClick={() => handleSubmit()}>IR A CARACTERÍSTICAS</button>
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
          imagenes={imagenes}
          setImagenes={setImagenes}
        />
      )}
    </div>
  );
};

export default ElegirImagenes;
