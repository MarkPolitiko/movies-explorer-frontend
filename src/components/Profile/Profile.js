import React, { useState } from "react";

import "./Profile.css";
import NavMenu from "../NavMenu/NavMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Profile({ setMenuOpened, menuOpened, menuClosed }) {
  const [userName, setUserName] = useState("Марк");
  const [userEmail, setUserEmail] = useState("politikomark@yandex.ru");

  return (
    <section className="profile">
      <NavMenu setIsOpened={setMenuOpened} />
      <div className="profile__container">
        <h2 className="profile__header">Привет, {userName}!</h2>
        <div className="profile__inputs-container">
          <label className="profile__label">
            Имя
            <input
              type="text"
              className="profile__input"
              minLength="4"
              maxLength="20"
              placeholder={userName}
              name="userName"
              required
            />
          </label>
          <label className="profile__label">
            E-mail
            <input
              type="email"
              className="profile__input"
              placeholder={userEmail}
              name="userEmail"
              required
            />
          </label>
        </div>
        <div className="profile__buttons-container">
          <button
            className="profile__button"
            type="submit"
            aria-label="Редактировать"
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_red"
            type="submit"
            aria-label="Выйти"
          >
            Выйти из аккаунта
          </button>
        </div>
        <BurgerMenu isOpened={menuOpened} menuClosed={menuClosed} />
      </div>
    </section>
  );
}
