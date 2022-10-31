import React, { useState, useContext, useEffect } from "react";
import {
  ImageList,
  ImageListItem,
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Rating,
  Link,
  CardActionArea,
  Grid,
  useMediaQuery,
} from "@mui/material";
import theme from "../../styles/theme";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UsePerfilContext } from "../../context/PerfilContext";
import { UseLoginContext } from "../../context/LoginContext";

const ClosetImagesCard = ({
  ropero: {
    nombre,
    icono,
    productos,
    calificaciones,
    img,
    idtienda,
    seguidores_count,
    seguidores,
  },
  keyword,
}) => {
  const { PerfilAPI } = useContext(UsePerfilContext);
  const { userLog } = useContext(UseLoginContext);

  const [operando, setOperando] = useState(false);
  const [seg,setSeg]=useState(0)

  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/roperos/${idtienda}/${nombre}`);
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (seguidores !== undefined && userLog !== undefined) {
      for (const i in seguidores) {
        if (seguidores[i] === userLog) {
          setLike(true);
        }
      }
      setSeg(seguidores_count)
    }
  }, [seguidores, userLog]); // eslint-disable-line react-hooks/exhaustive-deps

  const addFollow = () => {
    setOperando(true);
    const follow = new FormData();
    follow.append("idcliente", userLog);
    follow.append("idtienda", idtienda);
    PerfilAPI(follow, "tiendas", "follow").then((res) => {
      const newFollow=new FormData()
      newFollow.append("idtienda",idtienda)
      PerfilAPI(newFollow,"tiendas","detail").then((res)=>{
        setSeg(res.result.seguidores)
        setLike(!like)
        setOperando(false);
      })
    });
  };
  
  const unFollow = () => {
    setOperando(true);
    const follow = new FormData();
    follow.append("idcliente", userLog);
    follow.append("idtienda", idtienda);
    PerfilAPI(follow, "tiendas", "unfollow").then((res) => {
      const newFollow=new FormData()
      newFollow.append("idtienda",idtienda)
      PerfilAPI(newFollow,"tiendas","detail").then((res)=>{
        setSeg(res.result.seguidores)
        setLike(!like)
        setOperando(false);
      })
    });
  };

  return (
    <Box sx={{ maxWidth: { sm: "420px" }, minWidth: { sm: "420px" } }}>
      <Box>
        <ImageList
          sx={{
            position: "relative",
            boxSizing: "border-box",
            minWidth: "270px",
            "&.MuiImageList-root": {
              overflow: "hidden",
              borderRadius: "12px",
              border: "1px solid #e6e6e6",
              margin: 0,
              gap: "0 !important",
            },
          }}
        >
          <ImageListItem key="Subheader" cols={3} rows={2}>
            <Card>
              <CardContent
                sx={{
                  boxSizing: "border-box",
                  height: isMobile || isMobileBigScreen ? "45px" : "56px",
                  backgroundColor: "hsla(210, 77%, 95%, 1)",
                  display: "flex",
                  alignItems: "center",
                  p: "10px",
                  paddingBottom: "10px",
                  "&:last-child": {
                    paddingBottom: "10px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        mr: "8px",
                        fontSize: theme.typography.fontSize[2],
                        backgroundColor: theme.palette.secondary.main,
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/roperos/${idtienda}/${nombre}`)}
                      src={icono}
                    ></Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: theme.typography.fontSize[2],
                          fontWeight: theme.typography.fontWeightRegular,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate(`/roperos/${idtienda}/${nombre}`)
                        }
                      >
                        {nombre}
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
                          {productos.length}{" "}
                          {productos.length === 1 ? "producto" : "productos"}
                        </Typography>
                        <Rating
                          name="read-only"
                          readOnly
                          value={
                            calificaciones !== undefined &&
                            calificaciones.sum !== null &&
                            
                              Number(calificaciones.sum) /
                              Number(calificaciones.total)
                            
                          }
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <CardActionArea
                      disableTouchRipple
                      sx={{
                        position: "relative",
                        pr: "10px",
                        "&:hover":{
                          background:"hsla(210, 77%, 95%, 1)",
                          color:"transparent !important"
                        }
                      }}
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
                              transform: "translate(-100%, -65%)",
                              color: `${theme.palette.primary.main}`,
                              fontSize: "9px",
                              fontWeight: 700,
                            }}
                            onClick={() => addFollow()}
                          >
                            {seg}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <AiFillHeart
                            size="26px"
                            color={theme.palette.primary.main}
                          />
                          <Typography
                            component="span"
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-100%, -65%)",
                              color: `${theme.palette.secondary.contrastText}`,
                              fontSize: "9px",
                              fontWeight: 700,
                            }}
                            onClick={() => unFollow()}
                          >
                            {seg}
                          </Typography>
                        </>
                      )}
                    </CardActionArea>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </ImageListItem>
          {productos.map((item, index) => (
            <Grid key={index}>
              <ImageListItem
                sx={{
                  "&.MuiImageListItem-root .MuiImageListItem-img": {
                    width: isMobile
                      ? "90px"
                      : isMobileBigScreen
                      ? "105px"
                      : "140px",
                    height: "auto",
                  },
                }}
              >
                <img
                  src={item.imagenes[0].imagen_vertical}
                  alt={item.nombre}
                  width="140px"
                  height="150px"
                  loading="lazy"
                />
              </ImageListItem>
            </Grid>
          ))}
        </ImageList>
        <Box sx={{ textAlign: "center", mt: "8px",mb:"16px" }}>
          <Link
            underline="hover"
            href="#"
            onClick={handleClick}
            sx={{
              fontSize: theme.typography.fontSize[4],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.tertiary.main,
              textTransform: "uppercase",
            }}
          >
            Ver {nombre}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ClosetImagesCard;
