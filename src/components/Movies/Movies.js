import React from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Preloader from "./Preloader/Preloader";

export default function Movies(props) {
  return (
    <section className="movies">
      <Header isLoggedIn={props.isLoggedIn} />
      <main className="main">
        <SearchForm
          onSearchMovies={props.onSearchMovies}
          onShortsSwitch={props.onShortsSwitch}
          isChecked={props.isChecked}
          previousMovieSearch={props.previousMovieSearch}
        />
        {props.isLoading ? (
          <Preloader
            isLoading={props.isLoading}
            isNotFound={props.isNotFound}
          />
        ) : (
          <MoviesCardList
            movies={props.movies}
            button=/* "movies-card__save-button" */ {props.button} // DOUBLECHECK
            onMovieSave={props.onMovieSave}
            onDeleteMovie={props.onDeleteMovie}
            savedMovies={props.savedMovies}
          />
        )}
        <button
          className={`movies__add-button ${
            props.moreMovies ? "movies__add-button_active" : "" //null
          }`}
          type="button"
          onClick={props.showMore}
          aria-label="Показать ещё фильмы"
        >
          Ещё
        </button>
      </main>
      <Footer />
    </section>
  );
}
