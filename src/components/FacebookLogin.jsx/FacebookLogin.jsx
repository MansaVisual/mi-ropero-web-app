import { Button } from '@mui/material';
import React from 'react';
/* import FacebookLogin from 'react-facebook-login'; */
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '@mui/icons-material/Facebook';

const responseFacebook = (response) => {
  console.log(response);
};

const FacebookButton = () => {
  return (
    <FacebookLogin
      appId='425033093123995'
      autoLoad={false}
      fields='name,email,picture'
      callback={responseFacebook}
      cssClass='botonFB'
      textButton='INGRESAR CON FACEBOOK'
      scope='public_profile'
      render={(renderProps) => (
        <Button
          className='botonFB'
          onClick={renderProps.onClick}
          endIcon={<FacebookIcon />}
        >
          INGRESAR CON FACEBOOK
        </Button>
      )}
      /* icon='fa-facebook' */
    />
  );
};

export default FacebookButton;
