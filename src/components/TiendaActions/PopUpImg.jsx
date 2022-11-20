import React, { useState, useCallback } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Slider, Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import Cropper from "react-easy-crop";
const PopUpImg = ({ section, setOpenPopUp, setForm, form }) => {
  const [imageSrc, setImageSrc] = useState(
    form[section] ? form[section] : null
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [fin, setFin] = useState(false);

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

  const handleSave = () => {
    setForm((prevState) => ({
      ...prevState,
      [section]: croppedImage,
    }));

    setOpenPopUp(false);
  };

  console.log(form);

  const getRadianAngle = (degreeValue) => {
    return (degreeValue * Math.PI) / 180;
  };

  const rotateSize = (width, height, rotation) => {
    const rotRad = getRadianAngle(rotation);

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
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    // As a blob
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
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  return (
    <div className="PopUpImg">
      <div className="fondoPopUp" onClick={() => setOpenPopUp(false)}></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            setOpenPopUp(false);
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
                  rotation={rotation}
                  zoom={zoom}
                  aspect={3 / 4}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  /* onCropComplete={onCropComplete} */
                  onZoomChange={setZoom}
                />
              </div>
              <div /* className={classes.controls} */>
                <div /* className={classes.sliderContainer} */>
                  <Typography
                    variant="overline"
                    /* classes={{ root: classes.sliderLabel }} */
                  >
                    Zoom
                  </Typography>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    /* classes={{ root: classes.slider }} */
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </div>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                  /*    classes={{ root: classes.cropButton }} */
                >
                  Guardar imagen
                </Button>
              </div>
            </>
          )}

          <div className="buttonContainer">
            {loading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <Loader spin={"spinnerM"} />
              </div>
            ) : (
              <>
                {!loading && !fin && (
                  <Button
                    onClick={() => setOpenPopUp(false)}
                    className="volver"
                  >
                    CANCELAR
                  </Button>
                )}
                {!fin ? (
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
                ) : (
                  <Button
                    disabled={message === "" ? true : false}
                    className={message === "" ? "mensajeDisabled" : "recordar"}
                    onClick={() => setOpenPopUp(false)}
                  >
                    LISTO
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpImg;
