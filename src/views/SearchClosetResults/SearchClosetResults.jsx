import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import theme from "../../styles/theme";
import ClosetCard from "../../components/ClosetCard/ClosetCard";
import ClosetImagesCard from "../../components/ClosetImagesCard/ClosetImagesCard";
import Onboarding from "../../components/Onboarding/Onboarding";

const SearchClosetResults = () => {
  const { keyword } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  // const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const contacts = [
    {
      name: "Sabrina Gomez",
      avatar: "SG",
      products: 142,
      rating: 1,
      img: require("../../assets/img/fotoProd.png"),
    },
    {
      name: "Romina Cuccini",
      avatar: "RC",
      products: 100,
      rating: 2,
      img: require("../../assets/img/fotoProd.png"),
    },
    {
      name: "Julieta Peralta",
      avatar: "JP",
      products: 50,
      rating: 3,
      img: require("../../assets/img/fotoProd.png"),
    },
  ];

  return (
    <>
      {isMobile ? <></> : <Onboarding />}
      <Box sx={{ px: "74px", py: "40px", display: "flex" }}>
        <Box>
          <Box sx={{ mb: "24px" }}>
            <Breadcrumbs links={pathnames} />
          </Box>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[5],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.tertiary.main,
            }}
          >
            Busqueda de Roperos:
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[9],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.primary.main,
              textTransform: "capitalize",
            }}
          >
            {keyword}
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[4],
              fontWeight: 400,
              color: theme.palette.tertiary.main,
              marginBottom: "30px",
            }}
          >
            Resultado: 3 roperos
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[9],
              fontWeight: theme.typography.fontWeightBold,
              mb: "20px",
              color: theme.palette.secondary.main,
            }}
          >
            Top Roperos 🔥
          </Typography>

          <ClosetCard />
          <ClosetCard />
          <ClosetCard />
        </Box>

        <Box
          sx={{ ml: "24px", display: "flex", flexWrap: "wrap", gap: "30px" }}
        >
          {contacts.map((contact, index) => (
            <ClosetImagesCard key={index} contact={contact} keyword={keyword} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default SearchClosetResults;
