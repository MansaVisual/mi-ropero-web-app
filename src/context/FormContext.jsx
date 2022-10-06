import { createContext,useState } from "react";

export const UseFormContext = createContext();

export function FormContext ({children}) {

    const [costoSucDom,setCostoSucDom]=useState(false)
    const [costoSucSuc,setCostoSucSuc]=useState(false)

    const FormAPI = async(data,clase,metodo) =>{
        let resFinal = ''

        await fetch(`https://soap.miropero.pupila.biz/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`, {
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
        formCostos.append('idcliente', 68)
        formCostos.append('address_shipping',JSON.stringify(direccion))
        FormAPI(
            formCostos,
            "carritos",
            "calc_shipping"
        ).then((res)=>{
            if(res.status==="success"){
                setCostoSucDom(res.result.oca_suc_dom.precio)
                setCostoSucSuc(res.result.oca_suc_suc.precio)
            }
        })
    }

    return(
        <UseFormContext.Provider value={{FormAPI,costoSucDom,costoSucSuc,setCostos,setCostoSucDom,setCostoSucSuc}}>
            {children}
        </UseFormContext.Provider>
    )
}