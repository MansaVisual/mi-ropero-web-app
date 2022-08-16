import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Button,
  Container,
  useMediaQuery,
  ClickAwayListener,
  Typography,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import { FiMenu } from "react-icons/fi";

import isologoMR from "../../assets/isologoMR.png";
import SearchBar from "../SearchBar/SearchBar";
import NavIcons from "../NavIcons/NavIcons";
import TabsCategories from "../TabsCategories/TabsCategories";
import theme from "../../styles/theme";
import { AntTab, AntTabs } from "../TabsCategories/styles";

const NavBar = ({ onNavClick }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [openSearch, setOpenSearch] = React.useState(false);

  const handleFocus = () => {
    setOpenSearch(true);
    console.log("abierto");
  };

  const handleClickAway = () => {
    setOpenSearch(false);
    console.log("cerrado");
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const searchTabs = () => {
    if (openSearch) {
      return (
        <Box sx={{ height: "40px", display: "flex", justifyContent: "center" }}>
          <Button>Productos</Button>
          <Button>Ropero</Button>
        </Box>
      );
    }
    return <TabsCategories />;
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 1px 5px rgba(66, 65, 67, 0.1)",
      }}
      elevation={1}
    >
      <Toolbar
        sx={{
          maxWidth: isMobile ? "360px" : null,
          boxShadow: isMobile ? null : "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "48px",
          }}
          maxWidth="xl"
        >
          <Box
            sx={{
              flex: isMobile ? 1 : null,
              paddingRight: { xs: "50px", lg: "225px" },
            }}
          >
            <img src={isologoMR} alt="logo-mi-ropero" />
          </Box>
          {!isMobile ? (
            <>
              <Box>
                <SearchBar
                  placeholder="Buscá por ropero, producto, marca o talle"
                  onFocus={handleFocus}
                  onBlur={handleClickAway}
                />
              </Box>

              <Box sx={{ marginRight: "27px", paddingLeft: "36px" }}>
                <Button
                  sx={{
                    border: "1px solid black",
                    borderRadius: "20px",
                    padding: "6px 25px 6px 25px",
                    fontSize: theme.typography.fontSize[2],
                    fontWeight: theme.typography.fontWeightRegular,
                    lineHeight: "16.34px",
                    color: "hsla(351, 6%, 25%, 1)",
                    height: "31px",
                  }}
                >
                  Vender
                </Button>
              </Box>
            </>
          ) : null}

          <Box>
            <NavIcons />
          </Box>
          {isMobile ? (
            <Box>
              <IconButton sx={{ ml: "13px" }} onClick={handleOpenNavMenu}>
                <FiMenu size={20} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Hola</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
        </Container>
      </Toolbar>

      {isMobile ? (
        <Container maxWidth="sm">
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
        searchTabs()
      )}
    </AppBar>
  );
};

export default NavBar;
