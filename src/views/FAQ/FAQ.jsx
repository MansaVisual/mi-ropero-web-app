import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import foto1 from "../../assets/FAQ/1.png";
import foto2 from "../../assets/FAQ/2.png";

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
  const miTiendaConfig4 = [
    "• Nueva : Cuando nunca la usaste.",
    "• Nueva con Etiqueta. Cuando nunca la usaste y tiene etiqueta.",
    "• Usada. Cuando la usaste y ya no te queda o cambiaste el look.",
    "• No incluyas datos de contacto como mails, teléfonos o link a redes sociales, evita sanciones.",
    "• No podes poner a la venta falsificaciones de marcas.",
  ];
  const miTiendaConfig5 = [
    "La calidad de las imágenes que subas es clave, una buena imagen hace que tu prenda se luzca, que de ganas de comprarla.",
    "Incluí fotos de distintos ángulos para que se puedan ver las características del producto (colores, detalles, texturas, etc.).",
    "Busca sacar la foto con luz natural, que no sea oscura o con exceso de luz, que los colores, el modelo, la textura, se puedan apreciar.",
    "Una prenda se muestra mejor cuando se luce, no pierdas esa posibilidad, sacate fotos usando la prenda.",
    "No incluyas datos de contacto como mails, direcciones, teléfonos o link a redes sociales, ni subas imágenes inapropiadas, evita sanciones.",
  ];
  const comoCompro = [
    "• Comprar en Mi Ropero es Gratis!",
    "• Ingresa con tu usuario",
    "• Escribí que estas buscando.",
    "• Selecciona lo que te gusta",
    "• Sumalas al Carrito.",
    "• Compra.",
    "• Selecciona o carga la dirección donde queres recibir la compra. (Mis Direcciones)",
    "• Selecciona como queres recibirla, puede ser por OCA o servicio de MOTO habilitado para CABA y próximamente GBA (Envío)",
    "• Elegí como pagar: (usamos Mercado Pago)",
    "• Espera a que te lleguen las prendas, te enviaremos un mail con el Link de seguimiento.",
    "• Cuando llega tu pedido asegurate que sea lo que vos seleccionaste y si esta todo OK, no te olvides de calificar al vendedor (Como Calificar)",
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
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel2-content"
              id="panel2-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                2. ¿Cómo lo instalo?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="answerText">
                Fácil. Ingresando a{" "}
                <a href="www.miropero.com.ar">www.miropero.com.ar</a> ,
                descargate la app (disponibles en IOS y Androide), te registras
                y listo!
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel3-content"
              id="panel3-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                3. ¿Cómo me registro?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="answerText">
                Tenes que tener un mail o usuario de Facebook, si tenes IOS
                podes ingresar con tu AppleID
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel4-content"
              id="panel4-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">4. ¿Cómo vendo?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {comoVendo.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
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
              <Typography className="answerText">
                Para tener una Tienda lo primero que tenes que hacer es Publicar
                un producto. Vas a tener una Tienda asignada si pones productos
                a la venta, si solo compras no tenes Tienda.
              </Typography>
              <img src={foto1} alt="foto1" />
              <Typography className="answerText">
                Una vez que cargaste un producto por primera vez, te va a
                aparecer en el Zócalo inferior Mi Tienda.
              </Typography>
              <Typography className="answerText">
                En esta sección vas a poder:
              </Typography>
              <Typography className="questionTitle">Tienda:</Typography>
              {miTiendaConfig1.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
              ))}
              <Typography className="questionTitle">Productos:</Typography>
              <Typography className="answerText">
                • Vas a poder ver los productos que cargaste, vas a poder cargar
                mas productos y hacer modificaciones si lo necesitas o eliminar
                productos que ya no vendes.
              </Typography>
              <Typography className="questionTitle">Ventas:</Typography>
              {miTiendaConfig2.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
              ))}
              <Typography className="questionTitle">Ofertas:</Typography>
              <Typography className="answerText">
                • Vas a poder ver las Ofertas Recibidas que te hicieron
                potenciales vendedorxs y contestar aceptando o contra ofertando.
              </Typography>
              <Typography className="questionTitle">Mensajes:</Typography>
              <Typography className="answerText">
                • Vas a poder ver los mensajes que te enviaron potenciales
                compradorxs
              </Typography>
              <Typography className="questionTitle">Calificaciones:</Typography>
              <Typography className="answerText">
                • Vas a poder ver las calificaciones y comentarios que te
                hicieron tus compradorxs
              </Typography>
              <Typography className="questionTitle">Transferencias:</Typography>
              <Typography className="answerText">
                • Vas a poder ver el detalle de las transferencias que
                solicitaste y el estado.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel6-content"
              id="panel6-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                4.2 Tips de Ventas:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="answerText">
                La primera impresión es lo que cuenta, no pierdas la oportunidad
                de lucir las prendas que queres vender.
              </Typography>
              <Typography className="answerText">
                Usado no significa roto o sucio. Una prenda usada y en buen
                estado es una prenda que le podemos dar una segunda oportunidad.
              </Typography>
              <Typography className="answerText">
                Pensa que quien te compro tu prenda espera recibirla tal cual lo
                detallaste en las características y en las fotos. Ésta será la
                base para tu calificación, acordate que mejor calificado estás
                mas exposición ganas.
              </Typography>
              <Typography className="questionTitle">Ropa usada:</Typography>
              {miTiendaConfig3.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel7-content"
              id="panel7-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                4.2.1 Estado de una Prenda:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {miTiendaConfig4.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel8"}
            onChange={handleChange("panel8")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel8-content"
              id="panel8-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                4.3 Tips de Fotos:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {miTiendaConfig5.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
              ))}
              <Typography className="questionTitle">
                ¿Porque no puedo ver las Fotos de Mi Galería?
              </Typography>
              <Typography className="questionTitle">
                Cuando publicas imágenes tene en cuenta que si no habilitas tu
                celular para que la app MI Ropero puedo ingresara a tu galería
                de fotos, no vas a poder seleccionarlas. Te recomendamos que
                ingreses a la configuración de tu teléfono y verifiques si estas
                habilitando a MI Ropero para que ingrese a tu Galería de Fotos.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel9"}
            onChange={handleChange("panel9")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel9-content"
              id="panel9-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                4.4 ¿Dónde veo el detalle de mis ventas?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="answerText">
                Cuando realizas una venta, es decir cuando el pago esta
                realizado y aprobado, podrás ver tu venta en Mi Tienda/Venta,
                tendrás que filtrar por Pago Realizado y seleccionar el producto
                vendido.
              </Typography>
              <Typography className="answerText">
                En el detalle podrás ver la Fecha en que se realizo la venta y
                el Nro. De Pedido, el producto que vendiste, el detalle del
                envío, la forma de pago y el resumen de la venta, donde podrás
                ver el detalle de la venta y cual es el total de la operación
                (cuanto dinero te queda luego de aplicada nuestra comisión por
                el servicio de venta)
              </Typography>
              <img src={foto2} alt="foto2" />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel10"}
            onChange={handleChange("panel10")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel10-content"
              id="panel10-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                4.5 ¿Cómo realizo el envío?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Una vez que el pago esta realizado se te avisa por mail y por
                notificación que la venta se realizo satisfactoriamente. Deberás
                ingresar a Tienda/Venta seleccionar el producto vendido y
                verificar que medio de envío eligieron.
              </Typography>
              <Typography>Si el Envío es por OCA</Typography>
              <Typography>
                Deberás seleccionar la sucursal desde donde realizaras el envío
                e imprimir la etiqueta, envolve el pedido y pega la etiqueta en
                el exterior del embalaje. Tenes 5 días hábiles para realizar el
                envío.
              </Typography>
              <Typography>Si el Envío es por Moto</Typography>
              <Typography>
                Si la venta se realizo antes de las 14hs, se enviara una moto a
                tu domicilio durante el día. En caso de que la compra se haya
                realizado después de las 14hs, se enviara una moto al día
                siguiente día hábil. Se te enviaran notificaciones/mail
                avisándote que estes atentx a la llegada de la moto.
              </Typography>
              <Typography>
                Envolve el pedido y espera a que llegue la moto.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel11"}
            onChange={handleChange("panel11")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel11-content"
              id="panel11-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                4.5.1 ¿Cómo cobro Mis Ventas?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Una vez que te califiquen de manera satisfactoria, tu comprador
                o nosotros (máximo 48hs), podrás ver disponible tu dinero en Tu
                Tienda/ Cuenta Corriente. En ese momento podrás pedir una
                transferencia a tu cuenta bancaria o podrás utilizar el crédito
                para realizar una compra en Mi Ropero.
              </Typography>
              <Typography>
                En el caso que pidas una transferencia, lo tenes que hacer desde
                Mi Tienda/Cuenta Corriente/Solicitar Transferencia. Deberás
                ingresar los datos de la cuenta donde queres que realicemos la
                transferencia. El dinero solicitado estará disponible en tu
                cuenta bancaria en 48/72hs. dependiendo de cada banco.
              </Typography>
              <Typography>
                Recorda que vas a tener disponible el dinero de la venta (menos
                el 18% de la comisión) luego de una calificación satisfactoria.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel12"}
            onChange={handleChange("panel12")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel12-content"
              id="panel12-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                5. ¿Cómo compro?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Es muy fácil, rápido, seguro y conómico.</Typography>
              {comoCompro.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
              ))}
              <Typography>Listo!. A disfrutar de tu nueva Prenda!</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel13"}
            onChange={handleChange("panel13")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel13-content"
              id="panel13-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                6. Medios de Pago
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Por el momento solo operamos con Mercado Pago, próximamente
                estaremos ampliando con otros Medios de Pago. Al momento de
                realizar el pago se abrirá una pagina que te llevara a Mercado
                Pago para que puedas realizar el pago, con tarjeta de crédito,
                debito, o en efectivo por los medios de pago que propone Mercado
                Pago.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel14"}
            onChange={handleChange("panel14")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel14-content"
              id="panel14-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                6.1. ¿Cuáles son los medios de pago?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="answerText">
                Dependiendo del destino, podrás seleccionar la forma de envío:
                Podes recibir tu pedido en cualquier parte del país, en tu
                domicilio o en una sucursal de OCA . Los envíos se realizan a
                través de Oca y tenes servicio de Moto, por el momento, solo
                para CABA próximamente ampliaremos a GBA. En el proceso de
                compras vas a tener la posibilidad de elegir el método de envío
                disponible .
              </Typography>
              <Typography className="questionTitle">Importante:</Typography>
              <Typography className="answerText">
                Si el Método de envío que seleccionas es “Envío por Moto”, tene
                en cuenta que:
              </Typography>
              <Typography className="answerText">
                • Si compras antes de las 14hs el pedido llega en el día. ( en
                fechas festivas pueden surgir demoras).
              </Typography>
              <Typography className="answerText">
                •Si compras después de las 14hs el pedido se programa para el
                día siguiente.
              </Typography>
              <Typography className="answerText">
                En ambos casos recibirás un mail notificando el día y hora de
                entrega y link de seguimiento.
              </Typography>
              <Typography className="answerText">
                Vendedorxs y Compradxs deberán estar atentos a las
                notificaciones de despacho y entrega.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel15"}
            onChange={handleChange("panel15")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel15-content"
              id="panel15-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                7. Medio de envío
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="questionTitle">Importante:</Typography>
              <Typography className="answerText">
                Si el Método de envío que seleccionas es “Envío por Moto”, tene
                en cuenta que:
              </Typography>
              <Typography className="answerText">
                • Si compras antes de las 14hs el pedido llega en el día. ( en
                fechas festivas pueden surgir demoras).
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
