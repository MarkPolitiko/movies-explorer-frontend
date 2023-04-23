import React, { useState, useLocation, useEffect } from "react";
import { Link } from "react-router-dom";

import "./MoviesCard.css";

export default function MoviesCard(props) {

  const movie = {
    country: props.movie.country || "Не найдено",
    director: props.movie.director || "Не найдено",
    duration: props.movie.duration || 0,
    year: props.movie.year || "Не найдено",
    description: props.movie.description || "Не найдено",
    image: `https://api.nomoreparties.co${props.movie.image?.url}`,
    trailer: props.movie?.trailerLink,
    nameRU: props.movie.nameRU || "Не найдено",
    nameEN: props.movie.nameEN || "Не найдено",
    thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
    movieId: props.movie.id,
  };

  const duration = `${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`;
  const image = `https://api.nomoreparties.co${props.movie.image?.url}`;
  const savedMovies = JSON.parse(localStorage.getItem("saved-movies"));
  const currentMovie = savedMovies?.find(
    (movie) => movie.nameRU === props.movie.nameRU
  );

  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const location = useLocation();

  function handleLike() {
    props.onMovieSave(movie);
    setIsLiked(true);
  }

  function handleDislike() {
    setIsLiked(false);
    props.onDeleteMovie(currentMovie._id);
  }

  function handleDeleteMovie() {
    props.onDeleteMovie(movie._id);
    setIsLiked(false);
  }

  useEffect(() => {
    if (currentMovie) {
      setIsLiked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{props.movie.nameRU}</h2>
          <p className="movies-card__duration">{duration}</p>
        </div>
        {props.saved ? (
          <button
            className={`movies-card__save-button ${
              isLiked ? "movies-card__save-button_saved" : ""
            }`}
            onClick={isLiked ? handleDislike : handleLike}
          />
        ) : (
          <button
            className={`movies-card__delete-button ${
              isSaved ? "movies-card__delete-button" : ""
            }`}
            onClick={handleDeleteMovie}
            type="button"
          />
        )}
      </div>
      <Link
        className="movie__image-link"
        to={props.saved ? props.movie.trailer : props.movie.trailerLink}
        target="_blank"
      >
        <img
          className="movies-card__image"
          src={props.saved ? props.movie.image : image}
          alt={props.movie.nameRU}
        />
      </Link>
    </div>
  );
}
