import React from "react";

import "./SearchForm.css";
import logo from "../../../images/search-logo.svg";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__main">
          <img src={logo} className="search-form__icon" alt="logo"></img>
          <input
            className="search-form__input"
            placeholder="Фильм"
            type="text"
            required
          />
          <button type="submit" className="search-form__button"></button>
        </form>
      </div>
      <FilterCheckbox checkboxName="Короткометражки" />
    </section>
  );
}
