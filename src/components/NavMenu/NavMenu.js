import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import "./NavMenu.css";
import logo from "../../images/logo.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function NavMenu() {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  function openBurgerMenu() {
    setIsBurgerMenuOpened(true);
  }

  function closeBurgerMenu() {
    setIsBurgerMenuOpened(false);
  }

  useEffect(() => {
    const closeOnEsc = (evt) => {
      if (evt.keyCode === 27) {
        closeBurgerMenu();
      }
    };
    document.addEventListener("keydown", closeOnEsc);
    return () => document.removeEventListener("keydown", closeOnEsc);
  }, []);

  return (
    <nav className="nav-menu">
      <Link to="/" className="logo nav-menu__logo">
        <img src={logo} alt="Movie Explorer logo" />
      </Link>
      <div className="nav-menu__container">
        <NavLink to="/movies" className="nav-menu__element">
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className="nav-menu__element">
          Сохраненные фильмы
        </NavLink>
      </div>
      <div className="nav-menu__account-container">
        <Link to="/profile" className="nav-menu__account">
          Аккаунт
        </Link>
      </div>
      <BurgerMenu
        isOpened={isBurgerMenuOpened}
        onBurgerMenuClick={openBurgerMenu}
        onClose={closeBurgerMenu}
      />
    </nav>
  );
}
