import React, { useEffect, useState } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCard from "./MoviesCard/MoviesCard";
import { moviesDB } from "../../utils/constants";
import NavMenu from "../NavMenu/NavMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";

export default function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [notFoundMovies, setNotFound] = useState(false);
  const [isShortsChecked, setShortsChecked] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const saved = false;

  useEffect(() => {
    setMovies(props.movies);
    setNotFound(props.notFoundMovies);
    setIsLoading(props.isLoading);
  }, [props.movies, props.notFoundMovies, props.isLoading]);

  function handleSearch(searchValue) {
    setSearchValue(searchValue);
  }

  function handleSearchFilter(movies, filtered, searchValue) {
    const regExp = new RegExp(searchValue, "gi");

    return movies.filter((movie) => {
      if (filtered) {
        return movie.duration <= 40 && regExp.test(movie.nameRU);
      } else {
        return regExp.test(movie.nameRU);
      }
    });
  }

  function handleShortsCheck(evt) {
    const targetChecked = evt.target.checked;
    if (targetChecked) {
      const allMovies = JSON.parse(localStorage.getItem("movies"));
      const searchSavedResult = handleSearchFilter(
        allMovies,
        targetChecked,
        searchValue
      );
      setShortsChecked(true);
      if (searchSavedResult.length === 0) {
        setMovies([]);
        setIsLoading(false);
        setNotFound(true);
      } else {
        setMovies(searchSavedResult);
        setNotFound(false);
      }
    } else {
      const allMovies = JSON.parse(localStorage.getItem("movies"));
      const searchSavedResult = handleSearchFilter(
        allMovies,
        targetChecked,
        searchValue
      );
      setShortsChecked(false);
      if (searchSavedResult.length === 0) {
        setMovies([]);
        setIsLoading(false);
        setNotFound(true);
      } else {
        setMovies(searchSavedResult);
        setNotFound(false);
      }
    }
  }

  return (
    <section className="movies">
      <Header isLoggedIn={props.isLoggedIn} />
      <main className="main">
        <SearchForm
          onSearchMovies={props.onSearchMovies}
          onShortsCheck={handleShortsCheck}
          isShortsChecked={isShortsChecked}
          saved={saved}
          onSearch={handleSearch}
        />
        <MoviesCardList
          saved={saved}
          movies={movies}
          onMovieSave={props.onMovieSave}
          onDeleteMovie={props.onDeleteMovie}
          notFoundMovies={notFoundMovies}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </section>
  );
}
