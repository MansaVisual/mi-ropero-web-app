import React, { useState, useContext, useEffect } from "react";
import { UseProdsContext } from "../../context/ProdsContext";
import { useLocation, useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import editIcon from "../../assets/img/editIcon.svg";
import infoIcon from "../../assets/img/infoIcon.svg";
import PopUpImg from "./PopUpImg";
import Loader from "../Loader/Loader";

const ElegirImagenes = ({ form, setForm }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
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
    console.log(form);
    for (let i = 0; i < categorias.length; i++) {
      if (categorias[i].idcategoria === form.tipoId) {
        let imagenes = {};
        setImgNecesarias(categorias[i].imagenes_necesarias);
        /* console.log(Object.values(form.imagenes)[0]);
        if (!Object.values(form.imagenes)[0]) { */
        for (let j = 0; j < categorias[i].imagenes_necesarias.length; j++) {
          let obj = categorias[i].imagenes_necesarias[j].nombre;
          imagenes[obj] = null;
        }
        setImagenes(imagenes);
        return;
      }
      /*  } */
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    let variable = false;
    for (let i = 0; i < imgNecesarias.length; i++) {
      if (imgNecesarias[i].obligatoria === "1") {
        for (const key in imagenes) {
          if (imgNecesarias[i].nombre === key && !imagenes[key]) {
            variable = true;
            setErrorObligatorio(true);
            setCampoError(key);
          }
        }
      }
    }
    if (!variable) {
      setForm((prevState) => ({
        ...prevState,
        imagenes: imagenes,
      }));
      navigate(`/MiTienda/CARACTERISTICAS`);
    }
  };

  return (
    <div className="elegirImgContainer">
      <div className="container">
        <Breadcrumbs links={pathnames} />
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
              console.log(imagenes, imagenes[imgBox.nombre], imgBox.imagen);
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
          setErrorObligatorio={setErrorObligatorio}
        />
      )}
    </div>
  );
};

export default ElegirImagenes;
