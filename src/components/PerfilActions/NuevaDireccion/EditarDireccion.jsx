import React, { useState, useContext, useEffect } from "react";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../../assets/img/leftArrow.png";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { UseFormContext } from "../../../context/FormContext";
import { UsePerfilContext } from "../../../context/PerfilContext";
import { handleInputChange, onFocus } from "./direccFunciones";
import PopUpLocalidad from "../../FormCheckout/PopUpLocalidad";
import PopUpFinalDir from "./PopUpFinalDir";
import Loader from "../../Loader/Loader";

const EditarDireccion = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const { FormAPI } = useContext(UseFormContext);
  const { direccionSelecc } = useContext(UsePerfilContext);

  const [form, setForm] = useState({
    alias: "",
    telefono: "",
    calle: "",
    alturaKM: "",
    piso: "",
    depto: "",
    provincia: "",
    barrioLocalidad: "",
    codigo_postal: "",
    entrecalle1: "",
    entrecalle2: "",
    infoAdicional: "",
  });

  let clase = "formObligatorio";
  let clase2 = "formObligatorioTitle";

  useEffect(() => {
    FormAPI("", "direcciones", "provincias").then((res) => {
      if (res.status === "success") {
        setProvincias(res.result);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (direccionSelecc) {
      setForm({
        iddireccion: direccionSelecc.iddireccion,
        alias: direccionSelecc.nombre,
        calle: direccionSelecc.calle,
        alturaKM: direccionSelecc.numero,
        piso: direccionSelecc.piso,
        depto: direccionSelecc.departamento,
        provincia: direccionSelecc.provincia,
        barrioLocalidad: direccionSelecc.localidad,
        codigoPostal: direccionSelecc.codigo_postal,
        entrecalle1: direccionSelecc.entre_calle_1,
        entrecalle2: direccionSelecc.entre_calle_2,
        infoAdicional: direccionSelecc.informacion_adicional,
      });
    } else if (!direccionSelecc) {
      navigate("/perfil/MIS DIRECCIONES");
    }
  }, [direccionSelecc]); // eslint-disable-line react-hooks/exhaustive-deps

  const [provincias, setProvincias] = useState([]);
  const [loader, setLoader] = useState(false);

  const [campoObligatorio, setCampoObligatorio] = useState(false);
  const [errorCodPostal, setErrorCodPostal] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorLocalidad, setErrorLocalidad] = useState(false);

  const [viewDireccion, setViewDireccion] = useState(false);
  const [resDirecciones, setResDirecciones] = useState([]);
  const [guardarDireccion, setGuardarDireccion] = useState(false);
  const [provincia, setProvincia] = useState([]);

  const [cambioProvincia, setCambioProvincia] = useState(false);

  useEffect(() => {
    if (provincias.length !== 0 && direccionSelecc) {
      const provGuardada = provincias.find(
        (e) => e.nombre === direccionSelecc.provincia
      );
      setProvincia(provGuardada.idprovincia);
    }
  }, [provincias, direccionSelecc]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (provincia === "1") {
      document.getElementById("barrioLocalidad").value = "CAPITAL FEDERAL";
    }
  }, [provincia]); // eslint-disable-line react-hooks/exhaustive-deps

  const [infoLoc, setInfoLoc] = useState([]);
  const [infoLocFinal, setInfoLocFinal] = useState([]);
  const [popLoc, setPopLoc] = useState(false);
  const [changeLoc, setChangeLoc] = useState(false);

  useEffect(() => {
    if (!popLoc && infoLocFinal.length !== 0) {
      document.getElementById("codigoPostal").value =
        infoLocFinal.codigo_postal;
      setForm((prevState) => ({ codigoPostal: infoLocFinal.codigo_postal }));
      document.getElementById("barrioLocalidad").value = infoLocFinal.nombre;
    }
  }, [popLoc]); // eslint-disable-line react-hooks/exhaustive-deps

  const [direccion, setDireccion] = useState({});

  const handleProvinciaInput = (event) => {
    setProvincia(event.target.value);
    setForm({ ...form, provincia: event.target.value });
    if (event.target.value === 1) {
      /* document.getElementById("barrioLocalidad").value = "CAPITAL FEDERAL";  */
      setForm({ codigoPostal: "", barrioLocalidad: "CAPITAL FEDERAL" });
    } else {
      setForm({ ...form, barrioLocalidad: "", codigoPostal: "" });
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
          FormAPI(localidad, "direcciones", "localidades").then((res) => {
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
    if (document.getElementById("alias").value === "") {
      throwError("alias", "labelAlias");
      setLoader(false);
      scrollTop();
      setCampoObligatorio(true);
      return;
    }
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

    FormAPI(formDireccion, "direcciones", "normalize").then(async (res) => {
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
      const formDireccion = new FormData();
      formDireccion.append("iddireccion", direccionSelecc.iddireccion);
      formDireccion.append("nombre", document.getElementById("alias").value);
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
      formDireccion.append("idprovincia", Number(infoLocFinal.idprovincia));
      formDireccion.append("idlocalidad", Number(infoLocFinal.idlocalidad));
      formDireccion.append("piso", document.getElementById("piso").value);
      formDireccion.append(
        "departamento",
        document.getElementById("depto").value
      );
      formDireccion.append(
        "codigo_postal",
        document.getElementById("codigoPostal").value
      );
      formDireccion.append(
        "entre_calle_1",
        document.getElementById("entrecalle1").value
      );
      formDireccion.append(
        "entre_calle_2",
        document.getElementById("entrecalle2").value
      );
      formDireccion.append(
        "informacion_adicional",
        document.getElementById("infoAdicional").value
      );
      formDireccion.append("normalized", direccion.raw_data);
      FormAPI(formDireccion, "direcciones", "update").then(async (res) => {
        if (res.status === "success") {
          navigate(`/perfil/MIS DIRECCIONES`);
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
    <div className="nuevaDirecContainer">
      <Breadcrumbs links={pathnames} />
      <div className="titleSection">
        <p className="title">EDITAR DIRECCION</p>
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
          <p className="labelInput" id="labelAlias">
            Alias
          </p>
          <TextField
            color="primary"
            className="input"
            size="small"
            id="alias"
            placeholder="Casa, trabajo, etc."
            value={form.alias}
            onChangeCapture={() => {
              handleInputChange(form, setForm);
              setCampoObligatorio(false);
            }}
            onFocus={(e) => onFocus(e, clase, clase2, "labelAlias")}
            sx={{
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: campoObligatorio && "#FF3F20",
                },
              },
            }}
          />
        </div>
        <div className="inputBox"></div>
      </div>
      <div className="inputContainer">
        <div className="inputBox">
          <p className="labelInput" id="labelCalle">
            Calle
          </p>
          <TextField
            color="primary"
            className="input"
            size="small"
            id="calle"
            placeholder="Avenida Anta"
            value={form.calle}
            onChangeCapture={(e) => {
              handleInputChange(form, setForm);
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
          <p className="bottomText">Domicilio de entrega </p>
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
              value={form.alturaKM}
              onChangeCapture={() => {
                handleInputChange(form, setForm);
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
              value={form.piso}
              placeholder="3"
              onChangeCapture={() => {
                handleInputChange(form, setForm);
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
              value={form.depto}
              onChangeCapture={(e) => {
                handleInputChange(form, setForm);
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
            className="selectInput"
            placeholder="Ciudad Autónoma de Buenos Aires"
            size="small"
            id="provincia"
            value={provincia}
            onChange={(event) => {
              handleProvinciaInput(event);
              setCambioProvincia(true);
              setErrorDireccion(false);
              setCampoObligatorio(false);
              setErrorLocalidad(false);
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
            {provincias.map((option) => (
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
            placeholder={"Primero debes ingresar una provincia"}
            disabled={provincia === "" || provincia === "1" ? true : false}
            className="input"
            size="small"
            id="barrioLocalidad"
            value={provincia === "1" ? "CAPITAL FEDERAL" : form.barrioLocalidad}
            onChangeCapture={() => {
              handleInputChange(form, setForm);
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
            value={form.entrecalle1}
            onChangeCapture={() => {
              handleInputChange(form, setForm);
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
            value={form.entrecalle2}
            onChangeCapture={(e) => {
              handleInputChange(form, setForm);
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
              placeholder="1428"
              value={form.codigoPostal}
              onChangeCapture={(e) => {
                handleInputChange(form, setForm);
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
          <span className="label2"> (máximo 500 caractéres)</span>
          <TextField
            multiline
            rows={4}
            id="infoAdicional"
            color="primary"
            className="textArea"
            size="small"
            placeholder="Ejemplo: Barrio Privado San Martín, Puerta roja, etc."
            value={form.infoAdicional}
            onChangeCapture={() => {
              handleInputChange(form, setForm);
            }}
            inputProps={{ maxLength: 50 }}
          />
          <p className="bottomText">
            Agregar información útil para encontrar la dirección.
          </p>
        </div>
      </div>
      {loader ? (
        <div
          style={{
            marginTop: "24px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader spin={"spinnerG"} />
        </div>
      ) : (
        <div className="buttonContainer">
          <Button className="leftButton" onClick={() => navigate(`/perfil`)}>
            CANCELAR
          </Button>
          <Button className="rightButton" onClick={() => checkNuevaDireccion()}>
            GUARDAR DIRECCIÓN
          </Button>
        </div>
      )}

      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
      </div>
      {viewDireccion && (
        <PopUpFinalDir
          direccion={direccion}
          setDireccion={setDireccion}
          provincia={provincia}
          setViewDireccion={setViewDireccion}
          resDirecciones={resDirecciones}
          form={form}
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
  );
};

export default EditarDireccion;
