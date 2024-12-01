import axios from "axios";
import { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const EditMovie = () => {
  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const actorsRef = useRef();
  const params = useParams();

  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [actors, setActors] = useState([]);
  const [data, setData] = useState(null);

  const onImageUpload = (e) => {
    const files = e.target.files;
    var allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (files) {
      var fileType = files[0].type;
      if (allowedTypes.indexOf(fileType) === -1) {
        alert("Error: Please select a valid image file (PNG or JPG or JPEG).");
        setFile(null);
        return;
      }

      const objectUrl = URL.createObjectURL(files[0]);
      setUrl(objectUrl);
      setFile(files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    console.log(target.Title.value);
    if (!data.Actors.length) {
      toast.error("Please enter cast(actors) data");
      return;
    }
    try {
      let imageRes = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        imageRes = await axios.post("upload", formData);
      }
      const res = await axios.post("/api/movie/updateMovie", {
        Title: target.Title.value,
        ReleaseYear: target.Released.value,
        PosterImage: imageRes ? imageRes.data.filename : data.PosterImage,
        Actors: data.Actors,
        Director: target.Director.value,
        MovieID: params.id,
      });
      toast.success("Movie updated");
      setTimeout(() => {
        // window.location.reload();
        window.location = 'http://localhost:5173/'
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchData = () => {
    axios
      .post("/api/movie/getMovie", {
        MovieID: params.id,
      })
      .then((res) => {
        if (res.data.data) {
          let movie = res.data.data;
          movie.Actors = movie.Actors.split(",");
          setData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleReset = () => {
    setUrl("");
    setFile(null);
    setActors(null);
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  // console.log(data);

  return (
    <Fragment>
      {data ? (
        <div className="container mt-24 mb-10 text-white">
          <p className="detail-subtitle pt-10 underline text-center">
            Edit Movie Details
          </p>
          <form
            className="w-[100%] md:w-[65%] lg:w-[50%] mx-auto"
            onSubmit={onSubmit}
          >
            <div className="space-y-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-bold leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Title"
                      id="Title"
                      autoComplete="Title"
                      className="block w-full rounded-md bg-transparent text-white border-2 border-white px-3 py-1.5 focus:outline-none focus:border-customRed"
                      required
                      value={data.Title}
                      onChange={(e) => {
                        setData({ ...data, Title: e.target.value });
                      }}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="Released"
                    className="block text-sm font-bold leading-6 text-gray-900"
                  >
                    Released In
                  </label>
                  <div className="mt-2">
                    <select
                      id="Released"
                      name="Released"
                      autoComplete="Released"
                      className="block w-full rounded-md px-3 py-1.5"
                      style={{
                        border: "2px solid white",
                        color: "white",
                        background: "hsl(207, 19%, 11%)",
                      }}
                      required
                      value={data.ReleaseYear}
                      onChange={(e) => {
                        setData({
                          ...data,
                          ReleaseYear: Number(e.target.value),
                        });
                      }}
                    >
                      {arrayRange(2000, new Date().getFullYear(), 1).map(
                        (value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="Actors"
                    className="block text-sm font-bold leading-6 text-gray-900"
                  >
                    Actors
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Actors"
                      id="Actors"
                      autoComplete="Actors"
                      className="block w-full rounded-md bg-transparent text-white border-2 border-white px-3 py-1.5 focus:outline-none focus:border-customRed"
                      ref={actorsRef}
                      onChange={(e) => {
                        const target = e.target.value;
                        if (target.slice(-1) === ",") { // Check for a comma
                          const val = target.slice(0, -1).trim(); // Remove the comma and trim whitespace
                          if (val) {
                            const updatedActors = [...data.Actors, val];
                            setData({ ...data, Actors: updatedActors });
                          }
                          actorsRef.current.value = ""; // Clear the input field
                        }
                      }}
                    />
                    <span className="text-[10px] mx-1">
                      enter comma to submit name
                    </span>
                    {data.Actors && (
                      <div className="flex flex-wrap w-full">
                        {data.Actors.map((item, key) => (
                          <button
                            key={key}
                            className="px-1.5 font-bold py-1 mx-1 my-2 rounded-md text-center flex justify-center items-center"
                            style={{
                              border: "1px solid red",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              const updatedActors = data.Actors.filter(
                                (_, index) => index !== key
                              );
                              setData({ ...data, Actors: updatedActors });
                            }}
                          >
                            <span className="text-sm me-1">{item}</span>
                            <ion-icon name="close-outline"></ion-icon>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="Director"
                    className="block text-sm font-bold leading-6 text-gray-900"
                  >
                    Director
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Director"
                      id="Director"
                      autoComplete="Director"
                      className="block w-full rounded-md bg-transparent text-white border-2 border-white px-3 py-1.5 focus:outline-none focus:border-customRed"
                      required
                      value={data.Director}
                      onChange={(e) => {
                        setData({ ...data, Director: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-bold leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div
                    style={{
                      background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${
                        url ? url : axios.defaults.baseURL + data.PosterImage
                      }) no-repeat`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                  >
                    <div className="text-center">
                      <div className="mx-auto text-5xl h-12 w-12">
                        <ion-icon name="image-outline"></ion-icon>
                      </div>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file"
                          className="relative cursor-pointer rounded-md hover:text-customRed font-semibold focus-within:outline-none"
                        >
                          <span className="">Upload a file</span>
                          <input
                            id="file"
                            name="file"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={onImageUpload}
                            // required
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        JPEG, PNG, JPG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-x-6">
              {/* <button
                type="reset"
                className="font-bold text-sm hover:text-customRed hover:underline"
                onClick={() => {
                  handleReset();
                }}
              >
                Reset
              </button> */}
              <button
                type="submit"
                className="font-bold text-sm hover:text-customRed hover:underline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default EditMovie;
