import { createContext } from "react";

export const UseFormContext = createContext();

export function FormContext ({children}) {

    const DireccionNormalize = async(data,clase,metodo) =>{

        const formData = new FormData()
        formData.append('calle',data.calle)
        formData.append('numero',data.numero)
        formData.append('provincia',data.provincia)
        formData.append('localidad',data.localidad)
        formData.append('codigo_postal',data.codigo_postal)

        console.log(data)
        fetch(`https://soap.miropero.pupila.biz/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`, {
            method: 'POST',					
            body: formData
        })
        .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            })
            .catch((error)=> {
                console.log(error)
            })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    return(
        <UseFormContext.Provider value={{DireccionNormalize}}>
            {children}
        </UseFormContext.Provider>
    )
}