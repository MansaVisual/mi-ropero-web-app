import React, { useState,useEffect,useContext } from "react";
import { Box, Fab } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { UseProdsContext } from "../../context/ProdsContext";


export const LikeButton = ({idCliente,idProd,infoUser,itemFav}) => {
  const {ProdAPI,listFavs,handleListFavs}=useContext(UseProdsContext)
  const [like, setLike] = useState(null);

  useEffect(() => {
    if(itemFav===undefined){
      if(infoUser.productos_favoritos !== undefined && infoUser.productos_favoritos.find(e=>e===idProd)){
        setLike(!like)
      }
    }
  }, [infoUser]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(itemFav!==undefined){
      setLike(true)
    }
  }, [itemFav]);// eslint-disable-line react-hooks/exhaustive-deps
  

  const onLike = async () => {
    setLike(!like)
    if(infoUser.productos_favoritos !== undefined && infoUser.productos_favoritos.find(e=>e===idProd)){
      const idFavorito = listFavs.find(e=>e.producto_id===idProd)

      const favAdd = new FormData()
      favAdd.append("idcliente",idCliente)
      favAdd.append("idproducto",idProd)
      favAdd.append("idfavorito",idFavorito.idfavorito)
      ProdAPI(
        favAdd,
        "favoritos",
        "delete"
      ).then((res)=>{
        if(res.status==="error"){
          alert("Surgió un error al borrar el producto. Volvé a intentarlo")
        }
      })
      await handleListFavs()
    }else{
      const favAdd = new FormData()
      favAdd.append("idcliente",idCliente)
      favAdd.append("idproducto",idProd)
      ProdAPI(
        favAdd,
        "favoritos",
        "insert"
      ).then((res)=>{
        if(res.status==="error"){
          alert("Surgió un error al agregar a favoritos. Volvé a intentarlo")
        }
      })
      await handleListFavs()
      infoUser.productos_favoritos.push(idProd)
    }
  };

  return (
    <Box>
      <Fab
        color={like ? "secondary" : "primary"}
        size="small"
        onClick={onLike}
        disableRipple
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {like ? (
            <AiFillHeart fontSize="23px" color="hsl(0, 0%, 100%)" />
          ) : (
            <AiOutlineHeart fontSize="23px" color="hsl(0, 0%, 100%)" />
        )}
      </Fab>
    </Box>
  );
};

export const UpButton = () => {
  return (
    <Box>
      <Fab
        size="small"
        sx={{
          transform: "rotate(90deg)",
          backgroundColor: "hsl(320.2, 100%, 82.5%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IoArrowUndoSharp fontSize="26px" color="hsl(0, 0%, 100%)" />
      </Fab>
    </Box>
  );
};

export const WspButton = () => {
  return (
    <Box>
      <Fab
        size="small"
        sx={{
          backgroundColor: "hsl(134.4, 100%, 36.7%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaWhatsapp fontSize="26px" color="hsl(0, 0%, 100%)" />
      </Fab>
    </Box>
  );
};

export const CommentButton = ({ onClick }) => {
  return (
    <Box onClick={onClick}>
      <Fab
        size="small"
        sx={{
          backgroundColor: "hsla(248, 41%, 38%, 1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaRegCommentAlt fontSize="20px" color="hsl(0, 0%, 100%)" />
      </Fab>
    </Box>
  );
};

export const FilterButton = ({ onClick }) => {
  return (
    <Box onClick={onClick}>
      <Fab
        size="small"
        sx={{
          backgroundColor: "hsla(248, 41%, 38%, 1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IoFilter fontSize="19px" color="hsl(0, 0%, 100%)" />
      </Fab>
    </Box>
  );
};
