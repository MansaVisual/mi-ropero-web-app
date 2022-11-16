import React, { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { useNavigate } from "react-router-dom";
import { UseFormContext } from "../../context/FormContext";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import { UseLoginContext } from "../../context/LoginContext";

const CancelacionCompra = () => {
  const navigate = useNavigate();
  const { FormAPI } = useContext(UseFormContext);
  const {userLog}=useContext(UseLoginContext)

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

    const buscarCompra=new FormData()
    buscarCompra.append("idcliente",userLog)
    buscarCompra.append("idoperacion",Number(form.idOperacion))
    FormAPI(buscarCompra,"operaciones","get").then((res)=>{console.log(res)
      if(res.status==="success"){
        const data = new FormData();
        data.append("idoperacion", form.idOperacion);
        data.append("mensaje", form.mensaje);
        data.append("remitente", 1);
    
        FormAPI(data, "reclamos", "insert").then((res) => {console.log(res)
          setLoading(false);
          if (res.status === "success") {
            navigate("/cancelacionCompraOk");
          } else {
            if (res.result === "La operacion no existe") {
              Swal.fire({
                title: "ERROR AL BORRAR",
                text: "Error al cargar reclamo. Revisá el número de operación y volvé a intentarlo",
                icon: "error",
                confirmButtonText: "ACEPTAR",
              });
            }
          }
        });
      }else{
        setLoading(false);
        Swal.fire({
          title: "ERROR DE VALIDACIÓN",
          text: "El Número de Operación ingresado no fue encontrado o es incorrecto. Vuelva a intentarlo o pruebe con otro.",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    })
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
              inputProps={{ maxLength: 150 }}
            />
          </div>
        </div>
        <div className="checkBoxContainer">
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
            >
              Acepto los <span onClick={()=>navigate("/terminos&y&condiciones")} style={{cursor:"pointer"}}>términos y condiciones</span>
            </p>
          </div>
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
        <div className="returnLink" onClick={() => navigate(`/`)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A INICIO</p>
        </div>
      </div>
    </div>
  );
};

export default CancelacionCompra;
