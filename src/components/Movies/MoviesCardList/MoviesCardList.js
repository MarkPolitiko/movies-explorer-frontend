import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ moviesDB, block, isSaved }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__table">
        {block === "general"
          ? moviesDB.map((movie) => (
              <MoviesCard
                block={block}
                id={movie.id}
                nameRU={movie.nameRU}
                duration={movie.duration}
                image={movie.image}
                isMovieSaved={movie.saved}
              />
            ))
          : moviesDB
              .filter((movie) => movie.saved)
              .map((movie) => (
                <MoviesCard
                  block={block}
                  id={movie.id}
                  nameRU={movie.nameRU}
                  duration={movie.duration}
                  image={movie.image}
                />
              ))}
      </ul>
    </section>
  );
}
