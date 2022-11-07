import { createContext,useEffect,useState,useContext } from "react";
import { UseLoginContext } from "./LoginContext";

export const UseMiTiendaContext = createContext();

export const MiTiendaContext = ({children}) => {

    const {userLog}=useContext(UseLoginContext)


    const MiTiendaAPI = async(data,clase,metodo) =>{
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

    useEffect(() => {

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <UseMiTiendaContext.Provider value={{MiTiendaAPI}}>
            {children}
        </UseMiTiendaContext.Provider>
    )
}
