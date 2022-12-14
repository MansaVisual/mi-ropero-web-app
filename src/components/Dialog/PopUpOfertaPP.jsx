import React, { Fragment, useState, useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import isologo from "../../assets/img/isologo.png";
import error from "../../assets/img/error.png";
import theme from "../../styles/theme";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import { UseLoginContext } from "../../context/LoginContext";
import { apiFetch } from "../../apiFetch/apiFetch";
import { NumericFormat } from "react-number-format";

const PopUpOfertaPP = ({ open, setOpen, prod }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { userLog } = useContext(UseLoginContext);

  const [aparece, setAparece] = useState(true);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    amount: 0,
    comment: "",
  });

  const [errorValor, setErrorValor] = useState(false);

  const handleSubmit = () => {
    setErrorValor(false);
    if (
      Number(data.amount) >
      (prod.precio_oferta !== "0.00" ? prod.precio_oferta : prod.precio)
    ) {
      setErrorValor(true);
      document.getElementById("oferta").focus();
      return;
    }
    setLoad(true);
    const oferta = new FormData();
    oferta.append("idcliente", userLog);
    oferta.append("idproducto", prod.idproducto);
    oferta.append("oferta", data.amount);
    oferta.append("mensaje", data.comment);

    apiFetch(oferta, "ofertas", "insert").then((res) => {
      if (res.status === "success") {
        setTimeout(() => {
          setLoad(false);
          setOpen(false);
          Swal.fire({
            title: "OFERTA ENVIADA",
            text: "",
            icon: "success",
            confirmButtonText: "ACEPTAR",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setLoad(false);
          setAparece(false);
          Swal.fire({
            title: "OFERTA NO ENVIADA",
            text: "Ocurri?? un error. Vuelva a intentarlo",
            icon: "error",
            confirmButtonText: "ACEPTAR",
          }).then(() => setAparece(true));
        }, 1000);
      }
    });
  };

  const handleOnChange = (e, type) => {
    if (type === "oferta") {
      document.getElementById("numericFormat").focus();
      setData({
        amount: e === "" ? 0 : e,
        comment: data.comment,
      });
    } else {
      setData({
        amount: data.amount,
        comment: e.target.value,
      });
    }
  };

  return (
    <>
      {open !== undefined && (
        <div
          className="setSucursales"
          style={{ display: aparece ? "flex" : "none" }}
        >
          <div
            className="fondoPopUp"
            onClick={() => {
              setOpen(false);
            }}
          ></div>
          <div className="popUp popUpOferta">
            <CancelIcon
              color="tertiary"
              className="cross"
              onClick={() => {
                setOpen(false);
              }}
            />
            <img
              src={errorValor ? error : isologo}
              alt="SHOP"
              color="primary"
              className="botonLogo"
            />
            <p className="titleOferta">{errorValor ? "??ERROR!" : "??OFERT??!"}</p>
            <p className="parrafo">
              {errorValor
                ? `El valor ingresado no es v??lido. No podemos aceptar que ofertes un monto mayor al precio publicado por el vendedor. `
                : `Ingres?? el monto que quer??s pagar por este producto. Record?? que debe ser mayor a $0 y menor a ${
                    prod.precio_oferta !== "0.00"
                      ? new Intl.NumberFormat("de-DE").format(
                          prod.precio_oferta
                        )
                      : new Intl.NumberFormat("de-DE").format(prod.precio)
                  }`}
            </p>
            <p className="parrafo">
              {" "}
              {errorValor &&
                `Record?? que debe ser mayor a $0 y menor a ${
                  prod.precio_oferta !== "0.00"
                    ? new Intl.NumberFormat("de-DE").format(prod.precio_oferta)
                    : new Intl.NumberFormat("de-DE").format(prod.precio)
                }`}{" "}
            </p>

            <p className="titleOfertaInput">Monto de la oferta*</p>
            <NumericFormat
              customInput={TextField}
              id="numericFormat"
              className={`ofertaInput popUpStyledInput ${
                errorValor && "ofertaInputError popUpStyledInputError"
              }`}
              placeholder="$ Ingresar valor"
              onValueChange={(values) => {
                handleOnChange(values.value, "oferta");
              }}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"$"}
            />

            <p className="titleCommentInput">Comentarios</p>
            <TextField
              className="commentInput"
              margin="dense"
              type="text"
              onChange={(e) => handleOnChange(e, "comentario")}
              value={data.comment === "" ? "" : data.comment}
              placeholder={"Ingresar mensaje"}
              multiline
              sx={{
                minWidth: isMobile || isMobileBigScreen ? "290px" : "430px",
                maxWidth: isMobile || isMobileBigScreen ? "290px" : "430px",
                "& textarea": {
                  padding: "4px 8px",
                  height:
                    isMobile || isMobileBigScreen
                      ? "60px !important"
                      : "75px !important",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  borderRadius: "8px",
                },
              }}
              inputProps={{ maxLength: 220 }}
            />

            <Box className="botones">
              {load ? (
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
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="cancelar"
                  >
                    CANCELAR
                  </Button>
                  <Button
                    onClick={() => handleSubmit()}
                    noHover={true}
                    className={data.amount === 0 ? "ofertaDisabled" : "oferta"}
                    disabled={data.amount === 0 ? true : false}
                  >
                    HACER OFERTA
                  </Button>
                </>
              )}
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpOfertaPP;
