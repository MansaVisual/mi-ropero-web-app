import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import OCA from "../../assets/img/OCA.png";
import { BiRightArrow } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { CommentButton } from "../ActionButton/ActionButton";
// import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ofertIcon from "../../assets/img/OfertIcon.svg";
// import OCA from "../../assets/img/OCA.png";
import theme from "../../styles/theme";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../Loader/Loader";
import { UseCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import PopUpOfertaPP from "../Dialog/PopUpOfertaPP";
import PopUpMensajePP from "../Dialog/PopUpMensajePP";
import Swal from "sweetalert2";
import MopedIcon from "@mui/icons-material/Moped";
import logo from "../../assets/img/isologo.png";

const ProductBuyBox = ({ prod, itemID }) => {
  const location = useLocation();
  // const pathnames = location.pathname.split("/").filter((x) => x);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const [costoEnvio, setCostoEnvio] = useState([]);
  const [CP, setCP] = useState("");
  const [openMessagePop, setOpenMessagePop] = useState(false);

  const { userLog } = useContext(UseLoginContext);
  const { CartAPI, setCarrito } = useContext(UseCartContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCompraSinLogin = () => {
    if (userLog === "") {
      Swal.fire({
        title: "¡SUMATE A LA MODA CIRCULAR!",
        text: "Para comprar y vender fácilmente necesitás ingresar a Mi Ropero",
        iconHtml: `<img src=${logo} alt="LOGO">`,
        customClass: {
          icon: "no-border",
          container: "popUpLoginAlert",
          cancelButton: "popUpLoginCancel",
        },
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "CONTINUAR",
        cancelButtonText: "CANCELAR",
      }).then((res) => {
        if (res.isConfirmed) {
          localStorage.setItem("redirectUrl", location.pathname);
          navigate("/login");
        }
      });
      return;
    }
  };

  const handleAgregarCarrito = () => {
    setLoad(true);
    const add = new FormData();
    add.append("idcliente", userLog);
    add.append("idproducto", itemID);
    add.append("cantidad", 1);
    CartAPI(add, "carritos", "insert").then((res) => {
      if (res.result === "El producto se agrego correctamente al carrito") {
        const CartID = new FormData();
        CartID.append("idcliente", userLog);
        CartAPI(CartID, "carritos", "all").then((res) => {
          if (res.status === "success") {
            setCarrito(res.result);
            Swal.fire({
              title: "PRODUCTO AÑADIDO",
              text: "El producto se añadió exitosamente",
              icon: "success",
              confirmButtonText: "ACEPTAR",
            });
          }
        });
        setLoad(false);
      } else if (res.result === "El producto ya existe en el carrito") {
        Swal.fire({
          title: "PRODUCTO EN CARRITO",
          text: "El producto ya se encuentra en tu carrito",
          icon: "info",
          confirmButtonText: "ACEPTAR",
        });
        setLoad(false);
      }
    });
  };

  const handleCostoEnvio = () => {
    setLoad2(true);
    setCP("");
    setCostoEnvio([]);
    const envio = new FormData();
    envio.append("idproducto", itemID);
    envio.append(
      "codigo_postal",
      document.getElementById("outlined-number").value
    );
    CartAPI(envio, "productos", "check_shipping_cost").then((res) => {
      setLoad2(false);
      if (res.status === "success") {
        setCostoEnvio(res.result);
        setCP(document.getElementById("outlined-number").value);
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[5],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.tertiary.main,
              mt: "16px",
            }}
          >
            {prod.descripcion}
          </Typography>
        </Box>

        {isMobile || isMobileBigScreen ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "24px",
                mb: "32px",
              }}
            >
              <Box>
                {prod.precio_oferta !== "0.00" ? (
                  <Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          lineHeight: "40px",
                          fontSize: isMobile ? "13px" : "20px",
                          fontWeight: 700,
                          pl: "16px",
                          color: "#443988",
                          textDecoration: `${theme.palette.secondary.main} line-through`,
                          opacity: "0.5",
                        }}
                      >
                        ${prod.precio}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          lineHeight: "40px",
                          fontSize: isMobile ? "13px" : "20px",
                          fontWeight: theme.typography.fontWeightRegular,
                          pl: "16px",
                          color: theme.palette.secondary.main,
                        }}
                      >
                        ${prod.precio_oferta}
                      </Typography>
                    </Box>

                    <Button
                      endIcon={
                        <Avatar
                          src={ofertIcon}
                          sx={{ width: 16, height: 16 }}
                        />
                      }
                      disabled={prod.precio_oferta !== "0.00" ? true : false}
                      onClick={
                        prod.precio_oferta !== "0.00"
                          ? null
                          : userLog !== ""
                          ? () => handleClickOpen()
                          : () => handleCompraSinLogin()
                      }
                      sx={{
                        backgroundColor: "#E7F1FC",
                        boxShadow: "0px 2px 6px rgba(66, 65, 67, 0.1)",
                        borderRadius: "20px",
                        width: "219px",
                        height: "36px",
                        marginTop: "10px",
                        "&:hover": {
                          backgroundColor: "#e7f1fc",
                        },
                      }}
                    >
                      Ofertar
                    </Button>
                    {open && (
                      <PopUpOfertaPP
                        open={open}
                        setOpen={setOpen}
                        prod={prod}
                      />
                    )}
                  </Box>
                ) : (
                  <>
                    <Typography
                      sx={{
                        lineHeight: "40px",
                        fontSize: isMobile ? "13px" : "42px",
                        fontWeight: theme.typography.fontWeightMedium,
                        pl: "16px",
                        color: "#443988",
                      }}
                    >
                      $ {prod.precio}
                    </Typography>
                    <Button
                      endIcon={
                        <Avatar
                          src={ofertIcon}
                          sx={{ width: 16, height: 16 }}
                        />
                      }
                      disabled={prod.precio_oferta !== "0.00" ? true : false}
                      onClick={
                        prod.precio_oferta !== "0.00"
                          ? null
                          : userLog !== ""
                          ? () => handleClickOpen()
                          : () => handleCompraSinLogin()
                      }
                      sx={{
                        backgroundColor: "#E7F1FC",
                        boxShadow: "0px 2px 6px rgba(66, 65, 67, 0.1)",
                        borderRadius: "20px",
                        width: "219px",
                        height: "36px",
                        marginTop: "10px",
                        "&:hover": {
                          backgroundColor: "#e7f1fc",
                        },
                      }}
                    >
                      Ofertar
                    </Button>
                    {open && (
                      <PopUpOfertaPP
                        open={open}
                        setOpen={setOpen}
                        prod={prod}
                      />
                    )}
                  </>
                )}
              </Box>
              {/* <Box sx={{ maxWidth: "120px" }}>
                <Button
                  disabled={prod.precio_oferta !== "0.00" ? true : false}
                  onClick={
                    prod.precio_oferta !== "0.00"
                      ? null
                      : userLog !== ""
                      ? () => handleClickOpen()
                      : () => handleCompraSinLogin()
                  }
                />
                {open && (
                  <PopUpOfertaPP open={open} setOpen={setOpen} prod={prod} />
                )}
              </Box> */}
              <CommentButton
                onClick={
                  userLog === ""
                    ? () => handleCompraSinLogin()
                    : () => setOpenMessagePop(true)
                }
              />
              {openMessagePop && (
                <PopUpMensajePP
                  setOpenMessagePop={setOpenMessagePop}
                  openMessagePop={openMessagePop}
                  prod={prod}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[4],
                    fontWeight: theme.typography.fontWeightRegular,
                    color: theme.palette.quaternary.contrastText,
                  }}
                >
                  Calculá el envío
                </Typography>
                <Typography>
                  <Link
                    href="https://www.correoargentino.com.ar/formularios/cpa"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      fontSize: theme.typography.fontSize[1],
                      fontWeight: theme.typography.fontWeightRegular,
                      color: theme.palette.primary.main,
                    }}
                  >
                    No sé mi código postal
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ whiteSpace: "nowrap" }}>
                <TextField
                  id="outlined-number"
                  type="number"
                  placeholder="Código postal"
                  InputProps={{
                    sx: {
                      "& input": {
                        padding: "8px 10px",
                        height: "40px",
                        boxSizing: "border-box",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "130px",
                      },
                    },
                  }}
                  variant="outlined"
                />
                {load2 ? (
                  <div
                    style={{
                      marginTop: "4px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Loader spin={"spinnerS"} />
                  </div>
                ) : (
                  <IconButton
                    style={{
                      width: "40px",
                      height: "40px",
                      marginLeft: "8px",
                      borderRadius: "3px",
                      border: "1px solid hsla(210, 3%, 74%, 1)",
                      backgroundColor: "hsla(210, 3%, 74%, 1)",
                    }}
                    onClick={() => handleCostoEnvio()}
                  >
                    <BiRightArrow
                      style={{
                        fontSize: "32px",
                        color: "hsla(0, 0%, 100%, 1)",
                      }}
                    />
                  </IconButton>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mt: "24px",
                mb: costoEnvio.length !== 0 ? "24px" : "72px",
              }}
            >
              <Box>
                {prod.precio_oferta !== "0.00" ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      sx={{
                        /* lineHeight: "40px", */
                        fontSize: "24px",
                        fontWeight: theme.typography.fontWeightMedium,
                        pl: "16px",
                        color: "#443988",
                        textDecoration: `${theme.palette.secondary.main} line-through`,
                        opacity: "0.5",
                      }}
                    >
                      ${prod.precio}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        lineHeight: "40px",
                        fontSize: isMobile ? "13px" : "33px",
                        fontWeight: theme.typography.fontWeightRegular,
                        pl: "16px",
                        color: theme.palette.secondary.main,
                      }}
                    >
                      ${prod.precio_oferta}
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      lineHeight: "40px",
                      fontSize: "42px",
                      fontWeight: theme.typography.fontWeightMedium,
                      pl: "16px",
                      color: "#443988",
                    }}
                  >
                    $ {prod.precio}
                  </Typography>
                )}
                <Box sx={{ mt: "16px" }}>
                  <Button
                    endIcon={
                      <Avatar src={ofertIcon} sx={{ width: 16, height: 16 }} />
                    }
                    disabled={prod.precio_oferta !== "0.00" ? true : false}
                    onClick={
                      prod.precio_oferta !== "0.00"
                        ? null
                        : userLog !== ""
                        ? () => handleClickOpen()
                        : () => handleCompraSinLogin()
                    }
                    sx={{
                      backgroundColor: "#E7F1FC",
                      boxShadow: "0px 2px 6px rgba(66, 65, 67, 0.1)",
                      borderRadius: "20px",
                      width: "219px",
                      height: "36px",
                      "&:hover": {
                        backgroundColor: "#e7f1fc",
                      },
                    }}
                  >
                    Ofertar
                  </Button>
                  {open && (
                    <PopUpOfertaPP open={open} setOpen={setOpen} prod={prod} />
                  )}
                </Box>
              </Box>

              <Box sx={{ marginLeft: "14px" }}>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[2],
                    fontWeight: theme.typography.fontWeightRegular,
                    color: theme.palette.quaternary.contrastText,
                    mb: "18px",
                  }}
                >
                  Calculá el envío
                </Typography>
                <Box sx={{ whiteSpace: "nowrap" }}>
                  <TextField
                    id="outlined-number"
                    type="number"
                    placeholder="Código postal"
                    InputProps={{
                      sx: {
                        "& input": {
                          padding: "8px 10px",
                          height: "32px",
                          boxSizing: "border-box",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "168px",
                          minWidth: "100%",
                        },
                      },
                    }}
                    variant="outlined"
                  />
                  {load2 ? (
                    <div
                      style={{
                        marginTop: "4px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Loader spin={"spinnerS"} />
                    </div>
                  ) : (
                    <IconButton
                      style={{
                        width: "32px",
                        height: "32px",
                        marginLeft: "8px",
                        borderRadius: "3px",
                        border: "1px solid hsla(210, 3%, 74%, 1)",
                        backgroundColor: "hsla(210, 3%, 74%, 1)",
                      }}
                      onClick={() => handleCostoEnvio()}
                    >
                      <BiRightArrow
                        style={{
                          fontSize: "32px",
                          color: "hsla(0, 0%, 100%, 1)",
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
                <Typography sx={{ mt: "8px" }}>
                  <Link
                    href="https://www.correoargentino.com.ar/formularios/cpa"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      fontSize: theme.typography.fontSize[1],
                      fontWeight: theme.typography.fontWeightRegular,
                      color: theme.palette.primary.main,
                    }}
                  >
                    No sé mi código postal
                  </Link>
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {costoEnvio.length !== 0 && (
          <>
            <Box
              sx={{
                mb: isMobileBigScreen ? "32px" : "18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize[2],
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.quaternary.contrastText,
                }}
              >
                Costo de envío a CP {CP}
                <Link
                  sx={{
                    fontSize: theme.typography.fontSize[1],
                    fontWeight: theme.typography.fontWeightRegular,
                    color: theme.palette.primary.main,
                    ml: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    document.getElementById("outlined-number").focus()
                  }
                >
                  Cambiar
                </Link>
              </Typography>
              {costoEnvio.moova.status !== "error" && (
                <>
                  <MopedIcon
                    sx={{ fontSize: 40, color: "hsla(248, 41%, 38%, 1)" }}
                  />
                  <Typography
                    sx={{
                      fontSize: theme.typography.fontSize[2],
                      fontWeight: theme.typography.fontWeightRegular,
                      color: theme.palette.tertiary.main,
                      mb: "18px",
                    }}
                  >
                    $500 moto a domicilio
                  </Typography>
                </>
              )}
              <Box>
                <img src={OCA} alt="OCA Logo" />
              </Box>
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize[2],
                  fontWeight: theme.typography.fontWeightRegular,
                  color: theme.palette.tertiary.main,
                }}
              >
                ${" "}
                {Number(costoEnvio.oca_suc_dom.NewDataSet.Table.Precio).toFixed(
                  2
                )}{" "}
                a domicilio
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize[2],
                  fontWeight: theme.typography.fontWeightRegular,
                  color: theme.palette.tertiary.main,
                }}
              >
                ${" "}
                {Number(costoEnvio.oca_suc_suc.NewDataSet.Table.Precio).toFixed(
                  2
                )}{" "}
                a sucursal
              </Typography>
            </Box>
            <Box sx={{ height: "40px" }} />
          </>
        )}

        <Box
          sx={{
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Button
            endIcon={!load && <FiShoppingCart style={{ fontSize: "18px" }} />}
            onClick={
              userLog === ""
                ? () => handleCompraSinLogin()
                : () => handleAgregarCarrito()
            }
            sx={{
              width: "100%",
              backgroundColor: "hsla(59, 100%, 60%, 1)",
              color: "hsla(351, 6%, 25%, 1)",
              boxShadow: " 0px 2px 6px rgba(66, 65, 67, 0.1)",
              borderRadius: " 20px",
              height: "50px",
              fontSize: "16px",
              fontWeight: "700",
              mt: isMobileBigScreen ? "32px" : "0px",
              "&:hover": {
                backgroundColor: "#fffd76",
              },
            }}
          >
            {load ? <Loader spin={"spinnerM"} /> : "Comprar"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductBuyBox;
