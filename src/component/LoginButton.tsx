import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { GoogleClientId } from "../config";
import AxiosPost from "../tool/AxiosTool";
import storage from "local-storage-fallback";
import { useEffect } from "react";
import { gapi } from "gapi-script";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GoogleClientId(),
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  function onSuccess(res: any) {
    console.log("res", res);

    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);

    storage.setItem("name", res.profileObj.name);
    storage.setItem("token", res.tokenId);

    // navigate("/bid");
    AxiosPost("http://localhost:8888/api/user/sign-in", {
      token: res.tokenId,
    }).then((res) => {
      if (res.data.code === "S000") {
        console.log("bid");
        navigate("/bid");
      } else {
        console.log("error");
        navigate("/error");
      }
    });
  }

  function onFailure(res: object) {
    navigate("/error");
    console.log("LOGIN FAILED! res: ", res);
  }

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={GoogleClientId()}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
}

export default Login;
