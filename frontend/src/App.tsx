import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { AlertModal } from "./components/AlertModal";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<string>("");
  const [alertMsg, setAlertMsg] = useState<{ h3: string; p: string }>({
    h3: "",
    p: "",
  });
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/verify`).then((res) => {
      if (res.data.login === true) {
        setLoggedIn(true);
        setActiveUser(res.data.email);
        setAvatarUrl(res.data.avatar);
      } else {
        setLoggedIn(false);
        setActiveUser("");
      }
    });
  }, [loggedIn]);

  return (
    <>
      <BrowserRouter>
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setActiveUser={setActiveUser}
          setAlertMsg={setAlertMsg}
          avatarUrl={avatarUrl}
        />
        <AlertModal alertMsg={alertMsg} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedIn={loggedIn}
                activeUser={activeUser}
                avatarUrl={avatarUrl}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setAlertMsg={setAlertMsg}
                setActiveUser={setActiveUser}
                loggedIn={loggedIn}
                activeUser={activeUser}
                avatarUrl={avatarUrl}
              />
            }
          />
          <Route
            path="register"
            element={<Register setAlertMsg={setAlertMsg} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                loggedIn={loggedIn}
                activeUser={activeUser}
                avatarUrl={avatarUrl}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
