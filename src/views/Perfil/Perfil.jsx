import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MiPerfil from "../../components/PerfilActions/MiPerfil";
import MisOfertas from "../../components/PerfilActions/MisOfertas";
import MisDatos from "../../components/PerfilActions/MisDatos";
import MisFavoritos from "../../components/PerfilActions/MisFavoritos";
import MisDirecciones from "../../components/PerfilActions/MisDirecciones";
import MisCompras from "../../components/PerfilActions/MisCompras";
import { useParams, useNavigate } from "react-router-dom";
import DetalleCompra from "../../components/PerfilActions/DetalleCompra";
import MisMensajes from "../../components/PerfilActions/MisMensajes";
import NuevaDireccion from "../../components/PerfilActions/NuevaDireccion/NuevaDireccion";
import { UseLoginContext } from "../../context/LoginContext";
import EditarDireccion from "../../components/PerfilActions/NuevaDireccion/EditarDireccion";
import MiChat from "../../components/PerfilActions/MiChat/MiChat";

const Perfil = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userLog } = useContext(UseLoginContext);

  const [num, setNum] = useState(1);

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
    <Grid className="gridContainer">
      {params.perfilSeccion === undefined && <MiPerfil />}
      {params.perfilSeccion === "OFERTAS REALIZADAS" && <MisOfertas />}
      {params.perfilSeccion === "MIS DATOS" && <MisDatos />}
      {params.perfilSeccion === "MIS FAVORITOS" && <MisFavoritos />}
      {params.perfilSeccion === "MIS DIRECCIONES" && <MisDirecciones />}
      {params.perfilSeccion === "MIS COMPRAS" && <MisCompras />}
      {params.perfilSeccion === "MIS COMPRAS DETALLE" && <DetalleCompra />}
      {params.perfilSeccion === "MIS MENSAJES" && <MisMensajes />}
      {params.perfilSeccion === "NUEVA DIRECCION" && <NuevaDireccion />}
      {params.perfilSeccion === "EDITAR DIRECCION" && <EditarDireccion />}
      {params.perfilSeccion === "MI CHAT" && <MiChat />}
    </Grid>
  );
};

export default Perfil;
