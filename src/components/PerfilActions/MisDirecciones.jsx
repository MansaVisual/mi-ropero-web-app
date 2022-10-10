import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import leftArrow from '../../assets/img/leftArrow.png'
import AdressCard from '../AddressCard/AdressCard';


const MisDirecciones = ({setTypeNav}) => {

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [adressOption, setAdressOption] = useState(false)

  const array=[
    {
      calle:"Cuenca",
      numero:"4300",
      provincia:"Capital Federal",
      localidad:"Comuna 11",
      codigo_postal:"3000",
      entre_calle_1:"Francisco veiro",
      entre_calle_2:"jose p varela",
      informacion_adicional:"puerta morada, toque timbre"
    },
    {
      calle:"Cuenca",
      numero:"4300",
      provincia:"Capital Federal",
      localidad:"Comuna 11",
      codigo_postal:"3000",
      entre_calle_1:"Francisco veiro",
      entre_calle_2:"jose p varela",
      informacion_adicional:"puerta morada, toque timbre"
    },
    {
      calle:"Cuenca",
      numero:"4300",
      provincia:"Capital Federal",
      localidad:"Comuna 11",
      codigo_postal:"3000",
      entre_calle_1:"Francisco veiro",
      entre_calle_2:"jose p varela",
      informacion_adicional:"puerta morada, toque timbre"
    },
    {
      calle:"Cuenca",
      numero:"4300",
      provincia:"Capital Federal",
      localidad:"Comuna 11",
      codigo_postal:"3000",
      entre_calle_1:"Francisco veiro",
      entre_calle_2:"jose p varela",
      informacion_adicional:"puerta morada, toque timbre"
    }
  ]

  return (
    <div className="misDireccContainer">
      <Breadcrumbs links={pathnames}/>
      <div className="titleContainer">
        <p className="title">MIS DIRECCIONES</p>
        <p className='addDirection'>Agregar dirección</p>
      </div>
      <p className='direcSubtitle'>Selecciona un domicilio *</p>
      <div className="cardContainer">
        {array.map((direccion, index) => {
          return <AdressCard 
                  key={index} 
                  direccion={direccion}
                  setAdressOption={setAdressOption}
                  adressOption={adressOption}
                  index={index}
                  />
        })}
      </div>
      <div className="returnLink" onClick={() => setTypeNav("miPerfil")}>
        <img src={leftArrow} alt="leftArrow" />
        <p>VOLVER A MI PERFIL</p>
      </div>
    </div>
  )
}

export default MisDirecciones