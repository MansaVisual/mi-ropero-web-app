import React,{useContext} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import leftArrow from '../../assets/img/leftArrow.png'
import { UseProdsContext } from '../../context/ProdsContext';
import Loader from '../Loader/Loader';

const MisFavoritos = ({setTypeNav}) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const navigate = useNavigate();

    const {listFavs}=useContext(UseProdsContext)

    console.log(listFavs)
    return (
      <>
        {listFavs.length===0? <Loader spin={"spinnerM"}/> :
          <div className="misFavsContainer">
              <Breadcrumbs links={pathnames}/>
              <p className="title">MIS FAVORITOS</p>
              <div className="cardContainer">
                  {listFavs.map((item, index) => {
                    return(
                      <div key={index}>
                          <ProductCard
                              imageCard={item.producto_imagen}
                              productName={item.producto_nombre}
                              idProducto={item.producto_id}
                              itemFav={item}
                              tag="NUEVO"
                          />
                      </div>
                  )})}                   
              </div>
              <div className="returnLink" onClick={()=>navigate(`/perfil`)}>
                  <img src={leftArrow} alt="leftArrow" />
                  <p>VOLVER A MI PERFIL</p>
              </div>
          </div>
        }
      </> 
    )
}

export default MisFavoritos