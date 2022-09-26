import { createContext } from "react";

export const UseFormContext = createContext();

export function FormContext ({children}) {

    const x = () =>{
        const formData = new FormData();
        formData.append('email', 'esarias@gmail.com');
        formData.append('clave', '1234567890');
    
        fetch('http://miroperoapp.7kb.net/MiRoperoApiDataGetway.php?class=clientes&method=login', {
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
        <UseFormContext.Provider value={{x}}>
            {children}
        </UseFormContext.Provider>
    )
}