import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  useMediaQuery,
  Link,
  Typography,
  Modal,
  styled,
} from "@mui/material";

import isologoMR from "../../assets/isologoMR.png";
import MRlogoModal from "../../assets/MRlogoModal.png";
import SearchBar from "../SearchBar/SearchBar";
import NavIcons from "../NavIcons/NavIcons";
import TabsCategories from "../TabsCategories/TabsCategories";
import theme from "../../styles/theme";
import NavMenu from "../NavMenu/NavMenu";
import { IoCloseCircle } from "react-icons/io5";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const NavBar = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Offset = styled("div")(({ theme }) => ({ height: "85px" }));

  return (
    <Box sx={{ fontFamily: theme.typography.fontFamily }}>
      {isMobile ? (
        <Box>
          <Toolbar
            className="toolbar-download"
            sx={{
              backgroundColor: theme.palette.primary.main,
              textAlign: "center",
              fontSize: {
                xs: theme.typography.fontSize[1],
                md: theme.typography.fontSize[3],
              },
              fontWeight: theme.typography.fontWeightMedium,
            }}
          >
            <Container sx={{ color: theme.palette.secondary.contrastText }}>
              <Link
                sx={{
                  color: theme.palette.secondary.contrastText,
                  textDecorationColor: theme.palette.secondary.contrastText,
                }}
                onClick={handleOpen}
              >
                DESCARGÁ
              </Link>
              <Typography sx={{ display: "inline" }}>
                {" "}
                LA APP PARA UNA MEJOR EXPERIENCIA
              </Typography>
            </Container>
          </Toolbar>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                backgroundColor: "hsla(0, 0%, 100%, 1)",
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "328px",
                borderRadius: "8px",
                py: "27px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  cursor: "pointer",
                }}
              >
                <IoCloseCircle
                  fontSize="24px"
                  color="#BABCBE"
                  onClick={handleClose}
                />
              </Box>

              <img src={MRlogoModal} alt="" />
              <Typography
                sx={{
                  color: "hsla(0, 0%, 53%, 1)",
                  fontSize: theme.typography.fontSize[5],
                  pt: "10px",
                  pb: "20px",
                }}
              >
                DESCARGÁ LA APP
              </Typography>
              <Typography sx={{ fontSize: theme.typography.fontSize[2] }}>
                Vendé lo que no usás y comprá lo que querés.
              </Typography>
              <Typography
                sx={{
                  color: "hsla(0, 0%, 53%, 1)",
                  fontSize: theme.typography.fontSize[2],
                }}
              >
                Todo desde Mi Ropero
              </Typography>
              <Box sx={{ pt: "24px" }}>
                <Button
                  sx={{
                    mr: "20px",
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => window.open("_blank")}
                >
                  <Box sx={{ pr: "10px", pt: "5px" }}>
                    <FaApple color="grey" size={23} />
                  </Box>
                  <Box
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      color: "hsla(0, 0%, 53%, 1)",
                      fontSize: theme.typography.fontSize[0],
                    }}
                  >
                    <Typography>Descarga desde</Typography>
                    <Typography>APP STORE</Typography>
                  </Box>
                </Button>
                <Button
                  sx={{ boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/search?q=mi%20ropero&c=apps",
                      "_blank"
                    )
                  }
                >
                  <Box sx={{ pr: "10px", pt: "5px" }}>
                    <FaGooglePlay color="grey" size={20} />
                  </Box>
                  <Box
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      color: "hsla(0, 0%, 53%, 1)",
                      fontSize: theme.typography.fontSize[0],
                    }}
                  >
                    <Typography>Descarga desde</Typography>
                    <Typography>GOOGLE PLAY</Typography>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      ) : null}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 1px 5px rgba(66, 65, 67, 0.1)",
        }}
        elevation={1}
      >
        <Toolbar
          sx={{
            maxWidth: { xs: "360px", md: "800px", lg: "100%", xl: "100%" },
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
                paddingRight: { xs: "50px", lg: "60px", xl: "225px" },
              }}
            >
              <Link to="/">
                <img src={isologoMR} alt="logo-mi-ropero" />
              </Link>
            </Box>
            {!isMobile ? (
              <>
                <Box>
                  <SearchBar placeholder="Buscá por ropero, producto, marca o talle" />
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
                <NavMenu />
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
          <TabsCategories />
        )}
      </AppBar>
      <Offset />
    </Box>
  );
};

export default NavBar;
