import React, { useState, useContext,useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useNavigate } from "react-router-dom";
import { UseFormContext } from "../../context/FormContext";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";

const CancelacionCompra = () => {
  const navigate = useNavigate();
  const { FormAPI } = useContext(UseFormContext);

  const [form, setForm] = useState({
    idOperacion: "",
    mensaje: "",
  });
  const [checkBox, setCheckBox] = useState(false);
  const [campoObligatorio, setCampoObligatorio] = useState(false);
  const [aceptarTerminosError, setAceptarTerminosError] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    if (form.idOperacion === "" || form.mensaje === "") {
      setCampoObligatorio(true);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
      setLoading(false);
      return;
    }
    if (!checkBox) {
      setAceptarTerminosError(true);
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("idoperacion", form.idOperacion);
    data.append("mensaje", form.mensaje);
    data.append("remitente", 1);

    FormAPI(data, "reclamos", "insert").then((res) => {
      setLoading(false);
      console.log(res);
      if (res.status === "success") {
        navigate("/cancelacionCompraOk");
      } else {
        if (res.result === "La operacion no existe") {
          console.log("first");
          Swal.fire({
            title: "ERROR AL BORRAR",
            text: "Error al cargar reclamo. Revisá el id de operación y volvé a intentarlo",
            icon: "error",
            confirmButtonText: "ACEPTAR",
          });
        }
      }
    });
  };

  return (
    <div className="cancelacionPage">
      <div className="cancelacionBody">
        <Breadcrumbs links={["SOLICITUD DE CANCELACION DE COMPRA"]} />
        <div className="titleSection">
          <p className="title">SOLICITUD DE CANCELACION DE COMPRA</p>
          {campoObligatorio && (
            <div className="errorBox">
              <CancelOutlinedIcon color="secondary" className="cruz" />
              <p>Debe completar los campos obligatorios para avanzar</p>
            </div>
          )}
          {aceptarTerminosError && (
            <div className="errorBox">
              <CancelOutlinedIcon color="secondary" className="cruz" />
              <p>Debe aceptar los términos y condiciones</p>
            </div>
          )}
        </div>
        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput" id="labelAlias">
              ID de la operación *
            </p>
            <TextField
              color="primary"
              className="input"
              size="small"
              id="alias"
              type="number"
              placeholder="número de operación"
              value={form.idOperacion}
              onChange={(e) => {
                setForm({ ...form, idOperacion: e.target.value });
                setCampoObligatorio(false);
              }}
            />
          </div>
          <div className="inputBox"></div>
        </div>
        <div className="inputContainer">
          <div className="textAreaBox">
            <span className="label1">Mensaje</span>
            <TextField
              multiline
              rows={4}
              id="infoAdicional"
              color="primary"
              className="textArea"
              size="small"
              placeholder="Contános los motivos por los cuales querés cancelar la operación."
              value={form.mensaje}
              onChange={(e) => {
                setForm({ ...form, mensaje: e.target.value });
                setCampoObligatorio(false);
              }}
              inputProps={{ maxLength: 50 }}
            />
          </div>
        </div>
        <div className="checkBoxSection">
          <input
            type="checkbox"
            value={checkBox}
            onClick={() => {
              setCheckBox(!checkBox);
              setAceptarTerminosError(false);
            }}
            className="checkBox"
          />
          <p
            className="labelForm"
            htmlFor="nuevaDir"
            style={{ cursor: "pointer" }}
          >
            Acepto los <span>términos y condiciones</span>
          </p>
        </div>
        <div className="buttonContainer">
          {loading ? (
            <Loader spin={"spinnerM"} />
          ) : (
            <Button className="sendButton" onClick={() => handleSubmit()}>
              ENVIAR
            </Button>
          )}
        </div>
        <div className="returnLink" onClick={() => navigate(`/perfil`)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A INICIO</p>
        </div>
      </div>
    </div>
  );
};

export default CancelacionCompra;
