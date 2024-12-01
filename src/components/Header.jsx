import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useMovieContext } from "./ContextAPI";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  var loggedIn = localStorage.getItem("loggedIn");
  useEffect(() => {
    if (loggedIn) {
      setShow(true);
    }
  }, [loggedIn]); // Runs whenever userLoggedIn changes
  var token = localStorage.getItem("token");
  // var user = JSON.parse(localStorage.getItem("user"));
  var { user } = useMovieContext();

  const handleNavToggle = () => {
    const navbar = document.querySelector("[data-navbar]");
    const overlay = document.querySelector("[data-overlay]");
    document.body.classList.toggle("active");
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY >= 10);
      const goTop = document.querySelector("[data-go-top]");
      if (window.scrollY >= 10) {
        goTop.classList.toggle("active");
      } else {
        goTop.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header className={`header ${isActive ? "active" : ""}`} data-header>
        <div className="container">
          <div className="overlay" onClick={handleNavToggle} data-overlay></div>

          <a href="/" className="logo animate-spin">
            <img src="/assets/images/logo.svg" alt="Movie Lover logo" />
          </a>

          <div className="header-actions">
            {show && (
              <div className="flex justify-baseline items-center rounded-full w-[100%]">
                <input
                  placeholder="Search...."
                  className="w-[100%] rounded-s-full px-2 py-1 focus:outline-none"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    if (search) {
                      navigate(`/search/${search}`);
                      setShow((prev) => !prev);
                      setSearch("");
                    }
                  }}
                  className="rounded-e-full text-white p-1 text-2xl hover:text-customRed"
                >
                  <ion-icon name="chevron-forward-circle-outline"></ion-icon>
                </button>
              </div>
            )}

            <div className="lang-wrapper">
              <label for="language">
                <ion-icon name="globe-outline"></ion-icon>
              </label>

              <h1 className="text-white font-bold">EN</h1>
            </div>

            {loggedIn && token && (
              <button
                className="btn btn-primary sm:hidden md:hidden"
                onClick={() => {
                  localStorage.clear();
                  toast.success("Logout success");
                  setTimeout(() => {
                    window.location.replace("/signin");
                  }, 1000);
                }}
              >
                logout
              </button>
            )}
          </div>

          <button
            className="menu-open-btn"
            onClick={handleNavToggle}
            data-menu-open-btn
          >
            <ion-icon name="reorder-two"></ion-icon>
          </button>

          <nav className="navbar" data-navbar>
            <div className="navbar-top">
              <a href="/" className="">
                <img src="./assets/images/logo1.svg" alt="Movie Lover logo" />
              </a>

              <button
                className="menu-close-btn"
                onClick={handleNavToggle}
                data-menu-close-btn
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            {loggedIn && token && (
              <ul className="navbar-list">
                <li onClick={handleNavToggle}>
                  <a href="/" className="navbar-link">
                    Home
                  </a>
                </li>
                {/* <li onClick={handleNavToggle}>
                  <a href="/#movies_list" className="navbar-link">
                    Movies List
                  </a>
                </li> */}
                <li onClick={handleNavToggle}>
                  <a href="/profile" className="navbar-link">
                    Profile
                  </a>
                </li>
                {loggedIn && token && user.isAdmin == 1 && (
                  <li onClick={handleNavToggle}>
                    <a href="/addmovie" className="navbar-link">
                      Add Movie
                    </a>
                  </li>
                )}
              </ul>
            )}
            {!loggedIn && !token && (
              <button
                className="btn btn-primary w-full lg:hidden max-sm:block"
                onClick={() => {
                  handleNavToggle();
                  navigate("/signin");
                }}
              >
                Sign in
              </button>
            )}
            {loggedIn && token && (
              <button
                className="btn btn-primary w-full sm:block md:block lg:hidden xl:hidden 2xl:hidden"
                onClick={() => {
                  localStorage.clear();
                  toast.success("Logout success");
                  setTimeout(() => {
                    window.location.replace("/signin");
                  }, 1000);
                }}
              >
                logout
              </button>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
