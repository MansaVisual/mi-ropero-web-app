import React, { useContext, useState } from "react";
import { LoginSocialApple } from "reactjs-social-login";
import { Button } from "reactstrap";
import { UseLoginContext } from "../../context/LoginContext";

const AppleButton = () => {
  const { AppleLogin } = useContext(UseLoginContext);

  return (
    <div>
      <LoginSocialApple
        client_id={"ar.com.miropero.web2"}
        scope={"name email"}
        redirect_uri={"https://www.miropero.ar"}
        /* onLoginStart={onLoginStart} */
        onResolve={({ data }) => AppleLogin(data)}
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
