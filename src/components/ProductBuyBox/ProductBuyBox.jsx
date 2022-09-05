import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BiRightArrow } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { CommentButton, LikeButton } from "../ActionButton/ActionButton";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Button from "../Button/Button";
import ofertIcon from "../../assets/img/OfertIcon.svg";
import OCA from "../../assets/img/OCA.png";
import theme from "../../styles/theme";

const ProductBuyBox = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box sx={{ mb: "24px" }}>
        <Breadcrumbs links={pathnames} />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[10],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.quaternary.contrastText,
          }}
        >
          Campera deportiva Adicolor Colorblock 2022 Ed. limitada
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <LikeButton />
          <CommentButton />
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: theme.typography.fontSize[5],
          fontWeight: theme.typography.fontWeightRegular,
          color: theme.palette.tertiary.main,
        }}
      >
        Campera deportiva Adidad rosa pastel sin uso, como nueva, talle L mangas
        largas, su calidad es excelente, algodón super suave, tela impermedable.
        Adicolor Colorblock 2022. Edición limitada.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mt: "24px",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[10],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.primary.main,
            }}
          >
            $23.600,00
          </Typography>
          <Box sx={{ mt: "16px" }}>
            <Button
              backgroundColor={theme.palette.quinary.main}
              color={theme.palette.primary.main}
              text="Ofertar"
              icon={ofertIcon}
            />
          </Box>
        </Box>

        {/* <Box>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.quaternary.contrastText,
              mb: "18px",
            }}
          >
            Calculá el envío
          </Typography>
          <Box sx={{ whiteSpace: "nowrap" }}>
            <TextField
              id="outlined-number"
              type="number"
              placeholder="Código postal"
              InputProps={{
                sx: {
                  "& input": {
                    padding: "8px 10px",
                    height: "32px",
                    boxSizing: "border-box",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                },
              }}
              variant="outlined"
            />
            <IconButton
              style={{
                width: "32px",
                height: "32px",
                marginLeft: "8px",
                borderRadius: "3px",
                border: "1px solid hsla(210, 3%, 74%, 1)",
                backgroundColor: "hsla(210, 3%, 74%, 1)",
              }}
            >
              <BiRightArrow
                style={{ fontSize: "32px", color: "hsla(0, 0%, 100%, 1)" }}
              />
            </IconButton>
          </Box>
          <Typography sx={{ mt: "8px" }}>
            <Link
              href="https://www.correoargentino.com.ar/formularios/cpa"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                fontSize: theme.typography.fontSize[1],
                fontWeight: theme.typography.fontWeightRegular,
                color: theme.palette.primary.main,
              }}
            >
              No sé mi código postal
            </Link>
          </Typography>
        </Box> */}

        <Box>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.quaternary.contrastText,
              mb: "18px",
            }}
          >
            Costo de envío a CP 1416
            <Link
              sx={{
                fontSize: theme.typography.fontSize[1],
                fontWeight: theme.typography.fontWeightRegular,
                color: theme.palette.primary.main,
                ml: "16px",
              }}
            >
              Cambiar
            </Link>
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.tertiary.main,
              mb: "18px",
            }}
          >
            $500 moto a domicilio
          </Typography>
          <Box>
            <img src={OCA} alt="OCA Logo" />
          </Box>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.tertiary.main,
            }}
          >
            $908,83 a domicilio
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.fontSize[2],
              fontWeight: theme.typography.fontWeightRegular,
              color: theme.palette.tertiary.main,
            }}
          >
            $599,71 a sucursal
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr",
          gridTemplateAreas: `"button button"`,
          alignItems: "end",
          justifyContent: "center",
          mt: isDesktop ? "120px" : "24px",
        }}
      >
        <Button
          backgroundColor="hsla(59, 100%, 60%, 1)"
          color="hsla(351, 6%, 25%, 1)"
          text="Comprar"
          endIcon={<FiShoppingCart style={{ fontSize: "18px" }} />}
          height
          sx={{ gridArea: "button" }}
        />
      </Box>
    </>
  );
};

export default ProductBuyBox;
