import { createContext, useState, useEffect,useContext } from "react";
import { apiFetch } from "../apiFetch/apiFetch";
import { UseLoginContext } from "./LoginContext";

export const UseCartContext = createContext();

export const CartContext = ({children}) => {
    const {userLog} = useContext(UseLoginContext)
    
    const [carrito,setCarrito]=useState([])
    const [buscandoCart,setBuscandoCart]=useState(true)
    const [costoCarrito,setCostoCarrito]=useState(false)
    const [cantidadCarrito,setCantidadCarrito]=useState(0)

    useEffect(() => {
        if(userLog!==""){
            const CartID = new FormData()
    
            CartID.append('idcliente', userLog)
            // CartID.append('idproducto',10277)
            // CartID.append('cantidad',1)
            apiFetch(
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
        }
    }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        let suma = 0
        let cantidad = 0
        if(carrito.length!==0){
            for(let i=0;i<carrito.length;i++){
                suma = suma + (carrito[i].producto.precio_oferta==="0.00"?Number(carrito[i].producto.precio):Number(carrito[i].producto.precio_oferta))
                cantidad=cantidad+1
            }
        }
        setCantidadCarrito(cantidad)
        setCostoCarrito(suma)
    },[carrito])// eslint-disable-line react-hooks/exhaustive-deps
    

    return(
        <UseCartContext.Provider value={{setCarrito,carrito,buscandoCart,setBuscandoCart,costoCarrito,cantidadCarrito}}>
            {children}
        </UseCartContext.Provider>
    )
}
