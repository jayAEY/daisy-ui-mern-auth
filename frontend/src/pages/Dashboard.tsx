import { Link } from "react-router-dom";

type DashboardProps = {
  loggedIn: boolean;
  activeUser: string;
  avatarUrl: string;
};

export const Dashboard = ({
  loggedIn,
  activeUser,
  avatarUrl,
}: DashboardProps) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      {loggedIn ? (
        <div className="flex flex-col hero-content text-center">
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
            <h1 className="text-4xl font-bold text-wrap">
              Welcome {activeUser}! 😎
            </h1>
            <h2 className="text-xl m-4">You are now logged in.</h2>
          </div>
        </div>
      ) : (
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">
              ❗Error you are not logged in❗
            </h1>
            <div className="m-10 flex gap-4 justify-center">
              <Link to={"/login"}>
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to={"/register"}>
                <button className="btn btn-primary">Register</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
