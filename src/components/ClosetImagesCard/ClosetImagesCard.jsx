import React, { useState } from "react";
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

const ClosetImagesCard = ({
  ropero: { nombre, icono, productos, rating, img, idtienda },
  keyword,
}) => {
  
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/roperos/${idtienda}/${nombre}`);
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [like, setLike] = useState(false);

  return (
    <Box sx={{ flex: 1, maxWidth: { sm: "420px" },minWidth: { sm: "420px" } }}>
      <Box>
        <ImageList
          sx={{
            position: "relative",
            boxSizing: "border-box",
            "&.MuiImageList-root": {
              overflow: "hidden",
              borderRadius: "12px",
              border: "1px solid #e6e6e6",
              margin: 0,
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
                      }}
                    >
                      {icono}
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: theme.typography.fontSize[2],
                          fontWeight: theme.typography.fontWeightRegular,
                        }}
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
                          {productos.length} {productos.length===1?"producto":"productos"}
                        </Typography>
                        <Rating
                          name="read-only"
                          readOnly
                          value={rating}
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <CardActionArea
                      onClick={() => setLike(!like)}
                      disableTouchRipple
                      sx={{
                        position: "relative",
                        pr: "10px",
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
                          >
                            24
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
                          >
                            24
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
        <Box sx={{ textAlign: "center", mt: "8px" }}>
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
