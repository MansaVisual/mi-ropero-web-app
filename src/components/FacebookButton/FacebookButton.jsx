import React, { useContext } from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { Button } from 'reactstrap';
import { UseLoginContext } from '../../context/LoginContext';

const FacebookButton = () => {
  const { FacebookLogin } = useContext(UseLoginContext);

  return (
    <div>
      <LoginSocialFacebook
        cookie='false'
        appId='793739778557335'
        /*    onLoginStart={onLoginStart}  */
        onResolve={({ data }) => {
          FacebookLogin(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Button className='botonFB'>
          INGRESAR CON FACEBOOK <i className='fbIcon'></i>
        </Button>
      </LoginSocialFacebook>
    </div>
  );
};

export default FacebookButton;
