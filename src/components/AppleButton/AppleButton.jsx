import React, { useContext, useState } from "react";
import { LoginSocialApple } from "reactjs-social-login";
import { Button } from "reactstrap";
import { UseLoginContext } from "../../context/LoginContext";

const AppleButton = () => {
  const { AppleLogin } = useContext(UseLoginContext);

  const [profile, setProfile] = useState(false);
  const [provider, setProvider] = useState(false);

  console.log(profile, provider);

  return (
    <div>
      <LoginSocialApple
        client_id={"ar.com.miropero.web2"}
        scope={"name email"}
        redirect_uri={"https://mi-ropero-web-app.vercel.app"}
        /* onLoginStart={onLoginStart} */
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Button className="botonApple">
          INGRESAR CON APLEE <i className="appleIcon"></i>
        </Button>
      </LoginSocialApple>
    </div>
  );
};

export default AppleButton;
