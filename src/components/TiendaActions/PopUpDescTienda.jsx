import React, { useState } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Loader from "../Loader/Loader";
import { apiFetch } from "../../apiFetch/apiFetch";
import Swal from "sweetalert2";

const PopUpDescTienda = ({ setOpenPopUp, descuentoInfo }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);
  const [fin, setFin] = useState(false);

  const submit = () => {
    setLoading(true);

    const desc = new FormData();
    desc.append("idcliente", descuentoInfo.idCliente);
    desc.append("idtienda", descuentoInfo.idTienda);
    desc.append("descuento", message);
    apiFetch(desc, "tiendas", "set_discount").then(async (res) => {
      if (res.status === "success") {
        setLoading(false);
        setOpenPopUp(false)
        Swal.fire({
          title: "OFERTA DE TIENDA AÑADIDA",
          icon: "success",
          confirmButtonText: "ACEPTAR",
        }).then((res) => window.location.reload());
      } else {
        setLoading(false);
        setOpenPopUp(false)
        Swal.fire({
          title: "OCURRIÓ UN ERROR",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
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
          <p className="popUpTitle">
            {fin
              ? "EL DESCUENTO SE APLICÓ CORRECTAMENTE"
              : "DESCUENTO POR TIENDA"}
          </p>
          {!fin && (
            <p className="popUpDescription" style={{ marginTop: "8px" }}>
              Ingresá el porcentaje de descuento para tu tienda
            </p>
          )}
          {!fin && (
            <TextField
              multiline
              rows={1}
              className="textArea"
              size="small"
              type="number"
              placeholder="% de descuento"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError(false);
              }}
              inputProps={{ maxLength: 2 }}
              sx={{
                width: "100%",
                border: error && "1px solid #ff3f20 !important",
                borderRadius: error && "4px",
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: error && "#FF3F20",
                  },
                },
              }}
            />
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
                  <Button
                    disabled={message === "" ? true : false}
                    className={message === "" ? "mensajeDisabled" : "recordar"}
                    onClick={() => submit()}
                  >
                    APLICAR
                  </Button>
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
          {/* <img
            onClick={() => setOpenMessagePop(false)}
            src={cruz}
            alt="CRUZ"
            className="cruz"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default PopUpDescTienda;
