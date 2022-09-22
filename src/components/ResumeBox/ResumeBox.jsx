import { Button, TextField } from "@mui/material"


const ResumeBox = ()=>{
    return(
        <div className="resumeBox">
            <div className="box firstBox">
                <p className="subtitulo">999 Productos</p>
                <p className="subtitulo p14">$ 130.561</p>
            </div>
            <div className="box">
                <p className="subtitulo">Envío</p>
                <p className="subtitulo p14">GRATIS</p>
            </div>
            <div className="boxInput">
                <p className="subtitulo subtituloDesc">Código de descuento / Giftcard</p>
                <div className="inputButton">
                    <TextField placeholder="INGRESAR CÓDIGO"
                        size="small"
                    ></TextField>
                    <Button>
                        VALIDAR
                    </Button>
                </div>
            </div>
            <div className="box">
                <p className="subtitulo subtituloTotal">TOTAL:</p>
                <p className="subtitulo subtituloTotal">$ 127.199</p>
            </div>
            <div className="banner">
                BANNER
            </div>
            <div className="botonFinalizar">
                <Button>
                    FINALIZAR COMPRA
                </Button>
            </div>
        </div>
    )
}

export default ResumeBox