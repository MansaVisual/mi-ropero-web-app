import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import ElegirCategoria from "../../components/TiendaActions/ElegirCategoria";
import ElegirTipo from "../../components/TiendaActions/ElegirTipo";
import ElegirImagenes from "../../components/TiendaActions/ElegirImagenes";
import DetallesProd from "../../components/TiendaActions/DetallesProd";
import MiTienda from "../../components/TiendaActions/MiTienda";
import TiendaDatos from "../../components/TiendaActions/TiendaDatos";
import Ventas from "../../components/TiendaActions/Ventas";
import OfertasRecibidas from "../../components/TiendaActions/OfertasRecibidas";
import Mensajes from "../../components/TiendaActions/Mensajes";
import Calificaciones from "../../components/TiendaActions/Calificaciones";
import Transferencias from "../../components/TiendaActions/Transferencias";
import Caracteristicas from "../../components/TiendaActions/Caracteristicas";
/* import CargaProdExito from "../../components/TiendaActions/ProductoPublicado"; */
import ProductoPublicado from "../../components/TiendaActions/ProductoPublicado";
import Contacto from "../../components/TiendaActions/Contacto";
import Sumario from "../../components/TiendaActions/Sumario";
import Chat from "../../components/TiendaActions/Chat";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import Loader from "../../components/Loader/Loader";
import CrearTienda from "../../components/TiendaActions/CrearTienda";
import SeccionProductos from "../../components/TiendaActions/SeccionProductos";

const Tienda = () => {
  const { seccion } = useParams();
  const navigate = useNavigate();
  const { userLog } = useContext(UseLoginContext);
  const { tiendaData, buscandoProds } = useContext(UseMiTiendaContext);

  const [num, setNum] = useState(1);

  const [form, setForm] = useState({
    crearTienda: null,
    categoriaId: null,
    categoriaNombre: null,
    tipoId: null,
    tipoNombre: null,
    caracteristicas: [],
    idCaracteristica: [],
    idCaracteristicaOld: [],
    direccion: [],
    telefono: "",
    detalles: {
      titulo: "",
      precio: "",
      descripcion: "",
    },
    imagenes: {},
    imagenesApi: [],
    imagenesPreview: {},
    video: null,
    seccionExtra: [],
  });

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
  }, [seccion]);

  useEffect(() => {
    if (num !== 1) {
      if (userLog === "") {
        navigate("/login");
      }else{
        localStorage.removeItem("returnVenderMR")
      }
    }
  }, [num]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {buscandoProds ? (
        <div
          style={{
            marginTop: "72px",
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader spin={"spinnerG"} />
        </div>
      ) : tiendaData.length === 0 ? (
        <CrearTienda setForm={setForm} />
      ) : (
        <>
          {seccion === undefined && <MiTienda />}
          {seccion === "PRODUCTOS" && <SeccionProductos setForm={setForm} />}
          {seccion === "CATEGORIA" && <ElegirCategoria setForm={setForm} form={form} />}
          {seccion === "TIPO" && <ElegirTipo form={form} setForm={setForm} />}
          {seccion === "IMAGENES" && (
            <ElegirImagenes form={form} setForm={setForm} />
          )}
          {seccion === "CARACTERISTICAS" && (
            <Caracteristicas form={form} setForm={setForm} />
          )}
          {seccion === "DETALLES" && (
            <DetallesProd form={form} setForm={setForm} />
          )}
          {seccion === "DATOS DE LA TIENDA" && <TiendaDatos />}
          {seccion === "VENTAS" && <Ventas />}
          {seccion === "OFERTAS RECIBIDAS" && <OfertasRecibidas />}
          {seccion === "MENSAJES" && <Mensajes />}
          {seccion === "CALIFICACIONES" && <Calificaciones />}
          {seccion === "TRANSFERENCIAS" && <Transferencias />}
          {seccion === "PRODUCTO PUBLICADO" && <ProductoPublicado />}
          {seccion === "CONTACTO" && <Contacto form={form} setForm={setForm} />}
          {seccion === "SUMARIO" && <Sumario form={form} />}
          {seccion === "MI CHAT" && <Chat />}
        </>
      )}
    </div>
  );
};

export default Tienda;
