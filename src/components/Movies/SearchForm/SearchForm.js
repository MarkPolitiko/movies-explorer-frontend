import React, { useState, useEffect } from "react";

import useValidation from "../../../utils/handleValidation";
import { EMPTY_REQUEST_ERROR } from "../../../utils/constants";

import "./SearchForm.css";
import logo from "../../../images/search-logo.svg";
import Error from "../../Error/Error";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

export default function SearchForm(props) {

  const [movieSearch, setMovieSearch] = useState("");

  function handleValue(evt) {
    props.onSearch(evt.target.value);
  }

  function handleSearchChange(evt) {
    setMovieSearch(evt.target.value);
    props.onSearch(evt.target.value);
    handleValue(evt);
  }

  function handleSearchMovies(evt) {
    evt.preventDefault();
    props.onSearchMovies(movieSearch);
  }

  function handleSearchSavedMovies(evt) {
    evt.preventDefault();
    props.onSearchSavedMovies(movieSearch);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form
          className="search-form__main"
          name="form-search"
          id="search-form"
          onSubmit={props.saved ? handleSearchSavedMovies : handleSearchMovies}
        >
          <img src={logo} className="search-form__icon" alt="logo"></img>
          <input
            className="search-form__input"
            placeholder="Фильм"
            value={movieSearch || ""}
            onChange={handleSearchChange}
            type="text"
            name="movieSearch"
            id="movieSearch"
            required
          />
          <button type="submit" className="search-form__button"></button>
        </form>
      </div>
      <FilterCheckbox
        checkboxName="Короткометражки"
        onChange={props.onShortMoviesCheck}
        isChecked={props.isChecked}
        id="switchShortFilm"
      />
    </section>
  );
}
