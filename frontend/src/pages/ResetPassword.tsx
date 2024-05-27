import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dashboard } from "./Dashboard";

type ResetPasswordProps = {
  setAlertMsg: (alertMsg: { h3: string; p: string }) => void;
  loggedIn: boolean;
  activeUser: string;
  avatarUrl: string;
};

export const ResetPassword = ({
  setAlertMsg,
  loggedIn,
  activeUser,
  avatarUrl,
}: ResetPasswordProps) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const { id, token } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let showAlertModal = () => {
      (document.getElementById("my_modal_1") as HTMLFormElement).showModal();
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/reset-password/${id}/${token}`, {
        password,
      })
      .then((res) => {
        console.log(res.data);
        res.data === "Success"
          ? (setAlertMsg({ h3: "Success!", p: res.data }),
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
              <h1 className="font-extrabold text-3xl">Reset password</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Enter new password to reset
                  </span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="password"
                  className="input input-bordered text-xs"
                  required
                />
              </div>
              <div className="form-control">
                <button className="btn btn-primary">
                  Confirm new password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
