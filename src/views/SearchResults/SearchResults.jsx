import { Box, Container, Link } from "@mui/material";
import React from "react";

import { useParams } from "react-router-dom";
import Onboarding from "../../components/Onboarding/Onboarding";
import Filter from "../../components/Filter/Filter";
import Chip from "../../components/Chip/Chip";
import SliderProd from "../../components/SliderProd/SliderProd";
import theme from "../../styles/theme";

const SearchResults = () => {
  const { keyword } = useParams();

  return (
    <Box sx={{ pb: "84px", backgroundColor: "#FBFBFB" }}>
      <Onboarding />
      <Container maxWidth="xl">
        <Box sx={{ marginTop: "16px" }}>
          <Filter>
            {keyword}
          </Filter>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{mt: '40px'}}>
            <Chip primary>Productos relacionados</Chip>
          </Box>
          <Box sx={{ mt: "24px", mb: "28px" }}>
            <SliderProd />
          </Box>

          <Link
            sx={{
              color: "hsla(0, 0%, 53%, 1)",
              fontSize: theme.typography.fontSize[4],
            }}
          >
            VER TODOS LOS PRODUCTOS RELACIONADOS
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchResults;
