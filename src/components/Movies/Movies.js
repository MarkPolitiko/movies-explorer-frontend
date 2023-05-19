import React from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Preloader from "./Preloader/Preloader";

export default function Movies(props) {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <section className="movies">
        <main className="main">
          <SearchForm
            onSearchMovies={props.onSearchMovies}
            onShortsSwitch={props.onShortsSwitch}
            isChecked={props.isChecked}
            previousMovieSearch={props.previousMovieSearch}
          />
          {props.isLoading ? (
            <Preloader isLoading={props.isLoading} />
          ) : (
            <MoviesCardList
              isLoading={props.isLoading}
              movies={props.movies}
              button={props.button}
              onMovieSave={props.onMovieSave}
              onDeleteMovie={props.onDeleteMovie}
              savedMovies={props.savedMovies}
            />
          )}
          <button
            className={`movies__add-button ${
              props.moreMovies ? "movies__add-button_active" : ""
            }`}
            type="button"
            onClick={props.showMore}
            aria-label="Показать ещё фильмы"
          >
            Ещё
          </button>
          <span
            className={`preloader__notFound
        ${props.isNotFound ? "preloader__notFound_active" : ""}`}
          >
            По запросу ничего не найдено
          </span>
        </main>
        <Footer />
      </section>
    </>
  );
}
