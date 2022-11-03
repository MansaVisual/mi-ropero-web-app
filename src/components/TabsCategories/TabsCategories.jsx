import React, { useState, useContext, Fragment } from "react";
import {
  Box,
  ClickAwayListener,
  Container,
  Link,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { AntTab, AntTabs } from "./styles";
import theme from "../../styles/theme";
import { UseProdsContext } from "../../context/ProdsContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

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
          sx={{
            p: 3,
            maxHeight: "328px",
            position: "absolute",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {children}
        </Paper>
      )}
    </div>
  );
};

const TabsCategories = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(undefined);
  const { categorias } = useContext(UseProdsContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickAway = () => {
    setValue(undefined);
  };

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
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntTabs
              value={value}
              onChange={handleChange}
              aria-label="ant example"
            >
              <AntTab label="Ropa" id="ROPA" />
              <AntTab label="Calzado" id="CALZADO" />
              <AntTab label="Accesorios" id="ACCESORIOS" />
              <AntTab label="Belleza" id="BELLEZA" />
              <Link
                sx={{
                  color: theme.palette.primary.contrastText,
                  textDecoration: "none",
                  alignSelf: "center",
                  fontSize: theme.typography.fontSize[4],
                  padding: "6px 28px",
                  cursor: "pointer",
                  lineHeight: "19.07px",
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => navigate("/roperos")}
              >
                Roperos
              </Link>
            </AntTabs>
          </Container>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              maxHeight: "328px",
              fontSize: theme.typography.fontSize[4],
              lineHeight: "19.07px",
              fontWeight: theme.typography.fontWeightRegular,
              padding: {
                xs: "0px 48px",
                md: "0px 70px",
                lg: "0px 90px",
                xl: "0px 80px",
              },
              maxWidth: "1179px",
              width: "100%",
            }}
          >
            {categorias.length === 0 ? (
              <Loader spin={"spinnerM"} />
            ) : (
              <>
                {categorias.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.idcategoriapadre === "1" && (
                        <List>
                          <ListItem>
                            <Link
                              sx={{
                                color: "hsla(351, 6%, 25%, 1)",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={() => {
                                navigate(
                                  `/productos/${item.nombre.replaceAll(
                                    "/",
                                    "&"
                                  )}`
                                );
                                handleClickAway();
                              }}
                            >
                              {item.nombre}
                            </Link>
                          </ListItem>
                        </List>
                      )}
                    </Fragment>
                  );
                })}
              </>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              maxHeight: "328px",
              fontSize: theme.typography.fontSize[4],
              lineHeight: "19.07px",
              fontWeight: theme.typography.fontWeightRegular,
              padding: {
                xs: "0px 48px",
                md: "0px 70px",
                lg: "0px 90px",
                xl: "0px 80px",
              },
              maxWidth: "1179px",
              width: "100%",
            }}
          >
            {categorias.length === 0 ? (
              <Loader spin={"spinnerM"} />
            ) : (
              <>
                {categorias.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.idcategoriapadre === "2" && (
                        <List key={index}>
                          <ListItem>
                            <Link
                              sx={{
                                color: "hsla(351, 6%, 25%, 1)",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={() => {
                                navigate(
                                  `/productos/${item.nombre.replaceAll(
                                    "/",
                                    "&"
                                  )}`
                                );
                                handleClickAway();
                              }}
                            >
                              {item.nombre}
                            </Link>
                          </ListItem>
                        </List>
                      )}
                    </Fragment>
                  );
                })}
              </>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              maxHeight: "328px",
              fontSize: theme.typography.fontSize[4],
              lineHeight: "19.07px",
              fontWeight: theme.typography.fontWeightRegular,
              padding: {
                xs: "0px 48px",
                md: "0px 70px",
                lg: "0px 90px",
                xl: "0px 80px",
                maxWidth: "1179px",
                width: "100%",
              },
            }}
          >
            {categorias.length === 0 ? (
              <Loader spin={"spinnerM"} />
            ) : (
              <>
                {categorias.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.idcategoriapadre === "3" && (
                        <List>
                          <ListItem>
                            <Link
                              sx={{
                                color: "hsla(351, 6%, 25%, 1)",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={() => {
                                navigate(
                                  `/productos/${item.nombre.replaceAll(
                                    "/",
                                    "&"
                                  )}`
                                );
                                handleClickAway();
                              }}
                            >
                              {item.nombre}
                            </Link>
                          </ListItem>
                        </List>
                      )}
                    </Fragment>
                  );
                })}
              </>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              maxHeight: "328px",
              fontSize: theme.typography.fontSize[4],
              lineHeight: "19.07px",
              fontWeight: theme.typography.fontWeightRegular,
              padding: {
                xs: "0px 48px",
                md: "0px 70px",
                lg: "0px 90px",
                xl: "0px 80px",
                maxWidth: "1179px",
                width: "100%",
              },
            }}
          >
            {categorias.length === 0 ? (
              <Loader spin={"spinnerM"} />
            ) : (
              <>
                {categorias.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.idcategoriapadre === "1000018" && (
                        <List key={index}>
                          <ListItem>
                            <Link
                              sx={{
                                color: "hsla(351, 6%, 25%, 1)",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={() => {
                                navigate(
                                  `/productos/${item.nombre.replaceAll(
                                    "/",
                                    "&"
                                  )}`
                                );
                                handleClickAway();
                              }}
                            >
                              {item.nombre}
                            </Link>
                          </ListItem>
                        </List>
                      )}
                    </Fragment>
                  );
                })}
              </>
            )}
          </Box>
        </TabPanel>
      </Box>
    </ClickAwayListener>
  );
};

export default TabsCategories;
