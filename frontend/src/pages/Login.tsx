import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type LoginProps = {
  setLoggedIn: (loggedIn: boolean) => void;
  setAlertMsg: (alertMsg: { h3: string; p: string }) => void;
  setActiveUser: (activeUser: string) => void;
  // setAvatarUrl: (avatar: string) => void;
};

export const Login = ({
  setLoggedIn,
  setAlertMsg,
  setActiveUser,
}: // setAvatarUrl,
LoginProps) => {
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
        res.data === "You are now logged in"
          ? (setAlertMsg({ h3: "Success!", p: res.data }),
            // ? (setAlertMsg({ h3: "Success!", p: res.data.message }),
            showAlertModal(),
            setLoggedIn(true),
            setActiveUser(email),
            // setAvatarUrl(res.data.avatar),
            navigate("/dashboard"))
          : setAlertMsg({ h3: "Error!", p: res.data }),
          // : setAlertMsg({ h3: "Error!", p: res.data.message }),
          showAlertModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
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
              <p className="label-text m-4 text-center">
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
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
