import React, { useRef, useState, useContext, useEffect } from "react";

import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidation from "../../utils/handleValidation";
import NavMenu from "../NavMenu/NavMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Header from "../Header/Header";

export default function Profile(props) {

  //const toUppercase = (str) => (!str ? str : str[0].toUpperCase() + str.slice(1));

  const userNameRef = useRef("");
  const userEmailRef = useRef("");
  const [isDataRefreshed, setIsDataRefreshed] = useState(false);
  const { isValid, errors, values, handleChange } = useValidation({
    userName: userNameRef.current.value,
    userEmail: userEmailRef.current.value,
  });

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    userNameRef.current.value === currentUser.name &&
    userEmailRef.current.value === currentUser.email
      ? setIsDataRefreshed(false)
      : setIsDataRefreshed(true);
  }, [values.userName, values.userEmail, currentUser.email, currentUser.name]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onUpdateProfile({
        name: userNameRef.current.value,
        email: userEmailRef.current.value,
      });
    }
  }

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <main>
        <form className="profile" onSubmit={handleSubmit}>
          <div className="profile__container">
            <h2 className="profile__header">Привет, {currentUser.name}!</h2>
            <div className="profile__inputs-container">
              <label className="profile__label">
                Имя
                <input
                  type="text"
                  className="profile__input"
                  minLength="4"
                  maxLength="20"
                  placeholder="Введите имя"
                  name="userName"
                  id="userName"
                  ref={userNameRef}
                  defaultValue={currentUser.name}
                  onChange={(evt) => handleChange(evt)}
                  // readOnly={props.isLoading}
                  required
                />
              </label>
              <label className="profile__label">
                E-mail
                <input
                  type="email"
                  className="profile__input"
                  placeholder="Введите email"
                  name="userEmail"
                  id="userEmail"
                  ref={userEmailRef}
                  defaultValue={currentUser.email}
                  onChange={(evt) => handleChange(evt)}
                  // readOnly={props.isLoading} // or after required???
                  required
                />
              </label>
              <span
                className={`profile__error
             ${!isValid ? "profile__error_active" : /* null */ ""}`}
              >
                {errors?.userName}
                {errors?.userEmail}
              </span>
              <span
                className={`profile__message
             ${
               props.isProfileRefreshSuccess
                 ? "profile__message_success"
                 : "profile__message_active"
             }`}
              >
                {props.isProfileRefreshSuccess
                  ? `${props.profileMessage}`
                  : `${props.profileErrMessage}`}
              </span>
            </div>
            <div className="profile__buttons-container">
              <button
                className="profile__button"
                type="submit"
                disabled={!isValid || !isDataRefreshed}
                aria-label="Редактировать"
              >
                Редактировать
              </button>
              <button
                className="profile__button profile__button_red"
                type="submit"
                onClick={props.handleLogOut}
                aria-label="Выйти"
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
