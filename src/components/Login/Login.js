import React from "react";

import "./Login.css";
import EntryForm from "../EntryForm/EntryForm";
import useValidation from "../../utils/handleValidation";

export default function Login(props) {
  const { values, handleChange, errors, isValid } = useValidation({
    userEmail: "",
    userPassword: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onLogin({
        email: values.userEmail,
        password: values.userPassword,
      });
    }
  }

  return (
    <section className="login">
      <EntryForm
        header="Рады видеть!"
        questionText="Еще не зарегистрированы?"
        linkText=" Регистрация"
        url="/signup"
      >
        <form className="login__form" onSubmit={handleSubmit}>
          <label>
            <h3 className="login__form-header">E-mail</h3>
            <input
              className="login__input"
              type="email"
              name="userEmail"
              id="userEmail"
              value={values.email}
              onChange={(evt) => handleChange(evt)}
              /* readOnly={props.isLoading} */
              required
            />
            <span
              className={`login__error ${
                !isValid ? "login__error_active" : "" //null
              }`}
            >
              {errors?.userEmail}
            </span>
          </label>
          <label>
            <h3 className="login__form-header">Пароль</h3>
            <input
              className="login__input"
              type="password"
              name="userPassword"
              id="userPassword"
              value={values.password}
              onChange={(evt) => handleChange(evt)}
              minLength="4"
              /* readOnly={props.isLoading} */
              required
            />
            <span
              className={`login__error ${
                !isValid ? "login__error_active" : "" //null
              }`}
            >
              {errors?.userPassword}
            </span>
          </label>
          <span
            className={`login__error ${
              props.loginErr ? "login__error_active" : "" //null
            }`}
          >
            {props.loginErrMessage}
          </span>
          <button className="login__button" disabled={!isValid} type="submit">
            Войти
          </button>
        </form>
      </EntryForm>
    </section>
  );
}
