import { Button, Radio} from "@mui/material"
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import React from "react"

const MetodoEnvio=({typeForm})=>{
    // const [currency, setCurrency] = useState('');
    // const [form,setForm]=useState([])

    // let clase = "formObligatorio"

    // const [errorInicial, setErrorInicial]=useState(false)
    // const [campoObligatorio,setCampoObligatorio]=useState(false)

    // const handleChange = (event) => {
    //     setCurrency(event.target.value)
    //     setForm({...form,provincia:event.target.value})
    // }

    // const checkForm = async()=>{
    //     await handleClick(form,setErrorInicial,setCampoObligatorio,clase,campoObligatorio)
    // }

    return(
        <div className="metodoEnvio">
            <h2 className="TituloCartCheck" style={{width:"100%"}} id="datos">Método de envío</h2>

            <div className="domicilioEntrega">
                <p>Domicilio de entrega</p>
                <div className="card">
                    <div>
                        <h3>Cuenca 3440. CABA Comuna 17 (C1417).</h3>
                        <h3>Entre Francisco Beiró y José P. Varela.</h3>
                        <h3>Puerta Violeta. Tocar fuerte el timbre.</h3>
                    </div>
                    <Button className="boton">
                        MODIFICAR
                    </Button>
                </div>
            </div>
            
            <div className="domicilioEntrega">
                <p>Seleccione un método de envío *</p>
                <div className="card metodos">
                    <Radio className="radio"></Radio>
                    <TwoWheelerIcon color="primary" className="botonLogo"/>
                    <div>
                        <p className="title">Envío en motmo (sólo disponible en CABA)</p>
                        <p className="subtitle" style={{marginBottom:"-12px"}}>Tu compra llegará en 24hs hábiles. En fecha festivas o especiales pueden surgir demoras.</p>
                        <p className="subtitle">Nos pondremos en contacto para coordinar el envío.</p>
                    </div>
                    <p style={{whiteSpace:"nowrap"}} className="precio">$ 908,83</p>
                </div>
            </div>
            <div className="domicilioEntrega">
                <p>Seleccione un método de envío *</p>
                <div className="card metodos">
                    <Radio className="radio"></Radio>
                    <TwoWheelerIcon color="primary" className="botonLogo"/>
                    <div>
                        <p className="title">Envío en motmo (sólo disponible en CABA)</p>
                        <p className="subtitle">Tu compra llegará en 24hs hábiles. En fecha festivas o especiales pueden surgir demoras.</p>
                        <p className="subtitle">Nos pondremos en contacto para coordinar el envío.</p>
                    </div>
                    <p style={{whiteSpace:"nowrap"}} className="precio">$ 908,83</p>
                </div>
            </div>
            
            <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
                <Button className="botonContinuar">
                    CONTINUAR
                </Button>
            </div>
        </div>
    )
}

export default MetodoEnvio