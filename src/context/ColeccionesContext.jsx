import { createContext, useState, useEffect } from "react";

export const UseColeccionContext = createContext();

export const ColeccionContext = ({ children }) => {
  const [coleccionesBuscadas, setColeccionesBuscadas] = useState([]);
  const [colecciones, setColecciones] = useState([]);
  const [buscandoCols,setBuscandoCols]=useState(true)

  const ColeccionAPI = async (data, clase, metodo) => {
    let resFinal = "";

    await fetch(
      `https://www2.miropero.ar/MiRoperoApiDataGetway?class=${clase}&method=${metodo}`,
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
        col3.append("order_type","desc")
        col3.append("order","idproducto")
        await ColeccionAPI(col3, "colecciones", "detail").then((res) => {console.log(res)
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
        colecciones,
        buscandoCols
      }}
    >
      {children}
    </UseColeccionContext.Provider>
  );
};
