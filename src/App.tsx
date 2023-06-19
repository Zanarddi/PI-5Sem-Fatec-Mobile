import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Lang } from "./pages/Lang";
import { GlobalContext } from "./contexts/GlobalContext";
import { FirebaseContext } from "./contexts/FirebaseContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./styles/App.css";
import { useGlobalContext } from "./contexts/UseGlobalContext";
import { useFirebaseContext } from "./contexts/UseFirebaseContext";

const App = () => {

  const globalContext = useGlobalContext();
  const firebaseContext = useFirebaseContext();
  return (
    <GlobalContext.Provider value={globalContext}>
      <FirebaseContext.Provider value={firebaseContext}>
        <BrowserRouter>
          <Routes>
            <ProtectedRoute path="/home" redirectTo="/" element={<div>Home</div>} />
            <Route path="/" element={<Login />} />
            <Route path="/lang" element={<Lang />} />
          </Routes>
        </BrowserRouter>
      </FirebaseContext.Provider>
    </GlobalContext.Provider>
  );
};
export default App;

