import { createContext,useEffect,useState,useContext } from "react";
import { apiFetch } from "../apiFetch/apiFetch";
import { UseLoginContext } from "./LoginContext";

export const UseMiTiendaContext = createContext();

export const MiTiendaContext = ({children}) => {

    const {userLog}=useContext(UseLoginContext)

    const [buscandoProds,setBuscandoProds]=useState(true)
    const [productos,setProductos]=useState([])
    const [saldoCuenta,setSaldoCuenta]=useState(false)

    useEffect(() => {
        if(userLog!==""){
            const prods=new FormData()
            prods.append("idcliente",userLog)
            apiFetch(
                prods,
                "tiendas",
                "list"
            ).then((res)=>{
                if(res.status==="success"){
                    setProductos(res.result)
                }
                setBuscandoProds(false)
            })
            const ctacte=new FormData()
            ctacte.append("idcliente",userLog)
            apiFetch(
                prods,
                "cuentascorrientes",
                "balance"
            ).then((res)=>{
                if(res.status==="success"){
                    setSaldoCuenta((res.result.debe-res.result.haber).toFixed(2))
                }
            })
        }
    }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

    

    return(
        <UseMiTiendaContext.Provider value={{buscandoProds,productos,saldoCuenta}}>
            {children}
        </UseMiTiendaContext.Provider>
    )
}
