import React, { useState, useContext, useEffect } from "react";
import { UseProdsContext } from "../../context/ProdsContext";
import { useLocation, useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import check from "../../assets/img/successImg.png";
import editIcon from "../../assets/img/editIcon.svg";
import plusButton from "../../assets/img/plusButton.svg";
import infoIcon from "../../assets/img/infoIcon.svg";
import PopUpImg from "./PopUpImg";
import Loader from "../Loader/Loader";
import PopUpVideo from "./PopUpVideo";
import { apiFetch } from "../../apiFetch/apiFetch";

const ElegirImagenes = ({ form, setForm }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [openImgPopUp, setOpenImgPopUp] = useState(false);
  const [openVidPopUp, setOpenVidPopUp] = useState(false);
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [imgNecesarias, setImgNecesarias] = useState([]);
  const [imagenes, setImagenes] = useState({});
  const [imagenesPreview, setImagenesPreview] = useState({});
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [errorObligatorio, setErrorObligatorio] = useState(false);
  const [campoError, setCampoError] = useState("");
  const [seccionExtra, setSeccionExtra] = useState([]);
  const [numeroImgExtra, setNumeroImgExtra] = useState(1);
  const [esOpcional, setEsOpcional] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const { categorias } = useContext(UseProdsContext);

  useEffect(() => {
    if (!form.categoriaId && !form.prodEditar) {
      navigate(`/Mi&Tienda/CATEGORIA`);
      return;
    }
    if (form.editarProd) {
      console.log(form, categorias);
      const idCaracteristica = form.prodEditar.caracteristicas.split(",");
      const caractObj = {};
      const dir = new FormData();
      dir.append("idcategoria", form.prodEditar.idcategoria);
      const f = async () => {
        await apiFetch(dir, "categorias", "get").then((res) => {
          for (let i = 0; i < res.result[0].caracteristicas.length; i++) {
            for (let j = 0; j < idCaracteristica.length; j++) {
              let fields = idCaracteristica[j].split(":");
              let id = fields[0];
              if (res.result[0].caracteristicas[i].idcaracteristica === id) {
                let obj = res.result[0].caracteristicas[i].nombre;
                caractObj[obj] = [idCaracteristica[j]];
              }
            }
          }
        });
      };
      f();

      for (const i in categorias) {
        if (categorias[i].idcategoria === form.prodEditar.idcategoria) {
          let img = {};
          setImgNecesarias(categorias[i].imagenes_necesarias);
          const { imagenes } = form.prodEditar;

          for (let j = 0; j < categorias[i].imagenes_necesarias.length; j++) {
            let obj = categorias[i].imagenes_necesarias[j].nombre;
            /*             img[obj] = null;
             */ img[obj] = imagenes[i].imagen_original;
          }
          for (let i = 0; i < imagenes.length; i++) {
            if (i === 0) {
              console.log(Object.keys(img)[0], imagenes[i]);
              img[Object.keys(img)[0]] = imagenes[i].imagen_original;
            }
          }
          /* Object.keys(img).forEach(function (key, index) {
            console.log(img, index, Object.keys(img)[index]);
          }); */
          console.log(img);
          setForm((prevState) => ({
            ...prevState,
            editarProd: false,
            categoriaId: categorias[i].idcategoriapadre,
            tipoId: categorias[i].idcategoria,
            tipoNombre: categorias[i].nombre,
            caracteristicas: form.prodEditar.caracteristicas,
            idCaracteristica: idCaracteristica,
            idCaracteristicaOld: caractObj,
            titulo: form.prodEditar.nombre,
            precio: form.prodEditar.precio,
            descripcion: form.prodEditar.descripcion,
            imagenes: img,
          }));
        }
      }

      console.log(form);

      /* for (let j = 0; j < categorias[i].imagenes_necesarias.length; j++) {
        let obj = categorias[i].imagenes_necesarias[j].nombre;
        imagenes[obj] = null;
      } */
      setImagenes(form.imagenes);
    } else {
      for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].idcategoria === form.tipoId) {
          let imagenes = {};
          setImgNecesarias(categorias[i].imagenes_necesarias);

          if (Object.keys(form.imagenes).length === 0) {
            for (let j = 0; j < categorias[i].imagenes_necesarias.length; j++) {
              let obj = categorias[i].imagenes_necesarias[j].nombre;
              imagenes[obj] = null;
            }
            setImagenes(imagenes);
            setImagenesPreview(imagenes);
            return;
          } else {
            setImagenes(form.imagenes);
            setImagenesPreview(form.imagenesPreview);
            setSeccionExtra(form.seccionExtra);
            setNumeroImgExtra(form.seccionExtra.length + 1);
            setVideo(form.video);
          }
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(form);

  const handleSubmit = async () => {
    let variable = false;
    for (let i = 0; i < imgNecesarias.length; i++) {
      if (imgNecesarias[i].obligatoria === "1") {
        for (const key in imagenes) {
          let blob = await fetch(imagenes[key]).then((r) => r.blob());
          console.log(typeof blob);
          if (imgNecesarias[i].nombre === key && !imagenes[key]) {
            variable = true;
            setErrorObligatorio(true);
            setCampoError(`Ingresar campo obligatorio "${key}"`);
          }
        }
      }
    }
    if (!variable) {
      setForm((prevState) => ({
        ...prevState,
        imagenes: imagenes,
        imagenesPreview: imagenesPreview,
        seccionExtra: seccionExtra,
        video: video,
      }));
      navigate(`/Mi&Tienda/CARACTERISTICAS`);
    }
  };

  useEffect(() => {
    let variable = false;
    for (let i = 0; i < imgNecesarias.length; i++) {
      if (imgNecesarias[i].obligatoria === "1") {
        for (const key in imagenes) {
          if (imgNecesarias[i].nombre === key && !imagenes[key]) {
            variable = true;
          }
        }
      }
    }
    if (!variable) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagenes]);

  const handleExtraSubmit = async (tipo) => {
    let variable = false;
    for (let i = 0; i < imgNecesarias.length; i++) {
      if (imgNecesarias[i].obligatoria === "1") {
        for (const key in imagenes) {
          let blob = await fetch(imagenes[key]).then((r) => r.blob());
          console.log(typeof blob);
          if (imgNecesarias[i].nombre === key && !imagenes[key]) {
            variable = true;
            setErrorObligatorio(true);
            setCampoError("Ingresa campos obligatorios primero");
          }
        }
      }
    }
    if (!variable) {
      if (tipo === "imagen") {
        setNumeroImgExtra(numeroImgExtra + 1);
        setSection(`fotoExtra ${numeroImgExtra}`);
        setEsOpcional(true);
        setOpenImgPopUp(true);
      } else {
        setSection("video");
        setOpenVidPopUp(true);
      }
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
            <p>{campoError}</p>
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
                <div
                  className="section"
                  onClick={() => {
                    setSection(imgBox.nombre);
                    setEsOpcional(false);
                    setOpenImgPopUp(true);
                  }}
                >
                  <div className="imgBox">
                    <img
                      src={
                        imagenesPreview[imgBox.nombre]
                          ? imagenesPreview[imgBox.nombre]
                          : imgBox.imagen
                      }
                      alt="foto"
                    />
                    <img className="editButton" src={editIcon} alt="edit" />
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
          {seccionExtra.length > 0 &&
            seccionExtra.map((imgBox) => {
              return (
                <div
                  className="section"
                  onClick={() => {
                    setSection(imgBox.nombre);
                    setEsOpcional(false);
                    setOpenImgPopUp(true);
                  }}
                >
                  <div className="imgBox">
                    <img
                      src={
                        imagenesPreview[imgBox.nombre]
                          ? imagenesPreview[imgBox.nombre]
                          : imgBox.imagen
                      }
                      alt="foto"
                    />
                    <img className="editButton" src={editIcon} alt="edit" />
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
          <div
            className="section"
            onClick={() => {
              handleExtraSubmit("imagen");
            }}
          >
            <div className="imgBox">
              <img src={plusButton} alt="foto" />
              <img className="editButton" src={editIcon} alt="edit" />
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
          <div
            className="section"
            onClick={() => {
              handleExtraSubmit("video");
            }}
          >
            <div className="imgBox">
              <img src={video ? check : plusButton} alt="foto" />
              <img className="editButton" src={editIcon} alt="edit" />
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
          <button
            disabled={disabledButton}
            style={{
              backgroundColor: disabledButton ? "#857db3" : "#443988",
            }}
            onClick={() => handleSubmit()}
          >
            IR A CARACTERÍSTICAS
          </button>
        </div>
        {form.prodEditar === undefined && (
          <div
            className="returnLink"
            onClick={() => navigate(`/Mi&Tienda/TIPO`)}
          >
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A SUBCATEGORÍA</p>
          </div>
        )}
      </div>
      {openImgPopUp && (
        <PopUpImg
          section={section}
          setOpenImgPopUp={setOpenImgPopUp}
          imagenes={imagenes}
          imagenesPreview={imagenesPreview}
          setImagenes={setImagenes}
          setErrorObligatorio={setErrorObligatorio}
          setSeccionExtra={setSeccionExtra}
          setImagenesPreview={setImagenesPreview}
          seccionExtra={seccionExtra}
          esOpcional={esOpcional}
          setNumeroImgExtra={setNumeroImgExtra}
        />
      )}
      {openVidPopUp && (
        <PopUpVideo
          section={section}
          setOpenVidPopUp={setOpenVidPopUp}
          video={video}
          setVideo={setVideo}
          setErrorObligatorio={setErrorObligatorio}
          setVideoPreview={setVideoPreview}
          videoPreview={videoPreview}
        />
      )}
    </div>
  );
};

export default ElegirImagenes;
