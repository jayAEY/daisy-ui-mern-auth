import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";

type RegisterProps = {
  setAlertMsg: (alertMsg: { h3: string; p: string }) => void;
  loggedIn: boolean;
  activeUser: string;
  avatarUrl: string;
};

export const Register = ({
  setAlertMsg,
  loggedIn,
  activeUser,
  avatarUrl,
}: RegisterProps) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let showAlertModal = () => {
      (document.getElementById("my_modal_1") as HTMLFormElement).showModal();
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/register`, {
        email,
        password,
        avatar,
      })
      .then((res) => {
        res.data == `${email} is now registered!`
          ? (setAlertMsg({ h3: "Success!", p: `${email} is now registered!` }),
            showAlertModal(),
            navigate("/login"))
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
              <h1 className="font-extrabold text-3xl">Register</h1>
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
                <label className="label">
                  <span className="label-text">Profile Pic Url (optional)</span>
                </label>
                <input
                  onChange={(e) => setAvatar(e.target.value)}
                  type="text"
                  placeholder="url"
                  className="input input-bordered text-xs"
                />
                <p className="label-text m-4 text-center">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="hover:text-primary underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <div className="form-control">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
