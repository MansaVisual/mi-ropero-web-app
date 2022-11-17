import { createContext,useEffect,useState,useContext } from "react";
import { UseLoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const UseMiTiendaContext = createContext();

export const MiTiendaContext = ({children}) => {

    const navigate=useNavigate()
    const {userLog}=useContext(UseLoginContext)

    const [buscandoProds,setBuscandoProds]=useState(true)
    const [productos,setProductos]=useState([])


    const MiTiendaAPI = async(data,clase,metodo) =>{
        let resFinal = ''

        await fetch(`https://www.miropero.ar/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`, {
            method: 'POST',					
            body: data
        })
        .then((response) => response.json())
            .then((data) => {
                resFinal=data
                if(data.error==="error"){
                    Swal.fire({
                        text: data.result,
                        icon: "error",
                        confirmButtonText: "ACEPTAR",
                    });
                    navigate("/")
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

    useEffect(() => {
        if(userLog!==""){
            const prods=new FormData()
            prods.append("idcliente",userLog)
            MiTiendaAPI(
                prods,
                "tiendas",
                "list"
            ).then((res)=>{
                if(res.status==="success"){
                    setProductos(res.result)
                }
                setBuscandoProds(false)
            })
        }
    }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <UseMiTiendaContext.Provider value={{MiTiendaAPI,buscandoProds,productos}}>
            {children}
        </UseMiTiendaContext.Provider>
    )
}
