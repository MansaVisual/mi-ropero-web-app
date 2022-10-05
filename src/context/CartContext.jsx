import { createContext, useState, useEffect } from "react";

export const UseCartContext = createContext();

export const CartContext = ({children}) => {
    const [carrito,setCarrito]=useState([])
    const [buscandoCart,setBuscandoCart]=useState(true)

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
        // CartID.append('idproducto',10610)
        // CartID.append('cantidad',1)
        CartAPI(
            CartID,
            "carritos",
            "all"
        ).then((res)=>{
            console.log(res)
            if(res.status==="success"){
                setCarrito(res.result)
                setBuscandoCart(false)
            }else if(res.status==="error"){
                setBuscandoCart(false)
            }
        })
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <UseCartContext.Provider value={{CartAPI,setCarrito,carrito,buscandoCart,setBuscandoCart}}>
            {children}
        </UseCartContext.Provider>
    )
}
