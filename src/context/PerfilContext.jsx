import { createContext, useState } from "react";

export const UsePerfilContext = createContext();

export const PerfilContext = ({ children }) => {
  const [direccionesGuardadas, setDireccionesGuardadas] = useState([]);
  const [direccionSelecc, setDireccionSelecc] = useState(false);
  const [comprasRealizadas, setComprasRealizadas] = useState([]);
  const [ofertasRealizadas, setOfertasRealizadas] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [ofertaFiltro, setofertaFiltro] = useState("second");

  const [dirFinBusqueda, setDirFinBusqueda] = useState(false);
  const [ofertasFinBusqueda, setOfertasFinBusqueda] = useState(false);
  const [comprasFinBusqueda, setComprasFinBusqueda] = useState(false);

  const PerfilAPI = async (data, clase, metodo) => {
    let resFinal = "";

    await fetch(
      `https://soap.miropero.pupila.biz/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        resFinal = data;
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return resFinal;
  };

  const handleBuscarDirecciones = (userLog) => {
    const dir = new FormData();
    dir.append("idcliente", userLog);
    PerfilAPI(dir, "direcciones", "all").then((res) => {
      setDirFinBusqueda(true);
      if (res.status === "success") {
        setDireccionesGuardadas(res.result);
      }
    });
  };

  const handleComprasRealizadas = (userLog, filtroSelecc) => {
    const estados = {
      3: "Pendiente de pago",
      4: "Pago realizado",
      5: "Error en pago",
      7: "Pago devuelto",
      9: "Plazo de pago vencido",
      10: "En calificacion",
      11: "Finalizada",
    };

    /*  3  => 'Pendiente de pago',
   4  => 'Pago realizado',
   5  => 'Error en pago',
   7  => 'Pago devuelto',
   9  => 'Plazo de pago vencido',
   10 => 'En calificacion',
   11 => 'Finalizada' */

    for (const item in estados) {
      if (estados[item] === filtroSelecc) {
        console.log(estados[item]);
        setEstadoSeleccionado(item);
      }
    }

    let array = [];

    const dir = new FormData();
    dir.append("comprador_id", userLog);
    dir.append("estado", estadoSeleccionado);
    dir.append("page", 1);
    dir.append("bypage", 10);
    PerfilAPI(dir, "operaciones", "all_buyer").then((res) => {
      console.log(res, estadoSeleccionado);
      setComprasFinBusqueda(true);
      if (res.status === "success") {
        for (const ii in res.result) {
          console.log(res.result[ii]);
          array.push(res.result[ii]);
        }
      }
    });
    setComprasRealizadas(array);
  };

  const handleOfertasRealizadas = (userLog, filtroSelecc) => {
    const estados = [
      "Sin definir",
      "en proceso de evaluacion",
      "Rechazada por el vendedor",
      "Cancelada por el comprador",
      "Aceptado",
      "vencida",
    ];

    for (const item in estados) {
      if (estados[item] === filtroSelecc) {
        console.log(estados[item]);
        setofertaFiltro(item);
      }
    }

    let array = [];

    const dir = new FormData();
    dir.append("idcliente", userLog);
    dir.append("estado", /* [1, 2, 3, 4, 5] */ ofertaFiltro);
    PerfilAPI(dir, "ofertas", "all").then((res) => {
      setOfertasFinBusqueda(true);
      if (res.status === "success") {
        console.log(res);
        for (const ii in res.result) {
          console.log(res.result[ii]);
          array = array.push(res.result[ii]);
        }
      }
      setOfertasFinBusqueda(false);
      //setOfertasRealizadas(array);
    });
    setOfertasRealizadas(array);
  };

  return (
    <UsePerfilContext.Provider
      value={{
        PerfilAPI,
        handleBuscarDirecciones,
        dirFinBusqueda,
        direccionesGuardadas,
        setDireccionSelecc,
        handleComprasRealizadas,
        comprasFinBusqueda,
        comprasRealizadas,
        direccionSelecc,
        handleOfertasRealizadas,
        ofertasRealizadas,
        ofertasFinBusqueda,
      }}
    >
      {children}
    </UsePerfilContext.Provider>
  );
};
