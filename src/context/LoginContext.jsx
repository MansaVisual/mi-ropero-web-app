import { createContext, useState, useEffect } from 'react';

export const UseLoginContext = createContext();

export const LoginContext = ({ children }) => {
  const [userLog, setUserLog] = useState('');
  const [infoUser, setInfoUser] = useState([]);

  useEffect(() => {
    const res = localStorage.getItem('idClienteMiRopero');
    if (res !== null && userLog === '') {
      setUserLog(res);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const LoginAPI = async (data, clase, metodo) => {
    let resFinal = '';
    const res = localStorage.getItem('idClienteMiRopero');
    if (res !== null && userLog !== '') {
      setUserLog(res);
    }

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

  const loginStorage = async () => {
    const res = await localStorage.getItem('idClienteMiRopero');
    return res;
  };

  useEffect(() => {
    if (userLog !== '') {
      const user = new FormData();
      user.append('idcliente', userLog);
      LoginAPI(user, 'clientes', 'get').then((res) => {
        if (res.status === 'success') {
          setInfoUser(res.result);
        } else if (res.status === 'error') {
          reBuscarInfo();
        }
      });
    }
  }, [userLog]); // eslint-disable-line react-hooks/exhaustive-deps

  const reBuscarInfo = () => {
    if (userLog !== '') {
      const user = new FormData();
      user.append('idcliente', userLog);
      LoginAPI(user, 'clientes', 'get').then((res) => {
        if (res.status === 'success') {
          setInfoUser(res.result);
        } else {
          reBuscarInfo();
        }
      });
    }
  };

  const FacebookLogin = async (loginData) => {
    const log = new FormData();
    log.append('social_login_type', 1);
    log.append('social_login_id', loginData.id);
    await LoginAPI(log, 'clientes', 'login_social').then((res) => {
      if (res.status === 'success') {
        console.log(res);
        setInfoUser(res.result);
        window.location.replace('https://mi-ropero-web-app.vercel.app/');
      } else if (res.status === 'error') {
        console.log('res', res);
        if (res.result === 'El social_login_id y/o social_login no existen') {
          FacebookRegister(loginData);
        }
      }
    });
  };

  const FacebookRegister = async (loginData) => {
    const log = new FormData();
    log.append('social_login_type', 1);
    log.append('social_login_id', loginData.id);
    log.append('nombre', loginData.first_name);
    log.append('email', loginData.email);
    log.append('apellido', loginData.last_name);
    log.append('avatar', loginData.picture.data.url);
    console.log(log);
    await LoginAPI(log, 'clientes', 'insert_social').then((res) => {
      if (res.status === 'success') {
        setInfoUser(res.result);
        window.location.replace('https://mi-ropero-web-app.vercel.app/');
      } else if (res.status === 'error') {
        alert('Surgió un problema');
      }
    });
  };

  return (
    <UseLoginContext.Provider
      value={{
        LoginAPI,
        loginStorage,
        userLog,
        setUserLog,
        infoUser,
        FacebookLogin,
      }}
    >
      {children}
    </UseLoginContext.Provider>
  );
};
