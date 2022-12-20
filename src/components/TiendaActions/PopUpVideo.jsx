import React, { useState,useEffect } from "react";
import { Button, useMediaQuery } from "@mui/material";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import theme from "../../styles/theme";

const PopUpVideo = ({
  setOpenVidPopUp,
  setVideo,
  setVideoPreview,
  videoPreview,
  setCambioVideo,
  videoCargadoUser
}) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if(videoCargadoUser!==null){
      load()
    }
  }, [videoCargadoUser])// eslint-disable-next-line react-hooks/exhaustive-deps
  
  const load = async()=>{
    if(videoCargadoUser!==null){
      if (videoCargadoUser > 20000000) {
        Swal.fire({
          title: "VIDEO SUPERIOR A 20MB",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
        setOpenVidPopUp(false);
      } else {
        let imageDataUrl = await readFile(videoCargadoUser);
        setVideoPreview(imageDataUrl);
        setVideoSrc(videoCargadoUser);
      }
    }
  }

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const handleSubmit = () => {
    setVideo(videoSrc);
    setCambioVideo(true);
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
        <div className="popUpContainer popUpContainerVideo">
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
                  maxHeight: isMobile?"107px":"130px",
                  marginBottom: "30px",
                }}
              />
              <div>
                <Button
                    onClick={() => handleSubmit()}
                    variant="contained"
                    className="custom-file-upload"
                  >
                    Guardar video
                  </Button>
              </div>
            </>
          )}

          <div className="buttonContainer">
            {/* <>
              <label for="file-upload-video" class="custom-file-upload">
                CARGAR VIDEO
              </label>
            </> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpVideo;
