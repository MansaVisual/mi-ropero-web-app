import React, { useState, useContext, useEffect } from "react";
import { UseProdsContext } from "../../context/ProdsContext";
import { useLocation, useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import editIcon from "../../assets/img/editIcon.svg";
import plusButton from "../../assets/img/plusButton.svg";
import infoIcon from "../../assets/img/infoIcon.svg";
import PopUpImg from "./PopUpImg";
import Loader from "../Loader/Loader";
import PopUpVideo from "./PopUpVideo";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";

const ElegirImagenes = ({ form, setForm }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [openImgPopUp, setOpenImgPopUp] = useState(false);
  const [openVidPopUp, setOpenVidPopUp] = useState(false);
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [imgNecesarias, setImgNecesarias] = useState([]);
  const [imagenes, setImagenes] = useState({});
  const [imagenesBlob, setImagenesBlob] = useState({});
  const [video, setVideo] = useState(null);
  const [errorObligatorio, setErrorObligatorio] = useState(false);
  const [campoError, setCampoError] = useState("");
  const [seccionExtra, setSeccionExtra] = useState([]);
  const [numeroImgExtra, setNumeroImgExtra] = useState(0);

  const { categorias } = useContext(UseProdsContext);

  const { tiendaData } = useContext(UseMiTiendaContext);

  console.log(tiendaData);

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
        console.log(form.imagenes.length);

        if (Object.keys(form.imagenes).length === 0) {
          for (let j = 0; j < categorias[i].imagenes_necesarias.length; j++) {
            let obj = categorias[i].imagenes_necesarias[j].nombre;
            imagenes[obj] = null;
          }
          setImagenes(imagenes);
          setImagenesBlob(imagenes);
          return;
        } else {
          setImagenes(form.imagenes);
          setImagenesBlob(imagenes);
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    let variable = false;
    console.log(imgNecesarias);
    for (let i = 0; i < imgNecesarias.length; i++) {
      if (imgNecesarias[i].obligatoria === "1") {
        for (const key in imagenes) {
          let blob = await fetch(imagenes[key]).then((r) => r.blob());
          console.log(typeof blob);
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
        video: video,
      }));
      navigate(`/MiTienda/CARACTERISTICAS`);
    }
  };

  console.log(imagenes, imagenesBlob);

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
              return (
                <div className="section">
                  <div className="imgBox">
                    <img
                      src={
                        imagenesBlob[imgBox.nombre]
                          ? imagenesBlob[imgBox.nombre]
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
                        setOpenImgPopUp(true);
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
          {seccionExtra.length === 0 &&
            seccionExtra.map((imgBox) => {
              return (
                <div className="section">
                  <div className="imgBox">
                    <img
                      src={
                        imagenesBlob[imgBox.nombre]
                          ? imagenesBlob[imgBox.nombre]
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
                        setOpenImgPopUp(true);
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
            })}
          <div className="section">
            <div className="imgBox">
              <img src={plusButton} alt="foto" />
              <img
                className="editButton"
                src={editIcon}
                alt="edit"
                onClick={() => {
                  setNumeroImgExtra(numeroImgExtra + 1);
                  setSection(`fotoExtra${numeroImgExtra}`);
                  setOpenImgPopUp(true);
                }}
              />
            </div>
            <div className="bottomContainer">
              <span>Agregar foto extra</span>
              <div class="tooltip">
                <img src={infoIcon} alt="infoIcon" />
                <span>
                  Sumá todas las fotos que quieras, mostrá los detalles de la
                  prenda o los detalles por el uso. Podés mostrar la prenda con
                  conjunto y así tener más chances de vender.
                </span>
              </div>
            </div>
            <p className="bottomText">opcional</p>
          </div>
          <div className="section">
            <div className="imgBox">
              <img src={plusButton} alt="foto" />
              <img
                className="editButton"
                src={editIcon}
                alt="edit"
                onClick={() => {
                  /* setNumeroImgExtra(numeroImgExtra + 1); */
                  setSection("video");
                  setOpenVidPopUp(true);
                }}
              />
            </div>
            <div className="bottomContainer">
              <span>Agregar video</span>
              <div class="tooltip">
                <img src={infoIcon} alt="infoIcon" />
                <span>¡Subí un video mostrando tu producto!</span>
              </div>
            </div>
            <p className="bottomText">opcional</p>
          </div>
        </div>
        <div className="buttonContainer">
          <button onClick={() => handleSubmit()}>IR A CARACTERÍSTICAS</button>
        </div>
        <div className="returnLink" onClick={() => navigate(`/MiTienda/TIPO`)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A SUBCATEGORÍA</p>
        </div>
      </div>
      {openImgPopUp && (
        <PopUpImg
          section={section}
          setOpenImgPopUp={setOpenImgPopUp}
          imagenes={imagenes}
          setImagenes={setImagenes}
          setErrorObligatorio={setErrorObligatorio}
          setSeccionExtra={setSeccionExtra}
          setImagenesBlob={setImagenesBlob}
        />
      )}
      {openVidPopUp && (
        <PopUpVideo
          section={section}
          setOpenVidPopUp={setOpenVidPopUp}
          video={video}
          setVideo={setVideo}
          setErrorObligatorio={setErrorObligatorio}
        />
      )}
    </div>
  );
};

export default ElegirImagenes;
