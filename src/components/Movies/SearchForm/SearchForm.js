import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./SearchForm.css";
import logo from "../../../images/search-logo.svg";

export default function SearchForm(props) {
  const location = useLocation();
  const [movieSearch, setMovieSearch] = useState(props.previousMovieSearch);

  function handleSearchMovies(evt) {
    evt.preventDefault();
      location.pathname === "/movies"
        ? props.onSearchMovies(movieSearch)
        : props.onSavedMoviesSearch(movieSearch);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form
          className="search-form__main"
          name="search-form"
          id="search-form"
        >
          <img src={logo} className="search-form__icon" alt="logo"></img>
          <input
            className="search-form__input"
            placeholder="Фильм"
            value={movieSearch || ""}
            onChange={(evt) => setMovieSearch(evt.target.value)}
            type="search"
            name="movieSearchInput"
            id="search-form__input-movie"
            aria-label="поиск фильма"
            required
          />
          <button
            type="submit"
            className="search-form__button"
            onClick={handleSearchMovies}
          ></button>
        </form>
      </div>
      <div className="search-form__checkbox">
        <label className="search-form__checkbox-container">
          <input
            className="search-form__checkbox-input"
            type="checkbox"
            onChange={props.onShortsSwitch}
            checked={
              location.pathname === "/movies"
                ? props.isChecked
                  ? true
                  : false
                : props.savedIsChecked
                ? true
                : false
            }
            id="short-films"
          />
          <span className="search-form__checkbox-span" />
        </label>
        <p className="search-form__checkbox-name">Короткометражки</p>
      </div>
    </section>
  );
}
