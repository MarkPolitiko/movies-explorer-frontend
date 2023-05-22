import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../images/logo.svg";
import NavMenu from "../NavMenu/NavMenu";

export default function Header({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? (
        <header className="header">
          <NavMenu />
        </header>
      ) : (
        <header className="header">
          <div className="header__container">
            <Link to="/" className="logo entry__header">
              <img src={logo} alt="Movie Explorer logo" />
            </Link>
            <div className="header__links">
              <Link to="/signup" className="header__link header__link-register">
                Регистрация
              </Link>
              <Link to="/signin" className="header__link header__link-enter">
                Войти
              </Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
