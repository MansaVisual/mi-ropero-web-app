import React, { useState, useEffect,useContext } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useLocation } from "react-router-dom";
import leftArrow from "../../assets/img/leftArrow.png";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { handleInputChange, onFocus } from "./direccFunciones";
import PopUpLocalidad from "../FormCheckout/PopUpLocalidad";
import PopUpFinalDir from "./PopUpFinal/PopUpFinalDir";
import Loader from "../Loader/Loader";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";

const EditarDir = ({setDir}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const {dataUpdate,setDataUpdate}=useContext(UseMiTiendaContext)
  const [contactForm, setContactForm] = useState([]);

  let clase = "formObligatorio";
  let clase2 = "formObligatorioTitle";

  useEffect(() => {
    apiFetch("", "direcciones", "provincias").then((res) => {
      if (res.status === "success") {
        setProvincias(res.result);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [provincias, setProvincias] = useState([]);
  const [loader, setLoader] = useState(false);

  const [campoObligatorio, setCampoObligatorio] = useState(false);
  const [errorCodPostal, setErrorCodPostal] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorLocalidad, setErrorLocalidad] = useState(false);

  const [viewDireccion, setViewDireccion] = useState(false);
  const [resDirecciones, setResDirecciones] = useState([]);
  const [guardarDireccion, setGuardarDireccion] = useState(false);
  const [provincia, setProvincia] = useState("");

  const [infoLoc, setInfoLoc] = useState([]);
  const [infoLocFinal, setInfoLocFinal] = useState([]);
  const [popLoc, setPopLoc] = useState(false);
  const [changeLoc, setChangeLoc] = useState(false);

  const [cambioProvincia, setCambioProvincia] = useState(false);

  useEffect(() => {
    if (!popLoc && infoLocFinal.length !== 0) {
      document.getElementById("codigoPostal").value =
        infoLocFinal.codigo_postal;
      document.getElementById("barrioLocalidad").value = infoLocFinal.nombre;
    }
  }, [popLoc]); // eslint-disable-line react-hooks/exhaustive-deps

  const [direccion, setDireccion] = useState({});

  const handleProvinciaInput = (event) => {
    setProvincia(event.target.value);
    setContactForm({ ...contactForm, provincia: event.target.value });
    if (event.target.value === "1") {
      document.getElementById("barrioLocalidad").value = "CAPITAL FEDERAL";
      setContactForm({ ...contactForm, barrioLocalidad: "CAPITAL FEDERAL" });
    }
  };

  const handleChangeLoc = () => {
    if (document.getElementById("barrioLocalidad") !== "CAPITAL FEDERAL") {
      if (document.getElementById("barrioLocalidad").value.length >= 3) {
        setInfoLocFinal([]);
        if (changeLoc) {
          const localidad = new FormData();
          localidad.append("idprovincia", provincia);
          localidad.append(
            "string",
            document.getElementById("barrioLocalidad").value
          );
          apiFetch(localidad, "direcciones", "localidades").then((res) => {
            if (res.status === "error") {
              setErrorLocalidad(true);
              scrollTop();
            } else if (res.status === "success") {
              setPopLoc(true);
              setInfoLoc(res.result);
            }
          });
        }
      }
    }
  };

    useEffect(() => {
        document.getElementById("calle").value = dataUpdate.calle;
        document.getElementById("alturaKM").value = dataUpdate.numero;
        if(dataUpdate.piso!==""){
            document.getElementById("piso").value = dataUpdate.piso;
        }
        if(dataUpdate.departamento!==""){
            document.getElementById("depto").value = dataUpdate.departamento;
        }
        setProvincia(dataUpdate.idprovincia);
        if (dataUpdate.idprovincia === "1") {
            document.getElementById("barrioLocalidad").value = "CAPITAL FEDERAL";
        } else {
            document.getElementById("barrioLocalidad").value =
            dataUpdate.localidad;
        }
        if(dataUpdate.entre_calle_1!==""){
            document.getElementById("entrecalle1").value = dataUpdate.entre_calle_1;
        }
        if(dataUpdate.entre_calle_2!==""){
            document.getElementById("entrecalle2").value = dataUpdate.entre_calle_2;
        }
        if(dataUpdate.informacion_adicional!==""){
            document.getElementById("infoAdicional").value = dataUpdate.informacion_adicional;
        }
        document.getElementById("codigoPostal").value =
        dataUpdate.codigo_postal;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkNuevaDireccion = async () => {
    setLoader(true);
    if (document.getElementById("calle").value === "") {
      throwError("calle", "labelCalle");
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
    }
    if (document.getElementById("alturaKM").value === "") {
      throwError("alturaKM", "labelAlturaKM");
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
    }

    if (infoLocFinal.length === 0 && cambioProvincia) {
      if (
        document.getElementById("barrioLocalidad").value !== "CAPITAL FEDERAL"
      ) {
        throwError("barrioLocalidad", "labelBarrioLocalidad");
        scrollTop();
        setErrorLocalidad(true);
        setLoader(false);
        return;
      }
    }

    validarDireccion();
  };

  const validarDireccion = () => {
    const formDireccion = new FormData();
    formDireccion.append("calle", document.getElementById("calle").value);
    formDireccion.append("numero", document.getElementById("alturaKM").value);
    formDireccion.append(
      "provincia",
      document.getElementById("provincia").innerHTML
    );
    formDireccion.append(
      "localidad",
      document.getElementById("barrioLocalidad").value
    );
    formDireccion.append(
      "codigo_postal",
      document.getElementById("codigoPostal").value
    );

    apiFetch(formDireccion, "direcciones", "normalize").then(async (res) => {
      if (
        res.status === "success" &&
        res.result[0].calle !== "" &&
        res.result[0].numero !== ""
      ) {
        scrollTop();
        await setResDirecciones(res.result);
        setViewDireccion(true);
      } else {
        setLoader(false);
        setErrorDireccion(true);
        throwError("calle", "labelCalle");
        throwError("alturaKM", "labelAlturaKM");
        throwError("provincia", "labelProvincia");
        throwError("barrioLocalidad", "labelBarrioLocalidad");
        throwError("codigoPostal", "labelCodigoPostal");
        scrollTop();
      }
    });
  };

  useEffect(() => {
    if (guardarDireccion) {

      setDataUpdate((prevState)=>({
        ...prevState,
        calle:direccion.calle,
        numero:direccion.numero,
        googlemaps_normalize:direccion.raw_data,
        codigo_postal:direccion.codigo_postal,
        provincia:direccion.provincia,
        localidad:direccion.localidad,
        informacion_adicional: document.getElementById("infoAdicional").value,
        entre_calle_1: document.getElementById("entrecalle1").value,
        entre_calle_2: document.getElementById("entrecalle2").value,
        piso: document.getElementById("piso").value,
        departamento: document.getElementById("depto").value,
        idprovincia: provincia,
        idlocalidad: document.getElementById("barrioLocalidad").value==="CAPITAL FEDERAL"?"-1":infoLocFinal.length!==0?infoLocFinal.idlocalidad:dataUpdate.idlocalidad,
      }))
      setDir(false)
    }
  }, [guardarDireccion]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTop = (param) => {
    if (param !== undefined) {
      setTimeout(() => {
        window.scrollTo({
          top: param,
          behavior: "auto",
        });
      }, 0);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const throwError = (id1, id2) => {
    if (id1 === "provincia") {
      if (!document.getElementById(id1).classList.contains(clase)) {
        document.getElementById(id1).parentNode.classList.add(clase);
        document.getElementById(id2).classList.add(clase2);
      }
    } else {
      if (!document.getElementById(id1).classList.contains(clase)) {
        document.getElementById(id1).classList.add(clase);
        document.getElementById(id2).classList.add(clase2);
      }
    }
  };

  return (
    <Grid className="gridContainer">
      <div className="nuevaDirecContainer">
        <Breadcrumbs links={pathnames} />
        <div className="titleSection">
          <p className="title">CONTACTO</p>
        </div>
        {campoObligatorio && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>Debe completar los campos obligatorios para avanzar</p>
          </div>
        )}
        {errorCodPostal && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>El c??digo postal no se pudo validar. Vuelva a intentarlo</p>
          </div>
        )}
        {errorDireccion && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>No se encontr?? la direccion establecida.</p>
          </div>
        )}

        {errorLocalidad && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>Localidad no encontrada. Vuelva a intentarlo</p>
          </div>
        )}

        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput" id="labelCalle">
              Calle *
            </p>
            <TextField
              color="primary"
              className="input"
              size="small"
              id="calle"
              placeholder="Avenida Anta"
              onChangeCapture={(e) => {
                handleInputChange(contactForm, setContactForm);
                setCampoObligatorio(false);
                setErrorDireccion(false);
              }}
              onFocus={(e) => onFocus(e, clase, clase2, "labelCalle")}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: campoObligatorio && "#FF3F20",
                  },
                },
              }}
            />
            <InputLabel className="subLabelForm" sx={{ whiteSpace: "initial" }}>
              Utilizaremos tu direcci??n para retirar y entregar tus productos,
              adem??s de calcular el costo de env??o.
            </InputLabel>
          </div>
          <div className="inputBoxLocation">
            <div>
              <p className="labelInput" id="labelAlturaKM">
                Altura/Km *
              </p>
              <TextField
                color="primary"
                className="locationInput"
                size="small"
                id="alturaKM"
                placeholder="5"
                value={contactForm.alturaKM}
                onChangeCapture={() => {
                  handleInputChange(contactForm, setContactForm);
                  setCampoObligatorio(false);
                  setErrorDireccion(false);
                }}
                onFocus={(e) => onFocus(e, clase, clase2, "labelAlturaKM")}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }}
              />
            </div>
            <div>
              <p className="labelInput">Piso</p>
              <TextField
                color="primary"
                className="locationInput"
                size="small"
                id="piso"
                placeholder="3"
                onChangeCapture={() => {
                  handleInputChange(contactForm, setContactForm);
                  setCampoObligatorio(false);
                }}
              />
            </div>
            <div>
              <p className="labelInput">Dpto.</p>
              <TextField
                color="primary"
                className="locationInput"
                size="small"
                id="depto"
                placeholder="D"
                onChangeCapture={(e) => {
                  handleInputChange(contactForm, setContactForm);
                  setCampoObligatorio(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput" id="labelProvincia">
              Provincia *
            </p>
            <Select
              displayEmpty
              className="selectInput"
              placeholder="Ciudad Aut??noma de Buenos Aires"
              size="small"
              id="provincia"
              value={provincia === "" ? "ejemplo" : provincia}
              onChange={(event) => {
                document.getElementById("barrioLocalidad").value=""
                setCambioProvincia(true);
                handleProvinciaInput(event);
                setErrorDireccion(false);
                setCampoObligatorio(false);
              }}
              onFocus={(e) => onFocus(e, clase, clase2, "labelProvincia")}
              sx={{
                "& div": {
                  fontSize: "14px",
                  color: provincia === "" ? "#BABCBE" : "#423B3C",
                  fontWeight: "400",
                },
                height: 42,
              }}
              MenuProps={{
                style: {
                  maxHeight: 200,
                },
              }}
            >
              <MenuItem
                disabled
                key={"ejemplo"}
                value={"ejemplo"}
                sx={{ fontSize: "14px", color: "#BABCBE", fontWeight: "400" }}
              >
                {"Seleccion?? una provincia"}
              </MenuItem>
              {provincias.length > 0 &&
                provincias.map((option) => (
                  <MenuItem
                    key={option.idprovincia}
                    value={option.idprovincia}
                    sx={{ fontSize: "14px", color: "#969696" }}
                  >
                    {option.nombre}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div className="inputBox">
            <p className="labelInput" id="labelBarrioLocalidad">
              Localidad / Barrio *
            </p>
            <TextField
              placeholder={
                /* provincia === '' && */ "Primero debes ingresar una provincia"
              }
              disabled={provincia === "" || provincia === 1 || provincia === "1" ? true : false}
              value={provincia === 1 || provincia === "1" ? "CAPITAL FEDERAL" : contactForm.localidad}
              className="input"
              size="small"
              id="barrioLocalidad"
              onChangeCapture={() => {
                
                handleInputChange(contactForm, setContactForm);
                setCampoObligatorio(false);
                setErrorDireccion(false);
                setChangeLoc(true);
                setErrorLocalidad(false);
              }}
              onFocus={(e) => onFocus(e, clase, clase2, "labelBarrioLocalidad")}
              onBlur={() => handleChangeLoc()}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor:
                      (campoObligatorio || errorDireccion || errorLocalidad) &&
                      "#FF3F20",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput">Entrecalle 1</p>
            <TextField
              color="primary"
              className="input"
              size="small"
              id="entrecalle1"
              placeholder="Avenida Callao"
              onChangeCapture={() => {
                handleInputChange(contactForm, setContactForm);
              }}
            />
          </div>
          <div className="inputBox">
            <p className="labelInput">Entrecalle 2</p>
            <TextField
              color="primary"
              className="input"
              size="small"
              id="entrecalle2"
              placeholder="Rodr??guez Pe??a"
              onChangeCapture={(e) => {
                handleInputChange(contactForm, setContactForm);
              }}
            />
          </div>
        </div>
        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput" id="labelCodigoPostal">
              C??digo postal *
            </p>
            <div className="postalCode">
              <TextField
                color="primary"
                className="input"
                size="small"
                id="codigoPostal"
                placeholder="C1428"
                onChangeCapture={(e) => {
                  handleInputChange(contactForm, setContactForm);
                  setErrorCodPostal(false);
                  setErrorDireccion(false);
                  setCampoObligatorio(false);
                }}
                onFocus={(e) => onFocus(e, clase, clase2, "labelCodigoPostal")}
              />
              <a
                href="https://www.correoargentino.com.ar/formularios/cpa"
                target={"_blank"}
                rel="noreferrer"
              >
                No s?? mi c??digo postal
              </a>
            </div>
          </div>
        </div>
        <div className="inputContainer">
          <div className="textAreaBox">
            <span className="label1">Informaci??n adicional</span>
            <span className="label2"> (m??ximo 100 caract??res)</span>
            <TextField
              multiline
              rows={4}
              id="infoAdicional"
              color="primary"
              className="textArea"
              size="small"
              placeholder="Ejemplo: Barrio Privado San Mart??n, Puerta roja, etc."
              onChangeCapture={() => {
                handleInputChange(contactForm, setContactForm);
              }}
              inputProps={{ maxLength: 100 }}
            />
            <InputLabel className="subLabelForm" sx={{ whiteSpace: "initial" }}>
              Agregar informaci??n ??til para encontrar la direcci??n.
            </InputLabel>
          </div>
        </div>
        {loader ? (
          <div
            style={{
              marginTop: "24px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              maxWidth: "768px",
            }}
          >
            <Loader spin={"spinnerG"} />
          </div>
        ) : (
          <div className="buttonContainer">
            <Button
              className="rightButton"
              onClick={() => checkNuevaDireccion()}
            >
              CONFIRMAR CONTACTO
            </Button>
          </div>
        )}

        <div
          className="returnLink"
          onClick={() => setDir(false)}
        >
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A DATOS</p>
        </div>
        {viewDireccion && (
          <PopUpFinalDir
            direccion={direccion}
            setDireccion={setDireccion}
            provincia={provincia}
            setViewDireccion={setViewDireccion}
            resDirecciones={resDirecciones}
            contactForm={contactForm}
            setGuardarDireccion={setGuardarDireccion}
            infoLocFinal={infoLocFinal}
            setLoader={setLoader}
          />
        )}
        {popLoc && (
          <PopUpLocalidad
            infoLoc={infoLoc}
            setPopLoc={setPopLoc}
            infoLocFinal={infoLocFinal}
            setInfoLocFinal={setInfoLocFinal}
          />
        )}
      </div>
    </Grid>
  );
};

export default EditarDir;
