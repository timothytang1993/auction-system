import { gapi } from "gapi-script";
import { useEffect } from "react";
import { GoogleClientId } from "../config";

function Error() {
  function handleCallbackResponse(response: any) {
    console.log("HELLO");
    console.log(response);
  }
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GoogleClientId(),
        scope: "",
        callback: handleCallbackResponse,
      });
    }

    gapi.load("client:auth2", start);
  });

  return <div className="Error">Error. Please try again later.</div>;
}

export default Error;
