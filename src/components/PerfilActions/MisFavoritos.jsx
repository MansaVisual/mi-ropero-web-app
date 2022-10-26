import React,{useContext} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import leftArrow from '../../assets/img/leftArrow.png'
import { UseProdsContext } from '../../context/ProdsContext';
import Loader from '../Loader/Loader';
import vacio from "../../assets/img/favVacio.png"
import { Button } from '@mui/material';

const MisFavoritos = ({setTypeNav}) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const navigate = useNavigate();

    const {listFavs,listFavFinBusqueda}=useContext(UseProdsContext)

    return (
      <div className="misFavsContainer">
          <Breadcrumbs links={pathnames}/>
          <p className="title">MIS FAVORITOS</p>
          {!listFavFinBusqueda ? 
              <div style={{ height: '50vh', marginTop: '42px', width:"100%",display:"flex",justifyContent:"center" }}>
                <Loader spin={'spinnerM'} />
              </div>
              :listFavs.length!==0? 
              <div className="cardContainer">
                  {listFavs.map((item, index) => {
                    return(
                      <div key={index}>
                          <ProductCard
                              imageCard={item.producto_imagen}
                              productName={item.producto_nombre}
                              idProducto={item.producto_id}
                              itemFav={item}
                              precioOferta={item.precio_oferta}
                          />
                      </div>
                  )})}                   
              </div>
            :
            <div className='perfilVacio'>
              <div>
                <img src={vacio} alt="LOGO" />
                <p>Aún no tienes productos favoritos</p>
                <Button onClick={()=>navigate("/")}>
                  VER PRODUCTOS
                </Button>
              </div>
            </div>
          }
          <div className="returnLink" onClick={()=>navigate(`/perfil`)}>
              <img src={leftArrow} alt="leftArrow" />
              <p>VOLVER A MI PERFIL</p>
          </div>
      </div>
    )
}

export default MisFavoritos