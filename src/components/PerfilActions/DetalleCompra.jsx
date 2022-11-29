import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import { UseLoginContext } from "../../context/LoginContext";
import { UsePerfilContext } from "../../context/PerfilContext";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import vacio from "../../assets/img/comprasVacio.png";
import { Button } from "@mui/material";
import { apiFetch } from "../../apiFetch/apiFetch";

const DetalleCompra = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);
  const { compraId } = useContext(UsePerfilContext);
  const [compraSelecc, setCompraSelecc] = useState(false);
  const [direccion, setDireccion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!compraId && !userLog) {
      navigate("/perfil");
    } else {
      const dir = new FormData();
      dir.append("idcliente", userLog);
      dir.append("idoperacion", compraId);
      apiFetch(dir, "operaciones", "get").then((res) => {
        if (res.status === "success") {
          setCompraSelecc(res.result);
          setDireccion(res.result.direccion_entrega);
          setLoading(false);
        } else {
          if (res.status === "error") {
            setLoading(false);
            setError(true);
            Swal.fire({
              title: "ERROR",
              text: "Surgió un error traer el detalle de producto. Volvé a intentarlo",
              icon: "error",
              confirmButtonText: "ACEPTAR",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/perfil");
              }
            });
          }
        }
      });
    }
  }, [compraId, userLog]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatoFecha = (fecha) => {
    const fechaSinHora = fecha.substring(0, 10);
    const [year, month, day] = fechaSinHora.split("-");

    const formatoFinal = `${day} / ${month} / ${year}`;
    return formatoFinal;
  };

  return (
    <div className="detalleCompraContainer">
      <Breadcrumbs links={pathnames} />
      {loading ? (
        <div
          style={{
            height: "50vh",
            marginTop: "42px",
            width: "100%",
            maxWidth: "895px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader spin={"spinnerM"} />
        </div>
      ) : !error ? (
        <>
          <p className="title">COMPRA {compraSelecc.hash}</p>
          <p className="responsiveTitle">COMPRA {compraSelecc.hash}</p>
          <div className="detailSection">
            <div className="headerDetail">
              {/* <div
                className="leftArrowSection"
                onClick={() => navigate(`/perfil`)}
              >
                <img src={greyLeftArrow} alt="leftArrow" />
                <p>VER COMPRA ANTERIOR</p>
              </div> */}
              <p className="headerTitle">RESUMEN DE COMPRA</p>
              {/*  <div
                className="rightArrowSection"
                onClick={() => navigate(`/perfil`)}
              >
                <p>VER COMPRA SIGUIENTE</p>
                <img src={greyRightArrow} alt="leftArrow" />
              </div> */}
            </div>
            <div className="bodyDetail">
              <div className="fecha">
                <p>FECHA DE COMPRA</p>
                <span>{formatoFecha(compraSelecc.fecha_alta)}</span>
              </div>
              <div className="id">
                <p>#ID DE PEDIDO</p>
                <span>{compraSelecc.hash}</span>
              </div>
              <div className="tienda">
                <p>TIENDA</p>
                <span>{compraSelecc.tienda_nombre}</span>
              </div>
              <div className="productos">
                <p>PRODUCTOS</p>
                <div className="productoContainer">
                  {compraSelecc.productos.map((producto) => {
                    return (
                      <>
                        <div>
                          <span>{producto.nombre}</span>
                          <span>${new Intl.NumberFormat("de-DE").format(producto.precio)}</span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              {compraSelecc.promocion && (
                <div className="descuentos">
                  <p>PROMOCION</p>
                  <span>- ${compraSelecc.promocion.monto}</span>
                </div>
              )}

              <div className="total">
                <p>COSTO DE ENVÍO</p>
                <span>${compraSelecc.total_envio}</span>
              </div>
              <div className="total">
                <p>TOTAL</p>
                <span>${compraSelecc.total}</span>
              </div>
              <div className="pago">
                <p>PAGO</p>
                <span>{compraSelecc.medio_pago_text}</span>
              </div>
              <div className="envio">
                <p>LUGAR DE ENVÍO</p>
                <div>
                  <span>{compraSelecc.metodoEnvio}</span>
                  <span>
                    {direccion.calle} {direccion.numero}
                  </span>
                  <span>
                    {direccion.provincia} {direccion.localidad}{" "}
                    {direccion.codigo_postal}
                  </span>
                  {direccion.entre_calle_1 && direccion.entre_calle_2 && (
                    <span>
                      Entre {direccion.entre_calle_1} y{" "}
                      {direccion.entre_calle_2}
                    </span>
                  )}
                  <span> {direccion.informacion_adicional}</span>
                </div>
              </div>
            </div>
            <div className="footerDetail">
              {/* <div
                className="leftArrowSection"
                onClick={() => navigate(`/perfil`)}
              >
                <img src={greyLeftArrow} alt="leftArrow" />
                <p>VER COMPRA ANTERIOR</p>
              </div> */}
              {/* <div
                className="rightArrowSection"
                onClick={() => navigate(`/perfil`)}
              >
                <p>VER COMPRA SIGUIENTE</p>
                <img src={greyRightArrow} alt="leftArrow" />
              </div> */}
            </div>
            <div className="returnLink" onClick={() => navigate(`/perfil`)}>
              <img src={leftArrow} alt="leftArrow" />
              <p>VOLVER A MI PERFIL</p>
            </div>
          </div>
        </>
      ) : (
        <div className="perfilVacio">
          <div>
            <img src={vacio} alt="LOGO" />
            <p>Error al abrir chat. Vuelva a intentar en un momento</p>
            <Button onClick={() => navigate(`/`)}>IR A INICIO</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleCompra;
