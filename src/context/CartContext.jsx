import { createContext, useState, useEffect,useContext } from "react";
import { UseLoginContext } from "./LoginContext";

export const UseCartContext = createContext();

export const CartContext = ({children}) => {
    const {userLog} = useContext(UseLoginContext)
    console.log(userLog)
    
    const [carrito,setCarrito]=useState([])
    const [buscandoCart,setBuscandoCart]=useState(true)
    const [costoCarrito,setCostoCarrito]=useState(false)
    const [cantidadCarrito,setCantidadCarrito]=useState(0)

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

    useEffect(() => {
        const CartID = new FormData()

        CartID.append('idcliente', 68)
        // CartID.append('idproducto',10277)
        // CartID.append('cantidad',1)
        CartAPI(
            CartID,
            "carritos",
            "all"
        ).then((res)=>{
            if(res.status==="success"){
                setCarrito(res.result)
                setBuscandoCart(false)
            }else if(res.status==="error"){
                setBuscandoCart(false)
            }
        })
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        let suma = 0
        let cantidad = 0
        if(carrito.length!==0){
            for(let i=0;i<carrito.length;i++){
                suma = suma + Number(carrito[i].producto.precio)
                cantidad=cantidad+1
            }
        }
        setCantidadCarrito(cantidad)
        setCostoCarrito(suma)
    },[carrito])// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <UseCartContext.Provider value={{CartAPI,setCarrito,carrito,buscandoCart,setBuscandoCart,costoCarrito,cantidadCarrito}}>
            {children}
        </UseCartContext.Provider>
    )
}
