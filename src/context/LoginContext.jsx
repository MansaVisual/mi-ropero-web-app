import { createContext } from "react";

export const UseLoginContext = createContext();

export const LoginContext = ({children}) => {

    const LoginAPI = async(data,clase,metodo) =>{
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

    const loginStorage=async()=>{
        const res = await localStorage.getItem("idClienteMiRopero")
        return res
    }

    return(
        <UseLoginContext.Provider value={{LoginAPI,loginStorage}}>
            {children}
        </UseLoginContext.Provider>
    )
}
