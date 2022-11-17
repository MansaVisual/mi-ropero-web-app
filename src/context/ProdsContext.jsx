import { createContext,useEffect,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UseLoginContext } from "./LoginContext";

export const UseProdsContext = createContext();

export const ProdsContext = ({children}) => {

    const {userLog,infoUser}=useContext(UseLoginContext)

    const navigate=useNavigate()
    const [categorias,setCategorias]=useState([])
    
    const [slider1,setSlider1]=useState([])
    const [slider2,setSlider2]=useState([])
    const [slider3,setSlider3]=useState([])

    const [listFavs,setListFavs]=useState([])

    const [listFavFinBusqueda,setListFavFinBusqueda]=useState(false)
console.log(infoUser)
    const ProdAPI = async(data,clase,metodo) =>{
        let resFinal = ''

        await fetch(`https://www.miropero.ar/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`, {
            method: 'POST',					
            body: data
        })
        .then((response) => response.json())
            .then((data) => {
                resFinal=data
                if(data.status==="error"){
                    Swal.fire({
                        title: `${data.result}`,
                        confirmButtonText: "CONTINUAR",
                      }).then((res)=>{
                        navigate("/login");
                      })
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
        if(categorias.length===0){
            handleCategorias()
        }
        if(slider1.length===0){
            handleSlider1()
        }
        if(slider2.length===0){
            handleSlider2()
        }
        if(slider3.length===0){
            handleSlider3()
        }

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(userLog!=="" && infoUser!==""){
            if(listFavs.length===0){
                handleListFavs()
            }
        }
    }, [userLog,infoUser]);// eslint-disable-line react-hooks/exhaustive-deps
    
    // colleciones all
    // destacadas banner pirncipal
    // primerscroll nuevosingresos
    // segundoscroll recomendados
    // segundoscroll recomendados

    const handleSlider1=()=>{
        const slid1 = new FormData()
        slid1.append("idcategoria",17)
        slid1.append("bypage",8)
        slid1.append("order_type","desc")
        slid1.append("order","idproducto")
        ProdAPI(
            slid1,
            "productos",
            "search"
        ).then((res)=>{
            if(res.status==="success"){setSlider1(res.result.productos)}
        })
    }
    const handleSlider2=()=>{
        const slid2 = new FormData()
        slid2.append("idcategoria",26)
        slid2.append("bypage",8)
        slid2.append("order_type","desc")
        slid2.append("order","idproducto")
        ProdAPI(
            slid2,
            "productos",
            "search"
        ).then((res)=>{
            if(res.status==="success"){setSlider2(res.result.productos)}
        })
    }
    const handleSlider3=()=>{
        const slid3 = new FormData()
        slid3.append("idcategoria",1000027)
        slid3.append("bypage",8)
        slid3.append("order_type","desc")
        slid3.append("order","idproducto")
        ProdAPI(
            slid3,
            "productos",
            "search"
        ).then((res)=>{
            if(res.status==="success"){setSlider3(res.result.productos)}
        })
    }

    const handleCategorias=()=>{
        ProdAPI(
            categorias,
            "categorias",
            "all"
        ).then((res)=>{
            if(res.status==="success"){setCategorias(res.result)}})
    }

    const handleListFavs = (idProd,type)=>{
        const fav = new FormData()
        fav.append("idcliente",userLog)
        ProdAPI(
          fav,
          "favoritos",
          "all"
        ).then((res)=>{
            setListFavFinBusqueda(true)
            if(res.status==="success"){
                setListFavs(res.result)
                if(type!=="delete"){
                    if(infoUser.productos_favoritos!==undefined){
                        infoUser.productos_favoritos.push(idProd)
                    }else{
                        infoUser['productos_favoritos'] = [idProd]
                    }
                }else{
                    infoUser.productos_favoritos=infoUser.productos_favoritos.filter(e=>e!==idProd)
                }
            }else{
                setListFavs([])
            }
        })
    }


    return(
        <UseProdsContext.Provider value={{ProdAPI,categorias,listFavs,slider1,slider2,slider3,handleListFavs,listFavFinBusqueda}}>
            {children}
        </UseProdsContext.Provider>
    )
}
