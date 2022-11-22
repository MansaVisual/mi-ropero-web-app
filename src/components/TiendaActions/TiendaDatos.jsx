import React, { useContext,useState,useEffect } from "react";
import TiendaBanner from "../TiendaBanner/TiendaBanner";
import leftArrow from "../../assets/img/leftArrow.png";
import editIcon from "../../assets/img/editIcon.png";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import { UseMiTiendaContext } from "../../context/MiTiendaContext";
import SeccionProductos from "./SeccionProductos";
import Swal from "sweetalert2";
import { apiFetch } from "../../apiFetch/apiFetch";
import { UseLoginContext } from "../../context/LoginContext";
import logo from "../../assets/img/isologo.png";
import Loader from "../Loader/Loader";

const TiendaDatos = () => {
  const navigate = useNavigate();
  const { tiendaData,tiendaDetail,dataUpdate } = useContext(UseMiTiendaContext);
  const { userLog } = useContext(UseLoginContext);
  const [data,setData]=useState({
    nombre:"",
    telefono:0,
    descripcion:""
  })
  const [load,setLoad]=useState(false)

  const [errorPhone,setErrorPhone]=useState(false)
  const [errorCambpoObligatorio,setErrorCampoObligatorio]=useState(false)

  let clase = 'formObligatorio';
  let clase2 = 'formObligatorioTitle';


  useEffect(() => {
    if(tiendaDetail.length!==0){
      setData({
        nombre:tiendaDetail.nombre,
        telefono:Number(tiendaDetail.telefono),
        descripcion:tiendaDetail.descripcion
      })
    }
  }, [tiendaDetail]);


  const pausarTienda=(type)=>{
    Swal.fire({
      title: type!=="5"?"¿PAUSAR TIENDA?":"¿DESPAUSAR TIENDA?",
      text: type!=="5"?"Pausarás tu tienda hasta que lo desees":"Despausarás tu tienda",
      iconHtml: `<img src=${logo} alt="LOGO">`,
      showCloseButton: true,
      confirmButtonText: "CONTINUAR",
      customClass: {
        icon: "no-border",
        container: "popUpLoginAlert",
        cancelButton: "popUpLoginCancel",
      },
    }).then((res)=>{
      if(res.isConfirmed){
        const pause=new FormData()
        pause.append("idcliente",userLog)
        pause.append("idtienda",tiendaDetail.idtienda)
        if(type==="5"){
          apiFetch(pause,"tiendas","unpause").then((res)=>{
            if(res.status==="success"){
              Swal.fire({
                title:'TIENDA DESPAUSADA',
                icon:'success',
                confirmButtonText: 'ACEPTAR',
              })
              window.location.reload()
            }else{
              Swal.fire({
                title:'OCURRIÓ UN ERROR',
                text:"Vuelva a intentarlo",
                icon:'error',
                confirmButtonText: 'ACEPTAR',
            })
            }
          })
        }else{
          apiFetch(pause,"tiendas","pause").then((res)=>{
            if(res.status==="success"){
              Swal.fire({
                title:'TIENDA PAUSADA',
                icon:'success',
                confirmButtonText: 'ACEPTAR',
            })
            window.location.reload()
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
      }
    })
  }

  const reporteSem=(type)=>{
    Swal.fire({
      title: type==="1"?"DESACTIVAR REPORTE SEMANAL":"ACTIVAR REPORTE SEMANAL",
      text: type==="1"?"Dejará de recibir un reporte semanal con las estadísticas de tu tienda":"Recibirá un reporte semanal con las estadísticas de tu tienda",
      iconHtml: `<img src=${logo} alt="LOGO">`,
      showCloseButton: true,
      confirmButtonText: "CONTINUAR",
      customClass: {
        icon: "no-border",
        container: "popUpLoginAlert",
        cancelButton: "popUpLoginCancel",
      },
    }).then((res)=>{
      if(res.isConfirmed){
        const pause=new FormData()
        pause.append("idcliente",userLog)
        pause.append("idtienda",tiendaDetail.idtienda)
        if(type==="1"){pause.append("recibe_reporte",0)}else{pause.append("recibe_reporte",1)}
        apiFetch(pause,"tiendas","set_report").then((res)=>{
          if(res.status==="success"){
            Swal.fire({
              title:'fsdfadsf',
              icon:'success',
              confirmButtonText: 'ACEPTAR',
          })
          window.location.reload()
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

  const handleSubmit=()=>{
    setLoad(true)
    if(document.getElementById("nombre").value===""){
      setErrorCampoObligatorio(true)
      setLoad(false)
      return
    }
    const formPhone = new FormData();
    formPhone.append('telefono', document.getElementById('telefono').value);
    apiFetch(formPhone, 'clientes', 'validate_phone').then((res) => {
      if (res.status === 'error') {
        setErrorPhone(true)
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
        setLoad(false)
      }
    });
    console.log(dataUpdate)
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
                <p className={`labelInput ${errorCambpoObligatorio?clase2:""}`} id="labelNombre">
                  Nombre *
                </p>
                <TextField
                  className={`input ${errorCambpoObligatorio?clase:""}`}
                  placeholder="El Ropero de Sandra"
                  id="nombre"
                  value={data.nombre}
                  onChange={(e)=>setData((prevState)=>({
                    ...prevState,nombre:e.target.value
                  }))}
                />
              </div>
              <div className="inputBox">
                <p className={`labelInput ${errorPhone?clase2:""}`} id="labelApellido">
                  Teléfono *
                </p>
                <TextField
                  className={`input ${errorPhone?clase:""}`}
                  placeholder="+54  011 - 4417 - 8005"
                  type="number"
                  id="telefono"
                  value={data.telefono}
                  onChange={(e)=>{
                    setErrorPhone(false)
                    setData((prevState)=>({
                    ...prevState,telefono:Number(e.target.value)
                    }))
                }}
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
                  value={data.descripcion}
                  onChange={(e)=>setData((prevState)=>({
                    ...prevState,descripcion:e.target.value
                  }))}
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
            {load ? 
              <div
                style={{
                  marginTop: "24px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader spin={"spinnerM"} />
              </div>
              :
              <Button onClick={()=>handleSubmit()}>GUARDAR CAMBIOS</Button>
            }
          </div>
          <div className="returnLink" onClick={() => navigate(`/MiTienda`)}>
            <img src={leftArrow} alt="leftArrow" />
            <p>VOLVER A MI TIENDA</p>
          </div>
          <div>
            <div className="tiendaActionsCard tiendaActionsCard1">
              <h5 onClick={()=>reporteSem(tiendaDetail.recibe_reporte)}>
                {tiendaDetail.recibe_reporte==="1"?
                  "Desactivar reporte semanal de estadísticas"
                :
                  "Activar reporte semanal de estadísticas"
                }
              </h5>
              <p>Podés recibir en tu email un reporte semanal con la cantidad de seguidores de tu tienda, la cantidad de visitas de tus productos y toda la información estadística que te interesa.</p>
            </div>
            <div className="tiendaActionsCard">
              <h5 onClick={()=>pausarTienda(tiendaDetail.estado)}>
                {tiendaDetail.estado!=="5" ?
                  "Pausar tienda"
                :
                  "Despausar tienda"
                }
              </h5>
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
