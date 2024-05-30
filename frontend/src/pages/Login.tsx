import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";

type LoginProps = {
  setLoggedIn: (loggedIn: boolean) => void;
  setAlertMsg: (alertMsg: { h3: string; p: string }) => void;
  setActiveUser: (activeUser: string) => void;
  setAvatarUrl: (avatarUrl: string) => void;
  loggedIn: boolean;
  activeUser: string;
  avatarUrl: string;
};

export const Login = ({
  setLoggedIn,
  setAlertMsg,
  setActiveUser,
  setAvatarUrl,
  loggedIn,
  activeUser,
  avatarUrl,
}: LoginProps) => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let showAlertModal = () => {
      (document.getElementById("my_modal_1") as HTMLFormElement).showModal();
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, { email, password })
      .then((res) => {
        res.data[0] === "You are now logged in"
          ? (setAlertMsg({ h3: "Success!", p: res.data[0] }),
            showAlertModal(),
            setLoggedIn(true),
            setActiveUser(email),
            setAvatarUrl(res.data[1]),
            navigate("/dashboard"))
          : setAlertMsg({ h3: "Error!", p: res.data }),
          showAlertModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      {loggedIn ? (
        <Dashboard
          loggedIn={loggedIn}
          activeUser={activeUser}
          avatarUrl={avatarUrl}
        />
      ) : (
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              className="card-body"
              onSubmit={handleSubmit}
            >
              <h1 className="font-extrabold text-3xl">Login</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email"
                  className="input input-bordered text-xs"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                  className="input input-bordered text-xs"
                  required
                />
                <p className="label-text my-3 text-center">
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    className="hover:text-primary underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
              <div className="form-control">
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="label-text  text-center">
                <Link
                  to={"/forgot-password"}
                  className="hover:text-primary underline"
                >
                  Forgot your password?
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
