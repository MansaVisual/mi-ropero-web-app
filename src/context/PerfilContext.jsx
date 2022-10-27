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

  const handleComprasRealizadas = async (userLog, filtroSelecc) => {
    const estados = {
      3: "Pendiente de pago",
      4: "Pago realizado",
      5: "Error en pago",
      7: "Pago devuelto",
      9: "Plazo de pago vencido",
      10: "En calificacion",
      11: "Finalizada",
    };

    let itemEstadoSelecc = "";

    for (const item in estados) {
      if (estados[item] === filtroSelecc) {
        console.log(item);
        itemEstadoSelecc = item;
        await setEstadoSeleccionado(item);
      }
    }

    let array = [];

    const dir = new FormData();
    dir.append("comprador_id", userLog);
    dir.append("estado", 2);
    dir.append("page", 0);
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

  const handleOfertasRealizadas = async (userLog, filtroSelecc) => {
    const estados = [
      "Sin definir",
      "en proceso de evaluacion",
      "Rechazada por el vendedor",
      "Cancelada por el comprador",
      "Aceptado",
      "vencida",
    ];

    let itemOfertasRealizadas;

    for (const item in estados) {
      if (estados[item] === filtroSelecc) {
        console.log(estados[item]);
        itemOfertasRealizadas = item;
        await setofertaFiltro(item);
      }
    }

    let array = [];

    const dir = new FormData();
    dir.append("idcliente", userLog);
    dir.append("estado", Number(itemOfertasRealizadas));
    PerfilAPI(dir, "ofertas", "all").then((res) => {
      setOfertasFinBusqueda(true);
      if (res.status === "success") {
        for (const ii in res.result) {
          array.push(res.result[ii]);
        }
      }
      setOfertasRealizadas(array);
    });
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
