import React from "react";
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
} from "@mui/material";
import isologoMR from "../../assets/img/isologoMR.png";
import { IoCloseCircle } from "react-icons/io5";
import Button from "../Button/Button";
import theme from "../../styles/theme";

const DialogComponent = ({ open, handleClose }) => {
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
        <img src={isologoMR} alt="logo-mi-ropero" />
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[5],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.quaternary.contrastText,
            my: "8px",
          }}
        >
          ¡OFERTÁ!
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
          Ingresá el monto que querés pagar por este producto.Recordá que debe
          ser mayor a $0 y menos a $3600
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
          <TextField
            autoFocus
            margin="dense"
            type="number"
            placeholder="$ Ingresar valor"
            sx={{
              "& input": {
                padding: "4px 8px",
                height: "40px",
                boxSizing: "border-box",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                borderRadius: "8px",
                minWidth: "130px",
              },
            }}
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
          <TextField
            margin="dense"
            placeholder="Ingresar comentario"
            multiline
            sx={{
              "& textarea": {
                padding: "4px 8px",
                height: "95px !important",
                boxSizing: "border-box",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                borderRadius: "8px",
                minWidth: "430px",
              },
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          text="Cancelar"
          backgroundColor={theme.palette.secondary.contrastText}
          color={theme.palette.primary.main}
          border={`1px solid ${theme.palette.primary.main}`}
          fullWidth
        />
        <Button
          text="Hacer Oferta"
          backgroundColor={theme.palette.primary.main}
          color={theme.palette.secondary.contrastText}
          fullWidth
        />
      </DialogActions>
    </MuiDialog>
  );
};

export default DialogComponent;
