import { createContext,useEffect,useState,useContext } from "react";
import { UseLoginContext } from "./LoginContext";

export const UseProdsContext = createContext();

export const ProdsContext = ({children}) => {

    const {userLog}=useContext(UseLoginContext)

    const [categorias,setCategorias]=useState([])
    
    const [nuevosIngresos,setNuevosIngresos]=useState([])
    const [ropa,setRopa]=useState([])
    const [calzado,setCalzado]=useState([])
    const [belleza,setBelleza]=useState([])
    const [accesorios,setAccesorios]=useState([])

    const [listFavs,setListFavs]=useState([])

    const ProdAPI = async(data,clase,metodo) =>{
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
        if(categorias.length===0){
            handleCategorias()
        }
        if(nuevosIngresos.length===0){
            handleNuevosIngresos()
        }
        if(ropa.length===0){
            handleRopa()
        }
        if(calzado.length===0){
            handleCalzado()
        }
        if(accesorios.length===0){
            handleAccesorios()
        }
        if(belleza.length===0){
            handleBelleza()
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(userLog!==""){
            if(listFavs.length===0){
                handleListFavs()
            }
        }
    }, [userLog]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleNuevosIngresos=()=>{
        const nuevosIngresosForm = new FormData()
        nuevosIngresosForm.append("order_type","desc")
        nuevosIngresosForm.append("bypage",8)
        nuevosIngresosForm.append("order","fecha_aprobacion")
        ProdAPI(
            nuevosIngresosForm,
            "productos",
            "search"
        ).then((res)=>{
            if(res.status==="success"){setNuevosIngresos(res.result.productos)}else{handleNuevosIngresos()}
        })
    }
    
    // colleciones all
    // destacadas banner pirncipal
    // primerscroll nuevosingresos
    // segundoscroll recomendados
    // segundoscroll recomendados

    const handleRopa=()=>{
        const ropaForm = new FormData()
        ropaForm.append("idcategoria",1)
        ropaForm.append("idproducto",0)
        ropaForm.append("limit",8)
        ProdAPI(
            ropaForm,
            "productos",
            "related"
        ).then((res)=>{
            if(res.status==="success"){setRopa(res.result)}
        })
    }
    const handleCalzado=()=>{
        const ropaForm = new FormData()
        ropaForm.append("idcategoria",2)
        ropaForm.append("idproducto",0)
        ropaForm.append("limit",8)
        ProdAPI(
            ropaForm,
            "productos",
            "related"
        ).then((res)=>{
            if(res.status==="success"){setCalzado(res.result)}
        })
    }
    const handleAccesorios=()=>{
        const ropaForm = new FormData()
        ropaForm.append("idcategoria",3)
        ropaForm.append("idproducto",0)
        ropaForm.append("limit",8)
        ProdAPI(
            ropaForm,
            "productos",
            "related"
        ).then((res)=>{
            if(res.status==="success"){setAccesorios(res.result)}
        })
    }

    const handleBelleza=()=>{
        const ropaForm = new FormData()
        ropaForm.append("idcategoria",1000018)
        ropaForm.append("idproducto",0)
        ropaForm.append("limit",8)
        ProdAPI(
            ropaForm,
            "productos",
            "related"
        ).then((res)=>{
            if(res.status==="success"){setBelleza(res.result)}
        })
    }

    const handleCategorias=()=>{
        ProdAPI(
            categorias,
            "categorias",
            "all"
        ).then((res)=>{if(res.status==="success"){setCategorias(res.result)}else{handleCategorias()}})
    }

    const handleListFavs = ()=>{
        const fav = new FormData()
        fav.append("idcliente",userLog)
        ProdAPI(
          fav,
          "favoritos",
          "all"
        ).then((res)=>{if(res.status==="success"){setListFavs(res.result)}else{handleListFavs()}})
    }

    return(
        <UseProdsContext.Provider value={{ProdAPI,nuevosIngresos,categorias,listFavs,ropa,accesorios,calzado,belleza,handleListFavs}}>
            {children}
        </UseProdsContext.Provider>
    )
}
