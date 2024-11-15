import React, { Fragment, useEffect, useState } from "react";
import PopUp from "../components/PopUp";

import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import { useMovieContext } from "../components/ContextAPI";
import ReviewComponent from "../components/ReviewComponent";

const Details = () => {
  const quality = "4K";
  const duration = 115;
  const genre = ["Comedy", "Action", "Adventure", "Science Fiction"];
  const storyline =
    "This adventure takes you on a rollercoaster ride through exotic locales, explosive confrontations, and a maze of intrigue where survival demands courage, cunning, and a thirst for justice.";

  const params = useParams();

  const { user } = useMovieContext();

  // const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(true);
  const [currentReview, setCurrentReview] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [edit, setEdit] = useState(false);
  const [write, setWrite] = useState(false);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [data1, setData1] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selected, setSelected] = useState(0);
  const [text, setText] = useState("");

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleWrite = () => {
    setWrite((prev) => !prev);
  };

  const fetchData = () => {
    // const data = JsonData.find((item) => item.title == params.title);
    // setData(data);
    axios
      .post("/api/movie/getMovie", {
        MovieID: params.id,
      })
      .then((res) => {
        if (res.data.data) {
          setData(res.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const handleWriteReview = () => {
    if (selected > 5 || selected <= 0) {
      toast.error("Please select valid rating");
      return;
    }
    if (!text) {
      toast.error("Please select valid review");
      return;
    }
    // console.log(user);
    axios
      .post("/api/review/addReview", {
        UserID: user.UserID,
        MovieID: params.id,
        ReviewTitle: text,
        Rating: selected,
      })
      .then((res) => {
        toast.success("Review added");
        fetchAllReviews();
        resetObjects();
        setTimeout(() => {
          handleWrite();
        }, 1000);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      });
  };

  const handleEditReview = () => {
    if (selected > 5 || selected <= 0) {
      toast.error("Please select valid rating");
      return;
    }
    if (!text) {
      toast.error("Please select valid review");
      return;
    }
    axios
      .post("/api/review/updateReview", {
        UserID: user.isAdmin ? currentReview.UserID : user.UserID,
        MovieID: params.id,
        ReviewID: currentReview.ReviewID,
        ReviewTitle: text,
        Rating: selected,
      })
      .then((res) => {
        toast.success("Review updated");
        fetchAllReviews();
        resetObjects();
        setTimeout(() => {
          handleEdit();
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDeleteReview = (review) => {
    axios
      .post("/api/review/deleteReview", {
        ReviewID: review.ReviewID,
      })
      .then((res) => {
        toast.success("Review deleted");
        setUserReview(null);
        fetchAllReviews();
        resetObjects();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const fetchAllReviews = () => {
    axios
      .post("/api/review/getAllReviews", {
        MovieID: params.id,
      })
      .then((res) => {
        if (res.data.data && res.data.data.length) {
          const userReviewTemp = res.data.data.find(
            (e) => e.UserID == user.UserID
          );
          const reviewsTemp = res.data.data.filter(
            (e) => e.UserID != user.UserID
          );
          setData1(res.data.data);
          if (user.isAdmin) {
            setReviews(res.data.data);
          } else {
            if (reviewsTemp && reviewsTemp.length > 0) {
              setReviews(reviewsTemp);
            }
            if (userReviewTemp) {
              setUserReview(userReviewTemp);
            }
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDelete = () => {
    axios
      .post("/api/movie/deleteMovie", {
        MovieID: params.id,
      })
      .then((res) => {
        toast.success("Movie Deleted");
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const resetObjects = () => {
    setSelected(0);
    setText("");
    setCurrentReview(null);
  };

  useEffect(() => {
    fetchData();
    // fetchAllReviews();
  }, [params]);

  useEffect(() => {
    // fetchData();
    if (user && user.UserID) {
      fetchAllReviews();
    }
  }, [user]);

  return (
    <Fragment>
      {!loading ? (
        <div>
          <PopUp
            open={edit}
            setOpen={setEdit}
            handleOpen={handleEdit}
            handileReviewSubmit={handleEditReview}
            title={"Edit Review"}
            component={
              <EditComponent
                selected={selected}
                setSelected={setSelected}
                text={text}
                setText={setText}
              />
            }
          />

          <PopUp
            open={write}
            setOpen={setWrite}
            handleOpen={handleWrite}
            handileReviewSubmit={handleWriteReview}
            title={"Write Review"}
            component={
              <WriteComponent
                selected={selected}
                setSelected={setSelected}
                text={text}
                setText={setText}
              />
            }
          />

          {data ? (
            <Fragment>
              {/* movie data section */}

              <main>
                <article>
                  <section
                    className="movie-detail"
                    style={{
                      background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,1.5)), url(${axios.defaults.baseURL}${data.PosterImage}) no-repeat`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {user.isAdmin == 1 && (
                      <div className="container flex justify-end text-white">
                        <div className="flex justify-end items-center">
                          <a
                            href={`/editMovie/${params.id}`}
                            className="font-bold cursor-pointer text-sm hover:text-customRed hover:underline"
                          >
                            Edit
                          </a>
                          <div className="h-6 w-[2px] bg-customRed mx-5"></div>
                          <button
                            onClick={() => {
                              const val = window.confirm(
                                "Do you want to delete?"
                              );
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
                    )}
                    <div className="container">
                      <figure className="movie-detail-banner">
                        <img
                          src={axios.defaults.baseURL + "/" + data.PosterImage}
                          alt={data.Title}
                        />

                        <button className="play-btn">
                          <ion-icon name="play-circle-outline"></ion-icon>
                        </button>
                      </figure>

                      <div className="movie-detail-content">
                        <p className="detail-subtitle">Streaming Now</p>

                        <h1 className="h1 detail-title">{data.Title}</h1>

                        <div className="meta-wrapper">
                          <div className="badge-wrapper">
                            <div className="badge badge-fill flex justify-center">
                              <data>
                                {data.AvgRating ? data.AvgRating : "NR/NA"}
                              </data>
                              &nbsp;
                              <span
                                className="text-xs"
                                style={{
                                  color: "red",
                                }}
                              >
                                <ion-icon name="star"></ion-icon>
                              </span>
                            </div>

                            <div className="badge badge-outline">{quality}</div>
                          </div>

                          <div className="ganre-wrapper">
                            {genre.map((value, key) => (
                              <a href="#" key={key}>
                                {value}
                              </a>
                            ))}
                          </div>

                          <div className="date-time">
                            <div>
                              <ion-icon name="calendar-outline"></ion-icon>

                              <time datetime={data.ReleaseYear}>
                                {data.ReleaseYear}
                              </time>
                            </div>

                            <div>
                              <ion-icon name="time-outline"></ion-icon>

                              <time datetime={duration}>{duration} min</time>
                            </div>
                          </div>
                        </div>

                        <p className="storyline">{storyline}</p>

                        <p className="detail-subtitle">{data.Director}</p>

                        <div className="details-actions">
                          <button
                            className="share"
                            onClick={() => {
                              navigator.clipboard.writeText(window.location);
                              toast.success("Link Copied");
                            }}
                          >
                            <ion-icon name="share-social"></ion-icon>

                            <span>Share</span>
                          </button>

                          <div className="title-wrapper">
                            <p className="title">Prime Video</p>

                            <p className="text">Streaming Channels</p>
                          </div>
                          {/* <button className="btn btn-primary">
                    <ion-icon name="play"></ion-icon>

                    <span>Watch Now</span>
                  </button> */}
                        </div>

                        {/* <a
                  href="reviews"
                  download
                  className="download-btn"
                >
                  <span>Download</span>

                  <ion-icon name="download-outline"></ion-icon>
                </a> */}
                      </div>
                    </div>
                  </section>
                </article>
              </main>

              {/* actors(cast) section */}

              {data.Actors && (
                <div className="container">
                  <p className="detail-subtitle py-5 underline">Cast</p>
                  <div className="flex gap-x-10 overflow-auto no-scrollbar">
                    {data.Actors.split(",").map((item, value) => (
                      <div className="w-[100px] cursor-pointer">
                        <div className="w-full">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt=""
                          />
                        </div>
                        <h1 className="mt-2 font-bold text-white text-center text-sm hover:text-customRed hover:underline">
                          {item}
                        </h1>
                        {/* <h1 className="text-[#9b9a9a] text-center text-xs font-bold my-1">
                        (Thor)
                      </h1> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* reviews section */}

              <div id="reviews" className="container mb-10">
                <p className="detail-subtitle pt-10 underline">Reviews</p>

                {/* show review search if the reviews are available */}

                {reviews && reviews.length > 0 && (
                  <div>
                    <div>
                      <label
                        htmlFor="search"
                        className="block text-sm text-white font-bold leading-6"
                      >
                        Search for a review
                      </label>
                      <div className="mt-2">
                        <input
                          id="search"
                          name="search"
                          type="text"
                          autoComplete="search"
                          required
                          className="block w-40 rounded-md bg-transparent text-white border-2 border-white px-2 py-1 focus:outline-none focus:border-customRed"
                          onChange={(e) => {
                            const val = e.target.value;
                            setSearch(val);
                            if (val.trim() && val.trim().length) {
                              const f = data1.filter(
                                (item) =>
                                  item.ReviewTitle.toLowerCase().startsWith(
                                    val.toLowerCase()
                                  ) ||
                                  item.FirstName.toLowerCase().startsWith(
                                    val.toLowerCase()
                                  ) ||
                                  item.LastName.toLowerCase().startsWith(
                                    val.toLowerCase()
                                  )
                              );
                              // console.log(f);
                              setFilteredData(f);
                            } else {
                              // console.log("no");
                              setFilteredData([]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5"></div>

                {/* show searched reviews */}

                {search && filteredData && filteredData.length > 0 ? (
                  filteredData.map((item, key) => (
                    <ReviewComponent
                      key={key}
                      item={item}
                      user={user}
                      isValid={user.isAdmin == 1 ? true : false}
                      handleEditReview={() => {
                        handleEdit();
                        setCurrentReview(item);
                        setSelected(item.Rating);
                        setText(item.ReviewTitle);
                      }}
                      handleDeleteReview={() => {
                        const val = window.confirm("Do you want to delete?");
                        if (val) {
                          handleDeleteReview(item);
                        }
                      }}
                    />
                  ))
                ) : userReview ? (
                  // current logged in user review

                  <article className="mb-4">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 me-4 rounded-full"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt=""
                      />
                      <div className="font-medium dark:text-white">
                        <p className="font-bold">
                          {userReview.FirstName} {userReview.LastName}{" "}
                          <time
                            datetime={new Date(user.Timestamp).toDateString()}
                            className="block text-sm text-gray-500 dark:text-gray-400"
                          >
                            Joined on {new Date(user.Timestamp).toDateString()}
                          </time>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                      {[1, 2, 3, 4, 5].map((value, key) => (
                        <svg
                          key={key}
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill={value <= userReview.Rating ? "red" : "gray"}
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      {/* <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Should buy this.
                      </h3> */}
                    </div>
                    <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                      <p className="text-[#cacaca]">
                        Reviewed on{" "}
                        <time
                          datetime={new Date(
                            userReview.Timestamp
                          ).toDateString()}
                        >
                          {new Date(userReview.Timestamp).toDateString()}
                        </time>
                      </p>
                    </footer>
                    <p className="mb-2 text-sm text-[#cacaca]">
                      {userReview.ReviewTitle}
                    </p>
                    {/* <button className="block underline text-white mb-5 text-sm font-medium hover:text-customRed">
                      Read more
                    </button> */}

                    <aside>
                      <div className="flex items-center text-white">
                        <button
                          onClick={() => {
                            handleEdit();
                            setCurrentReview(userReview);
                            setSelected(userReview.Rating);
                            setText(userReview.ReviewTitle);
                          }}
                          className="font-bold text-sm hover:text-customRed hover:underline"
                        >
                          Edit
                        </button>
                        <div className="h-6 w-[2px] bg-customRed mx-2"></div>
                        <button
                          onClick={() => {
                            const val = window.confirm(
                              "Do you want to delete?"
                            );
                            if (val) {
                              handleDeleteReview(userReview);
                            }
                          }}
                          className="font-bold text-sm hover:text-customRed hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </aside>
                  </article>
                ) : (
                  <button
                    onClick={handleWrite}
                    className="my-5 font-bold text-white underline text-sm hover:text-customRed"
                  >
                    Write your review
                  </button>
                )}

                {/* {!reviews && <div className="divider"></div>} */}

                {/* list of all reviews except current logged in user review */}

                {!search &&
                  (!filteredData || filteredData.length <= 0) &&
                  reviews &&
                  reviews.map((item, key) => (
                    <ReviewComponent
                      key={key}
                      item={item}
                      user={user}
                      isValid={user.isAdmin == 1 ? true : false}
                      handleEditReview={() => {
                        handleEdit();
                        setCurrentReview(item);
                        setSelected(item.Rating);
                        setText(item.ReviewTitle);
                      }}
                      handleDeleteReview={() => {
                        const val = window.confirm("Do you want to delete?");
                        if (val) {
                          handleDeleteReview(item);
                        }
                      }}
                    />
                  ))}
              </div>
            </Fragment>
          ) : (
            <div className="h-[100vh] flex justify-center items-center text-center text-customRed text-5xl">
              <div>
                <h1 className="uppercase">No Data found</h1>
                <p className="text-white text-xs my-5">Invalid URL</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Details;

const WriteComponent = ({ selected, setSelected, setText }) => {
  return (
    <div>
      <div className="flex justify-center w-[31vw] items-center mb-1 space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5].map((value, key) => (
          <svg
            key={key}
            className="w-4 h-4 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill={value <= selected ? "red" : "gray"}
            viewBox="0 0 22 20"
            // onMouseOver={() => {
            //   setSelected(value);
            // }}
            onClick={() => {
              setSelected(value);
            }}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
      <div className="">
        <label htmlFor="about" className="block text-sm font-medium leading-6">
          Write your review
        </label>
        <div className="mt-2">
          <textarea
            id="about"
            name="about"
            rows={3}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const EditComponent = ({ selected, setSelected, text, setText }) => {
  return (
    <div>
      <div className="flex justify-center w-[31vw] items-center mb-1 space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5].map((value, key) => (
          <svg
            key={key}
            className="w-4 h-4 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill={value <= selected ? "red" : "gray"}
            viewBox="0 0 22 20"
            onClick={() => {
              setSelected(value);
            }}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
      <div className="">
        <label htmlFor="about" className="block text-sm font-medium leading-6">
          Write your review
        </label>
        <div className="mt-2">
          <textarea
            id="about"
            name="about"
            rows={3}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
