import React, { useState, useCallback } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Slider, Typography } from "@mui/material";
import Cropper from "react-easy-crop";

const PopUpImg = ({
  section,
  setOpenImgPopUp,
  setImagenes,
  setErrorObligatorio,
  setSeccionExtra,
  setImagenesPreview,
  imagenesPreview,
  esOpcional,
  seccionExtra,
  setNumeroImgExtra,
  form,
  idImgEditar,
  setImgsEditar,
  setIdImgEditar
}) => {
  const [imageSrc, setImageSrc] = useState(
    imagenesPreview[section] ? imagenesPreview[section] : null
  );
  const [imagenCargada, setImagenCargada] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e) => {
    console.log(e.target.files)
    setImagenCargada(true);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const getRadianAngle = (degreeValue) => {
    return (degreeValue * Math.PI) / 180;
  };

  const rotateSize = (width, height) => {
    const rotRad = getRadianAngle(0);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  };

  const getCroppedImg = async (
    imageSrc,
    pixelCrop,
    flip = { horizontal: false, vertical: false }
  ) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(0);

    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height
    );

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    const canvasData = canvas.toDataURL("image/jpeg");
    let newImage = new Image();
    newImage.src = canvasData;

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }

    var file = dataURLtoFile(canvasData, "filename.png");

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        resolve(URL.createObjectURL(file));
      }, "image/jpeg");
    });
    return {
      file: file,
      blob: blob,
    };
  };
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setErrorObligatorio(false);
      if(idImgEditar===""){
        setImagenes((prevState) => ({
          ...prevState,
          [section]: croppedImage.file,
        }));
      }else{
        setImgsEditar((prevState) => ({
          ...prevState,
          [section]: {img:croppedImage.file,id:idImgEditar},
        }));
      }
      setImagenesPreview((prevState) => ({
        ...prevState,
        [section]: croppedImage.blob,
      }));
      if (esOpcional) {
        const updatedArray = [
          ...seccionExtra,
          {
            nombre: section,
            descripcion: "foto extra agregada!",
            imagen: croppedImage.blob,
            obligatoria: "0",
          },
        ];
        setSeccionExtra(updatedArray);
      }
      setOpenImgPopUp(false);
    } catch (e) {
      console.error(e);
      setOpenImgPopUp(false);
    }
    setIdImgEditar("")
  }, [imageSrc, croppedAreaPixels]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeModal = () => {
    if (esOpcional) {
      setNumeroImgExtra((prevState) => prevState - 1);
    }
    setOpenImgPopUp(false);
  };
  return (
    <div className="PopUpImg">
      <div className="fondoPopUp" onClick={() => closeModal()}></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            closeModal();
          }}
        />
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">ENCUADRÁ LA FOTO DE TU PRODUCTO</p>
          <p className="popUpDescription" style={{ marginTop: "8px" }}>
            Te sugerimos ajustar el tamaño para que se vea lo mejor posible{" "}
          </p>
          {imageSrc &&
            (form.editarProd === undefined ||
              form.editarProd === null ||
              imagenCargada) && (
              <>
                <div className="cropContainer">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 4}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div>
                  <div>
                    <Typography variant="overline">Zoom</Typography>
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </div>
                  <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                  >
                    Guardar imagen
                  </Button>
                </div>
              </>
            )}

          <div className="buttonContainer">
            <>
              <label for="file-upload" class="custom-file-upload">
                SUBIR IMAGEN
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={onFileChange}
                accept="image/*"
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpImg;
