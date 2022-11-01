import React from "react";
import { Box, Grid } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";

const TyC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Grid className="gridContainer">
      <Box sx={{ mt: "32px" }}></Box>
      <Breadcrumbs links={pathnames} />

      <Box className="TyC">
        <p className="titulo1">Términos y condiciones</p>

        <p className="textoRegular">
          En esta página establecemos los Términos y Condiciones bajo los cuales
          deberás utilizar nuestro sitio web y nuestras aplicaciones
          (miropero.com.ar, miropero.app, miropero.shop y las que habilitemos en
          el futuro; nos referiremos a todas, indistintamente, como “el”, “este”
          o “nuestro Sitio Web”), así como las condiciones generales de
          contratación que se aplicarán a todas las operaciones que se concreten
          dentro nuestro Sitio Web.
        </p>
        <p className="textoRegular">
          Cada vez que ingreses a nuestro Sitio Web, incluyendo cualquiera de
          sus páginas, secciones o funcionalidades, tendrás la condición de
          “Usuario”. También, dependiendo de las acciones que realices dentro
          del mismo, tendrás el carácter de “Vendedor” y/o de “Comprador”. Estos
          Términos y Condiciones se dividen en “Secciones” y cada Sección, en
          “Cláusulas”.
        </p>
        <p className="textoRegular">
          Le hemos pedido a nuestro equipo legal que redacte estos Términos y
          Condiciones con la menor terminología jurídica posible, de una forma
          que resulten clara, sencilla y de fácil lectura para cualquier
          Usuario. Por lo tanto, te pedimos que te tomes unos minutos para
          leerlos atentamente antes de empezar a utilizar nuestro Sitio Web, ya
          que cualquier acción que realices dentro del mismo estará regida por
          estos Términos y Condiciones.
        </p>

        <p className="tituloSecundario">
          1. ALGUNA INFORMACIÓN BÁSICA QUE DEBES LEER ANTES DE EMPEZAR A USAR
          NUESTRO SITIO WEB
        </p>
        <p className="textoRegular">
          A continuación, resumimos alguna información importante que debes
          tener especialmente en cuenta antes de empezar a utilizar nuestro
          Sitio Web:
        </p>
        <p>1.1 Propietario del Sitio Web</p>
        <p>
          En esta página establecemos los Términos y Condiciones bajo los cuales
          deberás utilizar nuestro sitio web y nuestras aplicaciones
          (miropero.com.ar, miropero.app, miropero.shop y las que habilitemos en
          el futuro; nos referiremos a todas, indistintamente, como “el”, “este”
          o “nuestro Sitio Web”), así como las condiciones generales de
          contratación que se aplicarán a todas las operaciones que se concreten
          dentro nuestro Sitio Web. Cada vez que ingreses a nuestro Sitio Web,
          incluyendo cualquiera de sus páginas, secciones o funcionalidades,
          tendrás la condición de “Usuario”. También, dependiendo de las
          acciones que realices dentro del mismo, tendrás el carácter de
          “Vendedor” y/o de “Comprador”. Estos Términos y Condiciones se dividen
          en “Secciones” y cada Sección, en “Cláusulas”. Le hemos pedido a
          nuestro equipo legal que redacte estos Términos y Condiciones con la
          menor terminología jurídica posible, de una forma que resulten clara,
          sencilla y de fácil lectura para cualquier Usuario. Por lo tanto, te
          pedimos que te tomes unos minutos para leerlos atentamente antes de
          empezar a utilizar nuestro Sitio Web, ya que cualquier acción que
          realices dentro del mismo estará regida por estos Términos y
          Condiciones. 1. ALGUNA INFORMACIÓN BÁSICA QUE DEBES LEER ANTES DE
          EMPEZAR A USAR NUESTRO SITIO WEB A continuación, resumimos alguna
          información importante que debes tener especialmente en cuenta antes
          de empezar a utilizar nuestro Sitio Web: 1.1 Propietario del Sitio Web
          El propietario de este Sitio Web es SWAPVA S.A.S., con domicilio en
          Migueletes 1.231, Piso 7 Of. B - Ciudad Autónoma de Buenos Aires
          (C1426BUQ), Argentina; CUIT nº 30-71611596-4 (en adelante,
          apareceremos referidos como “MI ROPERO”, o también como “nosotros” o
          “nuestro/a/s”). Nuestra propiedad se extiende a todos los contenidos
          de este Sitio Web (salvo aquellos que, de tanto en tanto, publiquen
          sus Usuarios), incluyendo sin carácter limitativo, el diseño, la
          gráfica, las combinaciones de colores, los programas, los textos, los
          eslóganes y mensajes publicitarios, los logos, las marcas, los nombres
          de dominio, etc. No deberás usar ninguno de ellos sin autorización
          expresa de MI ROPERO.
        </p>
        <p>1.2 Nuestra responsabilidad</p>
        <p>
          Como regla general, MI ROPERO no será responsable por ninguna de las
          acciones u omisiones realizadas por los Usuarios de y en nuestro Sitio
          Web. MI ROPERO es un proveedor de un servicio de Internet y como tal,
          ponemos a disposición una plataforma de acceso público en la que
          terceros, sin vinculación legal con nosotros más allá de estos
          Términos y Condiciones, publican contenidos y realizan operaciones
          entre ellos. En algunos casos, MI ROPERO realiza ciertas limitadas
          comprobaciones de los Usuarios que se registran en nuestro Sitio Web o
          de algunas actividades que realizan a través del mismo pero, de forma
          general, no tenemos la capacidad técnica ni la obligación legal de
          supervisar el comportamiento de nuestros Usuarios dentro del Sitio
          Web. MI ROPERO no vende (salvo que lo indiquemos expresamente) ni
          compra los artículos publicados en este Sitio Web; no actuamos como
          corredores; no asesoramos a nuestros Usuarios en sus publicaciones, ni
          en sus estrategías de ventas, sus campañas de marketing o sus compras;
          y no participamos en las negociación ni el perfeccionamiento de las
          operaciones concluidas entre los Usuarios de nuestro Sitio Web, así
          como tampoco resolvemos los conflictos derivados de tales operaciones.
          En caso de que tengas conocimiento de una infracción legal cometida a
          través de nuestro Sitio Web, deberás comunicárnosla inmediatamente, la
          analizaremos y actuaremos conforme lo indique la normativa vigente en
          ese momento. De forma general, intentaremos bloquear el o los
          contenidos cuestionados mientras dure nuestra investigación, siempre y
          cuando dicho bloqueo no pueda afectar legítimos derechos de todos o
          alguno de nuestros Usuarios y/o comprometer nuestra responsabilidad.
          En tales casos, el bloqueo deberá ser ordenado por un juez competente.
        </p>
        <p>1.3 Tu responsabilidad</p>
        <p>
          Es importante que entiendas que si publicás, vendés y/o comprás en
          nuestro Sitio Web, lo hacés en todos los casos exclusivamente bajo tu
          propia responsabilidad. Por regla general y dentro de los límites de
          la legislación vigente en cada momento, todas las operaciones que se
          realicen en nuestro Sitio Web son por cuenta y riesgo exclusivamente
          de sus Usuarios. Además, como Usuario de este Sitio Web, te
          comprometés a cumplir en todo momento estos Términos y Condiciones y a
          seguir las directivas e instrucciones que cada tanto pueda comunicarte
          MI ROPERO.
        </p>
        <p>1.4 Cuál es la finalidad de este Sitio Web</p>
        <p>
          Hemos diseñado esta plataforma como un mercado electrónico
          (“marketplace”) destinado a que sus Usuarios puedan publicar,
          promocionar, vender y comprar productos nuevos y usados de rubros
          tales como indumentaria, calzado, accesorios, belleza, ropa de niños,
          juguetes y otros que podamos habilitar de tanto en tanto. Sólo podrán
          publicarse y comercializarse productos que respondan a la temática y a
          la estética de este Sitio Web, y que encajen dentro las categorías y
          subcategorias de productos habilitadas en cada momento. MI ROPERO se
          reserva el derecho de eliminar sin aviso publicaciones que, a nuestro
          exclusivo criterio, no cumplan con estas características.
        </p>
        <p>1.5 Qué no podés hacer en este Sitio Web</p>
        <p>
          De forma general, solamente deberás usar este Sitio Web con la
          finalidad descrita en el apartado anterior. En particular, no podrás
          utilizar este Sitio Web: a) si sos menor de edad; b) para usos que, de
          cualquier forma, puedan considerarse ilícitos, ofensivos o inmorales;
          c) para cualquier uso distinto de los expresamente autorizados en
          estos Términos y Condiciones; c) de una forma que resulte perjudicial
          para los derechos e intereses de otros Usuarios o de terceros en
          general; c) de un modo que pueda dañar, sobrecargar o inutilizar, de
          forma temporaria o definitiva, el Sitio Web o cualquiera de sus
          funcionalidades. En caso de que no cumplas con estas condiciones,
          podremos impedirte o bloquearte el acceso al Sitio Web, además de
          formular las denuncias y reclamos legales correspondientes.
        </p>
        <p>1.6 Si te arrepentís de una compra</p>
        <p>
          Si te arrepentís de una compra Tenés derecho a arrepentirte y devolver
          una compra efectuada en nuestro Sitio Web, sin costo y sin justificar
          el motivo, dentro de un plazo de DIEZ (10) DÍAS corridos desde que la
          hayas abonado. Para ello, deberás seguir los pasos indicados en la
          Sección 9.1.- Derecho de Revocación, de estos Términos y Condiciones.
        </p>
        <p>1.7 Aceptación de los Términos y Condiciones</p>
        <p>
          Aceptación de los Términos y Condiciones Si usás de cualquier forma
          nuestro Sitio Web, estás aceptando de manera incondicionada estos
          Términos y Condiciones. En aquellas funcionalidades a las que sólo se
          accede mediante registración previa como, de forma general, para
          comprar o vender a través de nuestro Sitio Web, la aceptación se
          realiza de forma expresa mediante uno o más “click/s”. En los
          restantes casos, tu sola permanencia y navegación por nuestro Sitio
          Web significará tu aceptación de estos Términos y Condiciones, por
          tratarse de una conducta suficiente para demostrar la existencia de un
          acuerdo en los términos del artículo 971 del Código Civil y Comercial
          de la Nación.
        </p>
        <p>2. ACCESO A NUESTRO SITIO WEB</p>
        <p>2.1 Prohibición de uso por menores de edad</p>
        <p>
          Está prohibido el acceso a nuestro Sitio Web por parte de menores de
          edad y, de forma general, de personas que no tengan capacidad para
          contratar. Los padres, tutores o representantes legales deberán
          instalar los controles parentales correspondientes y serán los únicos
          responsables en caso de que las personas a su cargo accedan y usen
          cualquier funcionalidad de nuestro Sitio Web.
        </p>
        <p>2.2 Acceso libre y gratuito</p>
        <p>2.3 Sitio Web sin garantías</p>
        <p>
          Sitio Web sin garantías El Sitio Web se suministra a los Usuarios tal
          como está disponible en cada momento, sin garantías de ninguna clase.
          Como todo recurso online, nuestro Sitio Web puede presentar fallas,
          interrupciones y caídas del servicio. Más allá de nuestros esfuerzos
          para restablecer su disponibilidad en el menor plazo posible, MI
          ROPERO no garantiza que este Sitio Web resulte accesible siempre y en
          cada momento. En ningún caso MI ROPERO será responsable si una
          operación no puede concretarse por una falla o caída del Sitio Web,
          así como tampoco si determinadas funcionalidades del Sitio Web
          permanecen indisponibles durante un tiempo prolongado e, incluso, no
          pueden restablecerse nuevamente.
        </p>
        <p>2.4 Medidas razonables de seguridad y exención de responsabilidad</p>
        <p>
          MI ROPERO adopta medidas razonables de seguridad informática para
          proteger su Sitio Web frente a virus y programas nocivos pero no
          podemos garantizar que, en un determinado momento, nuestros sistemas
          informáticos no estén infectados o no hayan sido hackeados con fines
          ilícitos. Por tanto, cada vez que accedas y navegues por nuestro Sitio
          Web será por tu propia cuenta y riesgo, y será tu responsabilidad
          mantener activos y actualizados los antivirus de tus equipos. En
          ningún caso MI ROPERO será responsable por los daños que puedan sufrir
          los equipos electrónicos de los Usuarios derivados de la navegación
          por nuestro Sitio Web, incluyendo la eliminación de cualquier
          programa, archivo o información almacenada en dichos equipos.
        </p>

        <p>3. CREAR UNA CUENTA</p>
        <p>
          Algunas de las secciones y funcionalidades de nuestro Sitio Web y, en
          particular, la compra y/o la venta de productos a través del mismo, no
          son accesibles sino tras la creación de una cuenta por parte del
          Usuario. En esta Sección, te explicamos cuáles son las reglas bajo las
          que podés crear una cuenta en nuestro Sitio Web. Al crear una cuenta
          en MI ROPERO, aceptás ser el único responsable de su uso y de todas
          las operaciones que se realicen a través de la misma. Antes de
          completar el proceso de alta, deberás aceptar en forma expresa estos
          Términos y Condiciones, que establecen las obligaciones y las
          responsabilidades que asumes por crear una cuenta en MI ROPERO. No
          deberías crear una cuenta en MI ROPERO sin leer antes atentamente
          estos Términos y Condiciones.
        </p>
        <p>3.1 Alta de una cuenta</p>
        <p>
          El alta de una cuenta se lleva a cabo completando el formulario
          disponible a tal efecto en nuestro Sitio Web. En el caso de comercios
          o negocios, antes del alta de la cuenta, podremos solicitar
          información adicional y documentación que acredite tu condición fiscal
          o cualquier otra circunstancia legal. Toda la información que nos
          comuniques durante el proceso de alta de una cuenta tienen el carácter
          de declaración jurada, lo que significa que garantizás y te hacés
          responsable frente a MI ROPERO y al resto de los Usuarios de nuestro
          Sitio Web de que esa información es cierta, completa y actual. También
          te comprometés a mantener actualizada la información de tu cuenta
          mientras permanezca abierta. De forma general, el alta de tu cuenta
          será automática tras completar nuestro formulario. Sin embargo, en
          algunos casos y, en particular, cuando se trate de comercios o
          negocios, el alta puede quedar condicionada a que revisemos y
          validemos la información que nos hayas compartido. En este caso, te
          confirmaremos el alta mediante el envío de un email a la dirección que
          nos hayas comunicado durante el proceso de alta. Todos los datos
          personales que nos compartas durante el proceso de alta serán tratados
          de conformidad con nuestra Política de Privacidad que podés consultar
          aquí
        </p>
        <p>3.2 Nuestro derecho a rechazar el alta de una cuenta</p>
        <p>
          Nuestro derecho a rechazar el alta de una cuenta MI ROPERO se reserva
          el derecho en todos los casos de rechazar una solicitud de alta de una
          cuenta, sin necesidad de expresar causa ni motivo alguno y sin que, en
          ningún caso, tal negativa pueda dar derecho a una indemnización ni
          compensación de ningún tipo a favor del Usuario cuyo pedido de alta
          sea denegado.
        </p>
        <p>3.3 Tu cuenta es sólo tuya</p>
        <p>
          Las cuentas de MI ROPERO son personales e intransferibles. Cada
          Usuario es el único titular de su cuenta y no podrá contar con más de
          una cuenta. Queda prohibida la venta, cesión o transmisión bajo
          cualquier modalidad de una cuenta de MI ROPERO, así como, de forma
          general, cualquier cambio de titular.
        </p>
        <p>3.4 Ingreso a tu cuenta</p>
        <p>
          El ingreso a las cuentas de MI ROPERO se realiza cada vez mediante un
          usuario y contraseña. Serás el único en conocer el ususario y
          contraseña que dan acceso a tu cuenta. Deberás mantener la
          confidencialidad de tus claves, no compartirlas con ninguna persona
          ajena a tu organización y cambiarlas de forma periódica. En caso de
          que olvides tu usuario o contraseña, deberás generarlos nuevamente
          siguiendo el proceso de recuperación de claves previsto en nuestro
          Sitio Web. Te enviaremos las nuevas claves prioritariamente a la
          dirección de correo electrónico que figure en nuestros sistemas; por
          eso es importante que la mantengas actualizada. MI ROPERO no será
          responsable si en base a los datos registrados en nuestros sistemas,
          no podemos validar tu identidad a los efectos de restrablecer las
          claves de ingreso a tu cuenta. En caso de que detectes un ingreso no
          autorizado a tu cuenta, deberás comunicárnoslo inmediatamente y seguir
          nuestras instrucciones. Podremos suspender o cerrar una cuenta que
          haya sido hackeada o sobre la que su titular haya perdido el control,
          aún de forma intermitente. En este caso, no nos hacemos responsables
          de la pérdida de la información y de los contenidos almacenados en la
          cuenta. Periódicamente deberás hacer una copia de respaldo en otro
          dispositivo de la información y del contenido almacenado en tu cuenta
          que no quieras perder.
        </p>
        <p>3.5 Responsabilidad por los contenidos de tu cuenta</p>
        <p>
          Serás el único responsable de todos y cada uno de los contenidos que
          publiques en tu cuenta en cada momento. Antes de subirlo a tu cuenta,
          deberás asegurarte que cuentas con todos los derechos y licencias
          necesarias para publicar un determinado contenido. MI ROPERO podrá
          bloquear o dar de baja cualquier contenido que sea denunciado como un
          uso no autorizado de las marcas o de la propiedad intelectual de
          terceros, sin perjuicio de las responsabilidades legales que
          correspondan y que serán en todos los casos asumidas exclusivamente
          por el titular de la cuenta.
        </p>
        <p>3.6 Licencia de los contenidos a favor de MI ROPERO</p>
        <p>
          Cada vez que publiques un contenido en nuestro Sitio Web, nos estarás
          otorgando una licencia no exclusiva y sin vencimiento para su
          reproducción, representación y comunicación al público en cualquier
          foro o ámbito que, a nuestro exclusivo criterio, consideremos
          conveniente, incluyendo sin carácter limitativo, en todas o alguna de
          nuestras redes sociales, banners, flyers y folletos publicitarios
          digitales o en papel, newsletter y campañas de email marketing, etc.
          Esta licencia persiste aún en caso de que elimines el contenido de
          nuestro Sitio Web o des de baja tu cuenta.
        </p>
        <p>3.7 Cláusula de indemnidad a favor de MI ROPERO</p>
        <p>
          Al abrir y mantener una cuenta en nuestro Sitio Web, te comprometés de
          forma incondicionada, durante todo el tiempo que tu cuenta permanezca
          abierta, a mantener indemne a MI ROPERO (incluyendo a cualquiera de
          nuestros directivos, contratados y/o empleados), contra el/los
          reclamo/s de cualquier tercero, Usuario o no, fundado/s directa o
          indirectamente en cualquier uso de tu cuenta, incluyendo sin carácter
          limitativo los motivados en la publicación de cualquier contenido o en
          la concreción (o no) de cualquier operación en o a través de tu
          cuenta. En virtud de lo aquí dispuesto, deberás asumir el pago de o,
          en su caso, reembolsar a MI ROPERO (incluyendo a cualquiera de sus
          directivos, contratados y/o empleados), toda suma en cualquier
          concepto, incluyendo sin carácter limitativo, indemnizaciones,
          compensaciones, gastos, impuestos, comisiones, costos y costas
          judiciales, que debamos abonar a un tercero, Usuario o no, originada
          directa o indirectamente en cualquier uso de tu cuenta.
        </p>
        <p>3.8 Suspensión y cierre de una cuenta</p>
        <p>
          MI ROPERO se reserva el derecho de en cualquier momento suspender o
          dar de baja, temporal o definitivamente, una cuenta, sin necesidad de
          expresar causa o motivo y sin que, en ningún caso, tal decisión pueda
          dar derecho a ningún tipo de indemnización ni compensación por ningún
          concepto a favor del titular de la cuenta ni, de forma general, de
          ningún Usuario. En particular, a nuestro exclusivo criterio, podremos
          suspender o dar de baja tu cuenta cuando detectemos, sin carácter
          limitativo, alguno de los siguientes comportamientos: a) falsedades o
          inconsistencias graves en la información que nos hayas facilitado al
          momento del alta de tu cuenta o posteriormente; b) intentos de evadir
          los procedimientos y los canales de contacto establecidos en nuestro
          Sitio Web, particularmente, para evitar el pago de las tarifas de MI
          ROPERO; c) incumplimiento de las condiciones para la publicación, la
          compraventa, el pago y el envío de productos a través de nuestro Sitio
          Web; d) envío reiterado de artículos defectuosos, sucios o en malas
          condiciones; e) bajas calificaciones o denuncias reiteradas por parte
          de otros Usuarios; f) uso de lenguaje ofensivo o inapropiado; g)
          actividades sospechosas de fraude, evasión fiscal o de lavado de
          activos; h) de forma general, cualquier otro uso de la cuenta para
          fines no autorizados, prohibidos o distintos a los expresamente
          previstos en estos Términos y Condiciones. En caso de que detectemos
          una conducta que infrinja lo dispuesto en esta Cláusula, podremos
          enviarte, a nuestro exclusivo criterio, un apercibimiento antes de la
          suspesión o del cierre de tu cuenta. En tal caso, deberás cesar de
          forma inmediata cualquier conducta infractora y abstenerte de realizar
          esa o cualquier otra nuevamente. Caso contrario, cerraremos tu cuenta
          y te impediremos crear nuevas cuentas en el futuro, sin perjuicio de
          las denuncias y los reclamos legales que podamos formular.
        </p>
        <p>4. VENDER EN NUESTRO SITIO WEB</p>
        <p>
          En esta Sección se establecen las condiciones generales bajo las
          cuales podrás publicar productos para la venta en nuestro Sitio Web:
        </p>
        <p>4.1 Publicación bajo tu exclusiva responsabilidad</p>
        <p>
          Cada vez que publiques un producto en nuestro Sitio Web, estás
          garantizando lo siguiente: a) que tenés capacidad legal para vender;
          b) que el producto publicado te pertenece o que has sido autorizado a
          su venta por el propietario; c) que no lo has obtenido por medios
          ilícitos, en particular, que no es un producto robado ni falsificado;
          d) que todas las informaciones publicadas sobre las características
          del producto son ciertas, y que las imágenes que adjuntás a tu
          publicación constituyen una representación fiel del producto ofrecido
          a la venta; y e) que tenés stock del producto publicado, disponible
          para su despacho inmediato. En ningún caso MI ROPERO será responsable
          si publicás un producto que no cumpla con estas condiciones, sin
          perjuicio de nuestro derecho de suspender o dar de baja tu cuenta en
          tal caso.
        </p>
        <p>4.2 Artículos prohibidos</p>
        <p>
          De forma general, no podrás publicar productos distintos de los
          expresamente autorizados en cada momento en nuestro Sitio Web. En
          ningún caso podrás publicar productos: a) cuya venta se encuentre
          prohibida o requiera autorización, si no cuentas con la misma; b) que
          de alguna forma puedan poner en riesgo la salud del destinatario, sin
          informar en forma destacada esa circunstancia antes y después de su
          compra; c) robados o cuyo origen desconozcas; d) que formen parte de
          un sistema de distribución exclusiva o algún otro esquema de venta de
          acceso restringido al cual no pertenezcas; e) que constituyan
          falsificaciones o que intenten copiar, imitar o replicar la etiqueta,
          la envoltura o cualquier otra característica reconocible de productos
          de marcas registradas o notorias; f) que de cualquier otra forma
          intenten o puedan engañar o confundir al destinatario sobre su origen,
          la identidad del fabricante o cualquier otra información vinculada a
          la confección del producto. Serás el único responsable de los reclamos
          penales, civiles y/o administrativos que se generen por tu
          incumplimiento de estas prohibiciones, sin perjuicio de que daremos de
          baja tu cuenta de forma inmediata y no podrás crear una nueva cuenta
          en lo sucesivo.
        </p>
        <p>4.3 Uso de tu cuenta como tienda online </p>
        <p>
          En caso de que acondicionés y usés tu cuenta como una tienda online,
          deberás asegurarte antes de que cumplís con todos los requisitos
          legales e impositivos correspondientes. En cualquier momento podremos
          solicitarte documentación que acredite tal circunstancia y suspender
          tu cuenta hasta que nos la proveas. También deberás cumplir con las
          normas legales e impositivas aplicables a cada una de las operaciones
          que realices con tu cuenta, incluyendo sin carácter limitativo, la
          emisión del comprobante fiscal, ticket o factura correspondiente, la
          realización de las percepciones o retenciones requeridas en cada caso,
          la entrega y prestación de las garantías legales, etc. En ningún caso,
          MI ROPERO será responsable por el incumplimiento por parte de sus
          Usuarios de alguna obligación legal o fiscal exigida por la normativa
          vigente en cada momento. Solamente podrás exhibir y utilizar en tu
          tienda online nombres comerciales, insignias, logos, marcas, imágenes
          y contenidos para los que tengas los derechos correspondientes.
          Podremos suspender o dar de baja tu cuenta si comprobamos o recibimos
          alguna denuncia de que utilizas cualquiera de estos elementos sin los
          derechos correspondientes.
        </p>
        <p>4.4 Forma en que debés publicar tus productos</p>
        <p>
          Únicamente podés publicar en nuestro Sitio Web productos que ofrezcas
          para su venta y de los que tengas disponibilidad (“stock”) para su
          despacho en forma inmediata. Todos los productos que publiqués en
          nuestro Sitio Web deberán ir acompañados de una descripción de sus
          características esenciales, incluyendo informaciones tales como, sin
          carácter limitativo, el modelo, la marca, el talle y si se trata de un
          producto nuevo o usado. En todos los casos deberás indicar su precio
          en Pesos argentinos, debiendo aclarar expresamente si incluyen o no el
          IVA. Las fotos y demás contenidos gráficos o audiovisuales que
          publiques en nuestro Sitio Web deberán cumplir las siguientes
          condiciones: a) ser propias o contar con las autorizaciones y
          licencias necesarias para su reproducción y comunicación pública; b)
          tener una cierta calidad y responder a la estética general del Sitio
          Web; c) ser una representación exacta del artículo que ofrezcas para
          la venta y no consistir en fotomontajes, fotos trucadas o tratadas de
          cualquier forma que pueda generar engaño o confusión sobre todas o
          alguna de sus características; y d) no tratarse de contenidos
          eróticos, obscenos o impúdicos. Podremos dar de baja cualquier
          contenido que, a nuestro exclusivo criterio, pueda herir la
          sensibilidad de nuestros Usuarios o que, simplemente, nos parezca
          excesivo o poco decoroso.
        </p>
        <p>4.5 Publicidad y marketing</p>
        <p>
          Sólo podrás realizar las campañas y las acciones publicitarias y de
          marketing de tus productos que en cada momento se encuentren
          autorizadas en nuestro Sitio Web. No podrás incluir enlaces a otras
          páginas web, incluyendo a tus perfiles en redes sociales, salvo que
          esa opción esté expresamente disponible. Si instalás cookies, sólo
          podrán ser para analizar el rendimiento (“métricas”) o el
          comportamiento de los usuarios dentro de la página web correspondiente
          a tu cuenta. En ningún caso podrás instalar cookies persistentes, que
          permanezcan activas una vez que el Usuario ha abandonado la página web
          correspondiente a tu cuenta. Si realizas campañas de keyword
          advertising, en ningún caso deberán interferir con las realizadas por
          nuestro Sitio Web; caso contrario, deberás suspenderlas
          inmediatamente. También deberás asegurarte que las palabras que
          utilices dentro de esas campañas no afecten derechos de terceros, ya
          que serás el único responsable de los reclamos que puedan generarse al
          respecto. MI ROPERO se reserva el derecho, a nuestro exclusivo
          criterio, de incluir o no la página correspondiente a tu cuenta,
          incluyendo cualquier contenido o parte de la misma, dentro de las
          campañas publicitarias, de SEM y similares que de tanto en tanto
          realicemos desde nuestro Sitio Web.
        </p>
        <p>4.6 Diligencia en atender las consultas y pedidos de los Usuarios</p>
        <p>
          Si publicás productos para la venta en nuestro Sitio Web, deberás
          atender de forma diligente las consultas, los pedidos y, en su caso,
          los reclamos de nuestros Usuarios y, en su caso, de MI ROPERO, y
          despachar o tener listos para su retiro los artículos vendidos dentro
          de los plazos fijados en cada caso en estos Términos y Condiciones.
          Serás el único responsable y podremos suspender o cerrar tu cuenta en
          caso de una atención no diligente de tu cuenta.
        </p>
        <p>
          4.7 Obligación de utilizar únicamente los canales de contacto
          autorizados
        </p>
        <p>
          Nuestros Usuarios podrán conocer únicamente los datos de los otros
          Usuarios que, en cada momento, estén activados como visibles en
          nuestro Sitio Web. Del mismo modo, nuestros Usuarios sólo contactarán
          a otros Usuarios a través de los canales y formas de contacto
          expresamente establecidos en cada momento en nuestro Sitio Web. Quedan
          prohibidos, y será motivo de cierre inmediato de las cuentas o del
          bloqueo del acceso a nuestro Sitio Web de los Usuarios implicados,
          cualquiera de los siguientes comportamientos: a) intentar o contactar
          a un Usuario por cualquier canal distinto de los expresamente
          autorizados en cada momento en el Sitio Web; b) intentar obtener o
          compartir con otros Usuarios cualquier dato que permita su contacto
          por fuera de los canales y de las formas de contacto expresamente
          previstas en nuestro Sitio Web; c) intentar o compartir datos de
          contacto con otros Usuarios por canales no autorizados tales como, sin
          carácter limitativo, chat y foros de nuestro Sitio Web, redes
          sociales, enlaces o redireccionamientos a otras páginas web, etc.
        </p>
        <p>4.8 Ofertas</p>
        <p>
          Si publicás ofertas, incluyendo cualquier tipo de rebaja, promoción o
          descuento, deberán ser reales y transparentes. Deberás publicar de
          forma clara, detallada y descatada las condiciones de la oferta,
          incluyendo, de corresponder, el porcentaje de descuento sobre el
          precio anterior. Si no establecés un plazo, las ofertas estarán
          vigentes durante todo el tiempo que permanezcan accesibles en nuestro
          Sitio Web. En ningún caso podrás: a) presentar como una oferta
          situaciones que no impliquen una reducción significativa de los
          precios previos u ofrezcan otros beneficios reales para los
          destinatarios, en este caso, debiendo explicar claramente en qué
          consiste y cuál es la ventaja para los destinatarios; b) ofrecer o
          entregar premios o regalos vinculados directa o indirectamente a la
          compra de un producto, cuando dichos premios o regalos estén sujetos a
          la intervención del azar; y c) organizar concursos, sorteos o eventos
          de cualquier tipo, online u offline, en los que la participación esté
          condicionada a la adquisición de un producto. De tanto en tanto, MI
          ROPERO podrá establecer ofertas o condiciones bajo las cuales nuestros
          Usuarios pueden obtener cupones de descuento u otros beneficios en
          nuestro Sitio Web. Las mismas serán obligatorias para los Vendedores
          que ofrezcan productos incluidos dentro de las condiciones de la
          oferta o del beneficio de que se trate. También podremos adherir y
          participar de iniciativas sectoriales para ofrecer descuentos u otros
          beneficios generalizados, o en relación con determinadas categorías de
          productos, en determinadas fechas u ocasiones especiales. Los
          descuentos o beneficios así acordados serán obligatorios para todos
          los Vendedores de nuestro Sitio Web.
        </p>
        <p>4.9 Garantías</p>
        <p>
          De corresponder, deberás: a) informar sobre las garantías a las que
          están sujetas los productos que ofreces para la venta; b) extender y
          entregar al Comprador el certificado de garantía que corresponda según
          la normativa vigente en cada momento; y c) cumplir con las
          reparaciones, sustituciones y devoluciones que correspondan en virtud
          de dicha garantía. Se informa a los Usuarios que los plazos de las
          garantías contractuales y legales han sido suspendidos por todo el
          periodo en que se hayan visto imposibilitados de ejercer sus derechos
          en virtud del Aislamiento Social, Preventivo y Obligatorio dictado por
          el Decreto nº 297 de 19 de marzo de 2020 y sus modificatorios (cfr.
          Res. 244/2020, de la Secretaría de Comercio Interior).
        </p>
        <p>5. COMPRAR EN NUESTRO SITIO WEB</p>
        <p>
          En esta Sección te informamos cómo y bajo qué condiciones podés
          comprar en nuestro Sitio Web:
        </p>
        <p>5.1 Los riesgos de comprar por Internet</p>
        <p>
          Los riesgos de comprar por Internet Las compras en nuestro Sitio Web
          se realizan, total o parcialmente, de forma electrónica, es decir,
          mediante la transmisión de datos en formato digital por redes de
          telecomunicaciones. Tenés que tener en cuenta que comprar por Internet
          implica ciertos riesgos como ser, sin carácter limitativo, la
          interrupción y el fracaso de la transmisión de los datos, la
          intercepción con fines ilícitos (“hackeo”) de los datos que
          transmitas, la transmisión de datos que no querías enviar o su envío a
          destinatarios distintos de aquellos a los que la transmisión estaba
          dirigida, etc. MI ROPERO no será responsable por ninguna incidencia
          ocurrida durante el proceso de compra por medios electrónicos,
          incluyendo el extravío o el desvío, de forma intencional o accidental,
          de un pago antes del ingreso en nuestras cuentas. Al iniciar el
          proceso de compra en nuestro Sitio Web, confirmás entender, aceptar y
          asumir todos los riesgos asociados a la contratación por medios
          electrónicos.
        </p>
        <p>5.2 Descripción del proceso de compra</p>
        <p>
          Para comprar cualquier artículo en nuestro Sitio Web deberás completar
          los siguientes pasos: 1. Abrir una cuenta o ingresar con tu usuario y
          contraseña; 2. Seleccionar el o los artículo/s que quieras comprar.
          Los artículos seleccionados se agregarán a “Mi Carrito”. En cualquier
          momento podrás acceder a “Mi Carrito” para ver o eliminar los
          artículos seleccionados; 3. Tras presionar el botón “Finalizar
          Compra”, se te exhibirá un formulario con tus datos y el domicilio de
          entrega preestablecido. Deberás confirmar o modificar el domicilio de
          entrega; 4. Dependiendo del destino, podrás seleccionar la forma de
          envío; 5. Deberás seleccionar el medio de pago y, de corresponder,
          insertar tu código de descuento. En algunos casos, tendrás la opción
          de pagar en una o más cuotas; 6. Una vez elegido el medio de pago, se
          te exhibirá un resumen de tu compra, incluyendo el precio final de
          cada producto por separado e informándote, también por separado, los
          costos correspondientes a impuestos, comisiones y gastos de envío; 7.
          Deberás aceptar estos Términos y Condiciones, haciendo “click” junto
          al enlace en el que podrás acceder a los mismos y descargártelos; 8.
          Presionando el botón “Pagar”, se te redirigirá a la plataforma de pago
          en caso de que hayas seleccionado esta opción, o te enviaremos un link
          al correo electrónico proporcionado durante la compra para que puedas
          pagar mediante el medio de pago offline que hayas elegido. 9. Una vez
          completado el pago, recibirás un email de confirmación con la
          descripción de tu compra y una copia de estos Términos y Condiciones
          en un formato que podrás guardar y recuperar en cualquier momento. 10.
          A partir de la confirmación de tu pago, podrás ejercer el derecho de
          revocación informado en la Sección 9.1 de estos Términos y
          Condiciones.
        </p>
        <p>5.3 Calificación de la compra</p>
        <p>
          MI ROPERO ofrece a sus Usuarios la posibilidad de calificar las
          prestaciones recibidas por parte de otros Usuarios, con base a
          criterios tales como, sin carácter limitativo, su nivel de
          satisfacción con la atención brindada y con los productos recibidos,
          el tiempo de respuesta de las consultas y, en su caso, de los
          reclamos, el plazo para despachar los envíos, etc. En base a estas
          calificaciones, se generará en forma automática un puntaje que podrá
          ser consultado por los restantes Usuarios y por el público en general.
          Por el simple hecho de publicar en nuestro Sitio Web, aceptás
          participar de este sistema y ser calificado por los restantes Usuarios
          de nuestro Sitio Web. También declarás conocer que MI ROPERO no tiene
          ninguna injerencia ni posibilidad de influencia en las calificaciones
          emitidas por nuestros Usuarios, y renunciás a formular cualquier
          reclamo fundado en las calificaciones y en el puntaje que recibas como
          Usuario de nuestro Sitio Web. MI ROPERO podrá suspender o cerrar una
          cuenta que reciba una o más calificaciones negativas, o cuyo puntaje
          basado en las calificaciones de nuestros Usuarios evidencie, a nuestro
          exclusivo criterio, un comportamiento poco fiable o negligente como
          Usuario de nuestro Sitio Web.
        </p>
        <p></p>
      </Box>
    </Grid>
  );
};

export default TyC;
