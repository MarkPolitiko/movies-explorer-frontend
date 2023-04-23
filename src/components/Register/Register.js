import React from "react";

import "./Register.css";
import EntryForm from "../EntryForm/EntryForm";
import useValidation from "../../utils/handleValidation";
import Error from "../Error/Error";

export default function Register(props) {
  const { values, handleChange, resetForm, errors, isValid } = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props
        .onRegister({
          name: values.userName,
          email: values.userEmail,
          password: values.userPassword,
        })
        /* .then(resetForm); */
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
            <h3 className="register__form-header" htmlFor="userName">
              Имя
            </h3>
          </label>
          <input
            className="register__input"
            type="text"
            name="userName"
            id="userName"
            value={values.userName || ""}
            onChange={(evt) => handleChange(evt)}
            readOnly={props.isLoading}
            minLength="2"
            maxLength="20"
            pattern="[а-яА-Яёa-zA-Z\s-]{2,20}"
            required
          />
          <span
            className={`register__error
             ${!isValid ? "register__error_active" : null}`}
          >
            {errors?.userName}
          </span>

          <label>
            <h3 className="register__form-header">E-mail</h3>
          </label>
          <input
            className="register__input"
            type="email"
            name="userEmail"
            id="userEmail"
            value={values.userEmail || ""}
            onChange={(evt) => handleChange(evt)}
            readOnly={props.isLoading}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
          />
          <span
            className={`register__error
             ${!isValid ? "register__error_active" : null}`}
          >
            {errors?.userEmail}
          </span>

          <label>
            <h3 className="register__form-header">Пароль</h3>
          </label>
          <input
            className="register__input"
            type="password"
            name="userPassword"
            id="userPassword"
            value={values.userPassword || ""}
            onChange={(evt) => handleChange(evt)}
            minLength="4"
            maxLength="20"
            readOnly={props.isLoading}
            required
          />
          <span
            className={`register__error
             ${!isValid ? "register__error_active" : null}`}
          >
            {errors?.userPassword}
          </span>
          <button
            className="register__button"
            disabled={!isValid}
            type="submit"
          >
            Зарегистрироваться
          </button>
          {/* <span
            className={`register__error
             ${props.isSuccess ? "register__error_active-success" : null}`}
          >
            {props.isSuccess
              ? `${props.profileMessage}`
              : `${props.errorMessage}`}
          </span> */}
          <span className="register__error">{props.errorMessage}</span>
        </form>
      </EntryForm>
    </section>
  );
}
