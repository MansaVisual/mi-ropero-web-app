import React, { useState } from "react";
import { Button } from "@mui/material";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";

const PopUpVideo = ({ setOpenVidPopUp, video, setVideo }) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (e.target.files[0].size > 20000000) {
        Swal.fire({
          title: "VIDEO SUPERIOR A 20MB",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      } else {
        let imageDataUrl = await readFile(file);
        setVideoPreview(imageDataUrl);
        setVideoSrc(file);
      }
    }
  };

  const handleSubmit = () => {
    setVideo(videoSrc);
    setOpenVidPopUp(false);
  };
  return (
    <div className="PopUpImg">
      <div className="fondoPopUp" onClick={() => setOpenVidPopUp(false)}></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            setOpenVidPopUp(false);
          }}
        />
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">ELEGÍ TU VIDEO</p>
          <p className="popUpDescription" style={{ marginTop: "8px" }}>
            Debes subir tu video en formato mp4, con un límite de 20mb
          </p>
          {videoPreview && (
            <>
              <video
                src={videoPreview}
                controls
                style={{
                  width: "100%",
                  maxWidth: "300px",
                }}
              />
              <div>
                <Button
                  onClick={() => handleSubmit()}
                  variant="contained"
                  color="primary"
                >
                  Guardar video
                </Button>
              </div>
            </>
          )}

          <div className="buttonContainer">
            <Button onClick={() => setOpenVidPopUp(false)} className="volver">
              CANCELAR
            </Button>
            <>
              <label for="file-upload-video" class="custom-file-upload">
                CARGAR VIDEO
              </label>
              <input
                id="file-upload-video"
                type="file"
                onChange={onFileChange}
                accept="video/mp4"
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpVideo;
