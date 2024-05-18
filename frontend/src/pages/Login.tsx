import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
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
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
