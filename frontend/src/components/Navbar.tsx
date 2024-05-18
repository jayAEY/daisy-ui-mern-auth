import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("daisyui-theme") || ""
  );
  const setDark = () => {
    document.documentElement.setAttribute("data-theme", "forest");
    localStorage.setItem("daisyui-theme", "forest");
  };
  const setLight = () => {
    document.documentElement.setAttribute("data-theme", "pastel");
    localStorage.setItem("daisyui-theme", "pastel");
  };

  //   let theme = localStorage.getItem("daisyui-theme");

  if (theme === "forest") {
    setDark();
  } else if (theme === "pastel") {
    setLight();
  }

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.checked ? setDark() : setLight();
  }

  function logout() {}

  return (
    <div className="navbar bg-base-100 shadow-xl">
      <div className="navbar-start">
        <label className="cursor-pointer grid place-items-center">
          <input
            onChange={handleToggle}
            type="checkbox"
            defaultChecked={theme === "forest" ? true : false}
            className="toggle theme-controller bg-primary row-start-1 col-start-1 col-span-2 "
          />
          <svg
            className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="5"
            />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              className="text-primary hover:bg-base hover:text-base-content"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-primary hover:bg-base hover:text-base-content"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="profile picture"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                className="text-primary hover:bg-base hover:text-base-content"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                onClick={logout}
                to="/"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
