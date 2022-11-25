import "./App.css";
import { Routes, Route } from "react-router-dom";
import Bid from "./page/BidPage";
import Error from "./page/ErrorPage";
import LoginPage from "./page/LoginPage";
import storage from "local-storage-fallback";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="bid"
          element={<Bid />}
          // element={storage.getItem("token") ? <Bid /> : <Error />}
        />
      </Routes>
    </div>
  );
}

export default App;
