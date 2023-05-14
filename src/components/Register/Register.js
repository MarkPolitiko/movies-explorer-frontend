import React from "react";

import "./Register.css";
import EntryForm from "../EntryForm/EntryForm";
import useValidation from "../../utils/handleValidation";

export default function Register(props) {
  const { values, handleChange, errors, isValid } = useValidation({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onRegister({
        name: values.userName,
        email: values.userEmail,
        password: values.userPassword,
      });
    }
  }

  return (
    <section className="register">
      <EntryForm
        header="Добро пожаловать!"
        questionText="Уже зарегистрированы?"
        linkText=" Войти"
        url="/signin"
      >
        <form className="register__form" onSubmit={handleSubmit}>
          <label>
            <h3 className="register__form-header">Имя</h3>
            <input
              className="register__input"
              type="text"
              name="userName"
              id="userName"
              placeholder="Имя"
              value={values.name}
              onChange={(evt) => handleChange(evt)}
              minLength="2"
              maxLength="20"
              readOnly={props.isLoading}
              required
            />
          </label>
          <span
            className={`register__notice
             ${!isValid ? "register__notice_active" : ""}`}
          >
            {errors?.userName}
          </span>

          <label>
            <h3 className="register__form-header">E-mail</h3>

            <input
              className="register__input"
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Эл.почта"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={values.email}
              onChange={(evt) => handleChange(evt)}
              readOnly={props.isLoading}
              required
            />
          </label>
          <span
            className={`register__notice
             ${!isValid ? "register__notice_active" : ""}`}
          >
            {errors?.userEmail}
          </span>

          <label>
            <h3 className="register__form-header">Пароль</h3>

            <input
              className="register__input"
              type="password"
              name="userPassword"
              id="userPassword"
              placeholder="Пароль не менее 4 символов"
              value={values.password}
              onChange={(evt) => handleChange(evt)}
              minLength="4"
              maxLength="20"
              readOnly={props.isLoading}
              required
            />
          </label>
          <span
            className={`register__notice
             ${!isValid ? "register__notice_active" : ""}`}
          >
            {errors?.userPassword}
          </span>

          <span
            className={`register__notice
             ${
               props.isRegSuccess
                 ? "register__notice_success"
                 : "register__notice_active"
             }`}
          >
            {props.isRegSuccess
              ? `${props.resMessage}`
              : `${props.regErrMessage}`}
          </span>
          <button
            className="register__button"
            disabled={!isValid}
            type="submit"
            aria-label="Зарегистрироваться"
          >
            Зарегистрироваться
          </button>
        </form>
      </EntryForm>
    </section>
  );
}
