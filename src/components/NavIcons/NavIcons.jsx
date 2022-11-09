import React, { useState, useEffect, useContext, Fragment } from "react";
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
import {
  // IoStorefrontOutline,
  IoLocationOutline,
} from "react-icons/io5";
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
import MiRoperoNavbar from "../../assets/img/isologo.png";
import iconoMensaje from "../../assets/img/iconMensaje.png";
import Swal from "sweetalert2";
// import MisMensajesNavbar from "../../assets/img/msj2.jpg";

const NavIcons = () => {
  const navigate = useNavigate();

  const { userLog, setUserLog, notis, buscandoNotis } =
    useContext(UseLoginContext);
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
  const [aparece, setAparece] = useState(true);

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
        setAparece(false);
        Swal.fire({
          title: "OCURRIÓ UN ERROR",
          text: "Ocurrio un error al borrar el producto. Volvé a intentarlo",
          icon: "error",
          confirmButtonText: "ACEPTAR",
        }).then(() => setAparece(true));
        setLoad(false);
      }
    });
  };

  const chargeCarrito = () => {
    const CartID = new FormData();

    CartID.append("idcliente", userLog);
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
    // {
    //   title: "Mi tienda",
    //   icon: <IoStorefrontOutline />,
    //   url:"MI TIENDA"
    // },
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
      <>
        {buscandoNotis ? (
          <div
            style={{
              marginTop: "24px",
              marginBottom: "12px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader spin={"spinnerM"} />
          </div>
        ) : notis.length !== 0 ? (
          getMenuBellNotifications()
        ) : (
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
                NO TENÉS NUEVAS NOTIFICACIONES
              </Typography>
              <Box
                sx={{
                  fontWeight: " 600",
                  fontSize: " 11px",
                  lineHeight: "20px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  textDecoration: "underline",
                  color: "#443988",
                  margin: "auto",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleCloseNotif();
                  navigate("/notificaciones");
                }}
              >
                <p>VER TODAS LAS NOTIFICACIONES</p>
              </Box>
            </Box>
          </Stack>
        )}
      </>
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

  const getMenuBellNotifications = () => {
    return (
      <Stack
        sx={{
          p: "10px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          overflowY: "auto",
          maxHeight: "280px",
          "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "hsl(210, 3%, 73.7%)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {notis !== undefined &&
          notis.mensajes.map((item, i) => {
            let url = "";
            let buscarI = "";
            let id = "";
            let itemURL = item.url;

            if (i <= 7) {
              if (itemURL.indexOf("/app/profile-showroom/sales") !== -1) {
                //-----------------------|-------------------------
                url = "/perfil";
              } else if (itemURL.indexOf("/app/profile/messages?id=") !== -1) {
                //---------------|---------------------------------
                buscarI = itemURL.indexOf("/app/profile/messages?id=");
                id = itemURL.substring(buscarI + 25, itemURL.length);
                url = `/perfil/MIS MENSAJES/${id}`;
              } else if (
                itemURL.indexOf("/app/profile-showroom/offers") !== -1
              ) {
                //------------------|------------------------------
                url = "/perfil/OFERTAS REALIZADAS";
              } else if (itemURL.indexOf("idproducto=") !== -1) {
                //--------------------------------|----------------
                buscarI = itemURL.indexOf("idproducto=");
                id = itemURL.substring(buscarI + 11, itemURL.length);
                url = `/productoCard/${id}`;
              } else if (itemURL.indexOf("/app/profile/offers") !== -1) {
                //-------------------|-----------------------------
                url = "/perfil/OFERTAS REALIZADAS";
              } else if (
                itemURL.indexOf("/app/profile/buys-detail?idoperacion=") !== -1
              ) {
                //---------------|---------------------------------
                buscarI = itemURL.indexOf(
                  "/app/profile/buys-detail?idoperacion="
                );
                id = itemURL.substring(buscarI + 45, itemURL.length);
                url = `/perfil/MIS COMPRAS/${id}`;
              } else if (itemURL.indexOf("idtienda=") !== -1) {
                //---------------|---------------------------------
                buscarI = itemURL.indexOf("idtienda=");
                id = itemURL.substring(buscarI + 9, itemURL.length);
                const llamada = new FormData();
                llamada.append("idcliente", userLog);
                llamada.append("idtienda", id);
                CartAPI(llamada, "tiendas", "detail").then((res) => {
                  if (res.status === "success") {
                    url = `/roperos/${id}/${res.result.nombre}`;
                  } else {
                    url = "/roperos";
                  }
                });
              } else if (
                itemURL.indexOf("/app/profile-showroom/offers") !== -1
              ) {
                //-------------------|-----------------------------
                url = "/perfil";
              } else if (
                itemURL.indexOf("/app/profile-showroom/transfers") !== -1
              ) {
                //------------------|------------------------------
                url = "/perfil";
              } else if (itemURL.indexOf("/app/cart") !== -1) {
                //--------------------------|----------------------
                url = "/carrito";
              } else if (itemURL.indexOf("/app/profile-showroom") !== -1) {
                //--------------------|----------------------------
                url = "/perfil";
              } else if (itemURL === "#") {
                url = false;
              } else {
                //--------------------|-----------------------------
                url = itemURL;
              }
            }
            return (
              <Fragment key={i}>
                {i > 7 ? (
                  <></>
                ) : (
                  <Fragment>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        p: "4px 8px",
                        "&:hover": {
                          backgroundColor: "rgb(245 245 245)",
                        },
                      }}
                      key={i}
                      onClick={
                        url === false || url === ""
                          ? null
                          : () => {
                              const not = new FormData();
                              not.append("idpush", item.idpush);
                              CartAPI(not, "pushs", "readed");
                              window.location.assign(`${url}`);
                            }
                      }
                    >
                      {itemURL.indexOf("messagges") !== -1 ? (
                        <Box sx={{ mr: "10px" }}>
                          <img src={iconoMensaje} alt="isologo de Mi Ropero" />
                        </Box>
                      ) : (
                        <Box sx={{ mr: "10px" }}>
                          <img
                            src={MiRoperoNavbar}
                            alt="isologo de Mi Ropero"
                          />
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          maxWidth: "180px",
                        }}
                      >
                        <Typography
                          component="h6"
                          sx={{
                            fontSize: theme.typography.fontSize[1],
                            fontWeight: theme.typography.fontWeightMedium,
                            color: "hsla(351, 6%, 25%, 1)",
                          }}
                        >
                          {item.titulo}
                        </Typography>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: theme.typography.fontSize[1],
                            fontWeight: theme.typography.fontWeightBold,
                            color: "hsla(351, 6%, 25%, 1)",
                            overflowX: "hidden",
                          }}
                        >
                          {item.texto}
                        </Typography>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: theme.typography.fontSize[0],
                            color: theme.palette.tertiary.main,
                          }}
                        >
                          {item.fecha} hs
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: "5px" }} />
                  </Fragment>
                )}
              </Fragment>
            );
          })}
        <Box
          sx={{
            fontWeight: " 600",
            fontSize: " 11px",
            lineHeight: "20px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            textDecoration: "underline",
            color: "#443988",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => {
            handleCloseNotif();
            navigate("/notificaciones");
          }}
        >
          <p>VER TODAS LAS NOTIFICACIONES</p>
        </Box>
      </Stack>
    );
  };

  const getMenuCart = () => {
    return (
      <>
        {buscandoCart ? (
          <div
            style={{
              marginTop: "24px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader spin={"spinnerM"} />
          </div>
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
                <Box
                  sx={{
                    overflowY: "auto",
                    maxHeight: "280px",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                      backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "hsl(210, 3%, 73.7%)",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
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
                        <Fragment key={i}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: "8px",
                              pt: "4px",
                            }}
                            key={i}
                          >
                            <Box
                              sx={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "20px",
                                mr: "8px",
                              }}
                            >
                              <img
                                src={prod.producto_imagen}
                                alt=""
                                width={40}
                                height={40}
                              />
                            </Box>
                            <Box sx={{ minWidth: "130px" }}>
                              <Typography
                                sx={{ fontSize: theme.typography.fontSize[2] }}
                              >
                                {prod.producto.nombre.length > 20
                                  ? prod.producto.nombre.substring(0, 20) +
                                    "..."
                                  : prod.producto.nombre}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: theme.typography.fontSize[0],
                                  color: theme.palette.tertiary.main,
                                }}
                              >
                                {prod.producto.tienda.nombre}
                              </Typography>
                              {prod.producto.precio_oferta === "0.00" ? (
                                <Typography
                                  sx={{
                                    fontSize: theme.typography.fontSize[1],
                                    pt: "6px",
                                  }}
                                >
                                  ${prod.producto.precio}
                                </Typography>
                              ) : (
                                <Box sx={{ display: "flex" }}>
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      textDecoration: "line-through",
                                      pt: "6px",
                                      mr: "6px",
                                    }}
                                  >
                                    ${prod.producto.precio}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: theme.typography.fontSize[2],
                                      pt: "6px",
                                      color: "#FF3F20",
                                    }}
                                  >
                                    ${prod.producto.precio_oferta}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                            <Box>
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
                          <Divider sx={{ py: "4px" }} />
                        </Fragment>
                      );
                    })}
                  </Box>
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
      {userLog !== "" && (
        <IconButton onClick={userLog !== "" && handleClickNotif}>
          <StyledBadge
            badgeContent={notis.mensajes !== undefined ? notis.total : 0}
            color="secondary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <img src={BellNotif} alt="Icono de notificacion" width="17px" />
          </StyledBadge>
        </IconButton>
      )}

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
          badgeContent={0}
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
      {userLog !== "" && (
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
      )}
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
        <div
          className="cartElimianrPopUp"
          style={{ display: aparece ? "flex" : "none" }}
        >
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
            {load && (
              <div
                style={{
                  marginBottom: "24px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader spin={"spinnerG"} />
              </div>
            )}
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
