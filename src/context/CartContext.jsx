import { createContext, useState, useEffect,useContext } from "react";
import { UseLoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const UseCartContext = createContext();

export const CartContext = ({children}) => {
    const {userLog} = useContext(UseLoginContext)
    
    const navigate=useNavigate()
    const [carrito,setCarrito]=useState([])
    const [buscandoCart,setBuscandoCart]=useState(true)
    const [costoCarrito,setCostoCarrito]=useState(false)
    const [cantidadCarrito,setCantidadCarrito]=useState(0)

    const CartAPI = async(data,clase,metodo) =>{
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
            const CartID = new FormData()
    
            CartID.append('idcliente', userLog)
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
        }
        // const deletey=new FormData()
        // deletey.append("iddireccion",1969)
        // CartAPI(
        //     deletey,
        //     "direcciones",
        //     "delete"
        // ).then((res)=>console.log(res))
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
        <UseCartContext.Provider value={{CartAPI,setCarrito,carrito,buscandoCart,setBuscandoCart,costoCarrito,cantidadCarrito}}>
            {children}
        </UseCartContext.Provider>
    )
}
