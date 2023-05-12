import React, { useState, useLocation, useEffect } from "react";
import { Link } from "react-router-dom";

import "./MoviesCard.css";

export default function MoviesCard(props) {

  // const movie = {
  //   country: props.movie.country || "Не найдено",
  //   director: props.movie.director || "Не найдено",
  //   duration: props.movie.duration || 0,
  //   year: props.movie.year || "Не найдено",
  //   description: props.movie.description || "Не найдено",
  //   image: `https://api.nomoreparties.co${props.movie.image?.url}`,
  //   trailer: props.movie?.trailerLink,
  //   nameRU: props.movie.nameRU || "Не найдено",
  //   nameEN: props.movie.nameEN || "Не найдено",
  //   thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
  //   movieId: props.movie.id,
  // };

  // const duration = `${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`;
  // const image = `https://api.nomoreparties.co${props.movie.image?.url}`;
  // const savedMovies = JSON.parse(localStorage.getItem("saved-movies"));
  // const currentMovie = savedMovies?.find(
  //   (movie) => movie.nameRU === props.movie.nameRU
  // );

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

  useEffect(() => {
    location.pathname === "/movies" ? saveCheck() : setIsSaved(true);
  }, []);

  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{props/* .movie */.nameRU}</h2>
          <p className="movies-card__duration">{props.duration}</p>
        </div>
        {props.saved ? (
          <button
            className={`movies-card__save-button ${
              isSaved ? "movies-card__save-button_saved" : "" // null
            }`}
            onClick={isSaved ? handleDelete : handleSave /* handleClick */} // or handleSave???
          />
        ) : (
          <button
            className={`movies-card__delete-button ${
              isSaved ? "movies-card__delete-button" : "" //null
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
