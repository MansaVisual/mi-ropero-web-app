import React, { useState } from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const FacebookButton = () => {
  const navigate = useNavigate();
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState(null);

  const onLoginStart = () => {
    console.log(provider, profile);
  };

  const onSuccess = () => {
    console.log(provider, profile);
    navigate(`/`);
  };

  return (
    <div>
      <LoginSocialFacebook
        cookie='false'
        appId='793739778557335'
        /* onLoginStart={onLoginStart} */
        onResolve={async ({ provider, data }) => {
          await setProvider(provider);
          await setProfile(data);
          onSuccess();
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
