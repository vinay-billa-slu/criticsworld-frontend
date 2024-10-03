import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    axios
      .post("/api/auth/login", {
        Email: target.email.value,
        Password: target.password.value,
      })
      .then((res) => {
        const data = res.data.data;
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("token", data.token);
        // const { token, ...user } = data;
        // localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login success");
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      window.location.replace("/");
    }
    setLoading(false);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-24 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            className="mx-auto h-10 w-auto"
            src="/assets/images/logo1.svg"
            alt="Movie Lover"
          /> */}
            <h2 className="mt-10 text-center text-customRed underline text-2xl font-bold leading-9 tracking-tight">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-white font-bold leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md bg-transparent text-white border-2 border-white px-3 py-1.5 focus:outline-none focus:border-customRed"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-white font-bold leading-6"
                  >
                    Password
                  </label>
                  <div className="text-sm text-customRed">
                    <a href="/forgotPassword" className="font-semibold">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2 flex rounded-md border-2 justify-center items-center border-white">
                  <input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full bg-transparent text-white px-3 py-1.5 focus:outline-none focus:border-customRed"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // e.preventDefault();
                      setShow((prev) => !prev);
                    }}
                    className="text-xl mx-2 text-white"
                  >
                    <ion-icon
                      name={show ? "eye-off-outline" : "eye-outline"}
                    ></ion-icon>
                  </button>
                </div>
              </div>

              <div>
                <button type="submit" className="btn btn-primary w-full">
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-white">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-customRed"
              >
                Create an account!
              </Link>
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
