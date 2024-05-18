import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";

import { useState } from "react";
import { AlertModal } from "./components/AlertModal";

function App() {
  // // pastel", "forest"
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<string>("");
  const [alertMsg, setAlertMsg] = useState<{ h3: string; p: string }>({});

  return (
    <>
      <BrowserRouter>
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          activeUser={activeUser}
        />
        <AlertModal alertMsg={alertMsg} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedIn={loggedIn}
                activeUser={activeUser}
              />
            }
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="register"
            element={
              <Register
                setLoggedIn={setLoggedIn}
                setAlertMsg={setAlertMsg}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                loggedIn={loggedIn}
                activeUser={activeUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
