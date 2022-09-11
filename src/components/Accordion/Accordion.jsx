import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductDetails from "../ProductDetails/ProductDetails";
import theme from "../../styles/theme";

const productDetails = [
  {
    genero: "Unisex",
    talle: "L",
    colores: "Rosa",
    marca: "Adidas",
    condicion: "Nuevo",
    "tipo de tela": "Silver",
    estampado: "Combinado con texturas",
    temporada: "Media estacion",
    estilo: "Deportivo",
    origen: "Importado",
  },
];

const Accordion = ({ title }) => {
  return (
    <MuiAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          sx={{
            fontSize: theme.typography.fontSize[5],
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.tertiary.main,
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          "&.MuiAccordionDetails-root": {
            pb: 0,
          },
        }}
      >
        {Object.entries(productDetails[0]).map(([key, value]) => (
          <ProductDetails key={key} title={key} content={value} />
        ))}
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
