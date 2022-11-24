import React, { useState, useCallback } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Slider, Typography } from "@mui/material";
import Cropper from "react-easy-crop";

const PopUpImg = ({
  section,
  setOpenImgPopUp,
  imagenes,
  setImagenes,
  setErrorObligatorio,
  setSeccionExtra,
}) => {
  const [imageSrc, setImageSrc] = useState(
    imagenes[section] ? imagenes[section] : null
  );

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e) => {
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

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        resolve(URL.createObjectURL(file));
      }, "image/jpeg");
    });
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
      setImagenes((prevState) => ({
        ...prevState,
        [section]: croppedImage,
      }));
      setSeccionExtra((prevState) => ({
        ...prevState,
        [section]: croppedImage,
      }));
      setOpenImgPopUp(false);
    } catch (e) {
      console.error(e);
      setOpenImgPopUp(false);
    }
  }, [imageSrc, croppedAreaPixels]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="PopUpImg">
      <div className="fondoPopUp" onClick={() => setOpenImgPopUp(false)}></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            setOpenImgPopUp(false);
          }}
        />
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">ENCUADRÁ LA FOTO DE TU PRODUCTO</p>
          <p className="popUpDescription" style={{ marginTop: "8px" }}>
            Te sugerimos ajustar el tamaño para que se vea lo mejor posible{" "}
          </p>
          {imageSrc && (
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
            <Button onClick={() => setOpenImgPopUp(false)} className="volver">
              CANCELAR
            </Button>
            <>
              <label for="file-upload" class="custom-file-upload">
                CARGAR IMAGEN
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
