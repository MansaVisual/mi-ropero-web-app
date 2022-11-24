import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductDetails from "../ProductDetails/ProductDetails";
import theme from "../../styles/theme";

const Accordion = ({ title,prodCaracteristicas }) => {
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
      {prodCaracteristicas !== undefined && prodCaracteristicas.map((carac,index) => (
        <ProductDetails key={index} carac={carac}/>
      ))}
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
