import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Lang } from "./pages/Lang";
import { Home } from "./pages/Home";
import { GlobalContext } from "./contexts/GlobalContext";
import { FirebaseContext } from "./contexts/FirebaseContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./styles/App.css";
import { useGlobalContext } from "./contexts/UseGlobalContext";
import { useFirebaseContext } from "./contexts/UseFirebaseContext";
import React from "react";

const App = () => {

  const globalContext = useGlobalContext();
  const firebaseContext = useFirebaseContext();
  const { user, setUser } = React.useContext(FirebaseContext);
  return (
    <GlobalContext.Provider value={globalContext}>
      <FirebaseContext.Provider value={firebaseContext}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/lang" element={<Lang />} />
            <Route path="/home" element={<ProtectedRoute props={undefined}>
              <Home />
            </ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </FirebaseContext.Provider>
    </GlobalContext.Provider>
  );
};
export default App;

