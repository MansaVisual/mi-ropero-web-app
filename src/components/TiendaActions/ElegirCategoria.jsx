import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import RopaIcon from "../../assets/img/ropaIcon.png";
import CalzadoIcon from "../../assets/img/calzadoIcon.png";
import AccesorioICon from "../../assets/img/accesorioICon.png";
import BellezaICon from "../../assets/img/bellezaICon.png";
import leftArrow from "../../assets/img/leftArrow.png";
import Swal from "sweetalert2";
import logo from "../../assets/img/isologo.png"

const categorias = [
  {
    nombre: "ROPA",
    img: RopaIcon,
    idCategoriaPadre: 1,
  },
  {
    nombre: "CALZADO",
    img: CalzadoIcon,
    idCategoriaPadre: 2,
  },
  {
    nombre: "ACCESORIOS",
    img: AccesorioICon,
    idCategoriaPadre: 3,
  },
  {
    nombre: "BELLEZA",
    img: BellezaICon,
    idCategoriaPadre: 1000018,
  },
];

const ElegirCategoria = ({ setForm, form }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="elegirCatContainer">
      <div className="container">
        <Breadcrumbs links={pathnames} />
        <span className="title">CATEGORÍA</span>
        <span className="subtitle">¿Cuál es la categoría del producto?</span>
        <div className="categorySections">
          {categorias.map((section) => {
            return (
              <div
                className="section"
                onClick={() => {
                  if(form.tipoId!==null){
                    Swal.fire({
                      title: "Si cambia de categoría, se perderán los datos cargados.",
                      iconHtml: `<img src=${logo} alt="LOGO">`,
                      customClass: {
                        icon: 'no-border',
                        container:"popUpLoginAlert",
                        cancelButton:"popUpLoginCancel"
                      },
                      showCloseButton: true,
                      showCancelButton: true,
                      confirmButtonText: "CONFIRMAR",
                      cancelButtonText:"CANCELAR"
                    }).then((res)=>{
                      if(res.isConfirmed){
                        setForm({
                          categoriaId: section.idCategoriaPadre,
                          categoriaNombre: section.nombre,
                          tipoId: null,
                          tipoNombre: null,
                          caracteristicas: [],
                          idCaracteristica: [],
                          idCaracteristicaOld: [],
                          direccion: [],
                          telefono: "",
                          detalles: {
                            titulo: "",
                            precio: "",
                            descripcion: "",
                          },
                          imagenes: {},
                          imagenesApi: [],
                          imagenesPreview: {},
                          video: null,
                          seccionExtra: [],
                        });
                        navigate(`/Mi&Tienda/TIPO`);
                      }
                    })
                  }else{
                    setForm((prevState) => ({
                      ...prevState,
                      categoriaId: section.idCategoriaPadre,
                      categoriaNombre: section.nombre,
                      caracteristicas: [],
                      idCaracteristica: [],
                      idCaracteristicaOld: [],
                    }));
                    navigate(`/Mi&Tienda/TIPO`);
                  }
                }}
              >
                <div className="imgBox">
                  <img src={section.img} alt="icon" />
                  <p className="sectionTitleMobile">{section.nombre}</p>
                </div>
                <p className="sectionTitle">{section.nombre}</p>
              </div>
            );
          })}
        </div>
        <div
          className="returnLink"
          
        >
          <img src={leftArrow} alt="leftArrow" />
          <p onClick={() => {
            window.location.replace(`https://www.miropero.ar/Mi&Tienda`);
          }}>VOLVER A MI TIENDA</p>
        </div>
      </div>
    </div>
  );
};

export default ElegirCategoria;
