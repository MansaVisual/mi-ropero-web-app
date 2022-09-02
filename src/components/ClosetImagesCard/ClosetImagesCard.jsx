import React from "react";
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
} from "@mui/material";
import theme from "../../styles/theme";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const itemData = [
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calzas",
    author: "@bkristastucchio",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calzas",
    author: "@rollelflex_graphy726",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calzas",
    author: "@helloimnik",
  },
];

const ClosetImagesCard = ({
  contact: { name, avatar, products, rating, img },
  keyword,
}) => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/roperos/${keyword}/${name}`);
  };

  return (
    <Box>
      <Box>
        <ImageList
          sx={{
            width: "420px",
            height: "226px",
            position: "relative",
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
                  height: "56px",
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
                      {avatar}
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: theme.typography.fontSize[2],
                          fontWeight: theme.typography.fontWeightRegular,
                        }}
                      >
                        {name}
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
                          {products} productos
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

                  <Box sx={{ ml: "calc(75% - 10px)" }}>
                    <CardActionArea>
                      <AiOutlineHeart
                        size="24px"
                        color={theme.palette.primary.main}
                      />
                    </CardActionArea>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </ImageListItem>
          {itemData.map((item, index) => (
            <Grid key={index}>
              <ImageListItem
                sx={{
                  "&.MuiImageListItem-root .MuiImageListItem-img": {
                    width: "140px",
                    height: "auto",
                  },
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  width="140px"
                  height="150px"
                  loading="lazy"
                />
              </ImageListItem>
            </Grid>
          ))}
        </ImageList>
        <Box sx={{ textAlign: "center" }}>
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
            Ver Ropero de {name}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ClosetImagesCard;
