import React, { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserContext = createContext();

const ContextAPI = ({ children }) => {
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState([]);

  const fetchProfile = () => {
    axios
      .post("/api/auth/profile")
      .then((res) => {
        if (res.data.data) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        // toast.error(err.message);
      });
  };

  const fetchAllMovies = () => {
    axios
      .post("/api/movie/getAllMovies")
      .then((res) => {
        setMovies(res.data.data);
      })
      .catch((err) => {
        // toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchProfile();
    fetchAllMovies();
  }, []);

  return (
    <UserContext.Provider value={{ user, movies }}>
      {children}
    </UserContext.Provider>
  );
};

const useMovieContext = () => useContext(UserContext);

export { ContextAPI, useMovieContext };
