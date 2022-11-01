import React, { useState, useContext } from "react";
// import { useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import OCA from "../../assets/img/OCA.png";
import { BiRightArrow } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { CommentButton } from "../ActionButton/ActionButton";
// import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Button from "../Button/Button";
import DialogComponent from "../Dialog/Dialog";
import ofertIcon from "../../assets/img/OfertIcon.svg";
// import OCA from "../../assets/img/OCA.png";
import theme from "../../styles/theme";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../Loader/Loader";
import { UseCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import PopUpOfertaPP from "../Dialog/PopUpOfertaPP";

const ProductBuyBox = ({ prod, itemID }) => {
  // const location = useLocation();
  // const pathnames = location.pathname.split("/").filter((x) => x);
  const [open, setOpen] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const [costoEnvio, setCostoEnvio] = useState([]);
  const [CP, setCP] = useState("");

  const { userLog } = useContext(UseLoginContext);
  const { CartAPI, setCarrito } = useContext(UseCartContext);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenCommentDialog = () => {
    setOpenCommentDialog(true);
  };

  const handleCloseCommentDialog = () => {
    setOpenCommentDialog(false);
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
          } else if (res.status === "error") {
          }
        });
        setLoad(false);
      } else if (res.result === "El producto ya existe en el carrito") {
        alert("El producto ya se encuentra en tu carrito");
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
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[9],
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.quaternary.contrastText,
                  }}
                >
                  ${prod.precio}
                </Typography>
              </Box>
              <Box sx={{ maxWidth: "120px" }}>
                <Button
                  backgroundColor={theme.palette.quinary.main}
                  color={theme.palette.primary.main}
                  text="Ofertar"
                  medium
                  icon={ofertIcon}
                  onClick={handleClickOpen}
                  sx={{ height: "30px" }}
                />
                {open && (
                  <PopUpOfertaPP 
                    open={open}
                    setOpen={setOpen}
                    prod={prod}
                  />
                )}
              </Box>
              <CommentButton onClick={handleClickOpenCommentDialog} />
              {openCommentDialog && (
                <PopUpOfertaPP 
                  open={open}
                  setOpen={setOpen}
                  prod={prod}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: isMobileBigScreen
                  ? costoEnvio.length === 0
                    ? "72px"
                    : "24px"
                  : "72px",
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
                  <div style={{ marginTop: "4px" }}>
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
                mb: "72px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[10],
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.primary.main,
                  }}
                >
                  ${prod.precio}
                </Typography>
                <Box sx={{ mt: "16px" }}>
                  <Button
                    backgroundColor={theme.palette.quinary.main}
                    color={theme.palette.primary.main}
                    text="Ofertar"
                    icon={ofertIcon}
                    onClick={handleClickOpen}
                  />
                  {open && (
                    <PopUpOfertaPP 
                      open={open}
                      setOpen={setOpen}
                      prod={prod}
                    />
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
                    <div style={{ marginTop: "4px" }}>
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
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Button
            backgroundColor="hsla(59, 100%, 60%, 1)"
            color="hsla(351, 6%, 25%, 1)"
            text={load ? <Loader spin={"spinnerM"} /> : "Comprar"}
            endIcon={!load && <FiShoppingCart style={{ fontSize: "18px" }} />}
            onClick={
              userLog === ""
                ? () => navigate("/login")
                : () => handleAgregarCarrito()
            }
            fullWidth
            height
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductBuyBox;
