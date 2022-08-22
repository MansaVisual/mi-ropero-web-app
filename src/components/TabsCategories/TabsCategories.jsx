import {
  Box,
  ClickAwayListener,
  Container,
  Link,
  List,
  ListItem,
  Paper,
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
          <Container maxWidth="xl">{children}</Container>
        </Paper>
      )}
    </div>
  );
};

const TabsCategories = () => {
  const [value, setValue] = React.useState(undefined);

  console.log(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickAway = () => {
    setValue(undefined);
  };

  const Ropa = [
    [
      "Abrigos (185)",
      "Buzos (132)",
      "Chalecos (59)",
      "Pantalones (246)",
      "Ropa de dormir (25)",
      "Trajes (12)",
      "VER TODOS",
    ],
    [
      "Bermuda / Short (198)",
      "Calzas (67)",
      "Chombas (13)",
      "Piloto / Trench (17)",
      "Ropa interior (37)",
      "Trajes de baño (55)",
    ],
    [
      "Blazers (64)",
      "Camisas (232)",
      "Jeans (238)",
      "Polleras (176)",
      "Sacos (41)",
      "Vestidos (273)",
    ],
    [
      "Blusa / top (346)",
      "Camperas (279)",
      "Monos (46)",
      "Remeras (590)",
      "Tejidos (148)",
      "Vestidos / Fiesta / Coctel (157)",
    ],
  ];

  const Calzado = [
    ["Botas / Borcegos (171)", "Zapatillas (241)"],
    ["Ojotas / Slides / Flats (36)", "Zapatos (225)"],
    ["Plataforma (29)", "Zuecos (24)"],
    ["Sandalias (100)", "VER TODOS"],
  ];

  const Accesorios = [
    [
      "Abrigos (185)",
      "Bufandas / pashminas (22)",
      "Corbatas (0)",
      "Pulseras (17)",
    ],
    ["Aros (10)", "Carteras (134)", "Gorras (10)", "VER TODOS"],
    ["Barbijos (4)", "Cinturones (6)", "Medias (1)"],
    ["Billeteras (15)", "Collares (25)", "Mochilas / Riñoneras (13)"],
  ];

  const Belleza = [["Esmaltes (3)"], ["Perfumes (33)"], ["VER TODOS"]];

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ fontFamily: theme.typography.fontFamily }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: theme.typography.fontSize[4],
              lineHeight: "19.07px",
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            {Ropa.map((item, index) => {
              return (
                <List key={index}>
                  {item.map((subItem, sindex) => {
                    return (
                      <ListItem key={sindex}>
                        <Link
                          sx={{
                            color: "hsla(351, 6%, 25%, 1)",
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {subItem}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              );
            })}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: theme.typography.fontSize[4],
              lineHeight: "19.07px",
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            {Calzado.map((item, index) => {
              return (
                <List>
                  {item.map((subItem, sindex) => {
                    return (
                      <ListItem key={sindex}>
                        <Link
                          sx={{
                            color: "hsla(351, 6%, 25%, 1)",
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {subItem}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              );
            })}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: theme.typography.fontSize[4],
              lineHeight: "19.07px",
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            {Accesorios.map((item, index) => {
              return (
                <List>
                  {item.map((subItem, sindex) => {
                    return (
                      <ListItem key={sindex}>
                        <Link
                          sx={{
                            color: "hsla(351, 6%, 25%, 1)",
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {subItem}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              );
            })}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: theme.typography.fontSize[4],
              lineHeight: "19.07px",
              fontWeight: theme.typography.fontWeightRegular,
            }}
          >
            {Belleza.map((item, index) => {
              return (
                <List>
                  {item.map((subItem, sindex) => {
                    return (
                      <ListItem key={sindex}>
                        <Link
                          sx={{
                            color: "hsla(351, 6%, 25%, 1)",
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {subItem}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              );
            })}
          </Box>
        </TabPanel>
      </Box>
    </ClickAwayListener>
  );
};

export default TabsCategories;
