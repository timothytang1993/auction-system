import storage from "local-storage-fallback";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { GoogleClientId } from "../config";

function Logout() {
  const naviage = useNavigate();
  function onSuccess() {
    console.log("Log out successful! ");
    storage.clear();
    naviage("/login");
  }

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={GoogleClientId()}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
