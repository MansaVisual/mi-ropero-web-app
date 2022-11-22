import { createContext, useEffect, useState, useContext } from "react";
import { apiFetch } from "../apiFetch/apiFetch";
import { UseLoginContext } from "./LoginContext";

export const UseMiTiendaContext = createContext();

export const MiTiendaContext = ({ children }) => {
  const { userLog } = useContext(UseLoginContext);

  const [buscandoProds, setBuscandoProds] = useState(true);
  const [productos, setProductos] = useState([]);
  const [tiendaData, setTiendaData] = useState([""]);
  const [saldoCuenta, setSaldoCuenta] = useState(false);
  const [tiendaDetail, setTiendaDetail] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    console.log(dataUpdate);
  }, [dataUpdate]);

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
          tienda.append("idtienda", Number(res.result[0].idtienda));
          apiFetch(tienda, "tiendas", "get").then((res) => {
            console.log(res);
            if (res.status === "success") {
              setTiendaDetail(res.result);
              setDataUpdate({
                idtienda: userLog,
                telefono: Number(res.result.telefono),
                nombre: res.result.nombre,
                descripcion: res.result.descripcion,
                provincia: res.result.provincia,
                localidad: res.result.localidad,
                color_principal: res.result.color_principal,
                color_secundario: res.result.color_secundario,
                idprovincia: Number(res.result.idprovincia),
                idlocalidad: Number(res.result.idlocalidad),
                codigo_postal: res.result.codigo_postal,
                calle: res.result.calle,
                numero: res.result.numero,
                piso: res.result.piso,
                departamento: res.result.departamento,
                entre_calle_1: res.result.entre_calle_1,
                entre_calle_2: res.result.entre_calle_2,
                informacion_adicional: res.result.informacion_adicional,
                googlemaps_normalize: res.result.googlemaps_normalize,
              });
            }
          });
          apiFetch(tienda, "tiendas", "detail").then((res) => {
            if (res.status === "success") {
              setProductos(res.result.search_productos);
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
        tiendaDetail,
        dataUpdate,
        setDataUpdate,
      }}
    >
      {children}
    </UseMiTiendaContext.Provider>
  );
};
