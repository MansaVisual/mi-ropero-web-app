import { createContext, useState, useEffect } from 'react';

export const UsePerfilContext = createContext();

export const PerfilContext = ({ children }) => {
  const [direccionesGuardadas, setDireccionesGuardadas] = useState([]);
  const [direccionSelecc, setDireccionSelecc] = useState(false);

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
    const dir = new FormData();
    dir.append('idcliente', userLog);
    PerfilAPI(dir, 'direcciones', 'all').then((res) => {
      if (res.status === 'success') {
        setDireccionesGuardadas(res.result);
      }
    });
  };

  return (
    <UsePerfilContext.Provider
      value={{
        PerfilAPI,
        handleBuscarDirecciones,
        direccionesGuardadas,
        setDireccionSelecc,
      }}
    >
      {children}
    </UsePerfilContext.Provider>
  );
};
