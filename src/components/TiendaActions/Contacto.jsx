import React, { useState, useContext, useEffect } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/img/leftArrow.png";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { UseLoginContext } from "../../context/LoginContext";
import { handleInputChange, onFocus } from "./direccFunciones";
import PopUpLocalidad from "../FormCheckout/PopUpLocalidad";
import PopUpFinalDir from "./PopUpFinal/PopUpFinalDir";
import Loader from "../Loader/Loader";
import { apiFetch } from "../../apiFetch/apiFetch";

const Contacto = ({ form, setForm }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);

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
  const [errorPhone, setErrorPhone] = useState(false);

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

  const checkNuevaDireccion = async () => {
    setLoader(true);
    if (document.getElementById("telefono").value === "") {
      throwError("telefono", "labelTelefono");
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
      return;
    }
    const formPhone = new FormData();
    formPhone.append("telefono", document.getElementById("telefono").value);
    await apiFetch(formPhone, "clientes", "validate_phone").then((res) => {
      if (res.status === "error") {
        setErrorPhone(true);
        throwError("telefono", "labelTelefono");
      }
    });
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
    const formCodPostal = new FormData();

    formCodPostal.append(
      "codigo_postal",
      document.getElementById("codigoPostal").value
    );
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
      console.table(Object.fromEntries(formDireccion));
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
      // const dir = new FormData();
      // dir.append("idcliente", userLog);
      // dir.append("nombre", direccion.alias);
      // dir.append("codigo_postal", direccion.codigo_postal);
      // dir.append("provincia", direccion.provincia);
      // dir.append("idprovincia", direccion.idprovincia);
      // dir.append("localidad", direccion.localidad);
      // dir.append("idlocalidad", direccion.idlocalidad);
      // dir.append("calle", direccion.calle);
      // dir.append("numero", direccion.numero);
      // dir.append("piso", direccion.piso);
      // dir.append("departamento", direccion.departamento);
      // dir.append("entre_calle_1", direccion.entre_calle_1);
      // dir.append("entre_calle_2", direccion.entre_calle_2);
      // dir.append("informacion_adicional", direccion.informacion_adicional);
      // dir.append("normalized", direccion.raw_data);
      // apiFetch(dir, "direcciones", "insert").then(async (res) => {
      //   console.table("direcciones insert dir", Object.fromEntries(dir));
      //   if (res.status === "success") {
      //     navigate(`/perfil/MIS DIRECCIONES`);
      //   } else {
      //     setLoader(false);
      //     setErrorDireccion(true);
      //     throwError("calle", "labelCalle");
      //     throwError("alturaKM", "labelAlturaKM");
      //     throwError("provincia", "labelProvincia");
      //     throwError("barrioLocalidad", "labelBarrioLocalidad");
      //     throwError("codigoPostal", "labelCodigoPostal");
      //     scrollTop();
      //   }
      // });
      console.log(contactForm)
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
        {errorPhone && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>El número de telefono no es válido.</p>
          </div>
        )}
        {errorCodPostal && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>El código postal no se pudo validar. Vuelva a intentarlo</p>
          </div>
        )}
        {errorDireccion && (
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>No se encontró la direccion establecida.</p>
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
            <p className="labelInput" id="labelTelefono">
              Teléfono *
            </p>
            <TextField
              color="primary"
              className="input"
              size="small"
              id="telefono"
              placeholder="5411291029"
              onChangeCapture={(e) => {
                handleInputChange(contactForm, setContactForm);
                setCampoObligatorio(false);
                setErrorPhone(false);
              }}
              onFocus={(e) => onFocus(e, clase, clase2, "labelTelefono")}
              sx={{
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: campoObligatorio && "#FF3F20",
                  },
                },
              }}
            />
            <InputLabel className="subLabelForm" sx={{ whiteSpace: "initial" }}>
              Llamarán a este número sólo si hay algún problema.
            </InputLabel>
          </div>
          <div className="inputBox"></div>
        </div>
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
              Utilizaremos tu dirección para retirar y entregar tus productos,
              además de calcular el costo de envío.
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
                placeholder="2"
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
              placeholder="Ciudad Autónoma de Buenos Aires"
              size="small"
              id="provincia"
              value={provincia === "" ? "ejemplo" : provincia}
              onChange={(event) => {
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
                  maxHeight: 150,
                },
              }}
            >
              <MenuItem
                disabled
                key={"ejemplo"}
                value={"ejemplo"}
                sx={{ fontSize: "14px", color: "#BABCBE", fontWeight: "400" }}
              >
                {"Seleccioná una provincia"}
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
              disabled={provincia === "" || provincia === "1" ? true : false}
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
              placeholder="Rodríguez Peña"
              onChangeCapture={(e) => {
                handleInputChange(contactForm, setContactForm);
              }}
            />
          </div>
        </div>
        <div className="inputContainer">
          <div className="inputBox">
            <p className="labelInput" id="labelCodigoPostal">
              Código postal *
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
                No sé mi código postal
              </a>
            </div>
          </div>
        </div>
        <div className="inputContainer">
          <div className="textAreaBox">
            <span className="label1">Información adicional</span>
            <span className="label2"> (máximo 100 caractéres)</span>
            <TextField
              multiline
              rows={4}
              id="infoAdicional"
              color="primary"
              className="textArea"
              size="small"
              placeholder="Ejemplo: Barrio Privado San Martín, Puerta roja, etc."
              onChangeCapture={() => {
                handleInputChange(contactForm, setContactForm);
              }}
              inputProps={{ maxLength: 100 }}
            />
            <InputLabel className="subLabelForm" sx={{ whiteSpace: "initial" }}>
              Agregar información útil para encontrar la dirección.
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
          onClick={() => navigate(`/MiTienda/DETALLES`)}
        >
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A DETALLES DE PUBLICACIÓN</p>
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

export default Contacto;
