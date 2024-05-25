import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col text-center">
            <div className="avatar">
              <div className="w-60 rounded-full">
                <img
                  src={
                    avatarUrl.length > 0
                      ? avatarUrl
                      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"
                  }
                />
              </div>
            </div>
            <div className="max-w-2xl">
              <h1 className="text-8xl font-bold">Welcome {activeUser}! 😎</h1>
              <h2 className="text-xl m-4">You are now logged in.</h2>
            </div>
          </div>
        </div>
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
