import React from "react";

import "./SavedMovies.css";
import NavMenu from "../NavMenu/NavMenu";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";

import { savedMoviesDB } from "../../utils/constants";

export default function SavedMovies({
  setMenuOpened, menuOpened, menuClosed
}) {
  return (
    <section className="saved-movies">
      <NavMenu setIsOpened={setMenuOpened} />
      <SearchForm />
      <ul className="saved-movies__table">
        {savedMoviesDB.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              nameRU={movie.nameRU}
              duration={movie.duration}
              image={movie.image}
              block="saved"
            />
          );
        })}
      </ul>
      <BurgerMenu isOpened={menuOpened} menuClosed={menuClosed} />
      <Footer />
    </section>
  );
}
