import React from "react";

import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

export default function SavedMovies(props) {

  return (

    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <main className="saved-movies">
        <SearchForm
          onSavedMoviesSearch={props.onSearchMovies}
          onShortsCheck={props.onShortsCheck}
          onShortsSwitch={props.onShortsSwitch}
          // isShortsChecked={isShortsChecked}
          savedIsChecked={props.savedIsChecked}
        />
        {props.isLoading ? (
          <Preloader isLoading={props.isLoading} isNotFound={props.isNotFound}/>
        ) : (
        <MoviesCardList
          movies={props.movies}
          button={"saved-movies__delete-button"} /* {props.button} */ // DOUBLECHECK
          onDeleteMovie={props.onDeleteMovie}
          savedMovies={props.savedMovies}
        />
        )}
      </main>
      <Footer />
    </>
  );
}
