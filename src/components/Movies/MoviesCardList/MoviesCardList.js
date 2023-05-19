import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList(props) {
  const location = useLocation();

  const movies = props.movies;

  return (
    <>
    {!props.isLoading && movies.length === 0 && <p className="movies-card-list__none">По запросу ничего не найдено</p>}
    <section className="movies-card-list">
    {props.isLoading ? (
          <Preloader />
        ) : (
      <ul className="movies-card-list__table">
        {location.pathname === "/movies"
          ? movies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.id}
                  currentMovie={movie}
                  image={`https://api.nomoreparties.co/${movie.image.url}`}
                  nameRU={movie.nameRU}
                  duration={movie.duration}
                  button={props.button}
                  trailer={movie.trailerLink}
                  onMovieSave={props.onMovieSave}
                  onDeleteMovie={props.onDeleteMovie}
                  savedMovies={props.savedMovies}
                />
              );
            })
          : movies.map((movie) => {
              return (
                <MoviesCard
                  key={movie._id}
                  currentMovie={movie}
                  image={movie.image}
                  nameRU={movie.nameRU}
                  duration={movie.duration}
                  button={props.button}
                  trailer={movie.trailerLink}
                  onDeleteMovie={props.onDeleteMovie}
                />
              );
            })}
      </ul>
        )}
    </section>
    </>
  );
}
