import React, { useState,useContext,Fragment } from "react";
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
import { useNavigate } from 'react-router-dom';
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
          sx={{ p: 3, maxHeight: "328px", position: "absolute", width: "100%" }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Paper>
      )}
    </div>
  );
};

const TabsCategories = () => {
  const navigate = useNavigate();


  const [value, setValue] = useState(undefined);
  const {categorias}=useContext(UseProdsContext)

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
            {categorias.length===0?<Loader spin={"spinnerM"}/>:
              <>
                {categorias.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.idcategoriapadre==="1" &&
                        <List>
                          <ListItem>
                            <Link
                              sx={{
                                color: "hsla(351, 6%, 25%, 1)",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={()=>navigate(`/productos/${(item.nombre).replaceAll("/","&")}`)}
                              >
                              {item.nombre}
                            </Link>
                          </ListItem>
                        </List>
                      }
                    </Fragment>
                  );
                })}
              </>
            }
            <List>
              <ListItem>
                <Link
                  sx={{
                    color: "hsla(351, 6%, 25%, 1)",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={()=>navigate(`/productos/ROPA`)}
                  >
                    {categorias.length!==0&&
                      "VER TODOS"
                    }
                </Link>
              </ListItem>
            </List>
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
            {categorias.length===0?<Loader spin={"spinnerM"}/>:
              <>
                {categorias.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.idcategoriapadre==="2" &&
                        <List key={index}>
                          <ListItem>
                            <Link
                              sx={{
                                color: "hsla(351, 6%, 25%, 1)",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={()=>navigate(`/productos/${(item.nombre).replaceAll("/","&")}`)}
                              >
                              {item.nombre}
                            </Link>
                          </ListItem>
                        </List>
                      }
                    </Fragment>
                  );
                })}
              </>
            }
            <List>
              <ListItem>
                <Link
                  sx={{
                    color: "hsla(351, 6%, 25%, 1)",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={()=>navigate(`/productos/CALZADO`)}
                  >
                    {categorias.length!==0&&
                      "VER TODOS"
                    }
                </Link>
              </ListItem>
            </List>
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
            {categorias.length===0?<Loader spin={"spinnerM"}/>:
              <>
                {categorias.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.idcategoriapadre==="3" &&
                        <List>
                          <ListItem>
                            <Link
                              sx={{
                                color: "hsla(351, 6%, 25%, 1)",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={()=>navigate(`/productos/${(item.nombre).replaceAll("/","&")}`)}
                              >
                              {item.nombre}
                            </Link>
                          </ListItem>
                        </List>
                      }
                    </Fragment>
                  );
                })}
              </>
            }
            <List>
              <ListItem>
                <Link
                  sx={{
                    color: "hsla(351, 6%, 25%, 1)",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={()=>navigate(`/productos/ACCESORIOS`)}
                  >
                    {categorias.length!==0&&
                      "VER TODOS"
                    }
                </Link>
              </ListItem>
            </List>
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
            {categorias.length===0?<Loader spin={"spinnerM"}/>:
              <>
                {categorias.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.idcategoriapadre==="1000018" &&
                        <List key={index}>
                          <ListItem>
                            <Link
                              sx={{
                                color: "hsla(351, 6%, 25%, 1)",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={()=>navigate(`/productos/${(item.nombre).replaceAll("/","&")}`)}
                              >
                              {item.nombre}
                            </Link>
                          </ListItem>
                        </List>
                      }
                    </Fragment>
                  );
                })}
              </>
            }
            <List>
              <ListItem>
                <Link
                  sx={{
                    color: "hsla(351, 6%, 25%, 1)",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={()=>navigate(`/productos/BELLEZA`)}
                  >
                    {categorias.length!==0&&
                      "VER TODOS"
                    }
                </Link>
              </ListItem>
            </List>
          </Box>
        </TabPanel>
      </Box>
    </ClickAwayListener>
  );
};

export default TabsCategories;
