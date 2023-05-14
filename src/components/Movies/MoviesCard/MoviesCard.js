import React, { useState, useEffect } from "react";
import { Link, useLocation, } from "react-router-dom";

import "./MoviesCard.css";

export default function MoviesCard(props) {

  const [isSaved, setIsSaved] = useState(false);

  const location = useLocation();
  const savedMovies = props.savedMovies;

  function handleSave() {
    props.onMovieSave(props.currentMovie);
    setIsSaved(true);
  }

  function handleDelete() {
    setIsSaved(false);
    props.onDeleteMovie(props.currentMovie);
  }

  function handleClick() {
    isSaved ? handleDelete() : handleSave()
  }

  const saveCheck = () => {
    if (savedMovies) {
      if (!isSaved) {
        const anyMovie = savedMovies.find((savedMovie) => savedMovie.movieId === props.currentMovie.id);
        if (anyMovie) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      }
    }
  };

  const editedDuration = `${Math.trunc(props.duration/60)}ч ${props.duration % 60}м`;

  useEffect(() => {
    location.pathname === "/movies" ? saveCheck() : setIsSaved(true);
  }, []);

  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{props.nameRU}</h2>
          <p className="movies-card__duration">{editedDuration}</p>
        </div>

        {props.savedMovies ? (
          <button
            className={`movies-card__save-button ${
              isSaved ? "movies-card__save-button_saved" : ""
            }`}
            onClick={handleClick}
          />
        ) : (
          <button
          className={`movies-card__delete-button ${
            isSaved ? "movies-card__delete-button" : ""
          }`}
          onClick={handleDelete}
          type="button"
        />
        )}
      </div>
      <Link
        className="movie__image-link"
        to={{ pathname: `${props.trailer}` }}
        target="_blank"
      >
        <img
          className="movies-card__image"
          src={props.image}
          alt="превью фильма"
        />
      </Link>
    </div>
  );
}
