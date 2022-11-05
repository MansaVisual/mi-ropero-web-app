import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const FAQ = () => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="FAQPage">
      <div className="FAQBody">
        <Breadcrumbs links={["PREGUNTAS FRECUENTES"]} />
        <p className="title">PREGUNTAS FRECUENTES</p>
        <div className="bodySection">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                <Typography>1. ¿Qué es mi ropero?</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography>
                  Escencia & filosofía
                </Typography>
                <Typography>
                  La era cambió. La moda cambió. Las tendencias cambiaron. Las prioridades también. Hoy estamos ante una generación de consumidores conscientes.Ya no se valora un ropero lleno de prendas que no cumplen su función y que solo ocupan lugar. Ya no se guarda eternamente la ropa para que sea de uso propio, nada más. Hoy la ropa se presta, se comparte, se regala, se intercambia, se reutiliza; hoy se vende lo que no se usa y se compra lo que se busca, algo que nos queda lindo y nos hace sentir en libertad.
                </Typography>
                <Typography>
                  Por eso, los roperos que hoy se valoran son aquellos que tienen un significado. Roperos que se abren por completo como la extensión de una personalidad y en los que cada prenda es única.
                </Typography>
                <Typography>
                  Y lograr este tipo de roperos ahora será más fácil, porque vamos a poder encontrar y vender ropa en un mismo lugar, sin importar nuestro género, talle o estilo.
                </Typography>
                <Typography>
                  Porque faltaba un lugar en el que se integrara a la diversidad junto con la moda y porque hacía falta un mensaje que fomentara la revalorización de las prendas usadas, se creó Mi Ropero con la solución a dos problemas desde una aplicación para celular:
                </Typography>
                <Typography>
                  1. Ahora fácilmente podemos vender aquello que no usamos y está en buen estado.
                </Typography>
                <Typography>
                  2. Ahora fácilmente podemos comprar ropa que hace tiempo buscábamos, a buen precio.
                </Typography>
                <Typography>
                  ¿Quiénes se encuentran en Mi Ropero? Lxs que se visten como quieren; lxs que buscan su propio estilo; lxs que se identifican con la sustentabilidad; lxs que quieren comprar ropa; lxs que quieren venderla; lxs diseñadorxs independientes; lxs emprendedorxs de la moda; ¡todxs!
                </Typography>
                <Typography>
                  A todxs los invitamos a sumarse a Mi Ropero: ropa de muchos estilos, talles y géneros.
                </Typography>
                <Typography>
                  Todxs queremos algo que alguien más tiene, todxs tenemos algo que seguro otrx está buscando. Entonces ¡que empiece el intercambio! Que empiece el movimiento. Que comience a girar la rueda de moda sustentable y circular.
                </Typography>
              </AccordionDetails>
            </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
