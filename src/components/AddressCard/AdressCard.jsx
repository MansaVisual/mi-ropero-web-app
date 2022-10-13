import React from 'react'
import { Radio } from '@mui/material'
import editIcon from '../../assets/img/editIcon.png'

const AdressCard = ({direccion, adressOption, setAdressOption, index}) => {

  return (
    <div className="domicilioEntrega">
        <div className={`direcCard ${adressOption === index ? "checkedBorder" : null}`}  >
            <Radio
            checked={adressOption === index}
            className="direccRadio"
            name="radioButton"
            onChange={()=>setAdressOption(index)}
            />
            <div className={adressOption === index ? "checkedText" : null}>
                <p>
                    {direccion.calle} {direccion.numero}. {direccion.provincia === "Capital Federal" ? "CABA" : direccion.provincia} {direccion.localidad} ({direccion.codigo_postal}). 
                </p>
                <p>
                    {direccion.entre_calle_1!=="" && "Entre"} {direccion.entre_calle_1!==""&& direccion.entre_calle_1} {direccion.entre_calle_1!=="" && "y"} {direccion.entre_calle_2!==""&& direccion.entre_calle_2}.
                </p>
                <p>
                    {direccion.informacion_adicional}.
                </p>
            </div>     
            <img src={editIcon} alt="editIcon" className='editICon'/>
        </div>
    </div>
  )
}

export default AdressCard