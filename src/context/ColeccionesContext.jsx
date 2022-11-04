import { createContext, useState, useEffect } from "react";

export const UseColeccionContext = createContext();

export const ColeccionContext = ({ children }) => {
  // const [coleccionBanner,setColeccionBanner]=useState([])
  const [coleccionNuevosIngresos, setColeccionNuevosIngresos] = useState([]);
  const [coleccionRecomendados, setColeccionRecomendados] = useState([]);
  const [coleccionMejoresV, setColeccionMejoresV] = useState([]);

  const ColeccionAPI = async (data, clase, metodo) => {
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

  // colleciones all
  // destacadas banner pirncipal id=66
  // primerscroll nuevosingresos id=71
  // segundoscroll recomendados id=72
  // segundoscroll mejoresV id=73

  useEffect(() => {
    // ColeccionAPI(
    //     "col",
    //     "colecciones",
    //     "all"
    // ).then((res)=>{console.log(res)})

    const col = new FormData();
    col.append("idcoleccion", 71);
    col.append("bypage", 8);
    ColeccionAPI(col, "colecciones", "detail").then((res) => {
      if (res.status === "success") {
        setColeccionNuevosIngresos(res.result.productos);
      }
    });

    const col2 = new FormData();
    col2.append("idcoleccion", 72);
    col2.append("bypage", 8);
    ColeccionAPI(col2, "colecciones", "detail").then((res) => {
      if (res.status === "success") {
        setColeccionRecomendados(res.result.productos);
      }
    });

    const col3 = new FormData();
    col3.append("idcoleccion", 73);
    col3.append("bypage", 8);
    ColeccionAPI(col3, "colecciones", "detail").then((res) => {
      if (res.status === "success") {
        setColeccionMejoresV(res.result.productos);
      }
    });
  }, []);

  return (
    <UseColeccionContext.Provider
      value={{
        ColeccionAPI,
        coleccionNuevosIngresos,
        coleccionRecomendados,
        coleccionMejoresV,
      }}
    >
      {children}
    </UseColeccionContext.Provider>
  );
};
