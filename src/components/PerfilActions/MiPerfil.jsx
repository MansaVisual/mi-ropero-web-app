import React from 'react'
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import profileTest from '../../assets/img/profileTest.png'
import misCompras from '../../assets/img/misComprasIcon.png'
import misDatos from '../../assets/img/misDatosIcon.png'
import misDirecc from '../../assets/img/misDireccIcon.png'
import misFavs from '../../assets/img/misFavsIcon.png'
import misMensajes from '../../assets/img/misMensajesIcon.png'
import misOfertas from '../../assets/img/misOfertasIcon.png'
import miTienda from '../../assets/img/miTiendaIcon.png'

const MiPerfil = ({ setTypeNav }) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x)

    const testData={
        name: "Sabrina Godoy",
        email:"sabrinagodoy@gmail.com",
        img:profileTest,
    }

    const profileSections = [
        {
            name: "MI TIENDA",
            icon: miTienda,
        },
        {
            name: "MIS DATOS",
            icon: misDatos,
        },
        {
            name: "MIS FAVORITOS",
            icon: misFavs,
        },
        {
            name: "MIS DIRECCIONES",
            icon: misDirecc,
        },
        {
            name: "MIS COMPRAS",
            icon: misCompras,
        },
        {
            name: "OFERTAS REALIZADAS",
            icon: misOfertas,
        },
        {
            name: "MIS MENSAJES",
            icon: misMensajes,
        },
    ]

    return (
        <div className="miPerfilContainer">
            <Breadcrumbs links={pathnames}/>
            <div className="container">
                <p className="title">MI PERFIL</p>
                <div className="profileData">
                    <img src={testData.img} className='profilePicture' alt="profilePicture" />
                    <div className="profileText">
                        <p className='hello'>HOLA!</p>
                        <p className='name'>{testData.name}</p>
                        <p className='email'>{testData.email}</p>
                    </div>
                </div>
                <p className='profileSections'>
                    {profileSections.map((section)=>{
                        return <div className="section" onClick={()=> setTypeNav(section.name)}>
                                    <div className="imgBox">
                                        <img src={section.icon} alt="icon" />
                                        <p className="sectionTitleMobile">{section.name}</p>
                                    </div>
                                    <p className="sectionTitle">{section.name}</p>
                               </div>
                    })}
                </p>
                <div className="buttonsContainer">
                    <div className="bottomOptions">
                        <button>Acerca de la aplicación</button>
                        <button>Califica la aplicación</button>
                        <button style={{color:"#423B3C"}}>Desactivar notificaciones</button>
                        <button style={{color:"#FF3F20"}}>Cerrar Sesión</button>
                        <button>Eliminar mi cuenta</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiPerfil