import { createContext, useEffect, useState, useContext } from "react";
import { apiFetch } from "../apiFetch/apiFetch";
import { UseLoginContext } from "./LoginContext";

export const UseMiTiendaContext = createContext();

export const MiTiendaContext = ({ children }) => {
  const { userLog } = useContext(UseLoginContext);

  const [buscandoProds, setBuscandoProds] = useState(true);
  const [productos, setProductos] = useState([]);
  const [tiendaData, setTiendaData] = useState([]);
  const [saldoCuenta, setSaldoCuenta] = useState(false);

  useEffect(() => {
    if (userLog !== "") {
      const tienda = new FormData();
      tienda.append("idcliente", Number(userLog));
      apiFetch(tienda, "tiendas", "list").then((res) => {
        console.log(res);
        if (res.status === "success") {
          setTiendaData(res.result[0]);
          apiFetch(tienda, "cuentascorrientes", "balance").then((res) => {
            if (res.status === "success") {
              setSaldoCuenta((res.result.debe - res.result.haber).toFixed(2));
            }
          });
          tienda.append(
            "idtienda",
            /* Number( */ res.result[0].idtienda /* ) */
          );
          apiFetch(tienda, "tiendas", "get").then((res) => {
            console.log(res);
            if (res.status === "success") {
              setProductos(res.result);
            }
          });
        }
        setBuscandoProds(false);
      });
    }
  }, [userLog]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UseMiTiendaContext.Provider
      value={{
        buscandoProds,
        productos,
        saldoCuenta,
        setSaldoCuenta,
        tiendaData,
        setTiendaData,
      }}
    >
      {children}
    </UseMiTiendaContext.Provider>
  );
};
