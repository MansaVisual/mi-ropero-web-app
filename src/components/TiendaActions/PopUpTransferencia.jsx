import React, { useState,useEffect,useContext } from "react";
import MRlogoModal from "../../assets/img/isologo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Loader from "../Loader/Loader";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseLoginContext } from "../../context/LoginContext";
import Swal from "sweetalert2";

const PopUpTransferencia = ({ setTransfPopUp }) => {

  const { saldoCuenta, setSaldoCuenta } = useContext(UseMiTiendaContext);
  const { userLog } = useContext(UseLoginContext);

  const [loading, setLoading] = useState(false);
  const [errorMonto,setErrorMonto]=useState(false)

  let clase = 'formObligatorio';
  let clase2 = 'formObligatorioTitle';

  const [data, setData] = useState({
    cbu:"",
    alias:"",
    titular:"",
    dni:"",
    monto:""
  });

  useEffect(() => {
    console.log(data)
  }, [data]);

  const [fin, setFin] = useState(false);

  const submit = ()=>{
    setLoading(true)
    if(Number(data.monto)<100 || Number(data.monto)>saldoCuenta){
      setLoading(false)
      setErrorMonto(true)
      document.getElementById("monto").focus()
      return
    }
    const trans = new FormData()
    trans.append("idcliente",userLog)
    trans.append("cbu",data.cbu)
    trans.append("alias",data.alias)
    trans.append("titular",data.titular)
    trans.append("documento",Number(data.dni))
    trans.append("monto",data.monto)
    apiFetch(trans,"transferencias","insert").then((res)=>{console.log(res)
      if(res.status==="success"){
        setLoading(false)
        setTransfPopUp(false)
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
          })
        });
      }else{
        setLoading(false)
        setTransfPopUp(false)
        Swal.fire({
          title: "OCURRIÓ UN ERROR",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        })
      }
    })
  }
  
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
          <p className={`popUpDescription ${errorMonto?clase2:""}`} style={{ marginTop: "8px" }}>
            {errorMonto ? `Monto Mín: $100 / Máx: $${saldoCuenta}`
            :
            "Ingresá estos datos para poder transferir tu dinero."
            }
          </p>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelCBU">
                CBU de la cuenta
              </p>
              <TextField
                className="input"
                size="small"
                placeholder="Ingresar CBU. Solo números"
                id="CBU"
                type={"number"}
                onChangeCapture={(e)=>setData((prevState)=>({
                  ...prevState,
                  cbu:e.target.value
                }))}
                /* defaultValue={infoUser.nombre}
                onFocus={(e) => onFocus(e, clase, clase2, "labelNombre")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
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
                onChangeCapture={(e)=>setData((prevState)=>({
                  ...prevState,
                  alias:e.target.value
                }))}
                /* onFocus={(e) => onFocus(e, clase, clase2, "labelApellido")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }} */
                /* sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
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
                onChangeCapture={(e)=>setData((prevState)=>({
                  ...prevState,
                  titular:e.target.value
                }))}
                /* defaultValue={infoUser.nombre}
                onFocus={(e) => onFocus(e, clase, clase2, "labelNombre")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
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
                placeholder="Ingresar CUIT o CUIL. Solo números."
                id="CUIT"
                type={"number"}
                onChangeCapture={(e)=>setData((prevState)=>({
                  ...prevState,
                  dni:e.target.value
                }))}
                /* defaultValue={infoUser.nombre}
                onFocus={(e) => onFocus(e, clase, clase2, "labelNombre")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
              />
            </div>
            <div className="inputBox">
              <p className={`labelInput ${errorMonto?clase2:""}`} id="labelMonto">
                Monto Mín: $100 / Máx: ${saldoCuenta}
              </p>
              <TextField
                className={`input ${errorMonto?clase:""}`}
                size="small"
                placeholder="Ingresar solo números."
                id="monto"
                type={"number"}
                onChangeCapture={(e)=>setData((prevState)=>({
                  ...prevState,
                  monto:e.target.value
                }))}
                /* onFocus={(e) => onFocus(e, clase, clase2, "labelApellido")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }} */
                /* sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }} */
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
                {!loading && !fin && (
                  <Button
                    onClick={() => setTransfPopUp(false)}
                    className="volver"
                  >
                    CANCELAR
                  </Button>
                )}
                {!fin ? (
                  <Button
                    /*     disabled={message === "" ? true : false} */
                    className={(data.cbu==="" || data.alias==="" || data.titular==="" || data.dni==="" || data.monto==="") ? "mensajeDisabled" : "recordar"}
                    disabled={(data.cbu==="" || data.alias==="" || data.titular==="" || data.dni==="" || data.monto==="") ? true : false}
                    onClick={(data.cbu==="" || data.alias==="" || data.titular==="" || data.dni==="" || data.monto==="") ? null :() => submit()} 
                  >
                    SOLICITAR
                  </Button>
                ) : (
                  <Button
                    /*    disabled={message === "" ? true : false} */
                    className={"recordar"}
                    /*   onClick={() => setOpenMessagePop(false) } */
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

export default PopUpTransferencia;
