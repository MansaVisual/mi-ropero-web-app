import React from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { Button } from 'reactstrap';
/* import { useNavigate } from 'react-router-dom'; */

const FacebookButton = () => {
  /*   const navigate = useNavigate(); */
  /*   const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState(null); */

  /*   const onLoginStart = () => {
    console.log(provider, profile);
  }; */

  /*   const onSuccess = () => {
    console.log(provider, profile);
    navigate(`/`);
  }; */

  return (
    <div>
      <LoginSocialFacebook
        cookie='false'
        appId='793739778557335'
        /*    onLoginStart={onLoginStart}  */
        onResolve={({ provider, data }) => {
          console.log('provider', provider);
          console.log('data', data);
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
