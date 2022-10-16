import React, { useState,useEffect,useContext } from "react";
import { Box, Fab } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { UseProdsContext } from "../../context/ProdsContext";

export const LikeButton = ({idCliente,idProd}) => {
  const {ProdAPI}=useContext(UseProdsContext)
  const [like, setLike] = useState(null);

  useEffect(()=>{
    const fav = new FormData()
    fav.append("idcliente",idCliente)
    ProdAPI(
      fav,
      "favoritos",
      "all"
    ).then((res)=>console.log(res))
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  const onLike = () => {
    setLike(!like);
    const favAdd = new FormData()
    favAdd.append("idcliente",idCliente)
    favAdd.append("idproducto",idProd)
    ProdAPI(
      favAdd,
      "favoritos",
      "insert"
    ).then((res)=>{
      if(res.status==="error"){
        setLike(!like)
      }
      console.log(res)
    })
  };

  return (
    <Box>
      <Fab
        color={!like ? "primary" : "secondary"}
        size="small"
        onClick={onLike}
        disableRipple
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!like ? (
          <AiOutlineHeart fontSize="23px" color="hsl(0, 0%, 100%)" />
        ) : (
          <AiFillHeart fontSize="23px" color="hsl(0, 0%, 100%)" />
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
