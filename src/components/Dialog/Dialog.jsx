import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import isologo from "../../assets/img/isologo.png";
import error from "../../assets/img/error.png";
import { useForm, Controller } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";
import Button from "../Button/Button";
import theme from "../../styles/theme";

const DialogComponent = ({ open, handleClose }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      amount: 0,
      comment: "",
    },
  });
  const [errorState, setErrorState] = useState(false);
  const [errorStateComment, setErrorStateComment] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleError = (isTrue) => {
    setErrorState(isTrue);
  };

  const handleErrorComment = (isTrue) => {
    setErrorStateComment(isTrue);
  };

  useEffect(() => {
    if (errorState) {
      handleError(false);
    } else if (errorStateComment) {
      handleErrorComment(false);
    }
  }, [errorState, errorStateComment]);

  const MuiDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: "24px",
    },
    "& .MuiDialogActions-root": {
      padding: "24px",
    },
  }));

  const MuiDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <IoCloseCircle size="24px" color="hsl(210, 3%, 73.7%)" />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <MuiDialogTitle
          id="responsive-dialog-title"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "&.MuiTypography-root-MuiDialogTitle-root": {
              pt: "24px !important",
            },
          }}
          onClose={handleClose}
        >
          {errorState || errorStateComment ? (
            <img src={error} alt="error" />
          ) : (
            <img src={isologo} alt="logo-mi-ropero" />
          )}

          <Typography
            sx={{
              fontSize: theme.typography.fontSize[5],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.quaternary.contrastText,
              my: "8px",
            }}
          >
            {errorState || errorStateComment ? "¡ERROR!" : "¡OFERTÁ!"}
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.tertiary.main,
              maxWidth: "360px",
              textAlign: "center",
            }}
          >
            {errorState
              ? "El valor ingresado no es válido. No podemos aceptar que ofertes un monto mayor al precio publicado por el vendedor"
              : "Ingresá el monto que querés pagar por este producto. Recordá que debe ser mayor a $0 y menor a $3600"}
            <br />
            {errorStateComment
              ? "El comentario ingresado no es válido. Recordá que no podés ingresar información de contacto como direcciones de email, números de teléfono, etc"
              : null}
          </Typography>
        </MuiDialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ mt: "24px" }}>
            <DialogContentText sx={{ textAlign: "center" }}>
              <Typography
                component="label"
                sx={{
                  fontSize: theme.typography.fontSize[5],
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.quaternary.contrastText,
                }}
              >
                Monto de la oferta*
              </Typography>
            </DialogContentText>

            <Controller
              name="amount"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                },
                validate: (value) => {
                  if (value > 0 && value < 3600) {
                    return true;
                  } else {
                    return false;
                  }
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="dense"
                  type="number"
                  placeholder="$ Ingresar valor"
                  onChange={onChange}
                  value={value}
                  error={
                    error?.type === "required" ||
                    error?.type === "pattern" ||
                    error?.type === "validate"
                      ? (handleError(true), true)
                      : (handleError(false), false)
                  }
                  sx={{
                    "& input": {
                      padding: "4px 8px",
                      height: "40px",
                      boxSizing: "border-box",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      borderRadius: "8px",
                      minWidth: "136px",
                    },
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl sx={{ mt: "16px" }}>
            <DialogContentText sx={{ textAlign: "center" }}>
              <Typography
                component="label"
                sx={{
                  fontSize: theme.typography.fontSize[5],
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.quaternary.contrastText,
                }}
              >
                Comentarios
              </Typography>
            </DialogContentText>

            <Controller
              name="comment"
              control={control}
              rules={{
                required: true,
                validate: (value) => {
                  if (value.includes("@") || value.includes("http")) {
                    return false;
                  } else {
                    return true;
                  }
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="dense"
                  type="text"
                  onChange={onChange}
                  value={value}
                  error={
                    error?.type === "required" || error?.type === "validate"
                      ? (handleErrorComment(true), true)
                      : (handleErrorComment(false), false)
                  }
                  placeholder="Ingresar comentario"
                  multiline
                  sx={{
                    minWidth: isMobile || isMobileBigScreen ? "245px" : "430px",
                    maxWidth: isMobile || isMobileBigScreen ? "295px" : "430px",
                    "& textarea": {
                      padding: "4px 8px",
                      height: "95px !important",
                      boxSizing: "border-box",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      borderRadius: "8px",
                    },
                  }}
                />
              )}
            />
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection:
              isMobile || isMobileBigScreen ? "column-reverse" : "row",
            justifyContent: "center",
            alignItems: "center",
            "&.MuiDialogActions-root >:not(:first-of-type)": {
              ml: isMobile || isMobileBigScreen ? "0 !important" : "16px",
              mb: isMobile || isMobileBigScreen ? "16px" : "0",
            },
          }}
        >
          <Button
            onClick={handleClose}
            text="Cancelar"
            backgroundColor={theme.palette.secondary.contrastText}
            color={theme.palette.primary.main}
            border={`1px solid ${theme.palette.primary.main}`}
            fullWidth
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            text="Hacer Oferta"
            backgroundColor={theme.palette.primary.main}
            color={theme.palette.secondary.contrastText}
            fullWidth
          />
        </DialogActions>
      </form>
    </MuiDialog>
  );
};

export default DialogComponent;
