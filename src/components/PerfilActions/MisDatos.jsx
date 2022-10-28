import React, { useState, useContext, useEffect, Fragment } from "react";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Select from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { UseLoginContext } from "../../context/LoginContext";
import { UsePerfilContext } from "../../context/PerfilContext";
import Loader from "../Loader/Loader";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const MisDatos = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  let clase = "formObligatorio";
  let clase2 = "formObligatorioTitle";

  const { infoUser, userLog } = useContext(UseLoginContext);
  const { PerfilAPI } = useContext(UsePerfilContext);
  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const [caracteristicasFavs, setCaracteristicasFavs] = useState([]);

  const [contraseña1, setContraseña1] = useState("");
  const [contraseña2, setContraseña2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [contraseñaValidada, setContraseñaValidada] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorNewMail, setErrorNewMail] = useState(false);
  const [errorPassLength, setErrorPassLength] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const [arrayGeneros, setArrayGeneros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [genero, setGenero] = useState("");
  const [talleRopa, setTalleRopa] = useState("");
  const [marcasPreferidas, setMarcasPreferidas] = useState([]);
  const [estiloRopa, setEstiloRopa] = useState([]);
  const [tipoRopa, setTipoRopa] = useState([]);

  const [idTalleRopa, setIdTalleRopa] = useState("");
  const [idMarcasPreferidas, setIdMarcasPreferidas] = useState([]);
  const [idEstiloRopa, setIdEstiloRopa] = useState([]);
  const [idTipoRopa, setIdTipoRopa] = useState([]);

  const [caracteristicasFin, setCaracteristicasFin] = useState([]);

  const [campoObligatorio, setCampoObligatorio] = useState(false);
  const [generoObligatorio, setGeneroObligatorio] = useState(false);

  const handleMultipleSelect = (
    value,
    setValue,
    prevArray,
    value2,
    setValue2,
    prevArray2
  ) => {
    if (prevArray.length === 0) {
      setValue([...prevArray, value]);
      setValue2([...prevArray2, value2]);
    }
    if (prevArray.length > 0) {
      for (let i = 0; i < prevArray.length; i++) {
        if (value === prevArray[i]) {
          setValue(prevArray.filter((item) => item !== prevArray[i]));
          setValue2(prevArray2.filter((item) => item !== prevArray2[i]));
          return;
        } else {
          if (prevArray.length < 3) {
            setValue([...prevArray, value]);
            setValue2([...prevArray2, value2]);
          }
        }
      }
    }
  };

  useEffect(() => {
    PerfilAPI("", "clientes", "get_sexos").then((res) => {
      if (res.status === "success") {
        let array = [""];
        for (const gen in res.result) {
          array.push(res.result[gen]);
        }
        setArrayGeneros(array);
      }
    });
    PerfilAPI("", "clientes", "get_caracteristicas_favoritas").then((res) => {
      if (res.status === "success") {
        setCaracteristicasFavs(res.result);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (infoUser.length !== 0 && caracteristicasFavs.length !== 0) {
      for (const i in infoUser.caracteristicas_favoritas) {
        for (const ii in caracteristicasFavs[0].valores) {
          if (
            caracteristicasFavs[0].valores[ii].idcaracteristicavalor ===
            infoUser.caracteristicas_favoritas[i]
          ) {
            setTalleRopa(caracteristicasFavs[0].valores[ii].valor);
            setIdTalleRopa(
              caracteristicasFavs[0].valores[ii].idcaracteristicavalor
            );
          }
        }
      }
      let array1 = [];
      let arrayId1 = [];
      for (const i in infoUser.caracteristicas_favoritas) {
        for (const ii in caracteristicasFavs[1].valores) {
          if (
            caracteristicasFavs[1].valores[ii].idcaracteristicavalor ===
            infoUser.caracteristicas_favoritas[i]
          ) {
            array1.push(caracteristicasFavs[1].valores[ii].valor);
            arrayId1.push(
              caracteristicasFavs[1].valores[ii].idcaracteristicavalor
            );
          }
        }
      }
      setMarcasPreferidas(array1);
      setIdMarcasPreferidas(arrayId1);

      let array2 = [];
      let arrayId2 = [];
      for (const i in infoUser.caracteristicas_favoritas) {
        for (const ii in caracteristicasFavs[2].valores) {
          if (
            caracteristicasFavs[2].valores[ii].idcaracteristicavalor ===
            infoUser.caracteristicas_favoritas[i]
          ) {
            array2.push(caracteristicasFavs[2].valores[ii].valor);
            arrayId2.push(
              caracteristicasFavs[2].valores[ii].idcaracteristicavalor
            );
          }
        }
      }
      setEstiloRopa(array2);
      setIdEstiloRopa(arrayId2);

      let array3 = [];
      let arrayId3 = [];
      for (const i in infoUser.caracteristicas_favoritas) {
        for (const ii in caracteristicasFavs[3].valores) {
          if (
            caracteristicasFavs[3].valores[ii].idcaracteristicavalor ===
            infoUser.caracteristicas_favoritas[i]
          ) {
            array3.push(caracteristicasFavs[3].valores[ii].valor);
            arrayId3.push(
              caracteristicasFavs[3].valores[ii].idcaracteristicavalor
            );
          }
        }
      }
      setTipoRopa(array3);
      setIdTipoRopa(arrayId3);

      setLoading2(true);
    }
  }, [caracteristicasFavs, infoUser]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (infoUser.length !== 0) {
      setGenero(infoUser.sexo);
    }
  }, [infoUser]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const coma1 = idMarcasPreferidas.length !== 0 ? "," : "";
    const coma2 = idTipoRopa.length !== 0 ? "," : "";
    const coma3 = idEstiloRopa.length !== 0 ? "," : "";

    setCaracteristicasFin(
      idTalleRopa +
        coma1 +
        idMarcasPreferidas +
        coma2 +
        idTipoRopa +
        coma3 +
        idEstiloRopa
    );
  }, [talleRopa, marcasPreferidas, tipoRopa, estiloRopa]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGrabarCambios = () => {
    setLoading(true);
    if (document.getElementById("nombre").value === "") {
      throwError("nombre", "labelNombre");
      ScrollTop();
      setLoading(false);
      setCampoObligatorio(true);
      return;
    }
    if (document.getElementById("apellido").value === "") {
      throwError("apellido", "labelApellido");
      ScrollTop();
      setLoading(false);
      setCampoObligatorio(true);
      return;
    }
    if (document.getElementById("email").value === "") {
      throwError("email", "labelEmail");
      ScrollTop();
      setLoading(false);
      setCampoObligatorio(true);
      return;
    }
    if (document.getElementById("telefono").value === "") {
      throwError("telefono", "labelTelefono");
      ScrollTop();
      setLoading(false);
      setCampoObligatorio(true);
      return;
    }

    if (emailRegex.test(document.getElementById("email").value)) {
    } else {
      setErrorMail(true);
      throwError("email", "labelEmail");
      ScrollTop();
      setLoading(false);
      return;
    }

    if (document.getElementById("telefono").value !== "") {
      const formPhone = new FormData();
      formPhone.append("telefono", document.getElementById("telefono").value);
      PerfilAPI(formPhone, "clientes", "validate_phone").then((res) => {
        if (res.status === "error") {
          setLoading(false);
          throwError("telefono", "labelTelefono");
          setErrorPhone(true);
          ScrollTop();
          return;
        }
      });
    }

    if (contraseña1 || contraseña2) {
      if (contraseña1 !== contraseña2) {
        ScrollTop();
        setLoading(false);
        setErrorPass(true);
        throwError("contraseña2", "labelContraseña2");
        throwError("contraseña1", "labelContraseña1");
        return;
      } else {
        if (contraseña1.length < 7) {
          setLoading(false);
          ScrollTop();
          throwError("contraseña1", "labelContraseña1");
          setErrorPassLength(true);
          return;
        } else {
          setContraseñaValidada(true);
        }
      }
    }

    const mail = new FormData();
    mail.append("idcliente", userLog);
    mail.append("nombre", document.getElementById("nombre").value);
    mail.append("apellido", document.getElementById("apellido").value);
    mail.append("email", document.getElementById("email").value);
    mail.append("email_old", infoUser.email);
    mail.append("telefono", document.getElementById("telefono").value);
    mail.append("sexo", genero.toString());
    if (contraseñaValidada) {
      console.log("cambio password");
      mail.append("clave", "prueba");
    }
    mail.append("caracteristicas_favoritas", caracteristicasFin);

    PerfilAPI(mail, "clientes", "update").then((res) => {
      if (res.status === "success") {
        setLoading(false);
        window.location.reload();
      } else {
        if (res.result === "El campo sexo es necesario") {
          setLoading(false);
          setGeneroObligatorio("Seleccioná tu género");
        } /* else if (res.result === "El campo telefono es necesario") {
          setLoading(false);
          setCampoObligatorio(true);
          throwError("telefono", "labelTelefono");
          ScrollTop();
        } */
        if (res.result === "El email ya se encuentra registrado") {
          setErrorNewMail(true);
          setLoading(false);
          ScrollTop();
        }
      }
    });
  };

  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onFocus = (event, clase, clase2, id) => {
    if (event.target.id === "barrioLocalidad") {
      if (document.getElementById(id).classList.contains(clase2)) {
        document.getElementById(id).classList.remove(clase2);
      }
    }
    if (id === "labelProvincia") {
      document.getElementById(id).classList.remove(clase2);
    }
    if (event.target.classList.contains(clase)) {
      event.target.classList.remove(clase);
      document.getElementById(id).classList.remove(clase2);
    }
  };

  const throwError = (id1, id2) => {
    console.log(id1, id2);
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
    <div className="misDatosContainer">
      <Breadcrumbs links={pathnames} />
      <p className="title">MIS DATOS</p>
      {campoObligatorio && (
        <div className="errorBox">
          <CancelOutlinedIcon color="secondary" className="cruz" />
          <p>Debe completar los campos obligatorios para avanzar</p>
        </div>
      )}
      {generoObligatorio && (
        <div className="errorBox">
          <CancelOutlinedIcon color="secondary" className="cruz" />
          <p>{generoObligatorio}</p>
        </div>
      )}
      {errorPassLength && (
        <div className="errorBox">
          <CancelOutlinedIcon color="secondary" className="cruz" />
          <p>La contraseña debe tener al menos 7 caracteres.</p>
        </div>
      )}
      {errorPass && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>Las contraseñas no coinciden.</p>
          </div>
        </div>
      )}
      {errorNewMail && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>El mail ya se encuentra en uso.</p>
          </div>
        </div>
      )}
      {errorMail && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>El mail no es correcto.</p>
          </div>
        </div>
      )}
      {errorPhone && (
        <div className="errorBoxContainer">
          <div className="errorBox">
            <CancelOutlinedIcon color="secondary" className="cruz" />
            <p>El número no es válido.</p>
          </div>
        </div>
      )}

      {infoUser.length === 0 ? (
        <div
          style={{
            marginTop: "40px",
            width: "100%",
            maxWidth: "758px",
            display: "flex",
            justifyContent: "center",
            minHeight: "45vh",
          }}
        >
          <Loader spin={"spinnerG"} />
        </div>
      ) : !loading2 ? (
        <div
          style={{
            marginTop: "40px",
            width: "100%",
            maxWidth: "758px",
            display: "flex",
            justifyContent: "center",
            minHeight: "45vh",
          }}
        >
          <Loader spin={"spinnerG"} />
        </div>
      ) : (
        <>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelNombre">
                Nombre *
              </p>
              <TextField
                color="primary"
                className="input"
                size="small"
                placeholder="Sabrina"
                id="nombre"
                defaultValue={infoUser.nombre}
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
                }}
              />
            </div>
            <div className="inputBox">
              <p className="labelInput" id="labelApellido">
                Apellido *
              </p>
              <TextField
                color="primary"
                className="input"
                size="small"
                placeholder="Godoy"
                id="apellido"
                defaultValue={infoUser.apellido}
                onFocus={(e) => onFocus(e, clase, clase2, "labelApellido")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelEmail">
                Email *
              </p>
              <TextField
                disabled={infoUser.social_login === "1" ? true : false}
                color="primary"
                className="input"
                size="small"
                placeholder="sabrinagodoy@gmail.com"
                type="email"
                id="email"
                defaultValue={infoUser.email}
                onFocus={(e) => onFocus(e, clase, clase2, "labelEmail")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                  setErrorMail(false);
                  setErrorNewMail(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: campoObligatorio && "#FF3F20",
                    },
                  },
                }}
              />
              {infoUser.social_login === "1" ? (
                <p className="bottomText">
                  Te registraste en el sitio utilizando redes sociales, y es por
                  eso que la dirección de email no puede modificarse.
                </p>
              ) : null}
            </div>
            <div className="inputBox">
              <p className="labelInput" id="labelTelefono">
                Teléfono *
              </p>
              <TextField
                color="primary"
                className="input"
                size="small"
                placeholder="+54  011 - 4417 - 8005"
                type="number"
                id="telefono"
                defaultValue={infoUser.telefono}
                onFocus={(e) => onFocus(e, clase, clase2, "labelTelefono")}
                onChangeCapture={() => {
                  setCampoObligatorio(false);
                  setErrorPhone(false);
                }}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor:
                        (campoObligatorio || setErrorPhone) && "#FF3F20",
                    },
                  },
                }}
              />
              <p className="bottomText">
                Llamarán a este número si hay algún problema con el envío.
              </p>
            </div>
          </div>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput" id="labelContraseña1">
                Nueva contraseña
              </p>
              <TextField
                disabled={infoUser.social_login === "1" ? true : false}
                color="primary"
                className="input"
                size="small"
                placeholder={
                  showPassword1 ? "contraseña" : "● ● ● ● ● ● ● ● ● ● ●"
                }
                type={showPassword1 ? "text" : "password"}
                id="contraseña1"
                value={contraseña1}
                onChangeCapture={(e) => {
                  setContraseña1(e.target.value);
                  setErrorPass(false);
                  setErrorPassLength(false);
                }}
                onFocus={(e) => onFocus(e, clase, clase2, "labelContraseña1")}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: (errorPass || errorPassLength) && "#FF3F20",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword1 ? (
                        <Visibility
                          sx={{ fontSize: "20px", cursor: "pointer" }}
                          onClick={() => setShowPassword1(!showPassword1)}
                        />
                      ) : (
                        <VisibilityOff
                          sx={{ fontSize: "20px", cursor: "pointer" }}
                          onClick={() => setShowPassword1(!showPassword1)}
                        />
                      )}
                    </InputAdornment>
                  ),
                  /* style: {
                    fontSize: 15,
                    border: (error || campoObligatorio) && "1px solid #FF3F20",
                  }, */
                }}
              />
              {/* {infoUser.social_login === "1" ? (
                <p className="bottomText">
                  Te registraste en el sitio utilizando redes sociales, y es por
                  eso que la contraseña no puede modificarse.
                </p>
              ) : null} */}
            </div>
            <div className="inputBox">
              <p className="labelInput" id="labelContraseña2">
                Confirmar contraseña{" "}
              </p>
              <TextField
                disabled={infoUser.social_login === "1" ? true : false}
                color="primary"
                className="input"
                size="small"
                placeholder={
                  showPassword2 ? "contraseña" : "● ● ● ● ● ● ● ● ● ● ●"
                }
                type={showPassword2 ? "text" : "password"}
                id="contraseña2"
                value={contraseña2}
                onChangeCapture={(e) => {
                  setContraseña2(e.target.value);
                  setErrorPass(false);
                  setErrorPassLength(false);
                }}
                onFocus={(e) => onFocus(e, clase, clase2, "labelContraseña2")}
                sx={{
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: (errorPass || errorPassLength) && "#FF3F20",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword2 ? (
                        <Visibility
                          sx={{ fontSize: "20px", cursor: "pointer" }}
                          onClick={() => setShowPassword2(!showPassword2)}
                        />
                      ) : (
                        <VisibilityOff
                          sx={{ fontSize: "20px", cursor: "pointer" }}
                          onClick={() => setShowPassword2(!showPassword2)}
                        />
                      )}
                    </InputAdornment>
                  ),
                  /* style: {
                    fontSize: 15,
                    border: (error || campoObligatorio) && "1px solid #FF3F20",
                  }, */
                }}
              />
            </div>
          </div>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput">Género *</p>
              <Select
                color="primary"
                className="selectInput"
                size="small"
                onChange={(e) =>
                  setGenero(arrayGeneros.indexOf(e.target.value))
                }
                value={
                  genero === "0"
                    ? "ejemplo"
                    : genero !== ""
                    ? arrayGeneros[Number(genero)]
                    : null
                }
                sx={{
                  "& div": {
                    fontSize: "14px",
                    color: infoUser.genero === "" ? "#BABCBE" : "#423B3C",
                    fontWeight: "400",
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
              >
                <MenuItem
                  disabled
                  key="ejemplo"
                  value="ejemplo"
                  sx={{ fontSize: "14px", color: "#BABCBE", fontWeight: "400" }}
                >
                  {"Seleccione una opción"}
                </MenuItem>
                {arrayGeneros.length !== 0 &&
                  arrayGeneros.map((res, i) => {
                    if (res !== "") {
                      return (
                        <MenuItem value={res} key={i}>
                          {res}
                        </MenuItem>
                      );
                    } else {
                      return null;
                    }
                  })}
              </Select>
            </div>
            <div className="inputBox" />
          </div>
          <div className="textContainer">
            <p className="title">Queremos saber más de vos</p>
            <p className="subTitle">
              Esta información la utilizamos para enviarte los nuevos ingresos
              de tus productos favoritos.
            </p>
          </div>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput">¿Qué talle de ropa usas?</p>
              <Select
                displayEmpty
                color="primary"
                className="selectInput"
                size="small"
                value={talleRopa}
                renderValue={(selected) => {
                  if (selected === "") {
                    return <em>Seleccioná una opción</em>;
                  }
                  return selected;
                }}
                sx={{
                  "& div": {
                    fontSize: "14px",
                    color: talleRopa.length === 0 ? "#BABCBE" : "#423B3C",
                    fontWeight: "400",
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
              >
                <MenuItem
                  disabled
                  value=""
                  sx={{ fontSize: "14px", color: "#BABCBE", fontWeight: "400" }}
                >
                  <em>Seleccioná una opción</em>
                </MenuItem>
                {caracteristicasFavs.length !== 0 &&
                  caracteristicasFavs[0].valores.map((option, i) => {
                    return (
                      <MenuItem
                        key={i}
                        value={option.valor}
                        sx={{ fontSize: "14px", color: "#969696" }}
                        onClick={() => {
                          setTalleRopa(option.valor);
                          setIdTalleRopa(option.idcaracteristicavalor);
                        }}
                      >
                        {option.valor}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>

            <div className="inputBox">
              <p className="labelInput">
                ¿Cuáles son tus marcas de ropa preferidas?
              </p>
              <Select
                multiple
                displayEmpty
                color="primary"
                className="selectInput"
                size="small"
                value={marcasPreferidas}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Seleccioná de 1 a 3 opciones</em>;
                  }
                  return selected.join(", ");
                }}
                sx={{
                  "& div": {
                    fontSize: "14px",
                    color:
                      marcasPreferidas.length === 0 ? "#BABCBE" : "#423B3C",
                    fontWeight: "400",
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
              >
                <MenuItem
                  disabled
                  value=""
                  sx={{ fontSize: "14px", color: "#BABCBE", fontWeight: "400" }}
                >
                  <em>Seleccioná una opción</em>
                </MenuItem>
                {caracteristicasFavs.length !== 0 &&
                  caracteristicasFavs[1].valores.map((option, i) => (
                    <MenuItem
                      key={i}
                      value={option.valor}
                      sx={{ fontSize: "14px", color: "#969696" }}
                      onClick={() => {
                        handleMultipleSelect(
                          option.valor,
                          setMarcasPreferidas,
                          marcasPreferidas,
                          option.idcaracteristicavalor,
                          setIdMarcasPreferidas,
                          idMarcasPreferidas
                        );
                      }}
                    >
                      {option.valor}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </div>
          <div className="inputContainer">
            <div className="inputBox">
              <p className="labelInput">¿Cuáles son tus estilos preferidos?</p>
              <Select
                multiple
                displayEmpty
                color="primary"
                className="selectInput"
                size="small"
                value={estiloRopa}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Seleccioná de 1 a 3 opciones</em>;
                  }
                  return selected.join(", ");
                }}
                sx={{
                  "& div": {
                    fontSize: "14px",
                    color: estiloRopa.length === 0 ? "#BABCBE" : "#423B3C",
                    fontWeight: "400",
                  },
                  height: 42,
                }}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                  },
                }}
              >
                <MenuItem
                  disabled
                  key={"ejemplo"}
                  value={"ejemplo"}
                  sx={{ fontSize: "14px", color: "#BABCBE", fontWeight: "400" }}
                >
                  {"Seleccioná de 1 a 3 opciones"}
                </MenuItem>
                {caracteristicasFavs.length !== 0 &&
                  caracteristicasFavs[2].valores.map((option, i) => (
                    <MenuItem
                      key={i}
                      value={option.valor}
                      sx={{ fontSize: "14px", color: "#969696" }}
                      onClick={() => {
                        handleMultipleSelect(
                          option.valor,
                          setEstiloRopa,
                          estiloRopa,
                          option.idcaracteristicavalor,
                          setIdEstiloRopa,
                          idEstiloRopa
                        );
                      }}
                    >
                      {option.valor}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div className="inputBox">
              <p className="labelInput">¿Qué tipo de ropa preferís?</p>
              <Select
                multiple
                displayEmpty
                color="primary"
                className="selectInput"
                size="small"
                value={tipoRopa}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Seleccioná de 1 a 2 opciones</em>;
                  }
                  return selected.join(", ");
                }}
                sx={{
                  "& div": {
                    fontSize: "14px",
                    color: tipoRopa.length === 0 ? "#BABCBE" : "#423B3C",
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
                  {"Seleccioná de 1 a 3 opciones"}
                </MenuItem>
                {caracteristicasFavs.length !== 0 &&
                  caracteristicasFavs[3].valores.map((option, i) => (
                    <MenuItem
                      key={i}
                      value={option.valor}
                      sx={{ fontSize: "14px", color: "#969696" }}
                      onClick={() => {
                        handleMultipleSelect(
                          option.valor,
                          setTipoRopa,
                          tipoRopa,
                          option.idcaracteristicavalor,
                          setIdTipoRopa,
                          idTipoRopa
                        );
                      }}
                    >
                      {option.valor}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </div>
          {loading ? (
            <div
              style={{
                marginTop: "16px",
                width: "100%",
                maxWidth: "758px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Loader spin={"spinnerG"} />
            </div>
          ) : (
            <div className="buttonContainer">
              <Button
                className="leftButton"
                onClick={() => navigate(`/perfil`)}
              >
                VOLVER
              </Button>
              <Button
                className="rightButton"
                onClick={() => handleGrabarCambios()}
              >
                GRABAR CAMBIOS
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MisDatos;
