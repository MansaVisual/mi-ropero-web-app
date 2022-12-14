import React, { useState, useContext } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Loader from "../Loader/Loader";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseLoginContext } from "../../context/LoginContext";
import Swal from "sweetalert2";

const PopUpRespOferta = ({ setOpenPopUp, ofertaSelecc }) => {
  const { userLog } = useContext(UseLoginContext);

  const [loading, setLoading] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  const handleSubmit = (action) => {
    setLoading(true);
    const offer = new FormData();
    offer.append("idcliente", Number(userLog));
    offer.append("idoferta", Number(ofertaSelecc.idoferta));
    if (action === "accept") {
      offer.append("respuesta", respuesta);
    }
    apiFetch(offer, "ofertas", action).then((res) => {
      if (res.status === "success") {
        setLoading(false);
        setOpenPopUp(false);
        Swal.fire({
          title: action === "accept" ? "OFERTA ACEPTADA" : "OFERTA CANCELADA",
          icon: "success",
          confirmButtonText: "ACEPTAR",
        }).then(() => window.location.reload());
      } else {
        setLoading(false);
        setOpenPopUp(false);
        Swal.fire({
          title: "OCURRIÓ UN ERROR",
          text: "Reintente en unos momentos",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
    setOpenPopUp(false);
  };

  return (
    <div className="PopUpMensajePP">
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
          <p className="popUpTitle">RESPONDER OFERTAS</p>
          <p className={`popUpDescription`} style={{ marginTop: "8px" }}>
            Te hicieron una oferta de ${ofertaSelecc.oferta} en el producto
            publicado a ${new Intl.NumberFormat("de-DE").format(ofertaSelecc.producto.precio)}.
          </p>
          <p className={`ofertaText`}>
            Si la aceptás el precio del producto será el de la oferta por el
            término de 24 Hs.
          </p>
          <p className={`ofertaText`}>Si la cancelás, todo seguirá igual.</p>
          <p className={`ofertaText`}>
            En cualquier de los casos, se le notificará al posible comprador.
          </p>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelCBU">
                Respuesta al comprador
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Recordá que no podés enviar datos de contacto."
                id="respuesta"
                onChange={(e) => {
                  setRespuesta(e.target.value);
                }}
                value={respuesta}
                /*    type="text" */
              />
            </div>
          </div>
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
                {!loading && (
                  <Button
                    onClick={() => handleSubmit("decline")}
                    className="volver rechazoOFerta"
                  >
                    RECHAZAR OFERTA
                  </Button>
                )}
                <Button
                  className={"recordar"}
                  onClick={() => handleSubmit("accept")}
                >
                  ACEPTAR OFERTA
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpRespOferta;
