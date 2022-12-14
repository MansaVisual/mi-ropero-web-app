import { createContext,useState,useContext } from "react";
import { apiFetch } from "../apiFetch/apiFetch";
import { UseLoginContext } from "./LoginContext";

export const UseFormContext = createContext();

export function FormContext ({children}) {

    const {userLog}=useContext(UseLoginContext)
    const [costoMoto,setCostoMoto]=useState(false)
    const [costoSucDom,setCostoSucDom]=useState(false)
    const [costoSucSuc,setCostoSucSuc]=useState(false)

   
    const setCostos = (direccion)=>{
        const formCostos = new FormData()
        formCostos.append('idcliente', userLog)
        formCostos.append('address_shipping',JSON.stringify(direccion))
        apiFetch(
            formCostos,
            "carritos",
            "calc_shipping"
        ).then((res)=>{
            if(res.status==="success"){
                setCostoSucDom(res.result.oca_suc_dom.precio)
                setCostoSucSuc(res.result.oca_suc_suc.precio)
                setCostoMoto(res.result.moova)
            }else{
                setCostos(direccion)
            }
        })
    }

    return(
        <UseFormContext.Provider value={{costoSucDom,costoSucSuc,setCostos,setCostoSucDom,setCostoSucSuc,costoMoto}}>
            {children}
        </UseFormContext.Provider>
    )
}