import React, { useEffect, useState } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList(props) {

  useEffect(() => {
    window.addEventListener("resize", handleWidth);
  }, []);

  const [cardsAmount, setCardsAmount] = useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 480) {
      return 5;
    } else if (windowWidth <= 768) {
      return 8;
    } else if (windowWidth < 1280) {
      return 12;
    } else if (windowWidth > 1280) {
      return 12;
    }
  });
  const [addedCards] = useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 768) {
      return 2;
    } else if (windowWidth >= 768 + 1) {
      return 3;
    }
  });

  function handleWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 480) {
      return 5;
    } else if (windowWidth <= 768) {
      return 8;
    } else if (windowWidth < 1280) {
      return 12;
    } else if (windowWidth > 1280) {
      return 12;
    }
  }

  const showMovies = props.movies?.slice(0, cardsAmount);

  function handleMoviesAddition() {
    setCardsAmount((prevState) => {
      return prevState + addedCards;
    });
  }

  return (
    <section className="movies-card-list">
      {props.isLoading && <Preloader />}
      {props.MoviesnotFound && <span>Ничего не найдено</span>}
      <ul className="movies-card-list__table">
        {showMovies?.map((movie) => (
          <MoviesCard
            key={props.saved ? movie._id : movie.id}
            movie={movie}
            saved={movie.saved}
            onMovieSave={props.onMovieSave}
            onDeleteMovie={props.onDeleteMovie}
          />
        ))}
      </ul>
      <button
        type="button"
        onClick={handleMoviesAddition}
        className={
          props.saved
            ? "button__more button__more_hidden"
            : `button__more ${
                props.movies?.length === showMovies?.length
                  ? "button__more_hidden"
                  : ""
              }`
        }
        aria-label="Еще фильмы"
      >
        Ещё
      </button>
    </section>
  );
}
