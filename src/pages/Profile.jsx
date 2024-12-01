import React, { useState } from "react";
import { useMovieContext } from "../components/ContextAPI";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useMovieContext();

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(user);

  const onSubmit = (e) => {
    e.preventDefault();

    const body = !editData.Password
      ? {
          FirstName: editData.FirstName,
          LastName: editData.LastName,
          Email: editData.Email,
        }
      : {
          FirstName: editData.FirstName,
          LastName: editData.LastName,
          Email: editData.Email,
          Password: editData.Password,
        };

    axios
      .post("/api/auth/profileUpdate", body)
      .then((res) => {
        toast.success("Profile upadated");
        if (editData.Password) {
          localStorage.clear();
        }
        setTimeout(() => {
          // window.location.reload();
          window.location = 'http://localhost:5173/'
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleDelete = () => {
    axios
      .post("/api/auth/profileDelete")
      .then((res) => {
        toast.success("Profile Deleted");
        localStorage.clear();
        setTimeout(() => {
          window.location.replace("/signup");
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
          Profile
        </h2>

        <div className="mt-5 flex justify-center items-center text-white">
          <button
            onClick={() => {
              setEdit((prev) => !prev);
              setEditData(user)
            }}
            className="font-bold text-sm hover:text-customRed hover:underline"
          >
            {edit ? "Cancel" : "Edit"}
          </button>
          <div className="h-6 w-[2px] bg-customRed mx-5"></div>
          <button
            onClick={() => {
              const val = window.confirm("Do you want to delete?");
              if (val) {
                handleDelete();
              }
            }}
            className="font-bold text-sm hover:text-customRed hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="flex">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm text-white font-bold leading-6"
              >
                Fisrt Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  className="block w-full rounded-md bg-transparent text-white border-2 border-white px-3 py-1.5 focus:outline-none focus:border-customRed"
                  value={edit ? editData.FirstName : user.FirstName}
                  onChange={(e) => {
                    setEditData({ ...editData, FirstName: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm text-white font-bold leading-6"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="test"
                  autoComplete="lastName"
                  required
                  className="block w-full rounded-md bg-transparent text-white border-2 border-white px-3 py-1.5 focus:outline-none focus:border-customRed"
                  value={edit ? editData.LastName : user.LastName}
                  onChange={(e) => {
                    setEditData({ ...editData, LastName: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

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
                value={edit ? editData.Email : user.Email}
                onChange={(e) => {
                  setEditData({ ...editData, Email: e.target.value });
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-white font-bold leading-6"
            >
              Password
            </label>
            <div className="mt-2 flex rounded-md border-2 justify-center items-center border-white">
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                className="block w-full bg-transparent text-white px-3 py-1.5 focus:outline-none focus:border-customRed"
                value={edit ? editData.Password : user.Password}
                onChange={(e) => {
                  setEditData({ ...editData, Password: e.target.value });
                }}
                disabled={edit ? false : true}
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

export default Profile;
