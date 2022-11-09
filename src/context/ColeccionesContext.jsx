import { createContext, useState, useEffect } from "react";

export const UseColeccionContext = createContext();

export const ColeccionContext = ({ children }) => {
  const [coleccionNuevosIngresos, setColeccionNuevosIngresos] = useState([]);
  const [coleccionRecomendados, setColeccionRecomendados] = useState([]);
  const [coleccionMejoresV, setColeccionMejoresV] = useState([]);
  const [coleccionesBuscadas, setColeccionesBuscadas] = useState([]);
  const [colecciones, setColecciones] = useState([]);
  const [buscandoCols,setBuscandoCols]=useState(true)

  const ColeccionAPI = async (data, clase, metodo) => {
    let resFinal = "";

    await fetch(
      `https://www.miropero.ar/MiRoperoApiDataGetway?class=${clase}&method=${metodo}`,
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

  useEffect(() => {
    ColeccionAPI(
        "col",
        "colecciones",
        "all"
    ).then((res)=>{setColeccionesBuscadas(res.result)})

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

  useEffect(() => {
    completarColecciones()
  }, [coleccionesBuscadas]);// eslint-disable-line react-hooks/exhaustive-deps

  const completarColecciones=async()=>{
    if(coleccionesBuscadas.length!==0){
      let newCols=[]
      for(const i in coleccionesBuscadas){
        const col3 = new FormData();
        col3.append("idcoleccion", coleccionesBuscadas[i].idcoleccion);
        col3.append("bypage", 8);
        await ColeccionAPI(col3, "colecciones", "detail").then((res) => {
          if (res.status === "success") {
            newCols.push({
              idcoleccion:coleccionesBuscadas[i].idcoleccion,
              nombre:coleccionesBuscadas[i].nombre,
              tipo_text:coleccionesBuscadas[i].tipo_text,
              productos:res.result.productos
            })
          }
        });
      }
      setColecciones(newCols)
      setBuscandoCols(false)
    }
  }

  return (
    <UseColeccionContext.Provider
      value={{
        ColeccionAPI,
        coleccionNuevosIngresos,
        coleccionRecomendados,
        coleccionMejoresV,
        colecciones,
        buscandoCols
      }}
    >
      {children}
    </UseColeccionContext.Provider>
  );
};
