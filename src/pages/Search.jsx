import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import MoviesList from "../components/MoviesList";

const Search = () => {
  const params = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .post("/api/movie/searchMovie", {
        keyword: params.keyword,
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <div>
      <main>
        {!loading ? (
          <article>
            <section id="movies_list" className="top-rated">
              <div className="container">
                <div className="title-wrapper mt-5">
                  <h2 className="section-title text-left text-white inline-flex">
                    <span>Searched keyword:</span>&nbsp;
                    <span className="text-customRed">{params.keyword}</span>
                  </h2>
                </div>
                {data && data.length > 0 ? (
                  <MoviesList list={data} />
                ) : (
                  <div className="h-[50vh] flex justify-center items-center">
                    <h1 className="text-center text-customRed font-bold text-4xl">
                      No data found
                    </h1>
                  </div>
                )}
              </div>
            </section>
          </article>
        ) : (
          <Loader />
        )}
      </main>
    </div>
  );
};

export default Search;
