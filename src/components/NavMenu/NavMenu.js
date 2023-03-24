import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./NavMenu.css";
import logo from "../../images/logo.svg";

export default function NavMenu({ setIsOpened }) {
  function handleOpen() {
    setIsOpened(true);
  }

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
      <button
        onClick={handleOpen}
        type="menu"
        className="nav-menu__burger"
      ></button>
    </nav>
  );
}
