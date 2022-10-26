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

    return (
      <>
        {listFavs.length===0? 
        <div style={{ height: '50vh', marginTop: '18px' }}>
          <Loader spin={'spinnerM'} />
        </div> :
          <div className="misFavsContainer">
              <Breadcrumbs links={pathnames}/>
              <p className="title">MIS FAVORITOS</p>
              <div className="cardContainer">
                  {listFavs.map((item, index) => {console.log(item)
                    return(
                      <div key={index}>
                          <ProductCard
                              imageCard={item.producto_imagen}
                              productName={item.producto_precio}
                              idProducto={item.producto_id}
                              itemFav={item}
                              precioOferta={item.producto_precio_oferta}
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