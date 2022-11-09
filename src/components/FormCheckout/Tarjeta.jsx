import React, { useContext, useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Button, useMediaQuery } from "@mui/material";
import oca from "../../assets/img/OCA.png";
import moto from "../../assets/img/moto.png";
import theme from "../../styles/theme";
import { UseCartContext } from "../../context/CartContext";
import { UseFormContext } from "../../context/FormContext";
import Loader from "../Loader/Loader";
import { UseLoginContext } from "../../context/LoginContext";
import Swal from "sweetalert2";

const Tarjeta = ({
  sucursales,
  sucursalEntrega,
  setTypeNav,
  setMetodoEnvio,
  direccion,
  metodoEnvio,
  codDesc,
  form,
  saveDirecc,
}) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const { carrito, CartAPI } = useContext(UseCartContext);
  const { setCostoSucDom, setCostoSucSuc } = useContext(UseFormContext);
  const [load, setLoad] = useState(false);
  const { userLog } = useContext(UseLoginContext);

  console.log(direccion.entre_calle_1, direccion.entre_calle_2);

  const handlePagar = () => {
    setLoad(true);

    let productos = [];
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].producto.estado === "3") {
        productos.push(carrito[i].producto_id);
      }
    }

    if (metodoEnvio === "345838") {
      direccion.sucursal_retiro = sucursalEntrega;
    }

    const finalizarCompra = new FormData();
    finalizarCompra.append("comprador_id", userLog);
    finalizarCompra.append("telefono", form.telefono);
    finalizarCompra.append("direccion_entrega", JSON.stringify(direccion));
    finalizarCompra.append("productos", productos.join(","));
    finalizarCompra.append("promocion_codigo", codDesc);
    finalizarCompra.append("medio_envio", metodoEnvio);

    CartAPI(finalizarCompra, "operaciones", "insert").then((res) => {
      if (res.status === "success") {
        setLoad(false);
        if (res.result.init_point !== undefined) {
          localStorage.setItem(
            "saveDireccionMiRopero",
            JSON.stringify(saveDirecc)
          );
          localStorage.setItem(
            "newDireccionMiRopero",
            JSON.stringify(direccion)
          );
          localStorage.setItem(
            "metodoEnvioMiRopero",
            JSON.stringify(metodoEnvio)
          );
          window.top.location.href = res.result.init_point;
        } else {
          setTypeNav("check");
        }
      } else if (res.result === false) {
        setLoad(false);
        Swal.fire({
          title: "OCURRIÓ UN ERROR",
          text: "No se pudo procesar el pago. Volvé a intentarlo",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        });
      }
    });
  };
  return (
    <div className="tarjetaContenedor">
      <h2 className="TituloCartCheck" style={{ width: "100%" }} id="datos">
        Resumen
      </h2>

      <div className="productos">
        <p>Productos</p>
        <div className="prodsContainer">
          {carrito.map((prod, i) => {
            console.log(prod);
            return (
              <div className="prodCard" key={i}>
                <div
                  className="fotoProd"
                  style={{ backgroundImage: `url(${prod.producto_imagen})` }}
                />
                <div>
                  <p>{prod.producto_nombre}</p>
                  <p className="roperoDe">{prod.producto.tienda.nombre}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="domicilioMetodo">
        <p className="title">Domicilio de entrega</p>
        <div className="card">
          <div>
            <h3>
              {direccion.calle} {direccion.numero}.{" "}
              {direccion.provincia === "Capital Federal"
                ? "CABA"
                : direccion.provincia}{" "}
              {direccion.localidad} ({direccion.codigo_postal}).
            </h3>
            <h3>
              {direccion.entre_calle_1 && "Entre"}{" "}
              {direccion.entre_calle_1 && direccion.entre_calle_1}{" "}
              {direccion.entre_calle_1 && "y"}{" "}
              {direccion.entre_calle_2 && direccion.entre_calle_2}
            </h3>
            <h3>{direccion.informacion_adicional}</h3>
          </div>
          <BorderColorOutlinedIcon className="botonMobile" />
          <Button
            className="boton"
            onClick={() => {
              setTypeNav("info");
              setMetodoEnvio("");
              setCostoSucDom(false);
              setCostoSucSuc(false);
            }}
          >
            MODIFICAR
          </Button>
        </div>
      </div>

      <div className="domicilioMetodo">
        <p className="title">Método de envío</p>
        <div className="card">
          <div>
            <p>
              <img src={metodoEnvio === "1" ? moto : oca} alt="METODO" />
              {metodoEnvio === "345837"
                ? "Envío a domicilio"
                : metodoEnvio === "345838"
                ? "Envío a sucursal"
                : metodoEnvio === "1"
                ? "Envío en moto"
                : ""}
            </p>
            {metodoEnvio === "345837" && (
              <>
                <h3>
                  {direccion.calle} {direccion.numero}.{" "}
                  {direccion.provincia === "Capital Federal"
                    ? "CABA"
                    : direccion.provincia}{" "}
                  {direccion.localidad} ({direccion.codigo_postal}).
                </h3>
                <h3>
                  {direccion.entre_calle_1 && "Entre"}{" "}
                  {direccion.entre_calle_1 && direccion.entre_calle_1}{" "}
                  {direccion.entre_calle_1 && "y"}{" "}
                  {direccion.entre_calle_2 && direccion.entre_calle_2}
                </h3>
                <h3>{direccion.informacion_adicional}</h3>
              </>
            )}
            {metodoEnvio === "345838" && (
              <>
                {sucursales.map((suc, i) => {
                  return (
                    <>
                      {suc.IdCentroImposicion === sucursalEntrega && (
                        <>
                          <h3>
                            {suc.Calle} {suc.Numero}. {suc.Provincia}{" "}
                            {suc.Localidad} ({suc.CodigoPostal}).
                          </h3>
                          <h3>
                            {suc.Telefono} - HORARIOS: {suc.HorarioAtencion}
                          </h3>
                          <h3>{suc.TipoAgencia}</h3>
                        </>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </div>
          <BorderColorOutlinedIcon className="botonMobile" />
          <Button className="boton" onClick={() => setTypeNav("envio")}>
            MODIFICAR
          </Button>
        </div>
      </div>

      <div className="domicilioMetodo">
        <p className="title">Método de pago</p>
        <div className="card">
          <div>
            <h3>Al oprimir IR A PAGAR se abrirá Mercado Pago.</h3>
            <h3>
              Podrás pagar con tarjeta de crédito, débito o efectivo, entre
              otras opciones disponibles.
            </h3>
            <h3>Las operacones de Mi Ropero son gestionadas por SWAPVA SAS.</h3>
          </div>
        </div>
      </div>

      {isDesktop && (
        <>
          <div className="botones">
            {load ? (
              <div
                style={{
                  marginTop: "24px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader spin={"spinnerM"} />
              </div>
            ) : (
              <>
                <Button
                  className="botonVolver"
                  onClick={() => setTypeNav("envio")}
                >
                  VOLVER
                </Button>
                <Button className="botonPagar" onClick={() => handlePagar()}>
                  IR A PAGAR
                </Button>
              </>
            )}
            <p
              className="botonVolverMobile"
              onClick={() => setTypeNav("envio")}
            >
              VOLVER
            </p>
          </div>
          <p className="terminos">
            Al oprimir IR A PAGAR se aceptan los{" "}
            <span className="terminosLink">términos y condiciones</span> de Mi
            Ropero
          </p>
        </>
      )}
    </div>
  );
};

export default Tarjeta;
