import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../public/assets/css/styles.css";

import GoToTop from "./components/GoToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMovie from "./pages/AddMovie";
import Page404 from "./pages/Page404";
import Protected from "./components/Protected";
import AdminProtected from "./components/AdminProtected";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token/:id" element={<ResetPassword />} />

        <Route path="/" element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id/:title" element={<Details />} />
        </Route>

        <Route path="/" element={<AdminProtected isAdmin={1} />}>
          <Route path="/addmovie" element={<AddMovie />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
      <GoToTop />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
