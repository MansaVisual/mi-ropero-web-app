import React, { useState } from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import isologoMR from "../../assets/img/isologoMR.png";
import theme from "../../styles/theme";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FiMenu } from "react-icons/fi";

// const Ropa = [
//   "Abrigos (185)",
//   "Bermuda / Short (198)",
//   "Blazers (64)",
//   "Blusa / top (346)",
//   "Buzos (132)",
//   "Calzas (67)",
//   "Camisas (232)",
//   "Camperas (279)",
//   "Chalecos (59)",
//   "Chombas (13)",
//   "Jeans (238)",
//   "Monos (46)",
//   "Pantalones (246)",
//   "Piloto / Trench (17)",
//   "Polleras (176)",
//   "Remeras (590)",
//   "Ropa de dormir (25)",
//   "Ropa interior (37)",
//   "Sacos (41)",
//   "Tejidos (148)",
//   "Trajes (12)",
//   "Trajes de baño (55)",
//   "Vestidos (273)",
//   "Vestidos / Fiesta / Coctel (157)",
//   "VER TODOS",
// ];

// const Calzado = [
//   "Botas / Borcegos (171)",
//   "Ojotas / Slides / Flats (36)",
//   "Plataforma (29)",
//   "Sandalias (100)",
//   "Zapatillas (241)",
//   "Zuecos (24)",
//   "VER TODOS",
// ];

// const Accesorios = [
//   "Abrigos (185)",
//   "Aros (10)",
//   "Barbijos (4)v",
//   "Billeteras (15)",
//   "Bufandas / pashminas (22)",
//   "Carteras (134)",
//   "Cinturones (6)",
//   "Collares (25)",
//   "Corbatas (0)",
//   "Gorras (10)",
//   "Medias (1)",
//   "Mochilas / Riñoneras (13)",
//   "Pulseras (17)",
//   "VER TODOS",
// ];

// const Belleza = ["Esmaltes (3)", "Perfumes (33)", "VER TODOS"];

const NavMenu = () => {
  const [state, setState] = useState({
    right: false,
  });

  const [open, setOpen] = useState(true);

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
    setOpen(true);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 300, fontFamily: theme.typography.fontFamily }}
      role="presentation"
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar
          sx={{
            backgroundColor: "hsla(0, 0%, 100%, 1)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <img src={isologoMR} alt="" />
          </Box>
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <CloseIcon
              sx={{ color: theme.palette.secondary.main, fontSize: "25px" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {!open ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpen(true)}>
              <ListItemText
                primary={"Volver al menú"}
                sx={{
                  color: "hsla(210, 3%, 74%, 1)",
                  fontSize: theme.typography.fontSize[4],
                }}
              />
              <ListItemIcon sx={{ justifyContent: "end" }}>
                <ChevronLeftIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          {["Ropa", "Calzado", "Accesorios", "Belleza"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setOpen(false)}>
                <ListItemText
                  primary={text}
                  sx={{
                    color: "hsla(0, 0%, 53%, 1)",
                    fontSize: theme.typography.fontSize[4],
                  }}
                />
                <ListItemIcon sx={{ justifyContent: "end" }}>
                  <ChevronRightIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem
            sx={{
              color: theme.palette.secondary.main,
              fontSize: theme.typography.fontSize[4],
              fontWeight: theme.typography.fontWeightMedium,
            }}
            disablePadding
          >
            <ListItemButton>Vender</ListItemButton>
          </ListItem>
        </List>
      )}

      <Box
        sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        className="support-button"
      >
        <Toolbar
          sx={{
            backgroundColor: "hsla(0, 0%, 100%, 1)",
            justifyContent: "center",
            boxShadow: "0px -4px 10px rgba(0,0,0,0.2)",
            py: "10px",
          }}
        >
          <Button
            sx={{
              border: "0.5px solid #BABCBE",
              borderRadius: "20px",
              color: "hsla(0, 0%, 53%, 1)",
              fontWeight: theme.typography.fontWeightRegular,
              letterSpacing: "0.8px",
              fontSize: theme.typography.fontSize[2],
              minWidth: "190px",
            }}
          >
            Soporte
          </Button>
        </Toolbar>
      </Box>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton sx={{ ml: "13px" }} onClick={toggleDrawer(anchor, true)}>
            <FiMenu size={20} />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default NavMenu;
