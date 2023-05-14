import React from "react";
import { Link } from "react-router-dom";

import "./BurgerMenu.css";
import closeButton from "../../images/close-button.svg";

export default function BurgerMenu(props) {
  return (
    <>
      <button
        onClick={props.onBurgerMenuClick}
        type="menu"
        className="nav-menu__burger"
        aria-label="Открыть меню"
      ></button>
      <div className={props.isOpened ? "burger-menu" : "burger-menu_hidden"}>
        <div className="burger-menu__container">
          <div className="burger-menu__shadow"></div>
          <nav className="burger-menu__nav-container">
            <button
              className="burger-menu__close-button"
              type="button"
              area-label="Закрыть меню"
              onClick={props.onClose}
            >
              <img src={closeButton} alt="closeButton" />
            </button>
            <ul className="burger-menu__elements">
              <li className="burger-menu__element">
                <Link to="/" className="burger-menu__link">
                  Главная
                </Link>
              </li>
              <li className="burger-menu__element">
                <Link to="/movies" className="burger-menu__link">
                  Фильмы
                </Link>
              </li>
              <li className="burger-menu__element">
                <Link to="/saved-movies" className="burger-menu__link">
                  Сохраненные фильмы
                </Link>
              </li>
            </ul>
            <div className="burger-menu__account-element">
              <Link to="/profile" className="burger-menu__link">
                Аккаунт
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
