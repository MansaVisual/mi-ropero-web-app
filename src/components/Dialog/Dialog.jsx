import React, { useState, useEffect,useContext } from "react";
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
import { UseProdsContext } from "../../context/ProdsContext";
import { UseLoginContext } from "../../context/LoginContext";
import Loader from "../Loader/Loader";

const DialogComponent = ({
  open,
  handleClose,
  dialogType,
  firstText,
  firstDialogText,
  title,
  firstInputLabel,
  secondInputLabel,
  thirdInputLabel,
  leftButtonText,
  rightButtonText,
  prod
}) => {
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

  const {ProdAPI}=useContext(UseProdsContext)
  const {userLog}=useContext(UseLoginContext)

  const [load,setLoad]=useState(false)


  const onSubmit = (data) => {
    if (data.title==="¡OFERTÁ!") {
      setLoad(true)
      const oferta=new FormData()
      oferta.append("idcliente",userLog)
      oferta.append("idproducto",prod.idproducto)
      oferta.append("oferta",data.amount)
      oferta.append("mensaje",data.comment)

      ProdAPI(
        oferta,
        "ofertas",
        "insert"
      ).then((res)=>{

        if(res.status==="success"){
          setTimeout(() => {
            setLoad(false)
            handleClose();
            alert("OFERTA ENVIADA")
          }, 1000);
        }else{
          setTimeout(() => {
            setLoad(false)
            alert("OFERTA NO ENVIADA")
          }, 1000);
        }
      })

    }
    if (title==="¡ENVIÁ UN MENSAJE!"){
      setLoad(true)
      const oferta=new FormData()
      oferta.append("idcliente",userLog)
      oferta.append("idproducto",prod.idproducto)
      oferta.append("mensaje",data.comment)

      ProdAPI(
        oferta,
        "mensajes",
        "insert"
      ).then((res)=>{

        if(res.status==="success"){
          setTimeout(() => {
            setLoad(false)
            handleClose();
            alert("MENSAJE ENVIADO")
          }, 1000);
        }else{
          setTimeout(() => {
            setLoad(false)
            alert("MENSAJE NO ENVIADO")
          }, 1000);
        }
      })

    }
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
      sx={{
        "& .MuiPaper-root .MuiDialog-paper": {
          margin: "32px",
        },
      }}
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
          {dialogType === "ofertar" && (errorState || errorStateComment) ? (
            <img src={error} alt="error" />
          ) : (
            dialogType === "ofertar" && <img src={isologo} alt="isologo" />
          )}

          {dialogType === "comentar" && !errorStateComment ? (
            <img src={isologo} alt="logo-mi-ropero" />
          ) : errorStateComment && dialogType === "comentar" ? (
            <img src={error} alt="error" />
          ) : null}

          <Typography
            sx={{
              fontSize: theme.typography.fontSize[5],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.quaternary.contrastText,
              my: "8px",
            }}
          >
            {(dialogType === "ofertar" || dialogType === "comentar") &&
            (errorState || errorStateComment)
              ? "¡ERROR!"
              : title}
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
            {dialogType === "ofertar" && errorState
              ? "El valor ingresado no es válido. No podemos aceptar que ofertes un monto igual a cero o mayor al precio publicado por el vendedor"
              : firstText}
            <br />
            {dialogType === "ofertar" && errorStateComment
              ? "El comentario ingresado no es válido. Recordá que no podés ingresar información de contacto como direcciones de email, números de teléfono, etc"
              : null}
            {dialogType === "comentar" && (
              <Typography>{firstDialogText}</Typography>
            )}
          </Typography>
        </MuiDialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {dialogType === "ofertar" && (
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
                  {dialogType === "ofertar" && firstInputLabel}
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
                    if (value > 0 && value <= Number(prod.precio)) {
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
                    value={value===0?"":value}
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
          )}
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
                {dialogType === "ofertar" && secondInputLabel}
                {dialogType === "comentar" && thirdInputLabel}
              </Typography>
            </DialogContentText>

            <Controller
              name="comment"
              control={control}
              rules={{
                required:true,
                validate: (value) => {
                  if (
                    value.includes("@") ||
                    value.includes("http") ||
                    value.match(/^[0-9]+$/)
                  ) {
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
                  placeholder={
                    dialogType === "ofertar"
                      ? "Ingresar comentario"
                      : "Ingresar mensaje"
                  }
                  multiline
                  sx={{
                    minWidth: isMobile || isMobileBigScreen ? "245px" : "430px",
                    maxWidth: isMobile || isMobileBigScreen ? "295px" : "430px",
                    "& textarea": {
                      padding: "4px 8px",
                      height: "95px !important",
                      boxSizing: "border-box",
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
            text={leftButtonText}
            backgroundColor={theme.palette.secondary.contrastText}
            color={theme.palette.primary.main}
            border={`1px solid ${theme.palette.primary.main}`}
            fullWidth
          />
          {load ?
            <div style={{width:"100%",display:"flex",justifyContent:"center" }}>
                <Loader spin={"spinnerM"} />
            </div>
          :
            <Button
            onClick={handleSubmit(onSubmit)}
            text={rightButtonText}
            backgroundColor={theme.palette.primary.main}
            color={theme.palette.secondary.contrastText}
            fullWidth
            noHover={true}
            />
          }
        </DialogActions>
      </form>
    </MuiDialog>
  );
};

export default DialogComponent;
