import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Button,
  Container,
  useMediaQuery,
} from "@mui/material";
import { FiMenu } from "react-icons/fi";

import isologoMR from "../../assets/isologoMR.png";
import SearchBar from "../SearchBar/SearchBar";
import NavIcons from "../NavIcons/NavIcons";
import TabsCategories from "../TabsCategories/TabsCategories";
import theme from "../../styles/theme";

const NavBar = ({ onNavClick }) => {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 1px 5px rgba(66, 65, 67, 0.1)",
      }}
      elevation={1}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "48px",
          boxShadow: isMobile ? "0px 1px 5px rgba(66, 65, 67, 0.1)" : null,
        }}
        maxWidth="xl"
      >
        <Toolbar sx={{ width: isMobile ? "100%" : null }}>
          <Box sx={{ flex: isMobile ? 1 : null , paddingRight: '225px'}}>
            <img src={isologoMR} alt="logo-mi-ropero" />
          </Box>
          {!isMobile ? (
            <React.Fragment>
              <Box>
                <SearchBar placeholder="Buscá por ropero, producto, marca o talle" />
              </Box>
              <Box sx={{marginRight: '27px', paddingLeft: '36px'}}>
                <Button
                  sx={{
                    border: "1px solid black",
                    borderRadius: "20px",
                    padding: "6px 25px 6px 25px",
                    fontSize: theme.typography.fontSize[2],
                    fontWeight: theme.typography.fontWeightRegular,
                    lineHeight: '16.34px',
                    color: "hsla(351, 6%, 25%, 1)",
                    height: "31px",
                  }}
                >
                  Vender
                </Button>
              </Box>
            </React.Fragment>
          ) : null}

          <Box>
            <NavIcons />
          </Box>
          {isMobile ? (
            <IconButton sx={{ ml: "13px" }}>
              <FiMenu size={20} />
            </IconButton>
          ) : null}
        </Toolbar>
      </Container>
      {isMobile ? (
        <Container
          maxWidth="sm"
          sx={{ boxShadow: "0px 1px 5px rgba(66, 65, 67, 0.1)" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0xp 1px 5px rgba(66,65,67,0.1)",
              minHeight: "56px",
            }}
          >
            <SearchBar />
          </Box>
        </Container>
      ) : (
        <TabsCategories />
      )}
    </AppBar>
  );
};

export default NavBar;
