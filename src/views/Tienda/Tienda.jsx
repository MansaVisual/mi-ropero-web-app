import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import ElegirCategoria from "../../components/TiendaActions/ElegirCategoria";
import MiTienda from "../../components/TiendaActions/MiTienda";
import ElegirTipo from "../../components/TiendaActions/ElegirTipo";
import ElegirImagenes from "../../components/TiendaActions/ElegirImagenes";
import DetallesProd from "../../components/TiendaActions/DetallesProd";

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
      {params.seccion === "CATEGORIA" && <ElegirCategoria setForm={setForm} />}
      {params.seccion === "TIPO" && (
        <ElegirTipo form={form} setForm={setForm} />
      )}
      {params.seccion === "IMAGENES" && <ElegirImagenes setForm={setForm} />}
      {params.seccion === "DETALLES" && <DetallesProd />}
    </div>
  );
};

export default Tienda;
