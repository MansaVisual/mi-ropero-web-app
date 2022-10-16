import { createContext,useEffect,useState } from "react";

export const UseProdsContext = createContext();

export const ProdsContext = ({children}) => {

    const [categorias,setCategorias]=useState([])
    const [nuevosIngresos,setNuevosIngresos]=useState([])
    // const [ropa,setRopa]=useState([])

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
        // if(ropa.length===0){
        //     handleRopa()
        // }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

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
    // const handleRopa=()=>{
    //     const ropaForm = new FormData()
    //     ropaForm.append("bypage",8)
    //     ropaForm.append("idcategoria",2)
    //     ProdAPI(
    //         ropaForm,
    //         "productos",
    //         "search"
    //     ).then((res)=>{
    //         if(res.status==="success"){setRopa(res.result.productos)}else{handleRopa()}
    //     })
    // }
    const handleCategorias=()=>{
        ProdAPI(
            categorias,
            "categorias",
            "all"
        ).then((res)=>{if(res.status==="success"){setCategorias(res.result)}else{handleCategorias()}})
    }

    return(
        <UseProdsContext.Provider value={{ProdAPI,nuevosIngresos}}>
            {children}
        </UseProdsContext.Provider>
    )
}
