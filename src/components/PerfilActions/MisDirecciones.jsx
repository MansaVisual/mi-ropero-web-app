import React from 'react'
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import leftArrow from '../../assets/img/leftArrow.png'

const MisDirecciones = ({setTypeNav}) => {

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="misFavsContainer">
    <Breadcrumbs links={pathnames}/>
    <p className="title">MIS DIRECCIONES</p>
    <div className="direccContainer">
                 
    </div>
    <div className="returnLink" onClick={() => setTypeNav("miPerfil")}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
    </div>
</div>
  )
}

export default MisDirecciones