import { createContext } from "react";

export const UseFormContext = createContext();

export function FormContext ({children}) {

    const FormAPI = async(data,clase,metodo) =>{
        let resFinal = false

        await fetch(`https://soap.miropero.pupila.biz/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`, {
            method: 'POST',					
            body: data
        })
        .then((response) => response.json())
            .then((data) => {
                if(data.status==="success"){
                    resFinal=true
                }
            })
            .catch((error)=> {
                console.log(error)
            })
        .catch((error) => {
            console.error('Error:', error);
        });
        return resFinal
    }

    return(
        <UseFormContext.Provider value={{FormAPI}}>
            {children}
        </UseFormContext.Provider>
    )
}