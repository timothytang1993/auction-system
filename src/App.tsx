import "./App.css";
import { Routes, Route } from "react-router-dom";
import Bid from "./page/BidPage";
import Error from "./page/ErrorPage";
import LoginPage from "./page/LoginPage";
import storage from "local-storage-fallback";
import { useEffect } from "react";
import { hotjar } from "react-hotjar";
import TablePage from "./page/BidTable";

function App() {
  useEffect(() => {
    hotjar.initialize(3268383, 6);
  });

  // Identify the user
  hotjar.identify("USER_ID", { userProperty: "value" });

  // Add an event
  hotjar.event("button-click");

  // Update SPA state
  hotjar.stateChange("/my/page");

  // Check if Hotjar has been initialized before calling its methods
  if (hotjar.initialized()) {
    hotjar.identify("USER_ID", { userProperty: "value" });
  }

  return (
    <div className="App">
      <Routes>
        <Route path="table" element={<TablePage />} />
        <Route path="*" element={<Error />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="bid"
          element={storage.getItem("token") ? <Bid /> : <Error />}
        />
      </Routes>
    </div>
  );
}

export default App;
