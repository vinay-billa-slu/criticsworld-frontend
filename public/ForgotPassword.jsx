import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    axios
      .post("/api/auth/resetLink", {
        Email: target.email.value,
      })
      .then((res) => {
        toast.success("Rest link sent.");
        setTimeout(() => {
          window.location.replace("/signin");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="mt-24 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            className="mx-auto h-10 w-auto"
            src="/assets/images/logo1.svg"
            alt="Movie Lover"
          /> */}
            <h2 className="mt-10 text-center text-customRed underline text-2xl font-bold leading-9 tracking-tight">
              Forgot Password
            </h2>
            <span className="text-center text-white text-xs">Enter your registered email to get reset link</span>
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
                <button type="submit" className="btn btn-primary w-full">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
  );
};

export default ForgotPassword;
