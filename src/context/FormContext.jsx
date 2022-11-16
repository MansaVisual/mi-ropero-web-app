import { createContext,useState,useContext } from "react";
import { UseLoginContext } from "./LoginContext";

export const UseFormContext = createContext();

export function FormContext ({children}) {

    const {userLog}=useContext(UseLoginContext)
    const [costoMoto,setCostoMoto]=useState(false)
    const [costoSucDom,setCostoSucDom]=useState(false)
    const [costoSucSuc,setCostoSucSuc]=useState(false)

    const FormAPI = async(data,clase,metodo) =>{
        let resFinal = ''

        await fetch(`https://www2.miropero.ar/MiRoperoApiDataGetway?class=${clase}&method=${metodo}`, {
            method: 'POST',					
            body: data
        })
        .then((response) => response.json())
            .then((data) => {
                resFinal=data
            })
            .catch((error)=> {
                console.log(error)
            })
        .catch((error) => {
            console.error('Error:', error);
        });
        return resFinal
    }

    const setCostos = (direccion)=>{
        const formCostos = new FormData()
        formCostos.append('idcliente', userLog)
        formCostos.append('address_shipping',JSON.stringify(direccion))
        FormAPI(
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
        <UseFormContext.Provider value={{FormAPI,costoSucDom,costoSucSuc,setCostos,setCostoSucDom,setCostoSucSuc,costoMoto}}>
            {children}
        </UseFormContext.Provider>
    )
}