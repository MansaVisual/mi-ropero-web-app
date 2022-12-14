import React from "react";
import {
  Box,
  // Button,
  Typography,
  Stack,
  useMediaQuery,
  Link,
} from "@mui/material";
import theme from "../../styles/theme";
// import { StyledInput } from "../SearchBar/styles";
import { Container } from "@mui/system";
import fiscal from "../../assets/img/fiscal.png";
import MP from "../../assets/img/MP.png";
import { SocialButton, StyledLink } from "./styles";
import {
  FaGooglePlay,
  FaApple,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const footerContent = {
  products: {
    text: ["Ropa", "Calzado", "Accesorios", "Belleza"],
  },
  section: {
    text: [
      { title: "FAQ's", href: "/FAQ" },
      { title: "Términos y condiciones", href: "/terminos&y&condiciones" },
      { title: "Políticas de privacidad", href: "/politica&de&privacidad" },
      { title: "Acerca de Mi Ropero", href: "/acercaDe" },
    ],
  },
};

const Footer = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isFooterTab = useMediaQuery("(max-width: 720px)");
  const navigate = useNavigate();

  return (
    <Box sx={{ fontFamily: theme.typography.fontFamily }}>
      {/* <Box
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
            sx={{
              width: isMobile ? "300px" : "347px",
              fontSize: "11px",
              padding: "0px 16px",
            }}
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
      </Box> */}
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
              {footerContent.products.text.map((item, key) => (
                <StyledLink
                  key={key}
                  id={item}
                  sx={{ mt: isMobile ? "30px" : "12px", lineHeight: "18px" }}
                >
                  {item}
                </StyledLink>
              ))}
              <StyledLink
                sx={{ mt: isMobile ? "30px" : "12px", lineHeight: "18px" }}
                href={"/"}
              >
                Ver todos
              </StyledLink>
            </Box>
            <Box sx={{ pt: isMobile ? "78px" : null, lineHeight: "18px" }}>
              <StyledLink onClick={()=>{localStorage.setItem("returnVenderMR","true");navigate("/Mi&Tienda")}}>VENDER</StyledLink>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {footerContent.section.text.map((item, key) => (
                  <StyledLink
                    key={key}
                    sx={{ mb: isMobile ? "30px" : "12px", lineHeight: "18px", mt:key===0?"12px":"0px"}}
                    href={item.href}
                  >
                    {item.title}
                  </StyledLink>
                ))}
              </Box>
              <Box sx={{ color: "hsla(151, 100%, 76%, 1)" }}>
                <Typography
                  sx={{
                    lineHeight: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/cancelacionCompra")}
                >
                  ME ARREPENTÍ
                </Typography>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/cancelacionCompra")}
                >
                  (solicitud de cancelación de compra)
                </Typography>
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
                <Link
                  href="https://apps.apple.com/us/app/mi-ropero/id1515990319"
                  color="inherit"
                  underline="none"
                  target={"_blank"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SocialButton>
                    <FaApple style={{ fontSize: "16px" }} />
                  </SocialButton>
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=biz.pupila.MiRopero"
                  color="inherit"
                  underline="none"
                  target={"_blank"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SocialButton>
                    <FaGooglePlay style={{ fontSize: "14px" }} />
                  </SocialButton>
                </Link>
              </Stack>
              <Typography pt={isMobile ? "60px" : "26px"}>SEGUÍNOS</Typography>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                pt="15px"
              >
                <Link
                  href="https://www.facebook.com/miroperoapp"
                  color="inherit"
                  underline="none"
                  target={"_blank"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SocialButton>
                    <FaFacebookF style={{ fontSize: "15px" }} />
                  </SocialButton>
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCAFGxJMe8rJQ9LXYd26tnPQ"
                  color="inherit"
                  underline="none"
                  target={"_blank"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SocialButton>
                    <FaYoutube style={{ fontSize: "15px" }} />
                  </SocialButton>
                </Link>
                <Link
                  href="https://www.instagram.com/miroperoapp"
                  color="inherit"
                  underline="none"
                  target={"_blank"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SocialButton>
                    <FaInstagram style={{ fontSize: "15px" }} />
                  </SocialButton>
                </Link>
              </Stack>
            </Box>
            <Box>
              <Stack
                spacing={4}
                direction="row"
                alignItems="baseline"
                pt={isMobile ? "70px" : null}
                justifyContent="center"
              >
                <img
                  style={{ cursor: "pointer" }}
                  src={fiscal}
                  alt="legal-footer"
                  onClick={() =>
                    window.open(
                      "http://qr.afip.gob.ar/?qr=nYOKJGS8W621Tlw64oL2Yg,,"
                    )
                  }
                />
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
