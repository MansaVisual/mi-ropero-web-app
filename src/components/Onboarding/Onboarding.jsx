import React, { useState } from "react";
import { Container, Typography, Stack, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { IoCloseCircle } from "react-icons/io5";
import theme from "../../styles/theme";

const Onboarding = () => {
  const [close, setClose] = useState("flex");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dataOnboarding = [
    {
      number: 1,
      title: "DESCARGÁ LA APP",
      text: "Disponible para iOS y Android",
    },
    {
      number: 2,
      title: "VENDÉ LO QUE NO USAS",
      text: "Vendés. Enviás. Cobrás.",
    },
    {
      number: 3,
      title: "COMPRÁ LO QUE QUERÉS",
      text: "Comprás. Recibís. Disfrutás.",
    },
  ];

  const closeOnBoarding = () => {
    setClose("none");
  };

  return (
    <Box
      sx={{
        boxShadow: "0 1px 5px hsla(270, 1.5%, 25.9%, 0.1)",
        width: "100%",
        display: close,
        position: "relative",
        marginTop: "16px",
      }}
    >
      {!isMobile ? (
        <Container>
          <Box
            sx={{
              position: "absolute",
              right: "5px",
              top: "5px",
              cursor: "pointer",
            }}
          >
            <IoCloseCircle
              size="24px"
              color="hsl(210, 3%, 73.7%)"
              onClick={closeOnBoarding}
            />
          </Box>

          {/* <Stack
            sx={{
              paddingTop: isMobile ? "18px" : "16px",
              paddingBottom: isMobile ? "18px" : "16px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            direction="row"
            spacing={{ xs: 3, md: 5, lg: 8 }}
          >
            {dataOnboarding.map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  "&.MuiBox-root": {
                    marginLeft: "0 !important",
                  },
                }}
                key={index}
              >
                <Box
                  sx={{
                    border: `2.5px solid ${theme.palette.primary.main}`,
                    boxSizing: "border-box",
                    borderRadius: "100px",
                    height: "37px",
                    width: "37px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      lineHeight: "18px",
                    }}
                  >
                    {item.number}
                  </Typography>
                </Box>
                <Box sx={{ pl: "10px" }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: theme.typography.fontSize[4],
                        md: theme.typography.fontSize[6],
                        lg: theme.typography.fontSize[7],
                      },

                      color: theme.palette.primary.main,
                      fontWeight: theme.typography.fontWeightMedium,
                      lineHeight: "18px",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: theme.typography.fontSize[2],
                        md: theme.typography.fontSize[3],
                        lg: theme.typography.fontSize[4],
                      },
                      color: theme.palette.tertiary.main,
                      fontWeight: theme.typography.fontWeightMedium,
                      lineHeight: "12px",
                      marginTop: "7px",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack> */}
        </Container>
      ) : (
        <Box
          sx={{
            scrollSnapType: "x mandatory",
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
          }}
        >
          {dataOnboarding.map((item, index) => (
            <Box
              key={index}
              sx={{
                paddingLeft: isMobile ? "15px" : null,
                paddingTop: isMobile ? "18px" : "16px",
                paddingBottom: isMobile ? "18px" : "16px",
                alignItems: "center",
                justifyContent: "center",
                scrollSnapAlign: "start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "250px",
                }}
              >
                <Box
                  sx={{
                    border: `2.5px solid ${theme.palette.primary.main}`,
                    boxSizing: "border-box",
                    borderRadius: "100px",
                    height: "37px",
                    width: "37px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      lineHeight: "18px",
                    }}
                  >
                    {item.number}
                  </Typography>
                </Box>
                <Box sx={{ pl: "10px" }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: theme.typography.fontSize[4],
                        md: theme.typography.fontSize[6],
                        lg: theme.typography.fontSize[7],
                      },

                      color: theme.palette.primary.main,
                      fontWeight: theme.typography.fontWeightMedium,
                      lineHeight: "18px",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: theme.typography.fontSize[2],
                        md: theme.typography.fontSize[3],
                        lg: theme.typography.fontSize[4],
                      },
                      color: theme.palette.tertiary.main,
                      fontWeight: theme.typography.fontWeightMedium,
                      lineHeight: "12px",
                      marginTop: "7px",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Onboarding;
