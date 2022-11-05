import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const FAQ = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const comoVendo = [
    "• En Mi Ropero publicar es Gratis!.",
    "• Prepara la ropa que vas a vender (Tips de ventas)",
    "• Ingresa a la app con tu usuario.",
    "• Selecciona ¿Queres Publicar?",
    "• Agrega las fotos de las prendas que queres vender, podes hacerlo en el momento o subirlas desde la galería (Tips de Fotos)",
    "• Selecciona la Categoría",
    "• Selecciona las características (color, condición, estilo, talle, etc..)",
    "• Elegí un “Nombre para la Publicación”, por Ejemplo: Producto+Marca, o lo que quieras resaltar.",
    "• En Descripción, si queres podes agregar medidas o sumarle mas detalle.",
    "• Ponele precio y cantidad.",
    "• Publícalas!!",
    "• Listo ya tenes Tu Tienda armada (cómo configurar Mi Tienda)",
    "• Si vendes, tenes 5 días hábiles para enviar el pedido si es por OCA o inmediato si el envío es por Moto (antes de las 14hs será en el día y después de las 14hs para el día siguiente), te informaremos por mail. Te recomendamos ver Métodos de Envío.",
    "• Una vez entregado el pedido, te califican ( Lxs Compradorxs tienen 2 días para calificarte), en el caso que no lo hagan, nosotros te calificamos neutral.",
    "• Esta todo OK!, elegí como cobrar o elegí que queres comprarte en Mi Ropero (Como cobro mis ventas)",
  ];
  const miTiendaConfig1 = [
    "• Configurar los datos de la Tienda",
    "• Vas a poder elegir una foto de perfil y ponerle un nombre a tu tienda.",
    "• Vas a poder cargar tu teléfono (este será utilizado para ubicarte en caso de que vendas con envío a domicilio)",
    "• Vas a poder cargar la dirección que vas a utilizar para enviar tus ventas. Es importante que ingreses todos los datos para poder hacer una correcta validación de la dirección. Las direcciones son validadas contra Google Maps.",
  ];
  const miTiendaConfig2 = [
    "• Vas a poder ver el detalle de tus ventas y filtrar por los diferentes estados",
    "• Pago Realizado",
    "• Pendiente de Pago",
    "• Error en Pago",
    "• Pago Devuelto",
    "• Plazo de Pago Vencido",
  ];
  const miTiendaConfig3 = [
    "• No tiene que estar ni rota ni sucia.",
    "• Sin pelotitas en la tela, sin manchas, que no este descocida y que no este rota",
    "• No debe estar arrugada sin planchar (excepto que la tela no se planche).",
    "• Si le falta un botón o el cierre no funciona correctamente ponelo en la descripción del producto para que quien lo compre lo sepa.",
    "• Si modificaste la prenda, avisa!., tenes un espacio de “descripción” que podes hacer todas las aclaraciones que consideres necesarias.",
  ];
  return (
    <div className="FAQPage">
      <div className="FAQBody">
        <Breadcrumbs links={["PREGUNTAS FRECUENTES"]} />
        <p className="title">PREGUNTAS FRECUENTES</p>
        <div className="Questions">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                1. ¿Qué es mi ropero?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="questionTitle">
                Escencia & filosofía
              </Typography>
              <Typography className="answerText">
                La era cambió. La moda cambió. Las tendencias cambiaron. Las
                prioridades también. Hoy estamos ante una generación de
                consumidores conscientes.Ya no se valora un ropero lleno de
                prendas que no cumplen su función y que solo ocupan lugar. Ya no
                se guarda eternamente la ropa para que sea de uso propio, nada
                más. Hoy la ropa se presta, se comparte, se regala, se
                intercambia, se reutiliza; hoy se vende lo que no se usa y se
                compra lo que se busca, algo que nos queda lindo y nos hace
                sentir en libertad.
              </Typography>
              <Typography className="answerText">
                Por eso, los roperos que hoy se valoran son aquellos que tienen
                un significado. Roperos que se abren por completo como la
                extensión de una personalidad y en los que cada prenda es única.
              </Typography>
              <Typography className="answerText">
                Y lograr este tipo de roperos ahora será más fácil, porque vamos
                a poder encontrar y vender ropa en un mismo lugar, sin importar
                nuestro género, talle o estilo.
              </Typography>
              <Typography className="answerText">
                Porque faltaba un lugar en el que se integrara a la diversidad
                junto con la moda y porque hacía falta un mensaje que fomentara
                la revalorización de las prendas usadas, se creó Mi Ropero con
                la solución a dos problemas desde una aplicación para celular:
              </Typography>
              <Typography className="questionTitle">
                1. Ahora fácilmente podemos vender aquello que no usamos y está
                en buen estado.
              </Typography>
              <Typography className="questionTitle">
                2. Ahora fácilmente podemos comprar ropa que hace tiempo
                buscábamos, a buen precio.
              </Typography>
              <Typography className="answerText">
                ¿Quiénes se encuentran en Mi Ropero? Lxs que se visten como
                quieren; lxs que buscan su propio estilo; lxs que se identifican
                con la sustentabilidad; lxs que quieren comprar ropa; lxs que
                quieren venderla; lxs diseñadorxs independientes; lxs
                emprendedorxs de la moda; ¡todxs!
              </Typography>
              <Typography className="answerText">
                A todxs los invitamos a sumarse a Mi Ropero: ropa de muchos
                estilos, talles y géneros.
              </Typography>
              <Typography className="answerText">
                Todxs queremos algo que alguien más tiene, todxs tenemos algo
                que seguro otrx está buscando. Entonces ¡que empiece el
                intercambio! Que empiece el movimiento. Que comience a girar la
                rueda de moda sustentable y circular.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2-content"
              id="panel2-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>2. ¿Cómo lo instalo?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Fácil. Ingresando a www.miropero.com.ar , descargate la app
                (disponibles en IOS y Androide), te registras y listo!
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3-content"
              id="panel3-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>3. ¿Cómo me registro?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Tenes que tener un mail o usuario de Facebook, si tenes IOS
                podes ingresar con tu AppleID
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel4-content"
              id="panel4-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>4. ¿Cómo vendo?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {comoVendo.map((res, i) => (
                <Typography key={i}>{res}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              aria-controls="panel5-content"
              id="panel5-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>4.1. ¿Cómo configuro Mi Tienda?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Para tener una Tienda lo primero que tenes que hacer es Publicar
                un producto. Vas a tener una Tienda asignada si pones productos
                a la venta, si solo compras no tenes Tienda. Una vez que
                cargaste un producto por primera vez, te va a aparecer en el
                Zócalo inferior Mi Tienda.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
