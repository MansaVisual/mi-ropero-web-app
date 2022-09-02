import React from "react";
import { Grid, Typography, Box, Rating } from "@mui/material";
import Filter from "../../components/Filter/Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import ChipFilterCategories from "../../components/ChipFilterCategories/ChipFilterCategories";
import Pagination from "../../components/Pagination/Pagination";
import IconGroupText from "../../components/IconGroupText/IconGroupText";
import theme from "../../styles/theme";

export const cards = [
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: "$2000",
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: "$2000",
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: "$2000",
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: "$2000",
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: "$2000",
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: "$2000",
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: "$2000",
    tag: "NUEVO",
  },
  {
    img: require("../../assets/img/fotoProd.png"),
    title: "Calza Adidas 2022",
    price: "$2000",
    tag: "NUEVO",
  },
];

const ViewCloset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "30px 74px",
      }}
    >
      <Grid item xs={12} md={3}>
        <Breadcrumbs links={pathnames} />
        <ChipFilterCategories />
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[2],
            fontWeight: theme.typography.fontWeightRegular,
            textDecoration: "underline",
            mt: "12px",
            mb: "16px",
          }}
        >
          Limpiar todos los filtros
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[9],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.primary.main,
            mb: "16px",
          }}
        >
          Ropero de Romina86
        </Typography>
        <Rating name="read-only" readOnly value={5} size="large" />
        <IconGroupText />
        <Filter />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2} sx={{ ml: "30px", gap: "40px" }}>
          {cards.map((card, index) => (
            <Grid item xs={12} md={6} lg={4}>
              <ProductCard
                key={index}
                productName={card.title}
                productPrice={card.price}
                imageCard={card.img}
                tag={card.tag}
                onClick={() => {
                  navigate(
                    `/${pathnames[0]}/${pathnames[1]}/${pathnames[2]}/${card.title}`
                  );
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "40px",
          }}
        >
          <Pagination />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ViewCloset;
