import React from 'react'
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import leftArrow from '../../assets/img/leftArrow.png'


const MisCompras = ({setTypeNav}) => {

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="misDireccContainer">
        <Breadcrumbs links={pathnames}/>
        <p className="title">MIS COMPRAS</p>
        <div className="comprasContainer">
               
        </div>
        <div className="returnLink" onClick={() => setTypeNav("miPerfil")}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
    </div>
  </div>
  )
}

export default MisCompras