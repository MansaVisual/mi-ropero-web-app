import {
  Box,
  ClickAwayListener,
  Container,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import theme from "../../styles/theme";
import { AntTab, AntTabs } from "./styles";

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Paper
          sx={{ p: 3, maxHeight: "328px", position: "absolute", width: "100%" }}
        >
          <Container maxWidth="xl">
            <Typography>{children}</Typography>
          </Container>
        </Paper>
      )}
    </div>
  );
};

const TabsCategories = () => {
  const [value, setValue] = React.useState(undefined);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickAway = () => {
    setValue(undefined);
  };

  const Ropa = [
    "Abrigos (185)",
    "Bermuda / Short (198)",
    "Blazers (64)",
    "Blusa / top (346)",
    "Buzos (132)",
    "Calzas (67)",
    "Camisas (232)",
    "Camperas (279)",
    "Chalecos (59)",
    "Chombas (13)",
    "Jeans (238)",
    "Monos (46)",
    "Pantalones (246)",
    "Piloto / Trench (17)",
    "Polleras (176)",
    "Remeras (590)",
    "Ropa de dormir (25)",
    "Ropa interior (37)",
    "Sacos (41)",
    "Tejidos (148)",
    "Trajes (12)",
    "Trajes de baño (55)",
    "Vestidos (273)",
    "Vestidos / Fiesta / Coctel (157)",
  ];

  const Calzado = [
    "Botas / Borcegos (171)",
    "Ojotas / Slides / Flats (36)",
    "Plataforma (29)",
    "Sandalias (100)",
    "Zapatillas (241)",
    "Zuecos (24)",
  ];

  const Accesorios = [
    "Abrigos (185)",
    "Aros (10)",
    "Barbijos (4)v",
    "Billeteras (15)",
    "Bufandas / pashminas (22)",
    "Carteras (134)",
    "Cinturones (6)",
    "Collares (25)",
    "Corbatas (0)",
    "Gorras (10)",
    "Medias (1)",
    "Mochilas / Riñoneras (13)",
    "Pulseras (17)",
  ];

  const Belleza = ["Esmaltes (3)", "Perfumes (33)"];

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Box
          sx={{
            bgcolor: theme.palette.primary.main,
            height: "40px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Container sx={{ justifyContent: "center", display: "flex" }}>
            <AntTabs
              value={value}
              onChange={handleChange}
              aria-label="ant example"
            >
              <AntTab label="Ropa" />
              <AntTab label="Calzado" />
              <AntTab label="Accesorios" />
              <AntTab label="Belleza" />
              <Link
                sx={{
                  color: theme.palette.primary.contrastText,
                  textDecoration: "none",
                  alignSelf: "center",
                  fontFamily: theme.typography.fontFamily,
                  fontSize: theme.typography.fontSize[4],
                  padding: "12px 28px",
                  cursor: "pointer",
                  lineHeight: "19.07px",
                }}
                href="#"
              >
                Roperos
              </Link>
            </AntTabs>
          </Container>
        </Box>
        <TabPanel value={value} index={0}>
          {Ropa.map((item, index) => {
            return <Link key={index}>{item}</Link>;
          })}
          <Link>VER TODO</Link>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {Calzado.map((item, index) => {
            return <Link key={index}>{item}</Link>;
          })}
          <Link>VER TODO</Link>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {Accesorios.map((item, index) => {
            return <Link key={index}>{item}</Link>;
          })}
          <Link>VER TODO</Link>
        </TabPanel>
        <TabPanel value={value} index={3}>
          {Belleza.map((item, index) => {
            return <Link key={index}>{item}</Link>;
          })}
          <Link>VER TODO</Link>
        </TabPanel>
      </Box>
    </ClickAwayListener>
  );
};

export default TabsCategories;
