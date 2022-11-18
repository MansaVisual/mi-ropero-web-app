import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const ClosetCard = ({ropero}) => {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        maxWidth: 254,
        mb: "16px",
      }}
    >
      <CardContent
        sx={{
          boxSizing: "border-box",
          height: "48px",
          backgroundColor: "hsl(0, 0%, 98.4%)",
          display: "flex",
          alignItems: "center",
          p: "10px",
          paddingBottom: "10px",
          "&:last-child": {
            paddingBottom: "10px",
            cursor:"pointer"
          },
        }}
        onClick={()=>navigate(`/roperos/${ropero.idtienda}/${ropero.nombre}`)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ maxWidth: "230px", display: "flex", alignItems: "center" }}
          >
            <Box sx={{ mr: "8px" }}>🥇</Box>
            <Avatar
              sx={{
                mr: "8px",
                fontSize: theme.typography.fontSize[2],
                backgroundColor: theme.palette.secondary.main,
                width: "32px",
                height: "32px",
              }}
              src={ropero.icono}
            >
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontSize: theme.typography.fontSize[2],
                  fontWeight: theme.typography.fontWeightRegular,
                }}
              >
                {ropero.nombre}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[1],
                    fontWeight: theme.typography.fontWeightRegular,
                    color: theme.palette.tertiary.main,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    mr: "5px",
                  }}
                >
                  {ropero.productos_total} {ropero.productos_total===1?"producto":"productos"}
                </Typography>
                <Rating
                  name="read-only"
                  readOnly
                  value={
                    ropero.calificaciones !== undefined &&
                    ropero.calificaciones.sum !== null &&
                    
                      Number(ropero.calificaciones.sum) /
                      Number(ropero.calificaciones.total)
                    
                  }
                  sx={{ fontSize: theme.typography.fontSize[0] }}
                />
              </Box>
            </Box>
          </Box>

          {/* <Box sx={{ ml: { xs: 0, md: "10px", xl: "10px" } }}>
            <CardActionArea
              onClick={() => setLike(!like)}
              disableTouchRipple
              sx={{ position: "relative" }}
            >
              {!like ? (
                <>
                  <AiOutlineHeart
                    size="26px"
                    color={theme.palette.primary.main}
                  />
                  <Typography
                    component="span"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -70%)",
                      color: `${theme.palette.primary.main}`,
                      fontSize: "9px",
                      fontWeight: 700,
                    }}
                  >
                    24
                  </Typography>
                </>
              ) : (
                <>
                  <AiFillHeart size="26px" color={theme.palette.primary.main} />
                  <Typography
                    component="span"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -70%)",
                      color: `${theme.palette.secondary.contrastText}`,
                      fontSize: "9px",
                      fontWeight: 700,
                    }}
                  >
                    24
                  </Typography>
                </>
              )}
            </CardActionArea>
          </Box>  */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClosetCard;
