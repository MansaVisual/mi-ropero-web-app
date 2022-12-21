import React, { useState, useContext, useEffect } from "react";
import { UseProdsContext } from "../../context/ProdsContext";
import { useLocation, useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import check from "../../assets/img/successImg.png";
import editIcon from "../../assets/img/editIcon.svg";
import deleteIcon from "../../assets/img/basura.png";
import plusButton from "../../assets/img/plusButton.svg";
import infoIcon from "../../assets/img/infoIcon.svg";
import PopUpImg from "./PopUpImg";
import Loader from "../Loader/Loader";
import PopUpVideo from "./PopUpVideo";
import { apiFetch } from "../../apiFetch/apiFetch";
import Swal from "sweetalert2";
import logo from "../../assets/img/isologo.png"

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
  const [cambioVideo, setCambioVideo] = useState(false);


  const [imgsBorrar,setImgsBorrar] = useState([])
  const [imgsEditar, setImgsEditar] = useState([]);
  const [idImgEditar, setIdImgEditar] = useState("");

  const [imagenCargadaUser,setImagenCargadaUser]=useState(null)
  const [videoCargadoUser,setVideoCargadoUser]=useState(null)

  const { categorias } = useContext(UseProdsContext);

  useEffect(() => {
    if (!form.categoriaId && !form.prodEditar) {
      navigate(`/Mi&Tienda/CATEGORIA`);
      return;
    }
    if (form.editarProd) {
      const idCaracteristica = form.prodEditar.caracteristicas.split(",");
      const caractOld = {};
      const caractList = {};
      const dir = new FormData();
      dir.append("idcategoria", form.prodEditar.idcategoria);
      const f = async () => {
        await apiFetch(dir, "categorias", "get").then((res) => {
          for (let i = 0; i < res.result[0].caracteristicas.length; i++) {
            setForm((prevState) => ({
              ...prevState,
              caracteristicasList: res.result[0].caracteristicas,
            }));
            let obj = res.result[0].caracteristicas[i].nombre;
            caractList[obj] = [];
            caractOld[obj] = [];
            for (let j = 0; j < idCaracteristica.length; j++) {
              let fields = idCaracteristica[j].split(":");
              let id = fields[0];
              if (res.result[0].caracteristicas[i].idcaracteristica === id) {
                if (caractOld[obj]) {
                  caractOld[obj].push(idCaracteristica[j]);
                } else {
                  caractOld[obj] = [idCaracteristica[j]];
                }
              }
            }
          }
          for (const key in caractOld) {
            let objCaract = res.result[0].caracteristicas.find(
              (e) => e.nombre === key
            );
            for (const key2 in caractOld[key]) {
              let fields = caractOld[key][key2].split(":");
              const caractValor = objCaract.valores.find(
                (e) => e.idcaracteristicavalor === fields[1]
              );
              if (caractList[objCaract.nombre]) {
                caractList[key].push(caractValor.valor);
              } else {
                caractList[key] = [caractValor.valor];
              }
            }
          }
        });
      };
      f();

      for (const i in categorias) {
        if (categorias[i].idcategoria === form.prodEditar.idcategoria) {
          let img = {};
          let video = null;
          setImgNecesarias(categorias[i].imagenes_necesarias);
          const { imagenes } = form.prodEditar;
          for (let j = 0; j < 2; j++) {
            let obj = categorias[i].imagenes_necesarias[j].nombre;
            img[obj] = imagenes[j].imagen_original;
          }
          if (imagenes.length > 2) {
            let updatedArray = [];
            let extraNumber = numeroImgExtra;
            for (let k = 2; k < imagenes.length; k++) {
              if (
                imagenes[k].imagen_original.includes("video") &&
                imagenes[k].imagen_original.includes(".mp4")
              ) {
                video = imagenes[k].imagen_original;
              } else {
                extraNumber++;
                updatedArray.push({
                  nombre: `Foto extra ${k - 1}`,
                  descripcion: "foto extra agregada!",
                  imagen: imagenes[k].imagen_original,
                  obligatoria: "0",
                });
                img[`Foto extra ${k - 1}`] = imagenes[k].imagen_original;
              }
            }
            setNumeroImgExtra(extraNumber);
            setSeccionExtra(updatedArray);
            setVideoPreview(video);
          }
          setForm((prevState) => ({
            ...prevState,
            editarProd: false,
            categoriaId: categorias[i].idcategoriapadre,
            tipoId: categorias[i].idcategoria,
            tipoNombre: categorias[i].nombre,
            caracteristicas: caractList,
            idCaracteristica: idCaracteristica,
            idCaracteristicaOld: caractOld,
            titulo: form.prodEditar.nombre,
            precio: form.prodEditar.precio,
            descripcion: form.prodEditar.descripcion,
            imagenesApi: form.prodEditar.imagenes,
            imagenes: img,
            videoApi: video,
          }));
          setImagenesPreview(img);
          setVideo(video);
        }
      }
      setImagenes(form.imagenes);
    } else if (form.editarProd === false) {
      setImagenes(form.imagenes);
      setImagenesPreview(form.imagenesPreview);
      setSeccionExtra(form.seccionExtra);
      setNumeroImgExtra(form.seccionExtra.length + 1);
      setVideo(form.video);
      for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].idcategoria === form.tipoId) {
          setImgNecesarias(categorias[i].imagenes_necesarias);
        }
      }
    } else {
      for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].idcategoria === form.tipoId) {
          let imagenes = {};
          setImgNecesarias(categorias[i].imagenes_necesarias);

          if(!form.imagenes){
            Swal.fire({
              title: "OCURRIÓ UN ERROR",
              text: "Surgió un error. Volvé a intentarlo",
              icon: "error",
              confirmButtonText: "ACEPTAR",
            }).then((res)=>window.location.reload())
          }
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

  const deleteImage = (image,idImg)=>{
    Swal.fire({
      title: "¿ ELIMINAR IMAGEN ?",
      iconHtml: `<img src=${logo} alt="LOGO">`,
      customClass: {
        icon: 'no-border',
        container:"popUpLoginAlert",
      },
      showCloseButton: true,
      confirmButtonText: "ELIMINAR",
    }).then(async(res)=>{
      console.log(idImg)
      if(res.isConfirmed){
        const newArrayImgs = seccionExtra.filter(e=>e.nombre!==image.nombre)
        delete imagenesPreview[image.nombre]
        delete imagenes[image.nombre]
        setSeccionExtra(newArrayImgs)
        if(form.prodEditar){
          let img = {
            nombre:image.nombre,
            id:idImg
          }
          await setImgsBorrar([...imgsBorrar,img])
        }
      }
    })
  }
console.log(imgsBorrar)
  const deleteVideo = ()=>{
    setSection(null);
    setOpenVidPopUp(false);
    Swal.fire({
      title: "¿ ELIMINAR VIDEO ?",
      iconHtml: `<img src=${logo} alt="LOGO">`,
      customClass: {
        icon: 'no-border',
        container:"popUpLoginAlert",
      },
      showCloseButton: true,
      confirmButtonText: "ELIMINAR",
    }).then((res)=>{
      if(res.isConfirmed){
        setVideo(null)
        setCambioVideo(false)
        setVideoPreview(null);
      }
    })
  }

  const handleSubmit = async () => {
    let variable = false;
    for (let i = 0; i < imgNecesarias.length; i++) {
      if (imgNecesarias[i].obligatoria === "1") {
        for (const key in imagenes) {
          if (imgNecesarias[i].nombre === key && !imagenes[key]) {
            variable = true;
            setErrorObligatorio(true);
            setCampoError(`Ingresar campo obligatorio "${key}"`);
          }
        }
      }
    }
    if (!variable) {
      console.log(imgsBorrar)
      setForm((prevState) => ({
        ...prevState,
        imagenes: imagenes,
        imagenesPreview: imagenesPreview,
        seccionExtra: seccionExtra,
        video: video,
        cambioVideo: cambioVideo,
        imagenesEditar: imgsEditar,
        imagenesBorrar: imgsBorrar
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
        document.getElementById("file-upload").click()
      } else {
        setSection("video");
        document.getElementById("file-upload-video").click()
      }
    }
  };

  const onFileChange=async(e)=>{
    if (e.target.files && e.target.files.length > 0) {
      await setImagenCargadaUser(e.target.files[0])
      setOpenImgPopUp(true)
    }
  }
  const onVideoChange=async(e)=>{
    if (e.target.files && e.target.files.length > 0) {
      await setVideoCargadoUser(e.target.files[0])
      setOpenVidPopUp(true)
    }
  }

  const clearVideo=()=>{
    document.getElementById("file-upload-video").value=""
  }

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
            imgNecesarias.map((imgBox, i) => {console.log(form.editarProd)
              console.log(imgBox.obligatoria)
              console.log(seccionExtra.length)
              return (<>
                {(form.editarProd && imgBox.obligatoria!==0) || (!form.editarProd) || (seccionExtra.length>0) ?
                  <div
                    className="section"
                    onClick={() => {
                      if (form.imagenesApi.length > 0) {
                        setIdImgEditar(form.imagenesApi[i].idproductoimagen);
                      }
                      setSection(imgBox.nombre);
                      setEsOpcional(false);
                      document.getElementById("file-upload").click()
                    }}
                  >
                    <div className="imgBox">
                      {imagenesPreview[imgBox.nombre]
                          ? null
                          :
                        <p>Agregar imágen</p>
                      }
                      <img
                        src={
                          imagenesPreview[imgBox.nombre]
                            ? imagenesPreview[imgBox.nombre]
                            : imgBox.imagen
                        }
                        alt="foto"
                      />
                      {imagenesPreview[imgBox.nombre] && <img className="editButton" src={editIcon} alt="edit" />}
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
                : <></>}
              </>);
            })
          )}
          {seccionExtra.length > 0 &&
            seccionExtra.map((imgBox, i) => {
              return (
                <div
                  className="section"
                  onClick={imagenesPreview[imgBox.nombre]?null:() => {
                    if (form.imagenesApi.length > 0) {
                      setIdImgEditar(
                        form.imagenesApi[i + imgNecesarias.length - 1]
                          .idproductoimagen
                      );
                    }
                    setSection(imgBox.nombre);
                    setEsOpcional(false);
                    document.getElementById("file-upload").click()
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
                      onClick={() => {
                        if (form.imagenesApi.length > 0) {
                          setIdImgEditar(
                            form.imagenesApi[i + imgNecesarias.length - 1]
                              .idproductoimagen
                          );
                        }
                        setSection(imgBox.nombre);
                        setEsOpcional(false);
                        document.getElementById("file-upload").click()
                      }}
                    />
                    {imagenesPreview[imgBox.nombre] &&
                      <img className="editButton" src={editIcon} alt="edit" 
                        onClick={() => {
                          if (form.imagenesApi.length > 0) {
                            setIdImgEditar(
                              form.imagenesApi[i + imgNecesarias.length - 1]
                                .idproductoimagen
                            );
                          }
                          setSection(imgBox.nombre);
                          setEsOpcional(false);
                          document.getElementById("file-upload").click()
                        }}
                      />
                    }
                    {imagenesPreview[imgBox.nombre] && <img className="deleteButton" src={deleteIcon} alt="delete"
                      onClick={form.imagenesApi.length > 0 && form.imagenesApi[i + imgNecesarias.length - 1 + imgsBorrar.length]!==undefined?
                          ()=>deleteImage(imgBox,form.imagenesApi[i + imgNecesarias.length - 1 + imgsBorrar.length].idproductoimagen)
                        :
                          ()=>deleteImage(imgBox)}
                    />}
                  </div>
                  <div className="bottomContainer">
                    <span>Foto Extra</span>
                    <div class="tooltip">
                      <img src={infoIcon} alt="infoIcon" />
                      <span>{imgBox.descripcion}</span>
                    </div>
                  </div>
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
              <img src={plusButton} alt="foto" className="imgAdd"/>
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
          >
            <div className="imgBox">
              <img src={video ? check : plusButton} alt="foto" className="imgAdd"
                onClick={video?null:() => {
                  handleExtraSubmit("video");
                }}
              />
              {video && 
                <img className="editButton" src={editIcon} alt="edit" 
                  onClick={() => {
                    handleExtraSubmit("video");
                  }}
                />
              }
              {video && <img className="deleteButton" src={deleteIcon} alt="delete" onClick={()=>deleteVideo()} />}
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
            AGREGAR CARACTERÍSTICAS
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
          form={form}
          idImgEditar={idImgEditar}
          setImgsEditar={setImgsEditar}
          setIdImgEditar={setIdImgEditar}
          imagenCargadaUser={imagenCargadaUser}
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
          setCambioVideo={setCambioVideo}
          videoCargadoUser={videoCargadoUser}
          clearVideo={clearVideo}
        />
      )}
      <input
        id="file-upload"
        type="file"
        onChange={onFileChange}
        accept="image/*"
        style={{zIndex:"-99",position:"absolute",top:"0"}}
      />
      <input
        id="file-upload-video"
        type="file"
        onChange={onVideoChange}
        accept="video/mp4"
        style={{zIndex:"-99",position:"absolute",top:"0"}}
      />
    </div>
  );
};

export default ElegirImagenes;
