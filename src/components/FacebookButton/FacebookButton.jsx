import React, { useState, useCallback } from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { Button } from 'reactstrap';

const FacebookButton = () => {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {
    console.log(provider, profile);
    /* alert('login start'); */
  }, [provider, profile]);
  return (
    <div>
      <LoginSocialFacebook
        cookie='false'
        appId='793739778557335'
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
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
