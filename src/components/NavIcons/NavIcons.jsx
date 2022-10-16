import React, { useState, useEffect, useContext } from "react";
import {
  IconButton,
  MenuItem,
  Stack,
  Typography,
  Box,
  Link,
  Icon,
  Button,
  Divider,
} from "@mui/material";
import BellNotif from "../../assets/img/BellNotif.png";
import Cart from "../../assets/img/Cart.png";
import Avatar from "../../assets/img/Avatar.png";
import AvatarMR from "../AvatarMR/AvatarMR";
import { StyledBadge, StyledMenu } from "./style";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { CgCloseO } from "react-icons/cg";
import { IoStorefrontOutline, IoLocationOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiFilePaperLine } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";
import { UseCartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import basura from "../../assets/img/basura.png";
import cruz from "../../assets/img/cruz.png";

const NavIcons = () => {
  const navigate = useNavigate();

  const { userLog, setUserLog } = useContext(UseLoginContext);
  const {
    carrito,
    costoCarrito,
    CartAPI,
    setCarrito,
    buscandoCart,
    setBuscandoCart,
  } = useContext(UseCartContext);

  const [load, setLoad] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [prodEliminar, setProdEliminar] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("idClienteMiRopero") !== null) {
      onLogIn();
    }
  }, []);

  useEffect(() => {
    if (userLog !== "") {
      onLogIn();
    }
  }, [userLog]);

  const handleCerrarSesion = () => {
    localStorage.clear("idClienteRopero");
    setUserLog("");
    closeSession();
    window.location.reload();
  };

  const handleEliminar = (prod) => {
    setProdEliminar(prod);
    setEliminar(true);
  };

  const handleEliminarFinal = async () => {
    setLoad(true);
    const eliminar = new FormData();
    eliminar.append("idcarrito", prodEliminar);
    await CartAPI(eliminar, "carritos", "delete").then(async (res) => {
      if (res.status === "success") {
        await chargeCarrito();
        setEliminar(false);
        setLoad(false);
      } else {
        alert("Ocurrio un error");
        setLoad(false);
      }
    });
  };

  const chargeCarrito = () => {
    const CartID = new FormData();

    CartID.append("idcliente", 68);
    // CartID.append('idproducto',10610)
    // CartID.append('cantidad',1)
    CartAPI(CartID, "carritos", "all").then((res) => {
      if (res.status === "success") {
        setCarrito(res.result);
        setBuscandoCart(false);
      } else if (res.status === "error") {
        setBuscandoCart(false);
      }
    });
  };

  // ----------------------------------------------------------------------------------------------------------------------------
  const [avatarMenu, setAvatarMenu] = useState(null);
  const [cartMenu, setCartMenu] = useState(null);
  const [notifMenu, setNotifMenu] = useState(null);
  const [session, setSession] = useState(null);
  const openNotif = Boolean(notifMenu);
  const openAvatar = Boolean(avatarMenu);
  const openCart = Boolean(cartMenu);
  const handleClickNotif = (event) => {
    setNotifMenu(event.currentTarget);
  };
  const handleClickAvatar = (event) => {
    setAvatarMenu(event.currentTarget);
  };
  const handleClickCart = (event) => {
    setCartMenu(event.currentTarget);
  };
  const handleCloseNotif = () => {
    setNotifMenu(null);
  };

  const handleCloseAvatar = () => {
    setAvatarMenu(null);
  };
  const handleCloseCart = () => {
    setCartMenu(null);
  };
  const onLogIn = () => {
    setSession(!null);
  };
  const closeSession = () => {
    setSession(null);
  };

  const optionUser = [
    {
      title: "Mi tienda",
      icon: <IoStorefrontOutline />,
      url: "MI TIENDA",
    },
    {
      title: "Mis datos",
      icon: <HiOutlineUser />,
      url: "MIS DATOS",
    },
    {
      title: "Mis favoritos",
      icon: <AiOutlineHeart />,
      url: "MIS FAVORITOS",
    },
    {
      title: "Mis direcciones",
      icon: <IoLocationOutline />,
      url: "MIS DIRECCIONES",
    },
    {
      title: "Mis compras",
      icon: <RiFilePaperLine />,
      url: "MIS COMPRAS",
    },
    {
      title: "Mis ofertas realizadas",
      icon: <FaRegMoneyBillAlt />,
      url: "OFERTAS REALIZADAS",
    },
    {
      title: "Mis mensajes",
      icon: <BiMessage />,
      url: "MIS MENSAJES",
    },
  ];

  const getMenuBell = () => {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Box sx={{ mb: "4px" }}>
          <CgCloseO size={24} color={theme.palette.secondary.main} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[3],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.secondary.main,
            }}
          >
            NO TENÉS NOTIFICACIONES
          </Typography>
        </Box>
      </Stack>
    );
  };

  const getMenuAvatar = () => {
    if (!session) {
      return (
        <Stack
          sx={{
            fontSize: theme.typography.fontSize[2],
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ pt: "12px" }}>
            <Typography sx={{ textAlign: "center", pb: "8px" }}>
              ¿Ya te registraste?
            </Typography>
            <Button
              sx={{
                border: "1px solid #423B3C",
                borderRadius: "20px",
                padding: "0px 36px 0px 36px",
                color: "hsla(351, 6%, 25%, 1)",
                minHeight: "32px",
                minWidth: "188px",
              }}
              onClick={() => {
                handleCloseAvatar();
                navigate("/login");
              }}
            >
              Ingresar
            </Button>
          </Box>
          <Box sx={{ pt: "26px", pb: "24px" }}>
            <Typography sx={{ textAlign: "center", pb: "8px" }}>
              ¿Todavía no te registraste?
            </Typography>
            <Button
              sx={{
                border: "1px solid hsla(8, 100%, 56%, 1)",
                borderRadius: "20px",
                padding: "0px 36px 0px 36px",
                color: theme.palette.secondary.main,
                minHeight: "32px",
                minWidth: "188px",
              }}
              onClick={() => {
                handleCloseAvatar();
                navigate("/registro");
              }}
            >
              Crear cuenta
            </Button>
          </Box>
        </Stack>
      );
    }
    return (
      <Stack>
        <Box
          sx={{ paddingLeft: "8px", paddingTop: "8px", paddingBottom: "8px" }}
        >
          <AvatarMR handleCloseAvatar={handleCloseAvatar}></AvatarMR>
        </Box>
        <Box
          sx={{
            fontSize: theme.typography.fontSize[1],
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {optionUser.map((item, i) => (
            <MenuItem
              key={i}
              sx={{
                width: "100%",
                minHeight: "40px",
                ":hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
              }}
              onClick={() => {
                handleCloseAvatar();
                navigate(`/perfil/${item.url}`);
              }}
            >
              <Icon sx={{ fontSize: "15px" }}>{item.icon}</Icon>
              <Typography sx={{ pl: "15px" }}>{item.title}</Typography>
            </MenuItem>
          ))}
        </Box>
        <Box sx={{ textAlign: "center", pb: "10px", pt: "7px" }}>
          <Link
            sx={{
              color: theme.palette.secondary.main,
              fontSize: theme.typography.fontSize[0],
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => handleCerrarSesion()}
          >
            Cerrar Sesión
          </Link>
        </Box>
      </Stack>
    );
  };

  const getMenuCart = () => {
    return (
      <>
        {buscandoCart ? (
          <Loader spin={"spinnerM"} />
        ) : (
          <>
            {carrito.length === 0 ? (
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <Box sx={{ mb: "4px" }}>
                  <CgCloseO size={24} color="hsla(8, 100%, 56%, 1)" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[3],
                      fontWeight: theme.typography.fontWeightMedium,
                      color: "hsla(8, 100%, 56%, 1)",
                    }}
                  >
                    TU CARRITO ESTÁ VACÍO
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <Stack>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      px: "20px",
                      mt: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.tertiary.main,
                        fontSize: theme.typography.fontSize[1],
                      }}
                    >
                      TOTAL ({carrito.length} productos)
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: theme.typography.fontSize[2],
                        fontWeight: theme.typography.fontWeightMedium,
                      }}
                    >
                      ${costoCarrito}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mt: "17px",
                      mb: "16px",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        letterSpacing: "0.8px",
                        borderRadius: "20px",
                        width: "189px",
                        height: "36px",
                        fontSize: theme.typography.fontSize[2],
                        lineHeight: "16.34px",
                        fontWeight: theme.typography.fontWeightRegular,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                      onClick={() => {
                        handleCloseCart();
                        navigate("/checkout");
                      }}
                    >
                      Finalizar compra
                    </Button>
                    <Link
                      sx={{
                        color: theme.palette.quaternary.contrastText,
                        fontSize: theme.typography.fontSize[1],
                        lineHeight: "14.98px",
                        fontWeight: theme.typography.fontWeightRegular,
                        cursor: "pointer",
                        mt: "8px",
                      }}
                      onClick={() => {
                        handleCloseCart();
                        navigate("/carrito");
                      }}
                    >
                      IR AL CARRITO
                    </Link>
                  </Box>
                  <Box sx={{ pt: "10px" }}>
                    {carrito.map((prod, i) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            px: "8px",
                          }}
                          key={i}
                        >
                          <Box
                            sx={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "20px",
                              pr: "16px",
                            }}
                          >
                            <img
                              src={prod.producto_imagen}
                              alt=""
                              width={40}
                              height={40}
                            />
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: theme.typography.fontSize[2] }}
                            >
                              {prod.producto.nombre}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: theme.typography.fontSize[0],
                                color: theme.palette.tertiary.main,
                              }}
                            >
                              {prod.producto.tienda.nombre}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: theme.typography.fontSize[1],
                                pt: "6px",
                              }}
                            >
                              ${prod.producto.precio}
                            </Typography>
                          </Box>
                          <Box sx={{ pl: "68px" }}>
                            <IconButton
                              onClick={() => {
                                handleCloseCart();
                                handleEliminar(prod.idcarrito);
                              }}
                            >
                              <IoTrashOutline
                                color={theme.palette.secondary.main}
                                size={20}
                              />
                            </IconButton>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                  <Divider />
                </Box>
              </Stack>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <Stack direction="row" spacing={{ xs: 1, lg: 3 }}>
      <IconButton onClick={userLog !== "" && handleClickNotif}>
        <StyledBadge
          badgeContent={120}
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <img src={BellNotif} alt="Icono de notificacion" width="17px" />
        </StyledBadge>
      </IconButton>
      <StyledMenu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={notifMenu}
        open={openNotif}
        onClose={handleCloseNotif}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 125,
              width: 13,
              height: 13,
              borderRadius: "2px",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {getMenuBell()}
      </StyledMenu>
      <IconButton onClick={handleClickAvatar}>
        <StyledBadge
          badgeContent={3}
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <img src={Avatar} alt="icono de avatar" width="20px" />
        </StyledBadge>
        {!avatarMenu ? (
          <ExpandMoreIcon
            sx={{ position: "absolute", top: "12px", left: "30px" }}
          />
        ) : (
          <ExpandLessIcon
            sx={{ position: "absolute", top: "12px", left: "30px" }}
          />
        )}
      </IconButton>
      <StyledMenu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={avatarMenu}
        open={openAvatar}
        onClose={handleCloseAvatar}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: { xs: 105, md: 120, lg: 120, xl: 120 },
              width: 13,
              height: 13,
              borderRadius: "2px",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {getMenuAvatar()}
      </StyledMenu>
      <IconButton onClick={userLog !== "" && handleClickCart}>
        <StyledBadge
          badgeContent={carrito.length}
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <img src={Cart} alt="logo-mi-ropero" width="21px" />
        </StyledBadge>
        {!cartMenu ? (
          <ExpandMoreIcon
            sx={{ position: "absolute", top: "12px", left: "30px" }}
          />
        ) : (
          <ExpandLessIcon
            sx={{ position: "absolute", top: "12px", left: "30px" }}
          />
        )}
      </IconButton>
      <StyledMenu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={cartMenu}
        open={openCart}
        onClose={handleCloseCart}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: { xs: 60, md: 75, lg: 44, xl: 120 },
              width: 13,
              height: 13,
              borderRadius: "2px",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {getMenuCart()}
      </StyledMenu>
      {eliminar && (
        <div className="cartElimianrPopUp">
          <div className="fondoPopUp" onClick={() => setEliminar(false)}></div>
          <div className="popUp">
            <img
              src={basura}
              alt="BORRAR"
              style={{ marginTop: "28px" }}
              className="basuraLogo"
            />
            <p>¿Seguro que quieres eliminar este producto de tu carrito?</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <Button className="cancelar" onClick={() => setEliminar(false)}>
                CANCELAR
              </Button>
              <Button
                className="eliminar"
                onClick={() => handleEliminarFinal()}
              >
                ELIMINAR
              </Button>
            </div>
            {load && <Loader spin={"spinnerG"} />}
            {load && <br />}
            <img
              src={cruz}
              alt="CRUZ"
              className="cruz"
              onClick={() => setEliminar(false)}
            />
          </div>
        </div>
      )}
    </Stack>
  );
};

export default NavIcons;
