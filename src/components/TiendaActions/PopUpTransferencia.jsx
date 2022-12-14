import React, { useState, useContext } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Loader from "../Loader/Loader";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseLoginContext } from "../../context/LoginContext";
import Swal from "sweetalert2";
import { NumericFormat } from "react-number-format";

const PopUpTransferencia = ({ setTransfPopUp }) => {
  const { saldoCuenta, setSaldoCuenta } = useContext(UseMiTiendaContext);
  const { userLog } = useContext(UseLoginContext);

  const [loading, setLoading] = useState(false);
  const [errorMonto, setErrorMonto] = useState(false);
  const [data, setData] = useState({
    cbu: "",
    alias: "",
    titular: "",
    dni: "",
    monto: "",
  });

  let clase = "formObligatorio";
  let clase2 = "formObligatorioTitle";

  const submit = () => {
    setLoading(true);
    if (Number(data.monto) < 100 || Number(data.monto) > saldoCuenta) {
      setLoading(false);
      setErrorMonto(true);
      document.getElementById("monto").focus();
      return;
    }
    const trans = new FormData();
    trans.append("idcliente", userLog);
    trans.append("cbu", data.cbu);
    trans.append("alias", data.alias);
    trans.append("titular", data.titular);
    trans.append("documento", Number(data.dni));
    trans.append("monto", data.monto);
    apiFetch(trans, "transferencias", "insert").then((res) => {
      if (res.status === "success") {
        setLoading(false);
        setTransfPopUp(false);
        const ctacte = new FormData();
        ctacte.append("idcliente", userLog);
        apiFetch(ctacte, "cuentascorrientes", "balance").then((res) => {
          if (res.status === "success") {
            setSaldoCuenta((res.result.debe - res.result.haber).toFixed(2));
          }
          Swal.fire({
            title: "TRANSFERENCIA SOLICITADA",
            icon: "success",
            confirmButtonText: "ACEPTAR",
          });
        });
      } else {
        setLoading(false);
        setTransfPopUp(false);
        Swal.fire({
          title: "OCURRI?? UN ERROR",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
  };

  return (
    <div className="PopUpMensajePP">
      <div className="fondoPopUp" onClick={() => setTransfPopUp(false)}></div>
      <div className="popUp">
        <CancelIcon
          color="tertiary"
          className="cross"
          onClick={() => {
            setTransfPopUp(false);
          }}
        />
        <div className="popUpContainer">
          <img src={MRlogoModal} alt="logo" className="logoModal" />
          <p className="popUpTitle">SOLICITUD DE TRANSFERENCIA</p>
          <p
            className={`popUpDescription ${errorMonto ? clase2 : ""}`}
            style={{ marginTop: "8px" }}
          >
            {errorMonto
              ? `Monto M??n: $100 / M??x: $${saldoCuenta}`
              : "Ingres?? estos datos para poder transferir tu dinero."}
          </p>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelCBU">
                CBU de la cuenta
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Ingresar CBU. Solo n??meros"
                id="CBU"
                type={"number"}
                onChangeCapture={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    cbu: e.target.value,
                  }))
                }
              />
            </div>
            <div className="inputBox">
              <p className="labelInput" id="labelAlias">
                ALIAS de la cuenta
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Ingresar alias completo "
                id="alias"
                onChangeCapture={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    alias: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="inputContainer">
            <div className="inputBox fullName">
              <p className="labelInput" id="labelNombreCompleto">
                Nombre y apellido del titular de la cuenta
              </p>
              <TextField
                color="primary"
                className="input"
                size="small"
                placeholder="Ingresar nombres y apellido completo"
                id="nombreCompleto"
                onChangeCapture={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    titular: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelCUIT">
                CUIT o CUIL
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Ingresar CUIT o CUIL. Solo n??meros."
                id="CUIT"
                type={"number"}
                onChangeCapture={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    dni: e.target.value,
                  }))
                }
              />
            </div>
            <div className="inputBox">
              <p
                className={`labelInput ${errorMonto ? clase2 : ""}`}
                id="labelMonto"
              >
                Monto M??n: $100 / M??x: ${saldoCuenta}
              </p>
              {/*  <TextField
                className={`input ${errorMonto ? clase : ""}`}
                size="small"
                placeholder="Ingresar solo n??meros."
                id="monto"
                type={"number"}
                onChangeCapture={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    monto: e.target.value,
                  }))
                }
              /> */}
              <NumericFormat
                customInput={TextField}
                className={`input formatNumber ${errorMonto ? clase : ""}`}
                placeholder="Ingresar solo n??meros."
                id="monto"
                onValueChange={(values) => {
                  setData((prevState) => ({
                    ...prevState,
                    monto: values.value,
                  }));
                }}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"$"}
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
                    onClick={() => setTransfPopUp(false)}
                    className="volver"
                  >
                    CANCELAR
                  </Button>
                )}
                <Button
                  className={
                    (data.cbu!=="" || data.alias!=="") && data.titular!=="" && data.dni!=="" && data.monto!==""
                      ? "recordar"
                      : "mensajeDisabled"
                  }
                  disabled={
                    (data.cbu!=="" || data.alias!=="") && data.titular!=="" && data.dni!=="" && data.monto!==""
                      ? false
                      : true
                  }
                  onClick={
                    (data.cbu!=="" || data.alias!=="") && data.titular!=="" && data.dni!=="" && data.monto!==""
                      ? () => submit()
                      : null
                  }
                >
                  SOLICITAR
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpTransferencia;
