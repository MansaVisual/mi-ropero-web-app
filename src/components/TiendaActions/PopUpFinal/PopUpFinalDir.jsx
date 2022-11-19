import React, { Fragment } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import home from "../../../assets/img/home.png";
import { Button, Radio } from "@mui/material";

const PopUpFinalDir = ({
  direccion,
  setDireccion,
  setViewDireccion,
  resDirecciones,
  contactForm,
  setBuscandoDir,
  provincia,
  infoLocFinal,
  setGuardarDireccion,
  setLoader
}) => {
  const handleAccept = async (dir) => {
    setDireccion({
      ...dir,
      informacion_adicional: contactForm.infoAdicional,
      entre_calle_1: contactForm.entrecalle1,
      entre_calle_2: contactForm.entrecalle2,
      piso: contactForm.piso,
      departamento: contactForm.depto,
      idprovincia: provincia,
      idlocalidad: infoLocFinal.idlocalidad,
    });
  };
  return (
    <>
      {resDirecciones && (
        <div className="setSucursales">
          <div
            className="fondoPopUp"
            onClick={() => {
              setViewDireccion(false);
              setDireccion({});
              if (setBuscandoDir !== undefined) {
                setBuscandoDir(false);
              }
              setLoader(false)
            }}
          ></div>
          <div className="popUp">
            <CancelIcon
              color="tertiary"
              className="cross"
              onClick={() => {
                setViewDireccion(false);
                setDireccion({});
                if (setBuscandoDir !== undefined) {
                  setBuscandoDir(false);
                }
                setLoader(false)
              }}
            />
            <img src={home} alt="SHOP" color="primary" className="botonLogo" />
            <p>Confirme su domicilio.</p>
            <div className="cardContainer">
              {resDirecciones.map((dir) => {
                return (
                  <Fragment key={dir.raw_data}>
                    {dir.numero !== "" && dir.calle !== "" && (
                      <div
                        className={`cardSucursal ${
                          direccion.raw_data !== undefined &&
                          direccion.raw_data === dir.raw_data &&
                          "selected"
                        }`}
                        onClick={() => handleAccept(dir)}
                      >
                        <Radio
                          name="sucursal"
                          id={dir.raw_data}
                          checked={
                            direccion.raw_data !== undefined &&
                            direccion.raw_data === dir.raw_data
                              ? true
                              : false
                          }
                        />
                        <label>
                          {dir.calle} {dir.numero}, {dir.provincia},{" "}
                          {dir.localidad} {dir.codigo_postal}
                        </label>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
            <Button
              className={
                Object.keys(direccion).length === 0
                  ? "botonContinuarDisabled"
                  : "botonContinuar"
              }
              disabled={Object.keys(direccion).length === 0 ? true : false}
              onClick={() => {
                setGuardarDireccion(true);
                setViewDireccion(false);
                setLoader(false)
              }}
            >
              CONTINUAR
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpFinalDir;
