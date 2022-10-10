import React from 'react'
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import leftArrow from '../../assets/img/leftArrow.png'

const MisFavoritos = ({setTypeNav}) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const slides = [
        {
          img: require("../../assets/img/fotoProd.png"),
          title: "Calza Adidas 2022",
          price: 2000,
          tag: "NUEVO",
        },
        {
          img: require("../../assets/img/fotoProd.png"),
          title: "Calza Adidas 2022",
          price: 2000,
          tag: "NUEVO",
        },
        {
            img: require("../../assets/img/fotoProd.png"),
            title: "Calza Adidas 2022",
            price: 2000,
            tag: "NUEVO",
          },
          {
            img: require("../../assets/img/fotoProd.png"),
            title: "Calza Adidas 2022",
            price: 2000,
            tag: "NUEVO",
          },
          {
            img: require("../../assets/img/fotoProd.png"),
            title: "Calza Adidas 2022",
            price: 2000,
            tag: "NUEVO",
          },
          {
            img: require("../../assets/img/fotoProd.png"),
            title: "Calza Adidas 2022",
            price: 2000,
            tag: "NUEVO",
          },
          {
              img: require("../../assets/img/fotoProd.png"),
              title: "Calza Adidas 2022",
              price: 2000,
              tag: "NUEVO",
            },
            {
              img: require("../../assets/img/fotoProd.png"),
              title: "Calza Adidas 2022",
              price: 2000,
              tag: "NUEVO",
            },
    ];
    return (
        <div className="misFavsContainer">
            <Breadcrumbs links={pathnames}/>
            <p className="title">MIS FAVORITOS</p>
            <div className="cardContainer">
                {slides.map((item, index) => (
                    <div key={index}>
                        <ProductCard
                            imageCard={item.img}
                            productName={item.title}
                            productPrice={item.price}
                            tag="NUEVO"
                        />
                    </div>
                ))}                   
            </div>
            <div className="returnLink" onClick={() => setTypeNav("miPerfil")}>
                <img src={leftArrow} alt="leftArrow" />
                <p>VOLVER A MI PERFIL</p>
            </div>
        </div>
    )
}

export default MisFavoritos