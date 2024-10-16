import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ContextAPI } from "./components/ContextAPI.jsx";
import axios from "axios";

// axios.defaults.baseURL = "https://movie-list-review-backend.onrender.com"
axios.defaults.baseURL = window.location.protocol.includes("s")
  ? "https://criticsworld.onrender.com"
  : "http://localhost:8081";
axios.defaults.headers.common["token"] = localStorage.getItem("token");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextAPI>
      <App />
      <Toaster position="top-center" />
    </ContextAPI>
  </React.StrictMode>
);
