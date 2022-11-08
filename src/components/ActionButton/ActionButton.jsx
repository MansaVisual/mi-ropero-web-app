import React, { useState, useEffect, useContext } from "react";
import { Box, Fab } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { UseProdsContext } from "../../context/ProdsContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/isologo.png"

export const LikeButton = ({
  idCliente,
  idProd,
  infoUser,
  itemFav,
  location,
}) => {
  const { ProdAPI, listFavs, handleListFavs } = useContext(UseProdsContext);
  const [like, setLike] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLike(null);
    if (
      infoUser.productos_favoritos !== undefined &&
      infoUser.productos_favoritos.find((e) => e === idProd)
    ) {
      setLike(!like);
    }
  }, [infoUser, idProd]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (itemFav !== undefined) {
      setLike(true);
    }
  }, [infoUser, idProd]); // eslint-disable-line react-hooks/exhaustive-deps

  /*   const handleCompraSinLogin = () => {
    console.log("redirect");
    localStorage.setItem("redirectUrl", location.pathname);
    navigate("/login");
  }; */

  const onLike = async () => {
    if (idCliente === "") {
      Swal.fire({
        title: "¡SUMATE A LA MODA CIRCULAR!",
        text: "Para comprar y vender fácilmente necesitás ingresar a Mi Ropero",
        iconHtml: `<img src=${logo} alt="LOGO">`,
        customClass: {
          icon: 'no-border',
          container:"popUpLoginAlert",
          cancelButton:"popUpLoginCancel"
        },
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "CONTINUAR",
        cancelButtonText:"CANCELAR"
      }).then((res)=>{
        if(res.isConfirmed){
          localStorage.setItem("redirectUrl", location);
          navigate("/login");
        }
      })
      return;
    }

    setLike(!like);
    if (
      infoUser.productos_favoritos !== undefined &&
      infoUser.productos_favoritos.find((e) => e === idProd)
    ) {
      const idFavorito = listFavs.find((e) => e.producto_id === idProd);

      const favAdd = new FormData();
      favAdd.append("idcliente", idCliente);
      favAdd.append("idproducto", idProd);
      favAdd.append("idfavorito", idFavorito.idfavorito);
      ProdAPI(favAdd, "favoritos", "delete").then((res) => {
        if (res.status === "error") {
          Swal.fire({
            title: "ERROR AL BORRAR",
            text: "Surgió un error al borrar el producto. Volvé a intentarlo",
            icon: "error",
            confirmButtonText: "ACEPTAR",
          });
        }
      });
      await handleListFavs();
    } else {
      const favAdd = new FormData();
      favAdd.append("idcliente", idCliente);
      favAdd.append("idproducto", idProd);
      await ProdAPI(favAdd, "favoritos", "insert").then((res) => {
        if (res.status === "error") {
          Swal.fire({
            title: "ERROR AL AGREGAR A FAVORITOS",
            text: "Surgió un error al agregar a favoritos. Volvé a intentarlo",
            icon: "error",
            confirmButtonText: "ACEPTAR",
          });
        }
      });
      await handleListFavs();
      infoUser.productos_favoritos.push(idProd);
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
          "&:hover": {
            backgroundColor: "#4d419a",
          },
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
