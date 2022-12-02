import React from "react";
import { Box, Grid } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/img/leftArrow.png";

const PdeP = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  return (
    <Grid className="gridContainer">
      <Box sx={{ mt: "32px" }}></Box>

      <Box className="TyC" style={{marginTop:"32px"}}>
        <Breadcrumbs links={pathnames} />
        <p className="titulo1">Política de privacidad</p>

        <p className="textoRegular ">
        MI ROPERO considera una prioridad máxima la protección de los Datos Personales de los Usuarios de nuestro sitio web y nuestras aplicaciones (miropero.com.ar, miropero.app, miropero.shop y las que habilitemos en el futuro; nos referiremos a todas, indistintamente, como “el”, “este” o “nuestro Sitio Web”)
        </p>
        <p className="textoRegular ">
        Nuestra Política de Privacidad tiene por objeto publicar e informar, con un lenguaje claro y sencillo, el tratamiento que se dará a los Datos Personales que nos sean comunicados a través de este Sitio Web o que, de forma general, solicitemos por cualquier canal o medio electrónico. La navegación, registro e interacción de cualquier forma de un Usuario con nuestro Sitio Web queda regida por lo dispuesto en la presente Política de Privacidad.
        </p>
        <p className="textoRegular ">
        A fin de facilitar su lectura y, de esta forma, garantizar la transparencia de la información, esta Política de Privacidad está organizada por capas; una primera capa contiene, en forma reducida, la información básica sobre el tratamiento de tus Datos Personales (“Información esencial”); en una segunda capa, se ofrece información adicional importante en forma más detallada (“Información adicional”), incluyendo una cláusula relativa a tu consentimiento con el tratamiento de tus Datos de la forma indicada en la presente Política de Privacidad.
        </p>
        <p className="tituloPrimario">INFORMACIÓN ESENCIAL</p>
        <p className="tituloSecundario">1. Algunas definiciones</p>
        <p className="textoRegular ">
        Se considera un “Dato Personal” a cualquier información relativa a una persona humana o jurídica identificada o que pueda ser identificable (por ejemplo, nombre y apellidos, DNI, CUIT, nombre de usuario, dirección de correo electrónico, domicilio, estado civil, fecha de nacimiento, imagen, filmación, etc.).
        </p>
        <p className="textoRegular ">
        Por “Usuario” se entenderá cualquier persona que acceda y navegue por nuestro Sitio Web, o de cualquier otra forma interactúe con nosotros por cualquier canal o medio electrónico. 
        </p>
        <p className="textoRegular ">
        Por “Titular” se entenderá la persona física o jurídica identificada por un Dato Personal.

        </p>
        <p className="tituloSecundario ">2. Responsable del tratamiento</p>
        <p className="textoRegular ">
        El responsable del tratamiento de los Datos Personales que nos sean comunicados por cualquier medio o canal electrónico es SWAPVA S.A.S; con domicilio en Costa Rica 5546, piso 3º, of. 301 - Ciudad Autónoma de Buenos Aires (C1414BTD), Argentina; CUIT nº 30-71611596-4  (también referido como “MI ROPERO”, “nosotros”  “nuestro/a/s” y similares).
        </p>
        <p className="tituloSecundario ">3. Datos Personales que utilizamos</p>
        <p className="textoRegular ">
        Por principio general, recogemos y tratamos exclusivamente Datos Personales que nos son facilitados por su Titular. Esos Datos se limitan al nombre y apellido – o, en su caso, razón social, denominación social o nombre comercial -, DNI, CUIT, teléfono, email, domicilio, domicilio postal y ubicación geográfica del Titular. Por la temática del Sitio Web, también solicitamos y registramos Datos Personales relativos al sexo del Titular, talle de ropa, marcas preferidas, estilos de ropa que le gustan, preferencias sobre ropa importada o nacional así como, de tanto en tanto, otra información relativa a los gustos del Titular sobre indumentaria. Del mismo modo, los Usuarios de nuestro Sitio Web pueden publicar y compartir fotografías y videos en los que se indetifique a una o más personas determinadas o determinables. Finalmente, podemos procesar Datos relativos a cuentas y demás información bancaria del Titular a fin de gestionar pagos y cobranzas.
        </p>
        <p className="textoRegular">
        En ningún caso tomamos o tratamos datos sensibles en los términos del art. 7º de la Ley 25.326.
        </p>
        <p className="tituloSecundario">4. Finalidades del tratamiento</p>
        <p className="textoRegular ">
        Recogemos y tratamos Datos Personales únicamente para el cumplimiento de todas o algunas de las siguientes finalidades: a) alta y registración en el Sitio Web; b) publicar contenidos, videos, anuncios, banners, productos y/o servicios en el Sitio Web; c) prestación de nuestros servicios a través del Sitio Web; d) gestionar y completar los procesos de contratación a través del Sitio Web; e) gestión de medios de pago, reembolsos y devoluciones f) contabilidad, cobranzas y facturación; g) prestar el servicio de atención al cliente, resolver incidencias y reclamos; h) entablar u oponerse a acciones judiciales o prejudiciales; i) envío de publicidad y comunicaciones comerciales propias o de terceros, como newsletters, invitación a eventos y webinars, promociones, campañas de marketing, etc.;
        </p>
        <p className="tituloSecundario "></p>
        <p className="textoRegular ">5. Derechos de los titulares</p>
        <p className="textoRegular ">
        Los Titulares de los Datos Personales pueden ejercitar sus derechos de acceso, rectificación, actualización o supresión de Datos, de conformidad con lo previsto en los artículos 14 y 16 de la Ley nº 25.326 y su Decreto reglamentario, así como oponerse a tratamientos automatizados o a transferencias internacionales de Datos de la forma informada en las Cláusulas Novena y Undécima, según corresponda. 
        </p>
        <p className="textoRegular ">
        Para el ejercicio de cualquiera de estos derechos, el Titular deberá enviar un correo electrónico a la dirección de email: mir@miropero.com.ar, indicando claramente el/los derecho/s que desee ejercitar y adjuntando una copia de tu/su DNI para acreditar su identidad. Por cuestiones legales, podremos negarnos a procesar un pedido de este tipo hasta tanto la identidad del Titular haya sido suficiente e indubitablemente acreditada.
        </p>
        <p className="textoRegular ">
        Asimismo, el Titular de los Datos Personales podrá presentar una denuncia ante la Agencia de Acceso a la Información Pública (“AAIP”) www.argentina.gob.ar/aaip, sin perjuicio de tener disponible en todo momento la acción judicial de hábeas data.
        </p>
        <p className="textoRegular ">6. Normativa aplicable</p>
        <p className="textoRegular ">
        La presente Política de Privacidad está regida por la Ley argentina nº 25.326, de Protección de Datos Personales, su Decreto reglamentario y demás normativa de desarrollo, incluyendo las disposiciones de la Dirección Nacional de Protección de Datos que resulten aplicables. 
        </p>
        <p className="tituloPrimario ">INFORMACIÓN ADICIONAL</p>
        <p className="tituloSecundario ">7. Licitud del tratamiento</p>
        <p className="textoRegular ">
        La licitud del tratamiento con las finalidades identificadas en la Cláusula Cuarta con las letras a) a la h) se funda en que tales Datos son necesarios para el desarrollo y cumplimiento de una relación contractual con el Titular (artículo 5º inc. d), Ley 25.326); la correspondiente a la letra i) tiene como base legal el artículo 27.1, Ley 25.326, al tratarse de Datos que figuran en documentos accesibles al público o que han sido facilitados por los propios Titulares u obtenidos con su consentimiento para tal finalidad. 
        </p>

        <p className="tituloSecundario ">8. Cesionarios de datos personales (encargados de tratamiento)</p>
        <p className="textoRegular ">
        A los fines de una correcta prestación de nuestros servicios, podemos compartir tus Datos Personales con las siguientes categorias de cesionarios (proveedores): empresas que ofrecen servicios de análisis de datos, servidores de hosting, de alojamiento de datos y de correo electrónico; marketing digital, email marketing y publicidad; gateways de pago; proveedores de servicios contables y legales; servicios de outsourcing y desarrollo informático. También podremos compartir tus Datos con organismos públicos solamente en la medida en que estemos obligados por ley o nos sean requeridos por alguna autoridad pública.
        </p>
        <p className="tituloSecundario ">
          9. Tratamientos automatizados de datos y derecho de oposición 
        </p>
        <p className="textoRegular ">
        Algunos de nuestros proveedores, en particular los que nos prestan sus servicios de análisis de datos, marketing digital, email marketing y publicidad, pueden realizar por cuenta y orden nuestra tratamientos que generen la toma de decisiones automatizadas, incluyendo la elaboración de perfiles, cuya lógica responde al cruzamiento de datos y de métricas a fin de personalizar las comunicaciones en base a las preferencias de los Usuarios de nuestro Sitio Web y, eventualmente, de otros canales electrónicos bajo nuestro control (redes sociales, newsletter y otros correos publicitarios, etc.) 
        </p>
        <p className="textoRegular">
        El Titular puede en todo momento oponerse al tratamiento de sus Datos Personales en forma automatizada, incluyendo la elaboración de perfiles, mediante el envío de un correo electrónico a la dirección de email indicada en la Cláusula Quinta, justificando los motivos de tal oposición.
        </p>
        <p className="tituloSecundario ">
          10. Plazo de conservación de los Datos Personales
        </p>
        <p className="textoRegular ">
        De forma general, los Datos Personales que se nos comuniquen dentro del proceso de alta y registro en el Sitio Web y/o de la prestación de cualquiera nuestros servicios a través del Sitio Web, se conservarán mientras dure, según el caso, el registro activo en el Sitio Web y/o la prestación del servicio y, en su defecto, hasta la prescripción de las obligaciones fiscales y de las acciones legales correspondientes. De forma general, este plazo se estima en cinco (5) años a computarse desde la última interacción con el Titular (cfr. artículo 2.560 Código Civil y Comercial de la Nación), salvo en los casos en los que se establezca un plazo de prescripción mayor. Los datos referentes a deudas canceladas por el Titular se guardarán por dos (2) años (artículo 26.4, Ley 25.326).
        </p>
        <p className="tituloSecundario ">
          11. Transferencias internacionales de datos
        </p>
        <p className="textoRegular ">
        Para una adecuada prestación de nuestros servicios y, en su caso, por resultar necesario para la ejecución del contrato entre el Titular de los datos y MI ROPERO, todos o algunos de los Datos Personales que nos sean comunicados podrán ser compartidos con los proveedores indicados en la Cláusula Octava, cuyos servidores pueden estar situados en países distintos al de residencia del Titular de los Datos y, eventualmente, al del domicilio de MI ROPERO, sin que necesariamente y en todos los casos, dichos países garanticen un nivel de protección adecuado conforme a la normativa aplicable a esta Política de Privacidad. 
        </p>
        <p className="textoRegular">
        El Titular de los Datos Personales puede solicitar más detalles sobre el uso de sus Datos por parte de nuestros proveedores mediante el envío de un correo electrónico a la dirección de email comunicada en la Cláusula Quinta de esta Política de Privacidad, así como retirar su consentimiento en todo momento para las transferencias internacionales de Datos aquí informadas de la forma prevista en la Cláusula Decimocuarta de esta Política de Privacidad.
        </p>
        <p className="tituloSecundario ">
          12. Seguridad de los datos
        </p>
        <p className="textoRegular ">
        MI ROPERO aplica medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado de sus servidores y bases de datos, tales como la elaboración de un documento de seguridad de datos personales, la disposición de protocolos de registro de acceso y de uso de los servidores y bases de datos y la elaboración en forma periódica de copias de respaldo de nuestras bases de datos. Por defecto, todos los Datos Personales que nos son comunicados tienen la consideración de confidenciales y nuestros empleados tienen obligaciones escritas de respetar esa confidencialidad, aún después de finalizada la relación laboral.
        </p>
        <p className="textoRegular ">
        En caso de comprobar una violación de la seguridad de nuestras bases de Datos Personales que entrañe un alto riesgo para sus derechos y libertades, se lo comunicaremos inmediatamente a sus Titulares y a la autoridad de control correspondiente, y tomaremos todas las medidas a nuestro alcance para neutralizar o mitigar ese riesgo en el menor plazo posible.
        </p>
        <p className="tituloSecundario ">13. Registro de bases de datos</p>
        <p className="textoRegular ">
        Nuestras bases de datos destinadas a dar informes han sido inscritas en el Registro Nacional de Bases de Datos a cargo de la Agencia de Acceso a la Información Pública.
        </p>
        
        <p className="tituloSecundario ">14. Consentimiento del Titular</p>
        <p className="textoRegular ">
        Al comunicarnos tus Datos Personales a través de este Sitio Web y/o por cualquier canal o medio electrónico, estás aceptando expresamente a que tus Datos Personales sean tratados de conformidad con lo dispuesto en esta Política de Privacidad.
        </p>
        <p className="textoRegular ">
        En particular, al comunicarnos tus Datos Personales, prestás expresamente tu consentimiento:
        </p>
        <p className="textoRegular ">
         -- Para el tratamiento de tus Datos Personales con respecto a todas o algunas de las finalidades descritas en la Cláusula Cuarta de esta Política de Privacidad, incluyendo el envío de publicidad y comunicaciones comerciales propias y de terceros;
        </p>
        <p className="textoRegular ">
         -- Para el tratamiento de tus Datos Personales de forma que genere decisiones automatizadas, incluyendo la elaboración de perfiles, de conformidad con lo previsto en la Cláusula Novena de esta Política de Privacidad;
        </p>
        <p className="textoRegular ">
         -- Para una eventual transferencia internacional de tus Datos Personales bajo las modalidades descritas en la Cláusula Undécima de esta Política de Privacidad.
        </p>

        <p className="tituloSecundario ">15. Derecho a revocar el consentimiento</p>
        <p className="textoRegular ">
        El Titular de los Datos Personales tiene el derecho a revocar en cualquier momento el consentimiento para el tratamiento de sus Datos Personales con respecto a todas o algunas de las finalidades y modalidades previstas en esta Política de Privacidad, así como para las transferencias internacionales de sus Datos Personales. 
        </p>
        <p className="textoRegular ">
        El ejercicio de este derecho se efectivizará mediante el envío de un correo electrónico a la dirección de email informada en la Cláusula Quinta, adjuntando copia del DNI para acreditar su identidad e identificando, en forma clara, para qué tratamientos de Datos se revoca el consentimiento. La revocación no tendrá efectos retroactivos (cf. Art. 5º Decreto 1558/2001).
        </p>

        <p className="tituloSecundario ">16. Modificaciones a la Política de Privacidad</p>
        <p className="textoRegular ">
        MI ROPERO se reserva el derecho a modificar de tiempo en tiempo esta Política de Privacidad, incluyendo el derecho a dejarla sin efecto en su totalidad o parcialmente, ya sea para adecuarla a cambios normativos o con cualquier otra finalidad que estime conveniente a su sola discreción. 
        </p>
        <p className="textoRegular ">
        En tal caso, en la medida de lo posible, usaremos nuestros mejores esfuerzos para comunicar esos cambios a los Titulares de los Datos Personales que nos hayan sido comunicados durante la vigencia de esta Política de Privacidad, sin perjuicio de que dichos Titulares son invitados a ingresar periódicamente en nuestro Sitio Web a fin de actualizarse sobre nuestras novedades.

        </p>
        
        <div className="returnLink" onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="leftArrow" />
          <p>VOLVER INICIO</p>
        </div>
      </Box>
    </Grid>
  );
};

export default PdeP;
