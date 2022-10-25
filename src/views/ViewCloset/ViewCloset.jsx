import React, { useState,useEffect,useContext } from "react";
import {
  Grid,
  Typography,
  Box,
  Rating,
  useMediaQuery,
  Modal,
  Fade,
  Backdrop,
  Container,
} from "@mui/material";
import Filter from "../../components/Filter/Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChipFilterCategories from "../../components/ChipFilterCategories/ChipFilterCategories";
import Pagination from "../../components/Pagination/Pagination";
import IconGroupText from "../../components/IconGroupText/IconGroupText";
import { FilterButton } from "../../components/ActionButton/ActionButton";
import theme from "../../styles/theme";
import Button from "../../components/Button/Button";
import { UseProdsContext } from "../../context/ProdsContext";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "100%",
  bgcolor: theme.palette.secondary.contrastText,
  boxShadow: 24,
  p: 3,
  borderRadius: "6px",
  zIndex: 10,
  overflowY: "auto",
};

const ViewCloset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const {ProdAPI}=useContext(UseProdsContext)

  const {closetId, nombre}=useParams()


  useEffect(() => {
    if(closetId!==undefined){
      const ropero = new FormData()
      ropero.append("idtienda",closetId)
      ProdAPI(
        ropero,
        "tiendas",
        "get"
      ).then((res)=>console.log(res))
    }
  }, [closetId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2}
        sx={{ px: isMobile || isMobileBigScreen ? "16px" : "74px", py: "40px" }}
      >
        <Grid item xs={12} sm={12} md={3}>
          {isMobile || isMobileBigScreen ? (
            <Box sx={{ mt: "16px" }}>
              <Breadcrumbs links={pathnames} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[9],
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.primary.main,
                  }}
                >
                  Ropero de Romina86
                </Typography>
                <Box sx={{ ml: "25px" }}>
                  <FilterButton onClick={() => setOpen(true)} />
                </Box>
                {open && (
                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="filter-modal-title"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                    sx={{ overflowY: "auto", m: "40px 0", borderRadius: "6px" }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: "16px",
                          }}
                        >
                          <Typography id="filter-modal-title" component="h2">
                            Filtrar
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: theme.typography.fontSize[2],
                              fontWeight: theme.typography.fontWeightRegular,
                              textDecoration: "underline",
                              mt: "12px",
                              mb: "16px",
                            }}
                          >
                            Limpiar filtros
                          </Typography>
                          <Button
                            backgroundColor={theme.palette.primary.main}
                            color={theme.palette.secondary.contrastText}
                            text="APLICAR"
                            small
                            notRounded
                            disabled
                          />
                        </Box>
                        <Filter />
                      </Box>
                    </Fade>
                  </Modal>
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: theme.typography.fontSize[4],
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.tertiary.main,
                    my: "24px",
                  }}
                >
                  La tienda aún no tiene calificaciones
                </Typography>
                <Box sx={{ mb: "36px" }}>
                  <Rating name="read-only" readOnly value={5} size="large" />
                </Box>
              </Box>
              <IconGroupText />
            </Box>
          ) : (
            <>
              <Box sx={{ mt: "16px" }}>
                <Breadcrumbs links={pathnames} />
              </Box>
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
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Grid
            container
            columns={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="flex-start"
            spacing={5}
            sx={{
              ml: isMobile || isMobileBigScreen ? 0 : "30px",
            }}
          >
            {cards.map((card, index) => (
              <Grid item xs="auto" md="auto">
                <ProductCard
                  key={index}
                  productName={card.title}
                  productPrice={card.price}
                  imageCard={card.img}
                  tag={card.tag}
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
    </Container>
  );
};

export default ViewCloset;
