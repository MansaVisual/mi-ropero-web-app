import { createContext, useState } from 'react';

export const UsePerfilContext = createContext();

export const PerfilContext = ({ children }) => {
  const [direccionesGuardadas, setDireccionesGuardadas] = useState([]);
  const [direccionSelecc, setDireccionSelecc] = useState(false);
  const [comprasRealizadas, setComprasRealizadas] = useState([]);
  const [ofertasRealizadas, setOfertasRealizadas] = useState([])

  const [dirFinBusqueda,setDirFinBusqueda]=useState(false)
  const [ofertasFinBusqueda,setOfertasFinBusqueda]=useState(false)
  const [comprasFinBusqueda,setComprasFinBusqueda]=useState(false)

  const PerfilAPI = async (data, clase, metodo) => {
    let resFinal = '';

    await fetch(
      `https://soap.miropero.pupila.biz/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`,
      {
        method: 'POST',
        body: data,
      },
    )
      .then((response) => response.json())
      .then((data) => {
        resFinal = data;
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return resFinal;
  };

  const handleBuscarDirecciones = (userLog) => {
    const dir = new FormData();
    dir.append('idcliente', userLog);
    PerfilAPI(dir, 'direcciones', 'all').then((res) => {
      setDirFinBusqueda(true)
      if (res.status === 'success') {
        setDireccionesGuardadas(res.result);
      }
    });
  };

  const handleComprasRealizadas = (userLog) => {
    const estados = [
      '',
      'Sin definir',
      'En borrador',
      'En proceso',
      'Pendiente de pago',
      'Pago realizado',
      'Error en pago',
      'Borrado',
      'Pago devuelto',
      'Compra BLOQUEADA',
      'Plazo de pago vencido',
      'En calificacion',
      'Finalizada',
    ];

    for (let i = 0; i < estados.length; i++) {
      const dir = new FormData();
      dir.append('comprador_id', userLog);
      dir.append('estado', i + 1);
      dir.append('page', 1);
      dir.append('bypage', 10);
      PerfilAPI(dir, 'operaciones', 'all_buyer').then((res) => {
        setComprasFinBusqueda(true)
        if (res.status === 'success') {
           //setComprasRealizadas(prevState=> prevState.push(res.result));
         }
      });
    }
  };


  const handleOfertasRealizadas=(userLog)=>{
    const estados=[
      'Sin definir',
      'en proceso de evaluacion',
      'Rechazada por el vendedor',
      'Cancelada por el comprador',
      'Aceptado',
      'vencida'
    ]

    let array=[]

     /* for (let i = 1; i < estados.length; i++) { */
      const dir = new FormData();
      dir.append('idcliente', userLog);
      dir.append('estado', [1,2,3,4,5] ); 
      PerfilAPI(dir, 'ofertas', 'all').then((res) => {
        setOfertasFinBusqueda(true)
        if (res.status === 'success') {
          //setOfertasRealizadas(prevState=> [...prevState,...res.result]);
          for(const ii in res.result){
            array= array.push(res.result[ii])
          }
         }
      });
     /* }  */
    setOfertasRealizadas(array);
  }

  return (
    <UsePerfilContext.Provider
      value={{
        PerfilAPI,
        handleBuscarDirecciones,
        dirFinBusqueda,
        direccionesGuardadas,
        setDireccionSelecc,
        handleComprasRealizadas,
        comprasFinBusqueda,
        comprasRealizadas,
        direccionSelecc,
        handleOfertasRealizadas,
        ofertasRealizadas,
        ofertasFinBusqueda
      }}
    >
      {children}
    </UsePerfilContext.Provider>
  );
};
