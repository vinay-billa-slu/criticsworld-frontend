import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [show, setShow] = useState(false);

  const params = useParams();

  const onSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    axios
      .post(
        "/api/auth/resetPassword",
        {
          Password: target.Password.value,
        },
        {
          headers: {
            token: params.token,
          },
        }
      )
      .then((res) => {
        toast.success("Password changed.");
        setTimeout(() => {
          window.location.replace("/signin");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
          Reset Password
        </h2>
        <span className="text-center text-white text-xs">
          Enter new password
        </span>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Password"
                className="block text-sm text-white font-bold leading-6"
              >
                Password
              </label>
            </div>
            <div className="mt-2 flex rounded-md border-2 justify-center items-center border-white">
              <input
                id="Password"
                name="Password"
                type={show ? "text" : "password"}
                autoComplete="Password"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
