import { createContext } from "react";

export const UseFormContext = createContext();

export function FormContext ({children}) {

    const DireccionNormalize = async(data,clase,metodo) =>{

        const formData = new FormData()
        formData.append('calle',"Alberti")
        formData.append('numero',"961")
        formData.append('provincia',"BUENOS AIRES")
        formData.append('localidad',"Buenos Aires")
        formData.append('codigo_postal',"2800")

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