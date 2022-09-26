import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BiRightArrow } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { CommentButton } from "../ActionButton/ActionButton";
// import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Button from "../Button/Button";
import DialogComponent from "../Dialog/Dialog";
import ofertIcon from "../../assets/img/OfertIcon.svg";
// import OCA from "../../assets/img/OCA.png";
import theme from "../../styles/theme";

const ProductBuyBox = () => {
  // const location = useLocation();
  // const pathnames = location.pathname.split("/").filter((x) => x);
  const [open, setOpen] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
            Campera deportiva Adidad rosa pastel sin uso, como nueva, talle L
            mangas largas, su calidad es excelente, algodón super suave, tela
            impermedable. Adicolor Colorblock 2022. Edición limitada.
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
                  $23.600,00
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
                  <DialogComponent
                    open={open}
                    handleClose={handleClose}
                    dialogType="ofertar"
                    title="¡OFERTÁ!"
                    firstInputLabel="Monto de la oferta*"
                    secondInputLabel="Comentarios"
                    firstText="Ingresá el monto que querés pagar por este producto. Recordá que debe ser mayor a $0 y menor a $3600"
                    leftButtonText="Cancelar"
                    rightButtonText="Hacer oferta"
                  />
                )}
              </Box>
              <CommentButton onClick={handleClickOpenCommentDialog} />
              {openCommentDialog && (
                <DialogComponent
                  open={openCommentDialog}
                  handleClose={handleCloseCommentDialog}
                  dialogType="comentar"
                  title="¡ENVIÁ UN MENSAJE!"
                  firstDialogText="Sacate todas las dudas que tengas escribiéndole al vendedor/a. Recordá que no podés ingresar información de contacto como direcciones de email, números de teléfono, etc."
                  thirdInputLabel="Tu mensaje para el vendedor/a"
                  leftButtonText="Cancelar"
                  rightButtonText="Enviar mensaje"
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "72px",
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
                <IconButton
                  style={{
                    width: "40px",
                    height: "40px",
                    marginLeft: "8px",
                    borderRadius: "3px",
                    border: "1px solid hsla(210, 3%, 74%, 1)",
                    backgroundColor: "hsla(210, 3%, 74%, 1)",
                  }}
                >
                  <BiRightArrow
                    style={{
                      fontSize: "32px",
                      color: "hsla(0, 0%, 100%, 1)",
                    }}
                  />
                </IconButton>
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
                mb: "80px",
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
                  $23.600,00
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
                    <DialogComponent
                      open={open}
                      handleClose={handleClose}
                      dialogType="ofertar"
                      title="¡OFERTÁ!"
                      firstInputLabel="Monto de la oferta*"
                      secondInputLabel="Comentarios"
                      firstText="Ingresá el monto que querés pagar por este producto. Recordá que debe ser mayor a $0 y menor a $3600"
                      leftButtonText="Cancelar"
                      rightButtonText="Hacer oferta"
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
                  <IconButton
                    style={{
                      width: "32px",
                      height: "32px",
                      marginLeft: "8px",
                      borderRadius: "3px",
                      border: "1px solid hsla(210, 3%, 74%, 1)",
                      backgroundColor: "hsla(210, 3%, 74%, 1)",
                    }}
                  >
                    <BiRightArrow
                      style={{
                        fontSize: "32px",
                        color: "hsla(0, 0%, 100%, 1)",
                      }}
                    />
                  </IconButton>
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

        {/* <Box>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.quaternary.contrastText,
              mb: "18px",
            }}
          >
            Costo de envío a CP 1416
            <Link
              sx={{
                fontSize: theme.typography.fontSize[1],
                fontWeight: theme.typography.fontWeightRegular,
                color: theme.palette.primary.main,
                ml: "16px",
              }}
            >
              Cambiar
            </Link>
          </Typography>
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
            $908,83 a domicilio
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.tertiary.main,
            }}
          >
            $599,71 a sucursal
          </Typography>
        </Box> */}
        {/* </Box> */}

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
            text="Comprar"
            endIcon={<FiShoppingCart style={{ fontSize: "18px" }} />}
            fullWidth
            height
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductBuyBox;
