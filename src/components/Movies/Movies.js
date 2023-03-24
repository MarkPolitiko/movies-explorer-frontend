import React from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCard from "./MoviesCard/MoviesCard";
import { moviesDB } from "../../utils/constants";
import NavMenu from "../NavMenu/NavMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";


export default function Movies({ setMenuOpened, menuOpened, menuClosed }) {
  return (
    <section className="movies">
      <NavMenu setIsOpened={setMenuOpened} />
      <SearchForm />
      <ul className="movies__table">
        {moviesDB.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              nameRU={movie.nameRU}
              duration={movie.duration}
              image={movie.image}
              block="general"
            />
          );
        })}
      </ul>
      <button type="button" className="button__more" aria-label="Еще фильмы">
        Ещё
      </button>
      <BurgerMenu isOpened={menuOpened} menuClosed={menuClosed} />
      <Footer />
    </section>
  );
}
