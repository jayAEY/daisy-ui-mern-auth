import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";

import { useState } from "react";

function App() {
  // // pastel", "forest"
  // const [theme, setTheme] = useState<String>("forest");
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="register"
            element={<Register />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
