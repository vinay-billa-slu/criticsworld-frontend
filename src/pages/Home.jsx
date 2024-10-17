import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMovieContext } from "../components/ContextAPI";
import Loader from "../components/Loader";
import MoviesList from "../components/MoviesList";

const Home = () => {
  const quality = "4K";
  const duration = 115;
  const genre = ["Comedy", "Action", "Adventure", "Science Fiction"];
  const storyline =
    "This adventure takes you on a rollercoaster ride through exotic locales, explosive confrontations, and a maze of intrigue where survival demands courage, cunning, and a thirst for justice.";

  const { movies } = useMovieContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      if (movies) {
        setLoading(false);
      }
    }, 1000);
  }, [movies]);

  return (
    <div>
      <main>
        {loading ? (
          <Loader />
        ) : movies && movies.length > 0 ? (
          <article>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              // pagination={{
              //   clickable: true,
              // }}
              // navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {movies.map((data, key) => (
                <SwiperSlide key={key}>
                  <section
                    className="hero"
                    style={{
                      background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${axios.defaults.baseURL}${data.PosterImage}) no-repeat`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="container">
                      <div className="hero-content">
                        <p className="hero-subtitle">CriticsWorld</p>

                        <h1 className="h1 hero-title">
                          {/* Unlimited <strong>Movie</strong>. */}
                          {data.Title}
                        </h1>

                        <div className="meta-wrapper">
                          <div className="badge-wrapper">
                            <div className="badge badge-fill">
                              <div className="flex justify-center flex-row-reverse">
                                <span
                                  className="text-xs"
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  <ion-icon name="star"></ion-icon>
                                </span>
                                &nbsp;
                                <data>
                                  {data.AvgRating ? data.AvgRating : "NR/NA"}
                                </data>
                              </div>
                            </div>
                            <div className="badge badge-outline">{quality}</div>
                          </div>

                          <div className="ganre-wrapper">
                            {genre.map((item, key) => (
                              <span className="text-white" key={key}>
                                {item}
                              </span>
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

                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/details/${data.MovieID}/${data.Title}`);
                          }}
                        >
                          <ion-icon name="play"></ion-icon>

                          <span>Watch now</span>
                        </button>
                      </div>
                    </div>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
            <section id="movies_list" className="top-rated">
              <div className="container">
                <div className="title-wrapper">
                  <p className="section-subtitle">Online Streaming</p>

                  <h2 className="h2 section-title">List of Movies</h2>
                </div>
                <MoviesList list={movies} />
              </div>
            </section>
          </article>
        ) : (
          <div className="h-[100vh] flex justify-center items-center">
            <h1 className="text-center text-customRed font-bold text-5xl">
              No data found
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
