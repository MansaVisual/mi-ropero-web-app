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

    // useEffect(() => {
    //     const eliminar = new FormData()
    //     eliminar.append('email', "dg.palavecino@gmail.com")
    //     eliminar.append('clave', "nuevaPass2022")
    //     LoginAPI(
    //         eliminar,
    //         "clientes",
    //         "login"
    //     ).then(async(res)=>{
    //         console.log(res)
    //     })
    // }, []);

    return(
        <UseLoginContext.Provider value={{LoginAPI}}>
            {children}
        </UseLoginContext.Provider>
    )
}
