import { createContext, useState } from 'react';

export const UsePerfilContext = createContext();

export const PerfilContext = ({ children }) => {
  const [direccionesGuardadas, setDireccionesGuardadas] = useState([]);
  const [direccionSelecc, setDireccionSelecc] = useState(false);
  const [comprasRealizadas, setComprasRealizadas] = useState([]);

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
        if (res.status === 'success') {
          setComprasRealizadas(comprasRealizadas.push(res.result));
        }
      });
    }
  };

  return (
    <UsePerfilContext.Provider
      value={{
        PerfilAPI,
        handleBuscarDirecciones,
        direccionesGuardadas,
        setDireccionSelecc,
        handleComprasRealizadas,
        comprasRealizadas,
        direccionSelecc,
      }}
    >
      {children}
    </UsePerfilContext.Provider>
  );
};
