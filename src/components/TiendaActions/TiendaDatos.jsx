import React, { useContext } from "react";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import editIcon from "../../assets/img/editIcon.png";
import { useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import SeccionProductos from "./SeccionProductos";
import Swal from "sweetalert2";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseLoginContext } from "../../context/LoginContext";

const TiendaDatos = () => {
  const navigate = useNavigate();
  const { tiendaData } = useContext(UseMiTiendaContext);
  const { userLog } = useContext(UseLoginContext);

  const pausarTienda=()=>{
    Swal.fire({
      title: "¿PAUSAR TIENDA?",
      text: "Pausarás tu tienda hasta que lo desees",
      showCloseButton: true,
      confirmButtonText: "CONTINUAR",
    }).then((res)=>{
      if(res.isConfirmed){
        const pause=new FormData()
        pause.append("idcliente",userLog)
        pause.append("idtienda",tiendaData.idtienda)
        apiFetch(pause,"tiendas","pause").then((res)=>{
          if(res.status==="success"){
            Swal.fire({
              title:'TIENDA PAUSADA',
              icon:'success',
              confirmButtonText: 'ACEPTAR',
          })
          }else{
            Swal.fire({
              title:'OCURRIÓ UN ERROR',
              text:"Vuelva a intentarlo",
              icon:'error',
              confirmButtonText: 'ACEPTAR',
          })
          }
        })
      }
    })
  }

  return (<>{tiendaData.length===0?<SeccionProductos/>:
    <div className="miTiendaDatos">
      <TiendaBanner />
      <Grid className="tiendaGrid">
        <div className="container">
          <div className="titleContainer">
            <p className="title">DATOS</p>
          </div>
          <div className="formulario">
            <div className="inputContainer">
              <div className="inputBox">
                <p className="labelInput" id="labelNombre">
                  Nombre *
                </p>
                <TextField
                  className="input"
                  placeholder="El Ropero de Sandra"
                  id="nombre"
                />
              </div>
              <div className="inputBox">
                <p className="labelInput" id="labelApellido">
                  Teléfono *
                </p>
                <TextField
                  className="input"
                  placeholder="+54  011 - 4417 - 8005"
                  type="number"
                  id="telefono"
                />
              </div>
            </div>
            <div className="inputContainer">
              <div className="textAreaBox">
                <span className="label1">Descripción *</span>
                <TextField
                  multiline
                  rows={4}
                  id="infoAdicional"
                  color="primary"
                  className="textArea"
                  size="small"
                  placeholder="Reducir, reciclar, reutilizar como bandera!"
                  inputProps={{ maxLength: 50 }}
                />
              </div>
            </div>
            <div className="address">
              <div>
                <span>Domicilio de entrega</span>
                <img className="editIcon" src={editIcon} alt="editIcon" />
              </div>
              <div className="description">
                <p>
                  Cuenca 3440. CABA Comuna 11 (C1417). entre Francisco Beiró y
                  José P. Varela. Puerta violeta. Tocar fuerte el timbre.
                </p>
                <button>MODIFICAR</button>
              </div>
            </div>
          </div>
          <div className="buttonContainer">
            <button>GUARDAR CAMBIOS</button>
          </div>
          <div className="returnLink" onClick={() => navigate(`/MiTienda`)}>
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A MI TIENDA</p>
          </div>
          <div>
            <div className="tiendaActionsCard tiendaActionsCard1">
              <h5>Desactivar reporte semanal de estadísticas</h5>
              <p>Podés recibir en tu email un reporte semanal con la cantidad de seguidores de tu tienda, la cantidad de visitas de tus productos y toda la información estadística que te interesa.</p>
            </div>
            <div className="tiendaActionsCard">
              <h5 onClick={()=>pausarTienda()}>Pausar tienda</h5>
              <p>Al pausar tu tienda todos tus productos quedarán pausados y no podrán comprarse.</p>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  }
  </>);
};

export default TiendaDatos;
