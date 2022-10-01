import { createContext } from "react";

export const UseCartContext = createContext();

export const CartContext = ({children}) => {

    const CartAPI = async(data,clase,metodo) =>{
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

    return(
        <UseCartContext.Provider value={{CartAPI}}>
            {children}
        </UseCartContext.Provider>
    )
}
