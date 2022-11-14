import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import ElegirCategoria from "../../components/TiendaActions/ElegirCategoria";
import ElegirTipo from "../../components/TiendaActions/ElegirTipo";
import ElegirImagenes from "../../components/TiendaActions/ElegirImagenes";
import DetallesProd from "../../components/TiendaActions/DetallesProd";
import SeccionProductosCon from "../../components/TiendaActions/SeccionProductosCon";
import MiTienda from "../../components/TiendaActions/MiTienda";
import TiendaDatos from "../../components/TiendaActions/TiendaDatos";
import Ventas from "../../components/TiendaActions/Ventas";
import OfertasRecibidas from "../../components/TiendaActions/OfertasRecibidas";
import Mensajes from "../../components/TiendaActions/Mensajes";
import Calificaciones from "../../components/TiendaActions/Calificaciones";
import Transferencias from "../../components/TiendaActions/Transferencias";

const Tienda = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userLog } = useContext(UseLoginContext);

  const [num, setNum] = useState(1);

  const [form, setForm] = useState({ categoria: "", tipo: "" });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    if (num === 1) {
      setNum(2);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [params]);

  useEffect(() => {
    if (num !== 1) {
      if (userLog === "") {
        navigate("/login");
      }
    }
  }, [num]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {params.seccion === undefined && <MiTienda />}
      {/* {params.seccion === undefined && <SeccionProductosCon />} */}
      {params.seccion === "PRODUCTOS" && <ElegirCategoria setForm={setForm} />}
      {params.seccion === "CATEGORIA" && <ElegirCategoria setForm={setForm} />}
      {params.seccion === "TIPO" && (
        <ElegirTipo form={form} setForm={setForm} />
      )}
      {params.seccion === "IMAGENES" && <ElegirImagenes setForm={setForm} />}
      {params.seccion === "DETALLES" && <DetallesProd />}
      {params.seccion === "DATOS DE LA TIENDA" && <TiendaDatos />}
      {params.seccion === "VENTAS" && <Ventas />}
      {params.seccion === "OFERTAS RECIBIDAS" && <OfertasRecibidas />}
      {params.seccion === "MENSAJES" && <Mensajes />}
      {params.seccion === "CALIFICACIONES" && <Calificaciones />}
      {params.seccion === "TRANSFERENCIAS" && <Transferencias />}
    </div>
  );
};

export default Tienda;
