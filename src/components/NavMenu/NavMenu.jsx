import React, { useState, useContext } from "react";
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
  Typography,
} from "@mui/material";
import isologoMR from "../../assets/img/isologoMR2.svg";
import theme from "../../styles/theme";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FiMenu } from "react-icons/fi";
import { UseProdsContext } from "../../context/ProdsContext";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    right: false,
  });

  const { categorias } = useContext(UseProdsContext);

  const [open, setOpen] = useState(true);
  const [clothes, setClothes] = useState("");

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
    setOpen(true);
  };

  const showItems = (category) => {
    let idCatPadre = "";
    if (category === "Ropa") {
      idCatPadre = "1";
    } else if (category === "Calzado") {
      idCatPadre = "2";
    } else if (category === "Accesorios") {
      idCatPadre = "3";
    } else if (category === "Belleza") {
      idCatPadre = "1000018";
    }
    if (!open) {
      return categorias.map((item, index) => {
        return (
          <>
            {item.idcategoriapadre === idCatPadre && (
              <ListItem
                key={index}
                disablePadding
                onClick={() =>
                  navigate(`/productos/${item.nombre.replaceAll("/", "&")}`)
                }
              >
                <ListItemButton>
                  <ListItemText
                    primary={item.nombre}
                    sx={{
                      fontSize: theme.typography.fontSize[4],
                      fontWeight: theme.typography.fontWeightRegular,
                      color: "hsla(210, 3%, 74%, 1)",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </>
        );
      });
    }
  };

  const list = (anchor) => (<>
    <Box
      sx={{
        width: 300,
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
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
          <img src={isologoMR} alt="" />
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <CloseIcon
              sx={{ color: theme.palette.secondary.main, fontSize: "25px" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {!open ? (
        <>
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

          <List sx={{ flex: 1 }}>
            <ListItemText
              sx={{
                fontSize: theme.typography.fontSize[4],
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.secondary.main,
                padding: "0 16px 8px",
              }}
            >
              {clothes}
            </ListItemText>
            {showItems(clothes)}
          </List>
        </>
      ) : (
        <List sx={{ flex: 1 }}>
          {["Ropa", "Calzado", "Accesorios", "Belleza"].map((text, index) => {
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setClothes(text);
                    setOpen(false);
                  }}
                >
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
            );
          })}
          <Typography className="roperosMobile"
            onClick={()=>navigate("/roperos")}
          >ROPEROS</Typography>
          <ListItem
            sx={{
              color: theme.palette.secondary.main,
              fontSize: theme.typography.fontSize[4],
              fontWeight: theme.typography.fontWeightMedium,
            }}
            disablePadding
          ></ListItem>
        </List>
      )}

      <Box className="support-button">
        <Toolbar
          sx={{
            backgroundColor: "hsla(0, 0%, 100%, 1)",
            justifyContent: "center",
            boxShadow: "0 -4px 10px hsla(0, 0%, 0%, 0.2)",
            py: "10px",
            flexDirection:"column"
          }}
        >
          <Button
            sx={{
              border: "0.5px solid #BABCBE",
              borderRadius: "20px",
              fontWeight: theme.typography.fontWeightRegular,
              letterSpacing: "0.8px",
              fontSize: theme.typography.fontSize[2],
              minWidth: "190px",
              marginBottom:"16px",
              color: "white",
              backgroundColor:"rgb(255, 61, 31)",
              "&:hover": {
                backgroundColor: "rgb(255 113 91)",
              }
            }}
            onClick={() => {navigate("/Mi&Tienda");setOpen(false)}}
          >
            Vender
          </Button>
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
    {/* {openVenderPop && <NavBarPopUp setOpenVenderPop={setOpenVenderPop} />} */}
    </>
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
            aria-label="menu"
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
