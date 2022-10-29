import React, { useContext } from "react";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { UseLoginContext } from "../../context/LoginContext";

const AvatarMR = ({
  avatarCard,
  avatarRopero,
  handleCloseAvatar,
  datosTienda,
  idTienda,
}) => {
  const navigate = useNavigate();

  const { infoUser } = useContext(UseLoginContext);

  /*   console.log(datosTienda.calificaciones)
   */
  return (
    <Box sx={{ fontFamily: theme.typography.fontFamily }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            height: avatarRopero ? "40px" : "32px",
            width: avatarRopero ? "40px" : "32px",
            backgroundColor: "red",
            filter: avatarCard
              ? "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))"
              : null,
            margin: 0,
            cursor: "pointer",
          }}
          src={datosTienda !== undefined ? datosTienda.icono : infoUser.avatar}
          onClick={
            avatarCard
              ? idTienda !== undefined
                ? () => navigate(`/roperos/${idTienda}/${datosTienda.nombre}`)
                : () =>
                    navigate(
                      `/roperos/${datosTienda.idcliente}/${datosTienda.nombre}`
                    )
              : () => {
                  handleCloseAvatar();
                  navigate("/perfil");
                }
          }
        ></Avatar>
        <Box sx={{ pl: !avatarCard ? "6px" : "10px" }}>
          {!avatarCard ? (
            <Typography
              sx={{
                lineHeight: "16.34px",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={
                avatarCard
                  ? null
                  : () => {
                      handleCloseAvatar();
                      navigate("/perfil");
                    }
              }
            >
              HOLA!
            </Typography>
          ) : null}
          <Typography
            sx={{
              fontSize: "11px",
              color: "hsla(0, 0%, 53%, 1)",
              lineHeight: !avatarCard ? "14.98px" : "20px",
              fontWeight: theme.typography.fontWeightMedium,
              cursor: "pointer",
            }}
            onClick={
              avatarCard
                ? () =>
                    navigate(
                      `/roperos/${datosTienda.idcliente}/${datosTienda.nombre}`
                    )
                : () => {
                    handleCloseAvatar();
                    navigate("/perfil");
                  }
            }
          >
            {avatarCard
              ? datosTienda.nombre
              : infoUser.length !== 0 && infoUser.nombre}
          </Typography>
          {avatarCard ? (
            <Rating
              name="read-only"
              readOnly
              size="small"
              value={
                datosTienda.calificaciones !== undefined &&
                datosTienda.calificaciones.sum !== null &&
                Math.round(
                  Number(datosTienda.calificaciones.sum) /
                    Number(datosTienda.calificaciones.total)
                )
              }
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default AvatarMR;
