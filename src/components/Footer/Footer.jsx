import React from "react";

import { Box, Button, Typography, Stack, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";
import { StyledInput } from "../SearchBar/styles";
import { Container } from "@mui/system";
import fiscal from "../../assets/fiscal.png";
import pdp from "../../assets/pdp.png";
import MP from "../../assets/MP.png";
import sps from "../../assets/sps.png";
import { SocialButton, StyledLink } from "./styles";
import {
  FaGooglePlay,
  FaApple,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const footerContent = {
  products: {
    text: ["Accesorios", "Belleza", "Calzado", "Ropa", "Ver todos"],
  },
  section: {
    text: ["FAQ's", "Términos y condiciones"],
  },
};

const Footer = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isFooterTab = useMediaQuery("(max-width: 720px)");

  return (
    <Box sx={{ fontFamily: theme.typography.fontFamily }}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: isMobile ? "24px" : "9px",
          paddingBottom: isMobile ? "24px" : "9px",
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 2 : 5}
          alignItems={isMobile ? "center" : null}
        >
          <StyledInput
            placeholder="¡Ingresá tu mail para recibir las últimas novedades!"
            sx={{ width: "347px", fontSize: "11px", padding: "0px 16px" }}
          />
          <Button
            sx={{
              border: "1px solid #BABCBE",
              borderRadius: "100px",
              color: "#BABCBE",
              height: "30px",
              minWidth: "189px",
              padding: "0px 36px 0px 36px",
              fontSize: theme.typography.fontSize[1],
              letterSpacing: "0.8px",
              lineHeight: "30px",
            }}
          >
            SUSCRIBIRME
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "#423B3C",
          paddingBottom: "70px",
          paddingTop: isMobile ? "30px" : "60px",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              flexWrap: isFooterTab ? "wrap" : null,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              fontSize: "13px",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                  lineHeight: "18px",
                }}
              >
                PRODUCTOS
              </Typography>
              {footerContent.products.text.map((item) => (
                <StyledLink
                  sx={{ mt: isMobile ? "30px" : "12px", lineHeight: "18px" }}
                >
                  {item}
                </StyledLink>
              ))}
            </Box>
            <Box sx={{ pt: isMobile ? "78px" : null, lineHeight: "18px" }}>
              <StyledLink>VENDER</StyledLink>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {footerContent.section.text.map((item) => (
                  <StyledLink
                    sx={{ mt: isMobile ? "30px" : "12px", lineHeight: "18px" }}
                  >
                    {item}
                  </StyledLink>
                ))}
              </Box>
              <Box sx={{ color: "hsla(151, 100%, 76%, 1)" }}>
                <Typography
                  sx={{ pt: isMobile ? "69px" : "48px", lineHeight: "14px" }}
                >
                  ME ARREPENTI
                </Typography>
                <Typography>(solicitud de cancelacion de compra)</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                color: "hsla(0, 0%, 100%, 1)",
                textAlign: "center",
                pt: isMobile ? "63px" : null,
              }}
            >
              <Typography>DESCARGÁ LA APP</Typography>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                pt="15px"
              >
                <SocialButton>
                  <FaApple style={{ fontSize: "16px" }} />
                </SocialButton>
                <SocialButton>
                  <FaGooglePlay style={{ fontSize: "14px" }} />
                </SocialButton>
              </Stack>
              <Typography pt={isMobile ? "60px" : "26px"}>SEGUÍNOS</Typography>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                pt="15px"
              >
                <SocialButton>
                  <FaFacebookF style={{ fontSize: "15px" }} />
                </SocialButton>
                <SocialButton>
                  <FaYoutube style={{ fontSize: "15px" }} />
                </SocialButton>
                <SocialButton>
                  <FaInstagram style={{ fontSize: "15px" }} />
                </SocialButton>
              </Stack>
            </Box>
            <Box>
              <Stack
                spacing={4}
                direction="row"
                alignItems="baseline"
                pt={isMobile ? "70px" : null}
                justifyContent={isMobile ? "center" : null}
              >
                <img src={pdp} alt="legal-footer" />
                <img src={sps} alt="legal-footer" />
                <img src={fiscal} alt="legal-footer" />
              </Stack>
              <Stack alignItems="center" sx={{ mt: "40px" }}>
                <img src={MP} alt="legal-footer" width="114px" />
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
