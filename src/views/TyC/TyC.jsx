import React from "react";
import { Box, Grid } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/img/leftArrow.png";

const TyC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  return (
    <Grid className="gridContainer">
      <Box sx={{ mt: "32px" }}></Box>

      <Box className="TyC" style={{marginTop:"32px"}}>
        <Breadcrumbs links={pathnames} />
        <p className="titulo1">Términos y condiciones</p>

        <p className="textoRegular">
        En esta página establecemos los Términos y Condiciones bajo los cuales deberás utilizar nuestro sitio web y nuestras aplicaciones (miropero.com.ar, miropero.app, miropero.shop y las que habilitemos en el futuro; nos referiremos a todas, indistintamente, como “el”, “este” o “nuestro Sitio Web”), así como las condiciones generales de contratación que se aplicarán a todas las operaciones que se concreten dentro nuestro Sitio Web. 
        </p>
        <p className="textoRegular">
        Cada vez que ingreses a nuestro Sitio Web, incluyendo cualquiera de sus páginas, secciones o funcionalidades, tendrás la condición de “Usuario”. También, dependiendo de las acciones que realices dentro del mismo, tendrás el carácter de “Vendedor” y/o de “Comprador”. Estos Términos y Condiciones se dividen en “Secciones” y cada Sección, en “Cláusulas”.
        </p>
        <p className="textoRegular">
        Le hemos pedido a nuestro equipo legal que redacte estos Términos y Condiciones con la menor terminología jurídica posible, de una forma que resulten clara, sencilla y de fácil lectura para cualquier Usuario.<span style={{color:"black",fontWeight:"600"}}> Por lo tanto, te pedimos que te tomes unos minutos para leerlos atentamente antes de empezar a utilizar nuestro Sitio Web, ya que cualquier acción que realices dentro del mismo estará regida por estos Términos y Condiciones.</span>
        </p>

        <p className="tituloPrimario">
          1. ALGUNA INFORMACIÓN BÁSICA QUE DEBES LEER ANTES DE EMPEZAR A USAR NUESTRO SITIO WEB
        </p>
        <p className="textoRegular">
        A continuación, resumimos alguna información importante que debes tener especialmente en cuenta antes de empezar a utilizar nuestro Sitio Web:
        </p>
        <p className="tituloSecundario">1.1 Propietario del Sitio Web</p>
        <p className="textoRegular">
        El propietario de este Sitio Web es SWAPVA S.A.S., con domicilio Costa Rica 5546, piso 3º, of. 301 - Ciudad Autónoma de Buenos Aires (C1414BTD), Argentina; CUIT nº 30-71611596-4 (en adelante, apareceremos referidos como “MI ROPERO”, o también como “nosotros” o “nuestro/a/s”).
        </p>
        <p className="textoRegular">
        Nuestra propiedad se extiende a todos los contenidos de este Sitio Web (salvo aquellos que, de tanto en tanto, publiquen sus Usuarios y sobre los cuales podemos tener derechos conforme a lo previsto en estos Términos y Condiciones), incluyendo sin carácter limitativo, el diseño, la gráfica, las combinaciones de colores, los programas, los textos, los eslóganes y mensajes publicitarios, los logos, las marcas, los nombres de dominio, etc. No deberás usar ninguno de ellos sin autorización expresa de MI ROPERO.
        </p>
        <p className="tituloSecundario">1.2 Nuestra responsabilidad</p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Como regla general, MI ROPERO no será responsable por ninguna de las
          acciones u omisiones realizadas por los Usuarios de y en nuestro Sitio
          Web.</span>
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          MI ROPERO es un proveedor de un servicio de Internet y como tal,
          ponemos a disposición una plataforma de acceso público en la que
          terceros, sin vinculación legal con nosotros más allá de estos
          Términos y Condiciones, publican contenidos y realizan operaciones
          entre ellos. En algunos casos, MI ROPERO realiza ciertas limitadas
          comprobaciones de los Usuarios que se registran en nuestro Sitio Web o
          de algunas actividades que realizan a través del mismo pero, de forma
          general, no tenemos la capacidad técnica ni la obligación legal de
          supervisar el comportamiento de nuestros Usuarios dentro del Sitio
          Web.</span>
        </p>
        <p className="textoRegular">
          MI ROPERO no vende (salvo que lo indiquemos expresamente) ni compra
          los artículos publicados en este Sitio Web; no actuamos como
          corredores; no asesoramos a nuestros Usuarios en sus publicaciones, ni
          en sus estrategías de ventas, sus campañas de marketing o sus compras;
          y no participamos en las negociación ni el perfeccionamiento de las
          operaciones concluidas entre los Usuarios de nuestro Sitio Web, así
          como tampoco resolvemos los conflictos derivados de tales operaciones.
        </p>
        <p className="textoRegular">
          En caso de que tengas conocimiento de una infracción legal cometida a
          través de nuestro Sitio Web, deberás comunicárnosla inmediatamente, la
          analizaremos y actuaremos conforme lo indique la normativa vigente en
          ese momento. De forma general, intentaremos bloquear el o los
          contenidos cuestionados mientras dure nuestra investigación, siempre y
          cuando dicho bloqueo no pueda afectar legítimos derechos de todos o
          alguno de nuestros Usuarios y/o comprometer nuestra responsabilidad.
          En tales casos, el bloqueo deberá ser ordenado por un juez competente.
        </p>
        <p className="tituloSecundario">1.3 Tu responsabilidad</p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Es importante que entiendas que si publicás, vendés y/o comprás en
          nuestro Sitio Web, lo hacés en todos los casos exclusivamente bajo tu
          propia responsabilidad.</span> Por regla general y dentro de los límites de
          la legislación vigente en cada momento, todas las operaciones que se
          realicen en nuestro Sitio Web son por cuenta y riesgo exclusivamente
          de sus Usuarios. Además, como Usuario de este Sitio Web, te
          comprometés a cumplir en todo momento estos Términos y Condiciones y a
          seguir las directivas e instrucciones que cada tanto pueda comunicarte
          MI ROPERO.
        </p>
        <p className="tituloSecundario">
          1.4 Cuál es la finalidad de este Sitio Web
        </p>
        <p className="textoRegular">
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
        <p className="tituloSecundario">
          1.5 Qué no podés hacer en este Sitio Web
        </p>
        <p className="textoRegular">
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
        <p className="tituloSecundario">1.6 Si te arrepentís de una compra</p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Tenés derecho a arrepentirte y devolver una compra efectuada en nuestro Sitio Web, sin costo y sin justificar el motivo, dentro de un plazo de DIEZ (10) DÍAS corridos desde que la hayas abonado o desde la entrega del producto, lo último que ocurra. Para ello, deberás seguir los pasos indicados en la Sección 9.1.- Derecho de Revocación, de estos Términos y Condiciones. También podés ejercer de este derecho a través del “botón de arrepentimiento” disponible en la página de inicio de nuestro Sitio Web.</span>
        </p>
        <p className="tituloSecundario">
          1.7 Aceptación de los Términos y Condiciones
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Si usás de cualquier forma nuestro Sitio Web, estás aceptando de
          manera incondicionada estos Términos y Condiciones.</span> En aquellas
          funcionalidades a las que sólo se accede mediante registración previa
          como, de forma general, para comprar o vender a través de nuestro
          Sitio Web, la aceptación se realiza de forma expresa mediante uno o
          más “click/s”. En los restantes casos, tu sola permanencia y
          navegación por nuestro Sitio Web significará tu aceptación de estos
          Términos y Condiciones, por tratarse de una conducta suficiente para
          demostrar la existencia de un acuerdo en los términos del artículo 971
          del Código Civil y Comercial de la Nación.
        </p>
        <p className="tituloPrimario">2. ACCESO A NUESTRO SITIO WEB</p>
        <p className="tituloSecundario">
          2.1 Restricciones del uso por menores de edad
        </p>
        <p className="textoRegular">
        Está prohibido el acceso a nuestro Sitio Web por menores de catorce años. Los menores de dieciocho años no emancipados podrán ingresar e interactuar con el Sitio Web únicamente bajo la supervisión de sus padres o tutores. Los padres, tutores o representantes legales deberán instalar en los equipos electrónicos de las personas a su cargo los controles parentales correspondientes y serán solidariamente responsables de toda o cualquier interacción que las personas a su cargo realicen con nuestro Sitio Web en los términos del artículo 1.754 del Código Civil y Comercial de la Nación.
        </p>
        <p className="tituloSecundario">2.2 Acceso libre y gratuito</p>
        <p className="textoRegular">
          El acceso y la navegación por nuestro Sitio Web es libre y gratuito,
          sin perjuicio del costo de la conexión a Internet que estará siempre a
          cargo de cada Usuario. Sin embargo, MI ROPERO se reserva el derecho, a
          nuestro exclusivo criterio, de impedir o bloquear en cualquier momento
          el acceso de uno o más Usuarios determinados, de Usuarios provenientes
          de una determinada ubicación geográfica o pertenecientes a un
          determinado grupo o categoría a los que MI ROPERO decida en cada
          momento restringir el acceso a este Sitio Web.
        </p>
        <p className="tituloSecundario">2.3 Sitio Web sin garantías</p>
        <p className="textoRegular">
          El Sitio Web se suministra a los Usuarios tal como está disponible en
          cada momento, sin garantías de ninguna clase. Como todo recurso
          online, nuestro Sitio Web puede presentar fallas, interrupciones y
          caídas del servicio. Más allá de nuestros esfuerzos para restablecer
          su disponibilidad en el menor plazo posible, MI ROPERO no garantiza
          que este Sitio Web resulte accesible siempre y en cada momento. En
          ningún caso MI ROPERO será responsable si una operación no puede
          concretarse por una falla o caída del Sitio Web, así como tampoco si
          determinadas funcionalidades del Sitio Web permanecen indisponibles
          durante un tiempo prolongado e, incluso, no pueden restablecerse
          nuevamente.
        </p>
        <p className="tituloSecundario">
          2.4 Medidas razonables de seguridad y exención de responsabilidad
        </p>
        <p className="textoRegular">
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

        <p className="tituloPrimario">3. CREAR UNA CUENTA</p>
        <p className="textoRegular">
          Algunas de las secciones y funcionalidades de nuestro Sitio Web y, en
          particular, la compra y/o la venta de productos a través del mismo, no
          son accesibles sino tras la creación de una cuenta por parte del
          Usuario. En esta Sección, te explicamos cuáles son las reglas bajo las
          que podés crear una cuenta en nuestro Sitio Web.
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Al crear una cuenta en MI ROPERO, aceptás ser el único responsable de
          su uso y de todas las operaciones que se realicen a través de la
          misma. Antes de completar el proceso de alta, deberás aceptar en forma
          expresa estos Términos y Condiciones, que establecen las obligaciones
          y las responsabilidades que asumes por crear una cuenta en MI ROPERO.
          No deberías crear una cuenta en MI ROPERO sin leer antes atentamente
          estos Términos y Condiciones.</span>
        </p>
        <p className="tituloSecundario">3.1 Alta de una cuenta</p>
        <p className="textoRegular">
        El alta de una cuenta se lleva a cabo completando el formulario disponible a tal efecto en nuestro Sitio Web. En el caso de comercios o negocios, antes del alta de la cuenta, podremos solicitar información adicional y documentación que acredite tu condición fiscal o cualquier otra circunstancia legal. Toda la información que nos comuniques durante el proceso de alta de una cuenta tienen el carácter de declaración jurada, lo que significa que garantizás y te hacés responsable frente a MI ROPERO y al resto de los Usuarios de nuestro Sitio Web de que esa información es cierta, completa y actual. También te comprometés a mantener actualizada la información de tu cuenta mientras permanezca abierta. 
        </p>
        <p className="textoRegular">
        Los adolescentes mayores de catorce años podrán abrir cuentas en el Sitio Web únicamente bajo supervisión parental y sujeto a la dispuesto en la Cláusula 2.1 de estos Términos y Condiciones.
        </p>
        <p className="textoRegular">
        De forma general, el alta de tu cuenta será automática tras completar nuestro formulario. Sin embargo, en algunos casos y, en particular, cuando se trate de comercios o negocios, el alta puede quedar condicionada a que revisemos y validemos la información que nos hayas compartido. En este caso, te confirmaremos el alta mediante el envío de un email a la dirección que nos hayas comunicado durante el proceso de alta. 
        </p>
        <p className="textoRegular">
        Todos los datos personales que nos compartas durante el proceso de alta serán tratados de conformidad con nuestra Política de Privacidad que podés consultar <span style={{cursor:"pointer",color:"blue",textDecoration:"underline"}} onClick={()=>window.location.replace("https://www.miropero.ar/politica&de&privacidad")}>aquí</span>
        </p>
        <p className="tituloSecundario">
          3.2 Nuestro derecho a rechazar el alta de una cuenta
        </p>
        <p className="textoRegular">
          Nuestro derecho a rechazar el alta de una cuenta MI ROPERO se reserva
          el derecho en todos los casos de rechazar una solicitud de alta de una
          cuenta, sin necesidad de expresar causa ni motivo alguno y sin que, en
          ningún caso, tal negativa pueda dar derecho a una indemnización ni
          compensación de ningún tipo a favor del Usuario cuyo pedido de alta
          sea denegado.
        </p>
        <p className="tituloSecundario">3.3 Tu cuenta es sólo tuya</p>
        <p className="textoRegular">
          Las cuentas de MI ROPERO son personales e intransferibles. Cada
          Usuario es el único titular de su cuenta y no podrá contar con más de
          una cuenta. Queda prohibida la venta, cesión o transmisión bajo
          cualquier modalidad de una cuenta de MI ROPERO, así como, de forma
          general, cualquier cambio de titular.
        </p>
        <p className="tituloSecundario">3.4 Ingreso a tu cuenta</p>
        <p className="textoRegular">
          El ingreso a las cuentas de MI ROPERO se realiza cada vez mediante un
          usuario y contraseña. Serás el único en conocer el ususario y
          contraseña que dan acceso a tu cuenta. Deberás mantener la
          confidencialidad de tus claves, no compartirlas con ninguna persona
          ajena a tu organización y cambiarlas de forma periódica.
        </p>
        <p className="textoRegular">
          En caso de que olvides tu usuario o contraseña, deberás generarlos
          nuevamente siguiendo el proceso de recuperación de claves previsto en
          nuestro Sitio Web. Te enviaremos las nuevas claves prioritariamente a
          la dirección de correo electrónico que figure en nuestros sistemas;
          por eso es importante que la mantengas actualizada. MI ROPERO no será
          responsable si en base a los datos registrados en nuestros sistemas,
          no podemos validar tu identidad a los efectos de restrablecer las
          claves de ingreso a tu cuenta.
        </p>
        <p className="textoRegular">
          En caso de que detectes un ingreso no autorizado a tu cuenta, deberás
          comunicárnoslo inmediatamente y seguir nuestras instrucciones.
          Podremos suspender o cerrar una cuenta que haya sido hackeada o sobre
          la que su titular haya perdido el control, aún de forma intermitente.
          En este caso, no nos hacemos responsables de la pérdida de la
          información y de los contenidos almacenados en la cuenta.
          Periódicamente deberás hacer una copia de respaldo en otro dispositivo
          de la información y del contenido almacenado en tu cuenta que no
          quieras perder.
        </p>
        <p className="tituloSecundario">
          3.5 Responsabilidad por los contenidos de tu cuenta
        </p>
        <p className="textoRegular">
        Serás el único responsable de todos y cada uno de los contenidos que publiques en tu cuenta en cada momento. Antes de subirlo a tu cuenta, deberás asegurarte que cuentas con todos los derechos y licencias necesarias para publicar un determinado contenido. MI ROPERO podrá bloquear o dar de baja cualquier contenido que sea denunciado como un uso no autorizado de las marcas o de la propiedad intelectual de terceros, sin perjuicio de las responsabilidades legales que correspondan y que serán en todos los casos asumidas exclusivamente por el titular de la cuenta.
        </p>
        <p className="textoRegular">
        Por “contenido” a los efectos de estos Términos y Condiciones se entenderá, sin carácter limitativo, cualquier texto, símbolo, signo, hashtag, dibujo, imagen, fotografía, collage, reel, video, animación, meme, sónido, música, composición audiovisual, en 3D o de realidad aumentada, geolocalización, enlace, archivo, carpeta, programa, etc. publicado de tanto en tanto y en cada momento en nuestro Sitio Web.
        </p>
        <p className="tituloSecundario">
          3.6 Licencia de los contenidos a favor de MI ROPERO
        </p>
        <p className="textoRegular">
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
        <p className="tituloSecundario">
          3.7 Cláusula de indemnidad a favor de MI ROPERO
        </p>
        <p className="textoRegular">
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
        <p className="tituloSecundario">
          3.8 Suspensión y cierre de una cuenta
        </p>
        <p className="textoRegular">
          MI ROPERO se reserva el derecho de en cualquier momento suspender o
          dar de baja, temporal o definitivamente, una cuenta, sin necesidad de
          expresar causa o motivo y sin que, en ningún caso, tal decisión pueda
          dar derecho a ningún tipo de indemnización ni compensación por ningún
          concepto a favor del titular de la cuenta ni, de forma general, de
          ningún Usuario.
        </p>
        <p className="textoRegular">
          En particular, a nuestro exclusivo criterio, podremos suspender o dar
          de baja tu cuenta cuando detectemos, sin carácter limitativo, alguno
          de los siguientes comportamientos: a) falsedades o inconsistencias
          graves en la información que nos hayas facilitado al momento del alta
          de tu cuenta o posteriormente; b) intentos de evadir los
          procedimientos y los canales de contacto establecidos en nuestro Sitio
          Web, particularmente, para evitar el pago de las tarifas de MI ROPERO;
          c) incumplimiento de las condiciones para la publicación, la
          compraventa, el pago y el envío de productos a través de nuestro Sitio
          Web; d) envío reiterado de artículos defectuosos, sucios o en malas
          condiciones; e) bajas calificaciones o denuncias reiteradas por parte
          de otros Usuarios; f) uso de lenguaje ofensivo o inapropiado; g)
          actividades sospechosas de fraude, evasión fiscal o de lavado de
          activos; h) de forma general, cualquier otro uso de la cuenta para
          fines no autorizados, prohibidos o distintos a los expresamente
          previstos en estos Términos y Condiciones.
        </p>
        <p className="textoRegular">
          En caso de que detectemos una conducta que infrinja lo dispuesto en
          esta Cláusula, podremos enviarte, a nuestro exclusivo criterio, un
          apercibimiento antes de la suspesión o del cierre de tu cuenta. En tal
          caso, deberás cesar de forma inmediata cualquier conducta infractora y
          abstenerte de realizar esa o cualquier otra nuevamente. Caso
          contrario, cerraremos tu cuenta y te impediremos crear nuevas cuentas
          en el futuro, sin perjuicio de las denuncias y los reclamos legales
          que podamos formular.
        </p>
        <p className="tituloSecundario">4. VENDER EN NUESTRO SITIO WEB</p>
        <p className="textoRegular">
          En esta Sección se establecen las condiciones generales bajo las
          cuales podrás publicar productos para la venta en nuestro Sitio Web:
        </p>
        <p className="tituloSecundario">
          4.1 Publicación bajo tu exclusiva responsabilidad
        </p>
        <p className="textoRegular">
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
        <p className="tituloSecundario">4.2 Artículos prohibidos</p>
        <p className="textoRegular">
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
        <p className="tituloSecundario">
          4.3 Uso de tu cuenta como tienda online
        </p>
        <p className="textoRegular">
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
          vigente en cada momento.
        </p>
        <p className="textoRegular">
          Solamente podrás exhibir y utilizar en tu tienda online nombres
          comerciales, insignias, logos, marcas, imágenes y contenidos para los
          que tengas los derechos correspondientes. Podremos suspender o dar de
          baja tu cuenta si comprobamos o recibimos alguna denuncia de que
          utilizas cualquiera de estos elementos sin los derechos
          correspondientes.
        </p>
        <p className="tituloSecundario">
          4.4 Forma en que debés publicar tus productos
        </p>
        <p className="textoRegular">
          Únicamente podés publicar en nuestro Sitio Web productos que ofrezcas
          para su venta y de los que tengas disponibilidad (“stock”) para su
          despacho en forma inmediata.
        </p>
        <p className="textoRegular">
          Todos los productos que publiqués en nuestro Sitio Web deberán ir
          acompañados de una descripción de sus características esenciales,
          incluyendo informaciones tales como, sin carácter limitativo, el
          modelo, la marca, el talle y si se trata de un producto nuevo o usado.
          En todos los casos deberás indicar su precio en Pesos argentinos,
          debiendo aclarar expresamente si incluyen o no el IVA.{" "}
        </p>
        <p className="textoRegular">
          Las fotos y demás contenidos gráficos o audiovisuales que publiques en
          nuestro Sitio Web deberán cumplir las siguientes condiciones: a) ser
          propias o contar con las autorizaciones y licencias necesarias para su
          reproducción y comunicación pública; b) tener una cierta calidad y
          responder a la estética general del Sitio Web; c) ser una
          representación exacta del artículo que ofrezcas para la venta y no
          consistir en fotomontajes, fotos trucadas o tratadas de cualquier
          forma que pueda generar engaño o confusión sobre todas o alguna de sus
          características; y d) no tratarse de contenidos eróticos, obscenos o
          impúdicos. Podremos dar de baja cualquier contenido que, a nuestro
          exclusivo criterio, pueda herir la sensibilidad de nuestros Usuarios o
          que, simplemente, nos parezca excesivo o poco decoroso.
        </p>
        <p className="tituloSecundario">4.5 Publicidad y marketing</p>
        <p className="textoRegular">
        Sólo podrás realizar las campañas y las acciones publicitarias y de marketing de tus productos que en cada momento se encuentren autorizadas en nuestro Sitio Web. No podrás incluir enlaces a otras páginas web, incluyendo a tus perfiles en redes sociales, salvo que esa opción esté expresamente disponible. Si instalás cookies, sólo podrán ser para analizar el rendimiento (“métricas”) o el comportamiento de los usuarios dentro de la página web correspondiente a tu cuenta y deberás informar su uso en forma destacada.  . Si realizas campañas de keyword advertising, en ningún caso deberán interferir con las realizadas por nuestro Sitio Web; caso contrario, deberás suspenderlas inmediatamente. También deberás asegurarte que las palabras que utilices dentro de esas campañas no afecten derechos de terceros, ya que serás el único responsable de los reclamos que puedan generarse al respecto. MI ROPERO se reserva el derecho, a nuestro exclusivo criterio, de incluir o no la página correspondiente a tu cuenta, incluyendo cualquier contenido o parte de la misma, dentro de las campañas publicitarias, de SEM y similares que de tanto en tanto realicemos desde nuestro Sitio Web. 
        </p>
        <p className="tituloSecundario">
          4.6 Diligencia en atender las consultas y pedidos de los Usuarios
        </p>
        <p className="textoRegular">
          Si publicás productos para la venta en nuestro Sitio Web, deberás
          atender de forma diligente las consultas, los pedidos y, en su caso,
          los reclamos de nuestros Usuarios y, en su caso, de MI ROPERO, y
          despachar o tener listos para su retiro los artículos vendidos dentro
          de los plazos fijados en cada caso en estos Términos y Condiciones.
          Serás el único responsable y podremos suspender o cerrar tu cuenta en
          caso de una atención no diligente de tu cuenta.
        </p>
        <p className="tituloSecundario">
          4.7 Obligación de utilizar únicamente los canales de contacto
          autorizados
        </p>
        <p className="textoRegular">
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
        <p className="tituloSecundario">4.8 Ofertas</p>
        <p className="textoRegular">
        Si publicás ofertas, incluyendo cualquier tipo de rebaja, promoción o descuento, deberán ser reales y transparentes. Deberás publicar de forma clara, detallada y descatada las condiciones de la oferta, incluyendo, de corresponder, el porcentaje de descuento sobre el precio anterior. Si no establecés un plazo, las ofertas  estarán vigentes durante todo el tiempo que permanezcan accesibles en nuestro Sitio Web. 
        </p>
        <p className="textoRegular">
        En ningún caso podrás: a) presentar como una oferta situaciones que no impliquen una reducción significativa de los precios previos u ofrezcan otros beneficios reales para los destinatarios, en este caso, debiendo explicar claramente en qué consisten y cuál es la ventaja para los destinatarios; b) ofrecer o entregar premios o regalos vinculados directa o indirectamente a la compra de un producto, cuando dichos premios o regalos estén sujetos a la intervención del azar; y c) organizar concursos, sorteos o eventos de cualquier tipo, online u offline, en los que la participación esté condicionada a la adquisición de un producto.
        </p>
        <p className="textoRegular">
        De tanto en tanto, MI ROPERO podrá establecer ofertas o condiciones bajo las cuales nuestros Usuarios pueden obtener cupones de descuento u otros beneficios en nuestro Sitio Web. Las mismas serán obligatorias para los Vendedores que ofrezcan productos incluidos dentro de las condiciones de la oferta o del beneficio de que se trate. También podremos adherir y participar de iniciativas sectoriales para ofrecer descuentos u otros beneficios generalizados, o en relación con determinadas categorías de productos, en determinadas fechas u ocasiones especiales. Los descuentos o beneficios así acordados serán obligatorios para todos los Vendedores de nuestro Sitio Web.
        </p>
        <p className="tituloSecundario">4.9 Garantías</p>
        <p className="textoRegular">
          De corresponder, deberás: a) informar sobre las garantías a las que
          están sujetas los productos que ofreces para la venta; b) extender y
          entregar al Comprador el certificado de garantía que corresponda según
          la normativa vigente en cada momento; y c) cumplir con las
          reparaciones, sustituciones y devoluciones que correspondan en virtud
          de dicha garantía.
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Se informa a los Usuarios que los plazos de las garantías
          contractuales y legales han sido suspendidos por todo el periodo en
          que se hayan visto imposibilitados de ejercer sus derechos en virtud
          del Aislamiento Social, Preventivo y Obligatorio dictado por el
          Decreto nº 297 de 19 de marzo de 2020 y sus modificatorios (cfr. Res.
          244/2020, de la Secretaría de Comercio Interior).</span>
        </p>
        <p className="tituloPrimario">5. COMPRAR EN NUESTRO SITIO WEB</p>
        <p className="textoRegular">
          En esta Sección te informamos cómo y bajo qué condiciones podés
          comprar en nuestro Sitio Web:
        </p>
        <p className="tituloSecundario">
          5.1 Los riesgos de comprar por Internet
        </p>
        <p className="textoRegular">
        Las compras en nuestro Sitio Web se realizan, total o parcialmente, de forma electrónica, es decir, mediante la transmisión de datos en formato digital por redes de telecomunicaciones. Tenés que tener en cuenta que comprar por Internet implica ciertos riesgos como ser, sin carácter limitativo, la interrupción y el fracaso de la transmisión de los datos, la intercepción con fines ilícitos (“hackeo”) de los datos que transmitas, la transmisión de datos que no querías enviar o su envío a destinatarios distintos de aquellos a los que la transmisión estaba dirigida, etc. MI ROPERO no será responsable por ninguna incidencia ocurrida durante el proceso de compra por medios electrónicos, incluyendo el extravío o el desvío, de forma intencional o accidental, de un pago antes del ingreso en nuestras cuentas.<span style={{color:"black",fontWeight:"600"}}>Al iniciar el proceso de compra en nuestro Sitio Web, confirmás entender, aceptar y asumir todos los riesgos asociados a la contratación por medios electrónicos.</span> 
        </p>
        <p className="tituloSecundario">
          5.2 Descripción del proceso de compra
        </p>
        <p className="textoRegular">
          Para comprar cualquier artículo en nuestro Sitio Web deberás completar
          los siguientes pasos:
        </p>
        <p className="textoRegular">
          1. Abrir una cuenta o ingresar con tu usuario y contraseña;
        </p>
        <p className="textoRegular">
          2. Seleccionar el o los artículo/s que quieras comprar. Los artículos
          seleccionados se agregarán a “Mi Carrito”. En cualquier momento podrás
          acceder a “Mi Carrito” para ver o eliminar los artículos
          seleccionados;{" "}
        </p>
        <p className="textoRegular">
          3. Tras presionar el botón “Finalizar Compra”, se te exhibirá un
          formulario con tus datos y el domicilio de entrega preestablecido.
          Deberás confirmar o modificar el domicilio de entrega;{" "}
        </p>
        <p className="textoRegular">
          4. Dependiendo del destino, podrás seleccionar la forma de envío;{" "}
        </p>
        <p className="textoRegular">
          5. Deberás seleccionar el medio de pago y, de corresponder, insertar
          tu código de descuento. En algunos casos, tendrás la opción de pagar
          en una o más cuotas;{" "}
        </p>
        <p className="textoRegular">
          6. Una vez elegido el medio de pago, se te exhibirá un resumen de tu
          compra, incluyendo el precio final de cada producto por separado e
          informándote, también por separado, los costos correspondientes a
          impuestos, comisiones y gastos de envío;{" "}
        </p>
        <p className="textoRegular">
          7. Deberás aceptar estos Términos y Condiciones, haciendo “click”
          junto al enlace en el que podrás acceder a los mismos y
          descargártelos;{" "}
        </p>
        <p className="textoRegular">
          8. Presionando el botón “Pagar”, se te redirigirá a la plataforma de
          pago en caso de que hayas seleccionado esta opción, o te enviaremos un
          link al correo electrónico proporcionado durante la compra para que
          puedas pagar mediante el medio de pago offline que hayas elegido.{" "}
        </p>
        <p className="textoRegular">
          9. Una vez completado el pago, recibirás un email de confirmación con
          la descripción de tu compra y una copia de estos Términos y
          Condiciones en un formato que podrás guardar y recuperar en cualquier
          momento.
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          10. A partir de la confirmación de tu pago, podrás ejercer el derecho
          de revocación informado en la Sección 9.1 de estos Términos y
          Condiciones.</span>
        </p>
        <p className="tituloSecundario">5.3 Calificación de la compra</p>
        <p className="textoRegular">
        MI ROPERO ofrece a sus Usuarios la posibilidad de calificar las prestaciones recibidas por parte de otros Usuarios, con base a criterios tales como, sin carácter limitativo, su nivel de satisfacción con la atención brindada y con los productos recibidos, el tiempo de respuesta de las consultas y, en su caso, de los reclamos, el plazo para despachar los envíos, etc. En base a estas calificaciones, se generará en forma automática un puntaje que podrá ser consultado por los restantes Usuarios y por el público en general. Por el simple hecho de publicar en nuestro Sitio Web, aceptás participar de este sistema y ser calificado por los restantes Usuarios de nuestro Sitio Web. También declarás conocer que MI ROPERO no tiene ninguna injerencia ni posibilidad de influencia en las calificaciones emitidas por nuestros Usuarios, y renunciás a formular cualquier reclamo fundado en las calificaciones y en el puntaje que recibas como Usuario de nuestro Sitio Web. Queda prohibido intentar influenciar de cualquier forma en la calificación de una operación por parte de un Usuario con el objeto de mejorar el puntaje de su cuenta. MI ROPERO podrá suspender o cerrar una cuenta que reciba una o más calificaciones negativas,  cuyo puntaje basado en las calificaciones de nuestros Usuarios evidencie, a nuestro exclusivo criterio, un comportamiento poco fiable o negligente como Usuario de nuestro Sitio Web, o cuyo titular haya intentado influenciar de cualquier forma o modificar la calificación dada por un Usuario a una determinada operación 
        </p>
        <p className="tituloSecundario">5.4 Plazo para calificar una compra</p>
        <p className="textoRegular">
          Tendrás un plazo de CUARENTA Y OCHO (48) horas a contar desde la
          recepción del envío para calificar la compra utilizando la sección
          disponible a tal efecto en nuestro Sitio Web. Transcurrido dicho
          plazo, esta posibilidad se inhabilitará automáticamente y, de forma
          general, entenderemos que la compra ha sido concluída de forma
          satisfactoria.
        </p>
        <p className="tituloSecundario">5.5 Incidencias durante la compra</p>
        <p className="textoRegular">
        Podrás ponerte en contacto con nosotros por WhatsApp al número (+54 9) 11-5486-4779 por cualquier incidencia que pudiera surgir durante el proceso de compra. Tené en cuenta que este servicio estará disponible únicamente de lunes a viernes en el horario argentino de 9 a 18. En las compras que realices fuera de ese horario no contarás con este soporte.
        </p>
        <p className="tituloPrimario">6. PAGAR EN NUESTRO SITIO WEB</p>
        <p className="tituloSecundario">
          6.1 Medios de pago habilitados y exención de responsabilidad
        </p>
        <p className="textoRegular">
          Podrás pagar tus compras exclusivamente a través de uno de los medios
          de pago habilitados en cada momento en nuestro Sitio Web. Durante el
          proceso de compra, se te informará y deberás elegir uno de los medios
          de pago disponibles en ese momento.
        </p>
        <p className="textoRegular">
          MI ROPERO utiliza en todos los casos medios de pago provistos y
          gestionados por terceros. Por tanto, por regla general y dentro de los
          límites de la normativa vigente cada momento, MI ROPERO no será
          responsable por ninguna de las incidencias que se produzcan durante el
          uso de cualquiera de los medios de pago habilitados en nuestro Sitio
          Web.
        </p>
        <p className="tituloSecundario">6.2 Gateway de MercadoPago</p>
        <p className="textoRegular">
        MI ROPERO utiliza MercadoPago para procesar los pagos online de nuestro Sitio Web. El uso por tu parte de este medio de pago, incluyendo sus costos y tarifas, los plazos de liquidación, los límites de procesamientos de pago y los mecanismos para la resolución de reclamos y disputas, quedará sujeto a las condiciones del servicio de Mercado Pago que podés consultar <span style={{cursor:"pointer",color:"blue",textDecoration:"underline"}}>aquí</span>. MercadoPago ofrece, como parte de sus servicios, la seguridad y la estabilidad de sus sistemas de pago. Por lo tanto, en ningún caso MI ROPERO será responsable de ningún daño derivado de las fallas de seguridad de MercadoPago. Las tarifas de MercadoPago estarán en todos los casos a cargo de los Usuarios y se adicionarán al precio final de cada operación en la que se elija MercadoPago como medio de pago.
        </p>
        <p className="tituloSecundario">6.3 Medios de pago offline</p>
        <p className="textoRegular">
          En caso de que elijas algún medio de pago en el que debas concurrir a
          alguna oficina, cajero o dependencia para completar el pago de los
          productos adquiridos en nuestro Sitio Web, tendrás un plazo de setenta
          y dos (72) horas desde la aceptación de la compra para hacerlo. Una
          vez efectuado el pago, deberás enviarnos por email el comprobante
          correspondiente. Dispondrás del mismo plazo de setenta y dos (72)
          horas para realizarnos la transferencia del importe correspondiente a
          tu compra, en caso de que selecciones esta opción como medio de pago.
          Efectuada la transferencia, deberás remitirnos el comprobante de la
          misma para que podamos rastrearla en nuestra cuenta. En caso de que no
          completes el pago dentro del plazo previsto en esta Cláusula, la
          compra se anulará automáticamente y serás responsable por los todos
          los daños y gastos que genere esa cancelación. MI ROPERO podrá cerrar
          la cuenta de un Usuario que, de forma reiterada, permita la
          cancelación de operaciones concretadas en nuestro Sitio Web por su
          falta de pago en plazo.
        </p>
        <p className="tituloSecundario">6.4 Uso de tarjetas bancarias</p>
        <p className="textoRegular">
          El uso de tarjetas de crédito o débito para abonar las compras en
          nuestro Sitio Web estará regido, además de por lo dispuesto en estos
          Términos y Condiciones, por lo establecido en las condiciones de
          emisión fijadas por el banco o entidad emisora de la tarjeta. En
          ningún caso MI ROPERO será responsable por ningún aspecto vinculado a
          las condiciones de emisión y de uso de una tarjeta así como a las
          demás obligaciones contractuales entre un Usuario y el banco o la
          entidad emisora de la misma.
        </p>
        <p className="tituloSecundario">6.5 Problemas con los pagos</p>
        <p className="textoRegular">
          Si tenés algún problema con la acreditación del pago de una compra,
          debes ponerte en contacto con nosotros a través de los canales de
          atención informados en la Sección 10.1 de estos Términos y
          Condiciones. Sin embargo, te recordamos que los medios de pago
          constituyen servicios de terceros por los que MI ROPERO no puede
          responder. Por ello, nuestra actuación se limitará a transmitir tu
          reclamo al proveedor del medio de pago de que se trate y darle
          seguimiento hasta obtener una respuesta del mismo.
        </p>
        <p className="tituloSecundario">6.6 Posibilidad de retener pagos</p>
        <p className="textoRegular">
          MI ROPERO podrá – pero no garantizamos que lo hagamos siempre y en
          todos los casos - retener el dinero correspondiente a un pago: a)
          hasta tener la confirmación de la recepción de conformidad de los
          productos por parte del Comprador; b) hasta que el Comprador califique
          la compra de conformidad con lo previsto en la Clásula 5.4; y/o c)
          hasta que haya expirado el plazo previsto para la calificación de la
          compra y/o para la devolución de los productos adquiridos. Si una
          compra es calificada negativamente y el Comprador inicia un reclamo,
          MI ROPERO podrá retener los fondos hasta tanto el Vendedor y el
          Comprador resuelvan la incidencia. En lo posible, MI ROPERO mantendrá
          actualizado al Vendedor sobre el status de pago de una operación
          concretada a través de nuestro Sitio Web.
        </p>
        <p className="tituloSecundario">6.7 Operaciones sospechosas</p>
        <p className="textoRegular">
          MI ROPERO y sus proveedores de medios de pago, conjunta o
          indistintamente, podrán anular cualquier operación que, a su sólo
          criterio, consideren sospechosa, pudiendo retener los fondos hasta que
          se aclare la incidencia, sin perjuicio de poder realizar las denuncias
          ante las autoridades de control y judiciales correspondientes.
        </p>
        <p className="tituloSecundario">
          6.8 Obligación de mantener actualizada los datos de la cuenta
          denunciada para recibir pagos
        </p>
        <p className="textoRegular">
          Será responsabilidad exclusiva de los Usuarios mantener actualizada la
          información de la cuenta en la que pretendan recibir las
          transferencias de dinero de MI ROPERO. En ningún caso nos haremos
          responsables por la falta de recepción de una transferencia motivada,
          sin carácter limitativo: a) por el cierre, bloqueo, embargo o
          cualquier otra situación que de cualquier forma afecte la cuenta
          registrada por el Usuario en nuestros sistemas y que impida a este
          último percibir el precio de una operación concretada en nuestro Sitio
          Web; b) en el extravío, incluso en forma permanente, de la
          transferencia correspondiente al precio de una operación concretada en
          nuestro Sitio Web imputable a la entidad bancaria o al proveedor de la
          cuenta virtual del Usuario; y c) de forma general, por cualquier
          incidencia durante la transferencia de dinero por parte de MI ROPERO o
          por parte de nuestros provedores de medios de pago a un Usuario que no
          sean directa y exclusivamente imputable a MI ROPERO.
        </p>
        <p className="tituloPrimario">7. NUESTRAS TARIFAS</p>
        <p className="tituloSecundario">
          7.1 Tarifas por operaciones y a cargo del Vendedor
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Las tarifas de MI ROPERO consisten exclusivamente en un porcentaje de
          las operaciones que involucren pagos en dinero celebradas en nuestro
          Sitio Web. Nuestras tarifas estarán en todos los casos exclusivamente
          a cargo del Usuario que actúe como Vendedor.</span>
        </p>
        <p className="tituloSecundario">
          7.2 Esquema de tarifas y derecho a modificarlo
        </p>
        <p className="textoRegular">
          De forma general, nuestras tarifas se establecen en un porcentaje del
          DIECIOCHO POR CIENTO (18%) del precio total de la venta. No obstante,
          nos reservamos el derecho de modificar e, incluso, aumentar nuestras
          tarifas, sin que en ningún caso nuestros Usuarios tengan ni puedan
          invocar ningún derecho al mantenimiento de una determinada tarifa o un
          determinado nivel de tarifas. Cualquier modificación de nuestras
          tarifas les será comunicada a nuestros Usuarios mediante un email a la
          dirección de correo electrónico que tengamos registrada en nuestros
          sistemas. También nos reservamos el derecho de reducir cualquiera de
          nuestras tarifas e, incluso eliminarlas transitoria o permanentemente,
          únicamente en relación con algún o algunos producto/s determinado/s o
          a un determinado grupo de productos que, sin carácter limitativo: a)
          decidamos promocionar en un momento determinado; b) decidamos
          exceptuar del esquema general de tarifas; c) para los que hayamos
          establecido un acuerdo con los proveedores en relación con nuestras
          tarifas; y/o d) para los que hayamos establecido de tanto en tanto
          algún sistema de pago o forma de retribución distinta.
        </p>
        <p className="tituloPrimario">8. ENVÍOS</p>
        <p className="tituloSecundario">8.1 Formas de envío</p>
        <p className="textoRegular">
          Salvo autorización expresa de MI ROPERO, los Usuarios sólo podrán
          utilizar alguna de las formas de envío expresamente habilitadas en
          cada momento en nuestro Sitio Web. Dependiendo de su ubicación, en
          algunos casos el Comprador podrá elegir la forma de envío de los
          productos que adquiera en nuestro Sitio Web. El envío de artículos
          adquiridos en nuestro Sitio Web por un medio distinto a los
          autorizados implicará el cierre de la cuenta del o de los Usuarios
          infractores.
        </p>
        <p className="textoRegular">
          En la actualidad, las formas de envío disponibles para los productos
          adquiridos en nuestro Sitio Web son por OCA (a todo el país) y por la
          aplicación MOOVA (sólo disponible en la CABA y zonas del Gran Buenos
          Aires). De tanto en tanto podremos habilitar otras formas de envío así
          como modificar o eliminar las existentes, a nuestro exclusivo criterio
          y sin que exista ninguna obligación a mantener una determinada forma
          de envío o mantenerla por un determinado tiempo o para un determinado
          lugar.
        </p>
        <p className="tituloSecundario">
          8.2 Obligación del Vendedor de despachar dentro del plazo
        </p>
        <p className="textoRegular">
          Los Vendedores deberán despachar los envíos dentro de los plazos
          previstos para la forma de envío asignada durante el proceso de
          compra. MI ROPERO podrá enviar recordatorios periódicos, pero la
          responsabilidad del despacho del envío dentro del plazo es exclusiva
          del Vendedor. La primera vez que un Vendedor no despache una compra en
          plazo, le enviaremos un email de advertencia. La segunda vez, podremos
          cerrar su cuenta.
        </p>
        <p className="textoRegular">
          Todos los daños y los gastos que genere la cancelación de una compra
          por falta de envío o por despacho tardío serán exclusivamente a cargo
          del Vendedor incumplidor. Este último se compromete de forma
          incondicionada a indemnizar y a mantener indemne a MI ROPERO, frente a
          todo reclamo fundado directa o indirectamente en el incumplimiento por
          su parte de lo dispuesto en esta Cláusula, debiendo, según el caso,
          abonar o reembolsarnos cualquier suma que, en cualquier concepto,
          incluyendo sin carácter limitativo, indemnizaciones, compensaciones,
          tarifas, comisiones, impuestos, gastos, etc., resulte exigible a MI
          ROPERO o MI ROPERO se vea obligado a abonar al Comprador o a terceros
          por tal motivo.
        </p>
        <p className="tituloSecundario">8.3 Envíos por OCA</p>
        <p className="textoRegular">
        En caso de que la forma de envío seleccionada sea OCA, junto con la confirmación de la compra, se enviará al Vendedor por email un link en el que podrá seleccionar la sucursal desde la que realizará el envío y descargar la etiqueta que deberá pegar el paquete con el/los artículo/s vendido/s. El Vendedor tendrá cinco (5) días hábiles desde la recepción de nuestro email para despachar el envío. Vencido dicho plazo, la compra se cancelará de forma automática, se informará al Comprador y se le devolverá la totalidad de su dinero, sin perjuicio de que MI ROPERO pueda ofrecerle otros productos en reemplazo de los adquiridos en la compra anulada.
        </p>
        <p className="tituloSecundario">8.4 Envío por MOOVA</p>
        <p className="textoRegular">
        En caso de que la forma de envío seleccionada – en los casos en que proceda - sea mediante servicio de moto, junto con la confirmación de la compra, se informará al Vendedor la hora aproximada en que se procederá a retirar el envío de su domicilio. El Vendedor - o una persona autorizada por este último - deberá encontrarse en el domicilio de recogida y tener el paquete listo para su retiro a la hora informada. MI ROPERO enviará al Vendedor actualizaciones sobre la ubicación y la hora estimada de llegada del encargado de retirar el envío. En caso de que el Vendedor - o una persona autorizada por este último – no esté en el domicilio de recogida al momento previsto para su retiro o no tenga listo el paquete con el envío, la compra se cancelará de forma automática, se informará al Comprador y se le devolverá la totalidad de su dinero, sin perjuicio de que MI ROPERO pueda ofrecerle otros productos en reemplazo de los adquiridos en la compra anulada.
        </p>
        <p className="tituloSecundario">
          8.5 Seguimiento del envío y plazos de entrega
        </p>
        <p className="textoRegular">
        Los Usuarios podrán hacer un seguimiento online del envío, ingresando a la sección correspondiente de nuestro Sitio Web.
        </p>
        <p className="textoRegular">
        De forma general, los plazos de entrega serán los siguientes:
        </p>
        <p className="textoRegular">
        - Por OCA: entre siete (7) y quince (15) días hábiles, dependiendo de la ubicación del Vendedor y del Comprador.
        </p>
        <p className="textoRegular">- Por servicio de moto: </p>
        <p className="textoRegular">
          - En el mismo día si la operación ingresa en nuestros sistemas antes
          de las catorce (14:00) horas;
        </p>
        <p className="textoRegular">
          - En el mismo día si la operación ingresa en nuestros sistemas antes de las catorce (14:00) horas;
        </p>
        <p className="textoRegular">
          - El siguiente día hábil antes de las diez (10:00) horas, si la operación ingresa en nuestros sistemas después de las catorce (14:00) horas; 
        </p>
        <p className="textoRegular">
          - El siguiente día habil antes de las diez (10:00) horas, si la operación ingresa en nuestros sistemas un viernes después de las catorce (14:00) horas;
        </p>
        <p className="textoRegular">
          - El siguiente día habíl antes de las diez (10:00) horas, si la operación ingresa en nuestros sistemas un sábado,  domingo o feriado.
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
        Los plazos informados arriba son estimativos. En ningún caso MI ROPERO garantiza la entrega de un envío en un determinado plazo. </span>
        </p>
        <p className="tituloSecundario">8.6 Reclamos por envíos extraviados</p>
        <p className="textoRegular">
          En caso de que no recibas un envío dentro de los plazos estimativos
          informados, deberás ponerte en contacto con MI ROPERO en nuestros
          canales de atención informados en la Sección 10 de estos Términos y
          Condiciones. Si se confirma el extravío del envío, salvo caso fortuito
          o el hecho de un tercero por el que no debamos responder, te
          reembosaremos la totalidad del dinero de tu compra, sin perjuicio de
          poder ofrecerte otros productos en reemplazo de los extraviados,
          opción que siempre podrás declinar. En este caso, te comprometés a
          prestar toda la colaboración y a seguir en todo momento las
          instrucciones de MI ROPERO a fin de que podamos formular la denuncia
          ante el seguro correspondiente.
        </p>
        <p className="tituloPrimario">9. CANCELACIONES Y DEVOLUCIONES</p>
        <p className="tituloSecundario">9.1 Derecho de revocación</p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
        Tenés derecho a revocar una compra y devolver cualquier artículo adquirido en nuestro Sitio Web, sin cargo y sin necesidad de explicarnos los motivos de la cancelación, dentro del plazo de DIEZ (10) DÍAS CORRIDOS desde el momento en que abones tu compra o desde la entrega del producto, lo último que ocurra.</span>
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
        Tené en cuenta que existen productos que, por su naturaleza, podrán no tener disponible el ejercicio de este derecho de conformidad con lo dispuesto en el artículo 1.116 del Código Civil y Comercial de la Nación. En particular, esto podrá ocurrir, sin carácter limitativo, en relación con todas o alguna de las siguientes categorías de productos: a) artículos usados con posterioridad a su recepción, dado que no podrá comprobarse que no han sido usados por el Comprador antes de solicitar la revocación; b) la ropa interior; c) las prendas de baño; d) los productos de belleza o para el cabello que hayan sido abiertos; y e) productos que pueden ser objeto de un único uso, como vestidos de novia, vestidos o trajes de fiesta, smokings, chaqués, fracs y similares. Tampoco podrán devolverse los productos nuevos con signos de haber sido usados. </span>
        </p>
        <p className="textoRegular">
        Para el ejercicio de tu derecho de revocación, deberás enviarnos un email a la casilla: <a href="mailto:mir@miropero.com.ar">mir@miropero.com.ar</a>, haciendo constar expresamente como asunto “DERECHO DE REVOCACIÓN”, y añadiendo toda la información que nos permita identificar la operación que  deseas cancelar, incluyendo tus datos y los del Vendedor así como la correcta identificación del o de los artículos cuya compra querés revocar. Si ya has recibido el o los artículos cuya compra has revocado, dentro de las veinticuatro (24) horas recibirás un email nuestro con las instrucciones para que puedas devolverlos sin costo. En este caso, una vez que los recibamos y comprobemos que está todo correcto, te reintegraremos la totalidad del dinero de la compra, sin perjuicio de que podamos ofrecerte otros productos en reemplazo de los productos cuya compra hayas revocado. 
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
        También podrás ejercer tu derecho de revocación, en las mismas condiciones previstas en el párrafo anterior, mediante el “botón de arrepentimiento” disponible en la página de inicio de nuestro Sitio Web. Para ello, deberás completar los campos del formulario que se despliega tras hacer click en dicho botón y enviárnoslo.</span>
        </p>
        <p className="textoRegular">
        Al publicar productos para la venta en nuestro Sitio Web, te obligás expresamente a cumplir, facilitar y con tus mejores esfuerzos ayudarnos a cumplir en todo momento con el ejercicio del derecho de revocación por parte de los Usuarios de nuestro Sitio Web. Caso contrario, podremos suspender o cerrar tu cuenta, además de reclamarte todos los daños y perjuicios que una conducta reticente o no diligente de tu parte nos ocasione.
        </p>
        <p className="tituloSecundario">
          9.2 Devolución de artículos no satisfactorios
        </p>
        <p className="textoRegular">
          Más allá de tu derecho de revocación informado en la Cláusula
          anterior, también podrás devolver cualquier producto adquirido en
          nuestro Sitio Web con el que no estés conforme por alguno de los
          siguientes motivos: a) no se corresponde el producto recibido con el
          que has comprado; b) no coinciden las características del producto
          recibido con las informadas por el Vendedor en su publicación,
          incluyendo sin carácter limitativo, el talle, el color, la marca, el
          modelo, el estilo, etc. c) no coincide el producto recibido con las
          fotos, imágenes u otros contenidos audiovisuales publicados por el
          Vendedor; d) está sucio, manchado o en mal estado; e) tratarse de un
          producto usado que fue adquirido como nuevo; f) llegó con excesivo
          retraso en relación con el plazo de entrega estimado (de forma
          general, se considerará excesivo un retraso superior a tres (3) días
          hábiles en caso de envío por MOOVA y de un (1) mes en el caso de OCA).
        </p>
        <p className="tituloSecundario">9.3 Plazo para la devolución</p>
        <p className="textoRegular">
        Si no estás conforme con un producto recibido, deberás presentar tu reclamo a través de la sección “Mis Compras” de tu cuenta, seleccionando e indicando en todos los casos el/los motivo/s de la devolución.<span style={{color:"black",fontWeight:"600"}}> El plazo para comunicarnos la devolución de un producto es de veinticuatro (24) horas si el envío se realizó por OCA, y de dos (2) horas si fue por servicio de moto, en ambos casos a contar desde el momento en que recibas el envío. Recordá que una vez que hayas calificado la compra o que haya vencido el plazo para hacerlo previsto en la Sección 5.4, no se aceptarán devoluciones.</span>
        </p>
        <p className="tituloSecundario">
          9.4 Procedimiento para las devoluciones
        </p>
        <p className="textoRegular">
        Una vez que comprobemos que la devolución está dentro del plazo, te enviaremos la etiqueta de devolución que deberás adjuntar al paquete y te informaremos, dependiendo de tu ubicación, si pasamos a recoger el paquete por tu domicilio o si tenés que acercarte a una sucursal de OCA para remitírnoslo sin costo.<span style={{color:"black",fontWeight:"600"}}> En caso de que pasemos a retirarlo, deberás tener el paquete listo en el horario que te vayamos informando. Si tenés que enviárnoslo por OCA, deberás hacerlo dentro de un plazo de cuarenta y ocho (48) horas desde que recibas la etiqueta de devolución. En cualquiera de los dos supuestos (retiro o envío por OCA), en caso de que no cumplás estrictamente con estas condiciones, perderás automáticamente el derecho a la devolución.</span>
        </p>
        <p className="textoRegular">
          Una vez recibido el/los producto/s devuelto/s, comprobaremos someramente los motivos indicados para la devolución. Si en nuestra opinión, los motivos son fundados, se lo comunicaremos al Vendedor, quien podrá pasar por nuestras oficinas a revisar y retirar el/los producto/s devuelto/s dentro de un plazo de diez (10) días hábiles. Por el contrario, si entendemos que los motivos de devolución no son fundados, se lo comunicaremos al Comprador y este último podrá pasar por nuestras oficinas a retirar el/los producto/s dentro de un plazo de diez (10) días hábiles o, en el mismo plazo, solicitar que se lo enviemos a su domicilio, con cargo. Transcurridos los plazos previstos en este párrafo, a nuestro exclusivo criterio, podremos donar u ofrecer nuevamente a la venta el/los producto/s devuelto/s.
        </p>
        <p className="tituloSecundario">
          9.5 Exención de responsabilidad por las devoluciones
        </p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Tanto el Vendedor como el Comprador declarán entender que la
          comprobación que realiza MI ROPERO de los motivos invocados por el
          Comprador para la devolución de un producto es meramente superficial y
          en ningún caso MI ROPERO pretende resolver una incidencia entre el
          Vendedor y el Comprador ni instituirse en mediador, conciliador o
          árbitro de una operación. La intervención de MI ROPERO es al único
          efecto de servir de enlace entre Vendedor y Comprador para facilitar
          las devoluciones, sin en ningún caso emitir un juicio definitivo sobre
          las razones que las fundamentan. Cualquier controversia entre un
          Vendedor y un Comprador relacionada con la devolución de un producto
          deberá ser resuelta entre ellos exclusivamente.</span>
        </p>
        <p className="tituloPrimario">10. CÓMO PODÉS CONTACTARNOS</p>
        <p className="tituloSecundario">10.1 Canales de atención</p>
        <p className="textoRegular">
          De forma general y salvo otras formas de contacto informadas para cuestiones específicas, podrás contactarnos en las siguientes direcciones de email: 
          <p className="textoRegular">
            - por consultas e información general: <a href="mailto:mir@miropero.com.ar">mir@miropero.com.ar</a>
          </p>
          <p className="textoRegular">
            - por devoluciones : <a href="mailto:mir@miropero.com.ar">mir@miropero.com.ar</a>;  
          </p>
        </p>
        <p className="textoRegular">- por reclamos: : <a href="mailto:mir@miropero.com.ar">mir@miropero.com.ar</a> </p>
        <p className="textoRegular">
          - por denuncias: <a href="mailto:mir@miropero.com.ar">mir@miropero.com.ar</a>
        </p>
        <p className="textoRegular">
        También podrás ponerte en contacto con nosotros por WhatsApp al número (+54 9) 11 5486-4779 en particular por cualquier incidencia ocurrida durante el proceso de compra, de lunes a viernes en el horario de 09 a 18 horas de la República Argentina.
        </p>
        <p className="textoRegular">
        Adicionalmente, podrás acceder a otra información relevante sobre nosotros y contactarnos, sin garantías de respuesta, a través de las páginas oficiales de nuestras redes sociales accesibles desde el Sitio Web.
        </p>
        <p className="tituloSecundario">
          10.2 Tramitación de reclamos e incidencias
        </p>
        <p className="textoRegular">
          Todos los reclamos e incidencias que nos comuniques a través de los
          canales de atención abrirán un ticket de reclamo. El personal de MI
          ROPERO realiza sus mejores esfuerzos para solucionar y dar respuesta
          en el menor tiempo posible a los reclamos de nuestro Usuarios. Sin
          embargo, en muchos casos debemos esperar la respuesta de nuestros
          proveedores de servicios o de otros Usuarios de nuestro Sitio Web
          antes de poder dar una respuesta o solucionar, según corresponda, los
          reclamos de nuestros Usuarios. Por tanto, de forma general, no podemos
          establecer un plazo para la evacuación de los reclamos. Una vez que
          demos una respuesta al reclamo, solicitaremos la conformidad del
          Usuario para el cierre del ticket correspondiente.
        </p>
        <p className="tituloSecundario">
          10.3 Límites del servicio de reclamos
        </p>
        <p className="textoRegular">
          Mi ROPERO no ofrece un servicio de solución de controversias ni ejerce
          en ningún caso de mediador, conciliador o árbitro de los reclamos,
          incidencias o conflictos que pueden generarse por el uso de nuestro
          Sitio Web; nuestra función se limita a gestionar los reclamos e
          incidencias, si está a nuestro alcance, tratamos de ofrecer una
          solución a los mismos y, en todos los casos, nos comprometemos a darte
          una respuesta en un plazo razonable. En todos los casos, la solución
          de los reclamos, incidencias o conflictos estarán a cargo de los
          Usuarios involucrados o, de corresponder, de los proveedores que se
          encuentren habilitados en cada momento para ofrecer algún servicio en
          nuestro Sitio Web.
        </p>
        <p className="tituloSecundario">10.4 Defensa del Consumidor</p>
        <p className="textoRegular"><span style={{color:"black",fontWeight:"600"}}>
          Te informamos que si estás disconforme con la respuesta que demos a tu
          reclamo y tenés el carácter de consumidor según la legislación vigente
          en cada momento, en general, podrás presentar un reclamo ante la
          oficina de Defensa del Consumidor que corresponsa a tu domicilio.</span>
        </p>
        <p className="tituloPrimario">
          11. OTRA INFORMACIÓN IMPORTANTE QUE DEBES CONOCER
        </p>
        <p className="tituloSecundario">
          11.1 Responsabilidad por los contenidos de nuestro Sitio Web
        </p>
        <p className="textoRegular">
          Todos los contenidos de nuestro Sitio Web o cuyo origen sea MI ROPERO,
          incluyendo sin carácter limitativo los publicados en cualquier página,
          sección, foro, chat, blog, newsletter, email, red social, tweet, etc.,
          tienen en todos los casos únicamente carácter informativo.
        </p>
        <p className="textoRegular">
          MI ROPERO no se hace responsable de la certeza, la exactitud o la
          vigencia en cada momento de ninguno de los contenidos que publique o
          distribuya por ningún canal, incluyendo sin carácter limitativo, este
          Sitio Web, cualquiera de nuestras redes sociales, blog, newsletter,
          etc. No debes tomar ninguna decisión ni llevar a cabo acciones
          fundadas únicamente en contenidos publicados o distribuidos por MI
          ROPERO por ningún canal, y si lo hacés, será bajo tu propio riesgo y
          responsabilidad.
        </p>
        <p className="textoRegular">
          En ningún modo MI ROPERO será responsable por ningún contenido
          publicado por un Usuario de nuestro Sitio Web. Todo aquel que publique
          un contenido en nuestro Sitio Web, se obliga a mantener indemne a MI
          ROPERO frente a cualquier reclamo de terceros fundado directa o
          indirectamente en tal contenido. Esta obligación es extensiva a
          cualquier contenido, incluyendo comentarios de todo tipo, que los
          Usuarios puedan publicar en las cuentas de las redes sociales u otros
          espacios virtuales que MI ROPERO mantenga activos en cada momento.
        </p>
        <p className="tituloSecundario">11.2 Política de enlaces</p>
        <p className="textoRegular">
          Salvo que lo indiquemos expresamente, ningún enlace desde nuestro
          Sitio Web a una página web de un tercero significará ni deberá
          interpretarse como que la página enlazada sea propiedad, esté operada
          o, de forma general, tenga alguna relación con MI ROPERO. Si accedés y
          de cualquier forma interactuás con una página enlazada desde nuestro
          Sitio Web, será cada vez bajo tu exclusivo riesgo y responsabilidad.
          En ningún caso nos hacemos responsables por ningún daño a los Usuarios
          o terceros en general cuyo origen sea de cualquier forma una página
          web enlazada desde nuestro Sitio Web.
        </p>
        <p className="textoRegular">
          Quedan prohibidos los enlaces hacia alguna página de nuestro Sitio Web
          distinta de la página de inicio (“deep linking”), así como la creación
          de un browser, un border enviroment o un frame de cualquier página o
          contenido de nuestro Sitio Web. Si se establece un enlace hacia
          nuestro Sitio Web, en ningún caso podrá: a) utilizarse insignias,
          logos o marcas pertenecientes a MI ROPERO; b) darse a entender que
          hemos autorizado el enlace o los contenidos de la página o sitio web
          que incluye tal enlace; c) realizarse ninguna manifestación falsa o
          inexacta sobre nuestro Sitio Web; d) darse a entender algún tipo de
          vínculo contractual, societario o asociativo entre MI ROPERO y los
          responsables de sitio web donde figura el enlace; e) incluirse en una
          página o sitio web con contenidos ilícitos o inmorales.
        </p>
        <p className="textoRegular">
          MI ROPERO se reserva el derecho, a nuestro exclusivo criterio, de en
          cualquier momento bloquear o eliminar cualquier enlace desde o hacia
          nuestro Sitio Web, incluyendo a cualquiera de sus páginas o secciones,
          además de, en su caso, formular las denuncias y reclamos legales que
          correspondan.
        </p>
        <p className="tituloSecundario">
          11.3 Derecho a modificar estos Términos y Condiciones
        </p>
        <p className="textoRegular">
        MI ROPERO podrá modificar estos Términos y Condiciones en cualquier momento, sin que ningún Usuario pueda oponerse o invocar algún tipo de derecho al mantenimiento de una determinada versión de estos Términos y Condiciones o de una determinada parte, Sección o Cláusula. De forma general, toda modificación de estos Términos y Condiciones entrará en vigencia desde el momento de su publicación en nuestro Sitio Web. MI ROPERO notificará cualquier modificación de estos Términos y Condiciones a los Usuarios registrados en nuestro Sitio Web mediante email con diez (10) días de antelación a su publicación en nuestro Sitio Web.
        </p>
        <p className="tituloSecundario">
          11.4 Cierre de funcionalidades, páginas o del Sitio Web
        </p>
        <p className="textoRegular">
          MI ROPERO podrá eliminar, de forma temporaria o permanente, cualquier
          funcionalidad, sección o página de este Sitio Web. También nos
          reservamos el derecho de cerrar, temporal o definitivamente, el Sitio
          Web en su totalidad, sin que tal cierre pueda, en ningún caso, dar
          derecho a indemnización o compensación de ningún tipo a favor de
          ninguno de sus Usuarios o de terceros en general.
        </p>
        <p className="tituloSecundario">11.5 Ley aplicable y jurisdicción</p>
        <p className="textoRegular">
          Estos Términos y Condiciones están regidos en todas sus partes por las
          leyes vigentes en cada momento en la República Argentina.
        </p>
        <p className="textoRegular">
          En caso de que revistas el carácter de consumidor de conformidad con
          la legislación vigente en cada momento, podrás demandar o ser
          demandado ante los tribunales de la jurisdicción donde recibiste o
          debiste recibir el envío o, de forma general, la prestación
          comprometida, tal y como lo establece el artículo 1.109 del Código
          Civil y Comercial de la Nación. En todos los demás casos, cualquier
          conflicto que se genere en nuestro Sitio Web, incluyendo los
          relacionados con la validez, la intepretación y/o el cumplimiento de
          estos Términos y Condiciones, será resuelto exclusivamente por los
          tribunales competentes de la Ciudad Autónoma de Buenos Aires.
        </p>
        <div className="returnLink" onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER A INICIO</p>
        </div>
      </Box>
    </Grid>
  );
};

export default TyC;
