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
import foto3 from "../../assets/FAQ/3.png";
import foto4 from "../../assets/FAQ/4.png";
import foto5 from "../../assets/FAQ/5.png";
import foto6 from "../../assets/FAQ/6.png";
import foto7 from "../../assets/FAQ/7.png";
import foto8 from "../../assets/FAQ/8.png";
import leftArrow from "../../assets/img/leftArrow.png";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const [expanded, setExpanded] = React.useState("panel1");
  const [time, setTime] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (panel) => (event, newExpanded) => {
    setTime(true);
    setExpanded(newExpanded ? panel : false);
    setTimeout(() => {
      setTime(false);
    }, 200);
  };

  const handleClick = (data) => {
    setTimeout(() => {
      handleChange(data);
    }, 100);
  };

  const comoVendo = [
    "• En Mi Ropero publicar es Gratis!.",
    "",
    "• Ingresa a la app con tu usuario.",
    "• Selecciona ¿Queres Publicar?",
    "",
    "• Selecciona la Categoría",
    "• Selecciona las características (color, condición, estilo, talle, etc..)",
    "• Elegí un “Nombre para la Publicación”, por Ejemplo: Producto+Marca, o lo que quieras resaltar.",
    "• En Descripción, si queres podes agregar medidas o sumarle mas detalle.",
    "• Ponele precio y cantidad.",
    "• Publícalas!!",
    "",
    "",
    "• Una vez entregado el pedido, te califican ( Lxs Compradorxs tienen 2 días para calificarte), en el caso que no lo hagan, nosotros te calificamos neutral.",
    "",
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
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
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
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
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
              <Typography className="questionTitle" id="configTienda">
                3. ¿Cómo me registro?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
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
              <Typography className="questionTitle" id="TipParaVentas">
                4. ¿Cómo vendo?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              {comoVendo.map((res, i) => (
                <>
                  {i === 1 ? (
                    <Typography className="answerText" key={i}>
                      • Prepara la ropa que vas a vender (
                      <a
                        onClickCapture={handleChange("panel6")}
                        href="#TipParaVentas"
                      >
                        Tips de ventas
                      </a>
                      )
                    </Typography>
                  ) : i === 4 ? (
                    <Typography className="answerText" key={i}>
                      • Agrega las fotos de las prendas que queres vender, podes
                      hacerlo en el momento o subirlas desde la galería (
                      <a
                        onClickCapture={handleChange("panel6")}
                        href="#TipParaFotos"
                      >
                        Tips de Fotos
                      </a>
                      )
                    </Typography>
                  ) : i === 11 ? (
                    <Typography className="answerText" key={i}>
                      • Listo ya tenes Tu Tienda armada (
                      <a
                        onClickCapture={handleChange("panel6")}
                        href="#configTienda"
                      >
                        cómo configurar Mi Tienda
                      </a>
                      )
                    </Typography>
                  ) : i === 12 ? (
                    <Typography className="answerText" key={i}>
                      • Si vendes, tenes 5 días hábiles para enviar el pedido si
                      es por OCA o inmediato si el envío es por Moto (antes de
                      las 14hs será en el día y después de las 14hs para el día
                      siguiente), te informaremos por mail. Te recomendamos ver
                      <a
                        onClickCapture={handleChange("panel6")}
                        href="#metodosEnvio"
                      >
                        {" "}
                        Métodos de Envío.
                      </a>
                    </Typography>
                  ) : i === 14 ? (
                    <Typography className="answerText" key={i}>
                      • Esta todo OK!, elegí como cobrar o elegí que queres
                      comprarte en Mi Ropero (
                      <a
                        onClickCapture={handleChange("panel6")}
                        href="#comoCobro"
                      >
                        {" "}
                        Como cobro mis ventas
                      </a>
                      )
                    </Typography>
                  ) : (
                    <Typography className="answerText" key={i}>
                      {res}
                    </Typography>
                  )}
                </>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel5-content"
              id="panel5-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                4.1. ¿Cómo configuro Mi Tienda?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
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
            id="tipsVentas"
          >
            <AccordionSummary
              aria-controls="panel6-content"
              id="panel6-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle" id="TipParaFotos">
                4.2 Tips de Ventas:
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
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
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
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
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              {miTiendaConfig5.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
              ))}
              <Typography className="questionTitle">
                ¿Porque no puedo ver las Fotos de Mi Galería?
              </Typography>
              <Typography className="answerText">
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
              <Typography className="questionTitle" id="comoCobro">
                4.4 ¿Dónde veo el detalle de mis ventas?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
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
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Una vez que el pago esta realizado se te avisa por mail y por
                notificación que la venta se realizo satisfactoriamente. Deberás
                ingresar a Tienda/Venta seleccionar el producto vendido y
                verificar que medio de envío eligieron.
              </Typography>
              <Typography className="questionTitle">
                Si el Envío es por OCA
              </Typography>
              <Typography className="answerText">
                Deberás seleccionar la sucursal desde donde realizaras el envío
                e imprimir la etiqueta, envolve el pedido y pega la etiqueta en
                el exterior del embalaje. Tenes 5 días hábiles para realizar el
                envío.
              </Typography>
              <Typography className="questionTitle">
                Si el Envío es por Moto
              </Typography>
              <Typography className="answerText">
                Si la venta se realizo antes de las 14hs, se enviara una moto a
                tu domicilio durante el día. En caso de que la compra se haya
                realizado después de las 14hs, se enviara una moto al día
                siguiente día hábil. Se te enviaran notificaciones/mail
                avisándote que estes atentx a la llegada de la moto.
              </Typography>
              <Typography className="answerText">
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
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Una vez que te califiquen de manera satisfactoria, tu comprador
                o nosotros (máximo 48hs), podrás ver disponible tu dinero en Tu
                Tienda/ Cuenta Corriente. En ese momento podrás pedir una
                transferencia a tu cuenta bancaria o podrás utilizar el crédito
                para realizar una compra en Mi Ropero.
              </Typography>
              <Typography className="answerText">
                En el caso que pidas una transferencia, lo tenes que hacer desde
                Mi Tienda/Cuenta Corriente/Solicitar Transferencia. Deberás
                ingresar los datos de la cuenta donde queres que realicemos la
                transferencia. El dinero solicitado estará disponible en tu
                cuenta bancaria en 48/72hs. dependiendo de cada banco.
              </Typography>
              <Typography className="answerText">
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
              <Typography className="questionTitle" id="metodosEnvio">
                5. ¿Cómo compro?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="questionTitle">
                Es muy fácil, rápido, seguro y conómico.
              </Typography>
              {comoCompro.map((res, i) => (
                <Typography className="answerText" key={i}>
                  {res}
                </Typography>
              ))}
              <Typography className="questionTitle">
                Listo!. A disfrutar de tu nueva Prenda!
              </Typography>
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
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
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
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Dependiendo del destino, podrás seleccionar la forma de envío:
              </Typography>
              <Typography className="answerText">
                Podes recibir tu pedido en cualquier parte del país, en tu
                domicilio o en una sucursal de OCA . Los envíos se realizan a
                través de Oca y tenes servicio de Moto, por el momento, solo
                para CABA próximamente ampliaremos a GBA.
              </Typography>
              <Typography className="answerText">
                En el proceso de compras vas a tener la posibilidad de elegir el
                método de envío disponible .
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
            expanded={expanded === "panel16"}
            onChange={handleChange("panel16")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel16-content"
              id="panel16-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                7.1. ¿Cuánto tiempo demora en llegar el pedido?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="questionTitle">Envío por OCA:</Typography>
              <Typography className="answerText">
                • Lx vendedorxs tiene 5 días hábiles para enviarte el pedido y
                en llegarte puede demorar 5 y 10 días hábiles. Dependerá de las
                distancias entre Vendedorxs y Compradxs. Podrás realizar el
                seguimiento desde el Link que te enviemos por mail.
              </Typography>
              <Typography className="answerText">
                • Si lx vendedorxs no realizo el envío en 5 días hábiles, se
                cancela la compra y se te devuelve el dinero, podrás elegir en
                recibir el efectivo o comprarte otra cosa en Mi Ropero.
              </Typography>
              <Typography className="questionTitle">Envío por Moto:</Typography>
              <Typography className="answerText">
                • Dependiendo del horario de la compra Lxs vendedorxs tiene que
                tener el pedido listo para entregar:
              </Typography>
              <Typography className="answerText">
                Si la compra se realizo antes de las 14hs, el envío se deberá
                realizar en el día.
              </Typography>
              <Typography className="answerText">
                • Si la compra se realizo después de las 14hs, se programa para
                el día siguiente.
              </Typography>
              <Typography className="answerText">
                • Podrás realizar el seguimiento desde el Link que te enviemos
                por mail.
              </Typography>
              <Typography className="answerText">
                • Podrás realizar el seguimiento desde el Link que te enviemos
                por mail.
              </Typography>
              <Typography className="answerText">
                • Si no realiza el envío en el tiempo estipulado se podrá
                cancelar la compra y se te devuelve el dinero, podrás elegir en
                recibir el efectivo o que te quede como crédito para comprarte
                otra cosa en Mi Ropero. También se podrá pactar nuevamente con
                lxs vendedorxs un nuevo horario, y el envío será por cuenta de
                lx vendedorxs.
              </Typography>
              <Typography className="questionTitle">
                No me llega el Pedido
              </Typography>
              <Typography className="answerText">
                Los motivos por los cuales el pedido de no te llega puede ser :
              </Typography>
              <Typography className="answerText">
                •Lx Vendedorx no envió el pedido.
              </Typography>
              <Typography className="answerText">
                •El pedido se perdió en el proceso de logística
              </Typography>
              <Typography className="answerText">
                No te preocupes. Si el envío no te llega, te devolvemos el
                dinero, y podes elegir dejarlo como crédito para comprarte lo
                que te guste en Mi Ropero, si lo que queres comprar es mas caro,
                podes pagar la diferencia y si es mas barato te queda como
                crédito.
              </Typography>
              <Typography className="questionTitle">
                Pago y Costo de los Envíos
              </Typography>
              <Typography className="answerText">
                El costo del envío lo pagan lxs compradorxs cuando realizan el
                pedido. En el proceso de compras se hace la verificación del
                Domicilio de ambas partes para poder estimar el costo. Cuando
                pagas, en el detalle de la Compra te muestra el total de la
                compra mas el costo del Envío.
              </Typography>
              <Typography className="answerText">
                El costo del envío se calcula por distancia, peso y cantidad de
                bultos, a su vez el costo del envío varia según sea el Método de
                Envío (OCA o Moto) y la distancia entre Vendedorxs y Compradorxs
                y si elegís recibirlo en una sucursal o en tu domicilio.
              </Typography>
              <Typography className="answerText">
                Tene en cuenta que si compras muchas prendas a una sola Tienda
                el costo del envío es uno solo, si realizas compras a distintas
                Tiendas se te cobra envío por cada Tienda.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel17"}
            onChange={handleChange("panel17")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel17-content"
              id="panel17-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                8. Cambios y devoluciones
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="questionTitle">
                ¿Como hago un cambio o una devolucion
              </Typography>
              <Typography className="answerText">
                Dentro de las 24hs de recibida la compra, podrás gestionar el
                cambio o devolución si la compra la hiciste con el método de
                “Envío por OCA”, en caso de que lo hayas hecho por “Envío por
                Moto” tenes 2 horas para gestionar la devolución.
              </Typography>
              <Typography className="questionTitle">
                Motivos de cambios o Devolución:
              </Typography>
              <Typography className="answerText">
                {" "}
                • Lo que compre difiere en características y descripción del
                producto que elegí.
              </Typography>
              <Typography className="answerText">
                {" "}
                • El producto esta sucio o roto.
              </Typography>
              <Typography className="answerText">
                • Me enviaron algo distinto a lo que compre.
              </Typography>
              <Typography className="answerText">
                Tenes que seguir estos pasos:
              </Typography>
              <Typography className="answerText">Desde Mi Perfil </Typography>
              <img src={foto3} alt="foto3" />

              <Typography className="answerText">
                Se te despliega un cuadro de texto donde deberás especificar el
                motivo de devolución, de esa manera se inicia el proceso de
                Reclamo. Te enviaremos por mail una etiqueta de cambio,
                imprimila, envolve la prenda, Coloca la etiqueta de devolución
                en el exterior del embalaje y acercate a la sucursal de OCA mas
                cercana. O podes acercarte a nuestra oficina ( Migueletes 1324 –
                Belgrano) y dejar la prenda a devolver, previa coordinación con
                nuestro Equipo de Calidad.
              </Typography>
              <Typography className="answerText">
                Nos pondremos en contacto, luego de realizar la verificación y
                de corresponder nos ocuparemos de gestionar el cambio o la
                devolución.{" "}
              </Typography>
              <Typography className="answerText">
                Solo podes gestionar el cambio una sola vez.
              </Typography>
              <Typography className="answerText">
                {" "}
                Recorda que una vez que hayas calificado la compra o que haya
                vencido el plazo para hacerlo, no se aceptarán devoluciones.
              </Typography>
              <Typography className="answerText">
                Ropa interior, Vestidos de Fiesta, artículos de belleza, no
                tienen cambio.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel18"}
            onChange={handleChange("panel18")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel18-content"
              id="panel18-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                9. ¿ Cuál es el costo por comprar o vender en MI ROPERO?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="questionTitle">Compradorxs</Typography>
              <Typography className="answerText">
                Si sos Compradorx, solo pagas lo que compras y el costo del
                envío que elijas (Medios de Envío).
              </Typography>
              <Typography className="questionTitle">Vendedorxs </Typography>
              <Typography className="answerText">
                Si sos Vendedorxs, publicas gratis!, solo te cobramos el 18%
                (IVA incluido) de comisión por la venta realizada.
              </Typography>
              <Typography className="questionTitle">Es decir :</Typography>
              <Typography className="answerText">
                Si tu venta es por $1.000 , nosotros te cobramos $ 180 (18% de
                comisión), y
              </Typography>
              <Typography className="answerText">
                A vos te quedan $ 820 (el 82% del valor de la venta) en tu
                cuenta, que podrás pedir una transferencia o utilizarla para
                comprarte algo que te guste en Mi Ropero.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel50"}
            onChange={handleChange("panel50")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel50-content"
              id="panel50-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                10. ¿Porqué me piden que cargue mi dirección?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="questionTitle">Mis Direcciones</Typography>
              <Typography className="answerText">
                En Mi Perfil/Mis Direcciones. Vas a poder cargar las direcciones
                de donde queres recibir los pedidos, puede ser que quieras
                ingresar la dirección de tu casa y/o de la oficina u otra
                dirección donde puedas recibir el pedido.
              </Typography>
              <Typography className="answerText">
                Tene en cuenta que las direcciones ingresadas son validadas con
                Google Maps, en caso de que no la puedas validar, te
                recomendamos que ingreses a Google Maps y verifiques la
                dirección ingresada.
              </Typography>
              <Typography className="questionTitle">
                Mis Direcciones{" "}
              </Typography>
              <Typography className="answerText">
                En Mi Perfil/Mis Direcciones. Vas a poder cargar las direcciones
                de donde queres recibir los pedidos, puede ser que quieras
                ingresar la dirección de tu casa y/o de la oficina u otra
                dirección donde puedas recibir el pedido.
              </Typography>
              <Typography className="answerText">
                Tene en cuenta que las direcciones ingresadas son validadas con
                Google Maps, en caso de que no la puedas validar, te
                recomendamos que ingreses a Google Maps y verifiques la
                dirección ingresada.
              </Typography>
              <Typography className="questionTitle">Compradorxs</Typography>
              <Typography className="answerText">
                La Dirección es utilizada para estimar el costo y tiempos del
                envío ( Dirección de envío y Dirección de recepción).
              </Typography>
              <Typography className="answerText">
                Si sos compradorx, vamos a necesitar que ingreses la dirección
                de donde queres recibir el pedido, puede ser tu casa, tu
                trabajo, o el lugar donde te encuentres al momento de recibirlo.
              </Typography>
              <Typography className="questionTitle">Vendedorxs</Typography>
              <Typography className="answerText">
                {" "}
                Si publicas vamos a necesitar que ingreses la dirección de tu
                Tienda, es decir la dirección desde donde saldrá el pedido. Esto
                nos permite estimar el costo del envío en el momento que un
                comprador compra una prenda de tu Tienda.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel19"}
            onChange={handleChange("panel19")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel19-content"
              id="panel19-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                11. ¿Porqué me piden mi teléfono?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                El número de teléfono te lo pedimos, para coordinar el envío, en
                caso de que no te encuentres en tu domicilio al momento de
                recibir o enviar un pedido, posiblemente te llamen por teléfono
                para avisarte, que se encuentran en el domicilio.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel20"}
            onChange={handleChange("panel20")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel20-content"
              id="panel20-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                12. ¿Cómo califico?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Para que ésta comunidad de moda circular funcione, es importante
                la calificación de lxs compradorxs hacia lxs vendedorxs.
              </Typography>
              <Typography className="answerText">
                Cuando recibís un producto tenes 48hs, para calificar al
                vendedorx, pasadas esas 48hs nosotros entendemos que el producto
                esta OK y calificamos como neutral, dando la conformidad del
                pedido recibido.
              </Typography>
              <Typography className="answerText">
                Para calificar a lxs vendedorxs, tenes que ir a Mi Perfil/Mis
                Compras, seleccionar el producto por el cual vas a calificar al
                vendedorx, tenes la posibilidad de calificar con una puntuación
                del 1 al 5 , donde uno es Malo y 5 Excelente.
              </Typography>
              <Typography className="answerText">
                Para calificar apreta el botón de ¿Ya tenés el producto? y
                califica.
              </Typography>

              <img src={foto4} alt="foto4" />
              <img src={foto5} alt="foto5" />
              <Typography className="answerText">
                Una vez que lxs vendedorxs son calificadxs no podrás realizar un
                reclamo.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel32"}
            onChange={handleChange("panel32")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel32-content"
              id="panel32-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                13. ¿Por qué no puedo ver las fotos de mi galería de fotos?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Cuando publicas imágenes tene en cuenta que si no habilitas tu
                celular para que la app MI Ropero puedo ingresara a tu galería
                de fotos, no vas a poder seleccionarlas. Te recomendamos que
                ingreses a la configuración de tu teléfono y verifiques si estas
                habilitando a MI Ropero para que ingrese a tu Galería de Fotos.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel21"}
            onChange={handleChange("panel21")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel21-content"
              id="panel21-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                14. ¿Porqué algunas tiendas no tienen la opción de envío por
                moto?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Por el momento el servicio de Envío por Moto solo esta
                disponible en los casos que vendedorxs y Compradorxs tengan
                dirección de envío y recepción en CABA. Próximamente vamos a
                habilitar GBA.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel22"}
            onChange={handleChange("panel22")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel22-content"
              id="panel22-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                15. ¿Porqué si añadí en mi carrito un producto que estaba
                disponible, ya no lo esta cuando quiero finalizar la compra?.
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                La disponibilidad de los productos en Mi Ropero cambian
                constantemente. Si añadis un producto a tu carrito no garantiza
                que lo tenes asegurado, ya que otros compradores pueden haberlo
                comprado mientras estaba en tu carrito pendiente de compra. En
                el momento que se completa el proceso de pago, el producto es
                tuyo.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel23"}
            onChange={handleChange("panel23")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel23-content"
              id="panel23-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                16. ¿Porqué el producto en Oferta que añadi en mi carrito, ya no
                esta en oferta cuando lo quiero comprar?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Si añadis un producto en tu carrito de compras cuando está en
                oferta, el precio también cambiará cuando la oferta haya
                caducado. Te recomendamos que si ves algún producto en el que
                estés interesado, realices la compra lo antes posible!{" "}
              </Typography>
              <Typography className="answerText">
                Tener el producto en tu Carrito de Compra no te garantiza que
                puedas comprarlo a un precio rebajado.
              </Typography>
              <Typography className="answerText">
                En este caso podes volver a ofertar el producto al vendedor.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel25"}
            onChange={handleChange("panel25")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel25-content"
              id="panel25-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                17. Me olvidé la contraseña para ingresar, ¿como la recupero?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Si olvidaste tu contraseña, desde el inicio de App hace clic en
                la opción “ingresa con tu email” y hace clic en “olvide mi
                contraseña” deberás ingresar tu dirección de correo electrónico
                y hace clic en “Recordar”. Recibirás de manera inmediata en tu
                mail un link con un enlace para recuperar la contraseña. Hace
                clic en el enlace y te pediremos que ingreses una nueva
                contraseña, hace clic en Actualizar y listo. Desde la app
                ingresa tu mail y la nueva contraseña.
              </Typography>
              <img src={foto6} alt="foto6" />
              <img src={foto7} alt="foto7" />
              <img src={foto8} alt="foto8" />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel26"}
            onChange={handleChange("panel26")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel26-content"
              id="panel26-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                18. ¿Cómo sé que mi compra se realizo correctamente?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                ¿Cómo se que mi compra se realizo correctamente? Antes de
                seleccionar el metodo de pago, podras ver el detalle de tu
                compra y el costo del envio. Después de completar el proceso de
                compra te aparecerá la opcion de Seguir comprando o ver tus
                compras . Si elegis ver tus compras te lleva a Mi Perfil/Compras
                y podrás ver el detalle.
              </Typography>
              <Typography className="answerText">
                También recibirás una confirmación de la compra por email, de
                Mercado Pago y de Mi Ropero, de esta forma te aseguramos que la
                compra se realizo de manera correcta.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel27"}
            onChange={handleChange("panel27")}
            className="accordion"
          >
            <AccordionSummary
              aria-controls="panel27-content"
              id="panel27-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="questionTitle">
                19. ¿Puedo cambiar mi dirección de envío luego de haber
                realizado una compra?
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: time ? "none" : "block",
              }}
            >
              <Typography className="answerText">
                Podes cambiar tu dirección de entrega las veces que quieras y
                también podrás guardar las direcciones de uso frecuente. Tene en
                cuenta que si hiciste una compra y luego cambias la dirección,
                el pedido no tomara el cambio de dirección y se te entregara a
                la dirección con la cual hiciste la compra. Te recomendamos que
                actualices tu dirección en Mi Perfil/Mis Direcciones antes de
                realizar una compra, ya que las direcciones de entrega no se
                pueden cambiar una vez que se ha enviado un pedido.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="returnLink" onClick={() => navigate(`/perfil`)}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A INICIO</p>
      </div>
    </div>
  );
};

export default FAQ;
