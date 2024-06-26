import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";

type ForgotPasswordProps = {
  setAlertMsg: (alertMsg: { h3: string; p: string }) => void;
  loggedIn: boolean;
  activeUser: string;
  avatarUrl: string;
};

export const ForgotPassword = ({
  setAlertMsg,
  loggedIn,
  activeUser,
  avatarUrl,
}: ForgotPasswordProps) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let showAlertModal = () => {
      (document.getElementById("my_modal_1") as HTMLFormElement).showModal();
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/forgot-password`, {
        email,
      })
      .then((res) => {
        console.log(res.data);
        res.data === "Email sent"
          ? (setAlertMsg({
              h3: "Email sent!",
              p: "Check your email for password reset link",
            }),
            showAlertModal(),
            navigate("/login"))
          : (setAlertMsg({ h3: "Error!", p: res.data }), showAlertModal());
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
              <h1 className="font-extrabold text-3xl">Forgot your password?</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your email to reset</span>
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
                <button className="btn btn-primary">Send reset email</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
