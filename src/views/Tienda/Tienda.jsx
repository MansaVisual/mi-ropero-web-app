import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import ElegirCategoria from "../../components/TiendaActions/ElegirCategoria";
import MiTienda from "../../components/TiendaActions/MiTienda";
import ElegirTipo from "../../components/TiendaActions/ElegirTipo";
import ElegirImagenes from "../../components/TiendaActions/ElegirImagenes";

const Tienda = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userLog } = useContext(UseLoginContext);

  const [num, setNum] = useState(1);

  const [categoria, setCategoria] = useState(false);
  const [tipo, setTipo] = useState(false);

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
      {params.seccion === undefined && <MiTienda />}
      {params.seccion === "CATEGORIA" && (
        <ElegirCategoria setCategoria={setCategoria} />
      )}
      {params.seccion === "TIPO" && <ElegirTipo setTipo={setTipo} />}
      {params.seccion === "IMAGENES" && <ElegirImagenes />}
    </Grid>
  );
};

export default Tienda;
