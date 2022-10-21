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

  const FacebookLogin = (loginData) => {
    const log = new FormData();
    log.append('social_login_type', 1);
    log.append('social_login_id', loginData.id);
    log.append('nombre', loginData.first_name);
    log.append('apellido', loginData.last_name);
    log.append('avatar', loginData.picture.data.url);
    LoginAPI(log, 'clientes', 'insert_social').then((res) => {
      if (res.status === 'success') {
        console.log(res);
      } else if (res.status === 'error') {
        console.log('res', res);
        console.log('log', log);
        console.log('loginData', loginData);
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
