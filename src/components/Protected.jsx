import React, { Fragment, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import Login from "../pages/Login";

const Protected = ({ isAdmin }) => {
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const AuthVerify = () => {
    axios
      .post("/api/auth/verifyUser")
      .then((res) => {
        const loggedIn = localStorage.getItem("loggedIn");
        const token = localStorage.getItem("token");
        if (loggedIn && token) {
          setValid(true);
        } else {
          localStorage.clear();
          setValid(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        localStorage.clear();
        setLoading(false);
      });
  };

  useEffect(() => {
    AuthVerify();
  }, []);

  return (
    <Fragment>
      {loading ? <Loader /> : valid ? <Outlet /> : <Navigate to="/signin" />}
    </Fragment>
  );
};

export default Protected;
