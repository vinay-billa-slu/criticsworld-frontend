import React from "react";
import axios from "axios";

const MoviewsList = ({ list }) => {
  const quality = "4K";
  const duration = 115;
  const genre = ["Comedy", "Action", "Adventure", "Science Fiction"];
  const storyline =
    "This adventure takes you on a rollercoaster ride through exotic locales, explosive confrontations, and a maze of intrigue where survival demands courage, cunning, and a thirst for justice.";

  return (
    <ul className="movies-list">
      {list.map((item, key) => (
        <li key={key}>
          <div className="movie-card">
            <a href={`/details/${item.MovieID}/${item.Title}`}>
              <figure className="card-banner">
                <img
                  src={axios.defaults.baseURL + "/" + item.PosterImage}
                  alt={item.Title}
                />
              </figure>
            </a>

            <div className="title-wrapper">
              <a href={`/details/${item.MovieID}/${item.Title}`}>
                <h3 className="card-title">{item.Title}</h3>
              </a>

              <time datetime={item.ReleaseYear}>{item.ReleaseYear}</time>
            </div>

            <div className="card-meta">
              <div className="badge badge-outline">{quality}</div>

              <div className="duration">
                <ion-icon name="time-outline"></ion-icon>

                <time datetime={duration}>{duration} min</time>
              </div>

              <div className="rating">
                <ion-icon name="star"></ion-icon>

                <data>{item.AvgRating ? item.AvgRating : "NR/NA"}</data>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviewsList;
