import React, { useState } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Slider, Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import Cropper from "react-easy-crop";
const PopUpImg = ({ section, setOpenPopUp, setForm }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

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
    if (section === "fotoFrente") {
      setForm((prevState) => ({
        ...prevState,
        imgFrente: imageSrc,
      }));
    }

    setOpenPopUp(false);
  };

  console.log(imageSrc);

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
            {/*   <ImgDialog img={croppedImage} onClose={onClose} /> */}
          </>

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
