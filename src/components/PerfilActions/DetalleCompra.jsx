import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import leftArrow from "../../assets/img/leftArrow.png";
import greyLeftArrow from "../../assets/img/GreyLeftArrow.png";
import greyRightArrow from "../../assets/img/GreyRightArrow.png";
import { UseLoginContext } from "../../context/LoginContext";
import { UsePerfilContext } from "../../context/PerfilContext";

const DetalleCompra = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  const { userLog } = useContext(UseLoginContext);
  const { compraId, PerfilAPI } = useContext(UsePerfilContext);
  const [compraSelecc, setCompraSelecc] = useState(false);
  const [direccion, setDireccion] = useState(false);
  console.log(compraId);

  useEffect(() => {
    if (!compraId && !userLog) {
      navigate("/perfil");
    } else {
      const dir = new FormData();
      dir.append("idcliente", 36);
      dir.append("idoperacion", 840);
      console.log(Object.fromEntries(dir)); // Works if all fields are uniq
      PerfilAPI(dir, "operaciones", "get").then((res) => {
        console.log(res);
        setCompraSelecc(res.result);
        setDireccion(res.result.direccion_entrega);
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
      {compraSelecc && (
        <>
          <p className="title">COMPRA {compraSelecc.hash}</p>
          <p className="responsiveTitle">COMPRA {compraSelecc.hash}</p>
          <div className="detailSection">
            <div className="headerDetail">
              <div
                className="leftArrowSection"
                onClick={() => navigate(`/perfil`)}
              >
                <img src={greyLeftArrow} alt="leftArrow" />
                <p>VER COMPRA ANTERIOR</p>
              </div>
              <p className="headerTitle">RESUMEN DE COMPRA</p>
              <div
                className="rightArrowSection"
                onClick={() => navigate(`/perfil`)}
              >
                <p>VER COMPRA SIGUIENTE</p>
                <img src={greyRightArrow} alt="leftArrow" />
              </div>
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
                          <span>${producto.precio}</span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="descuentos">
                <p>DESCUENTOS</p>
                {/* <span>-${compraSelecc.descuentos}</span> */}
              </div>
              <div className="total">
                <p>ENVIO</p>
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
                <p>ENVÍO</p>
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
              <div
                className="leftArrowSection"
                onClick={() => navigate(`/perfil`)}
              >
                <img src={greyLeftArrow} alt="leftArrow" />
                <p>VER COMPRA ANTERIOR</p>
              </div>
              <div
                className="rightArrowSection"
                onClick={() => navigate(`/perfil`)}
              >
                <p>VER COMPRA SIGUIENTE</p>
                <img src={greyRightArrow} alt="leftArrow" />
              </div>
            </div>
            <div className="returnLink" onClick={() => navigate(`/perfil`)}>
              <img src={leftArrow} alt="leftArrow" />
              <p>VOLVER A MI PERFIL</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetalleCompra;
