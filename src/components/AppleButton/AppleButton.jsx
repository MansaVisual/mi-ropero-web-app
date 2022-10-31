import React, { /* useContext, */ useState } from "react";
import { LoginSocialApple } from "reactjs-social-login";
import { Button } from "reactstrap";
/* import { UseLoginContext } from "../../context/LoginContext"; */

const AppleButton = () => {
  /*  const { FacebookLogin } = useContext(UseLoginContext); */

  const [data, setData] = useState(null);

  console.log(data);

  return (
    <div>
      <LoginSocialApple
        client_id={"ar.com.miropero.web"}
        scope={"name email"}
        redirect_uri={"https://mi-ropero-web-app.vercel.app/"}
        /* onLoginStart={onLoginStart} */
        onResolve={({ provider, data }) => {
          setData([provider, data]);
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
