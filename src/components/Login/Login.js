import React from "react";

import "./Login.css";
import EntryForm from "../EntryForm/EntryForm";

export default function Login() {

  return (
    <section className="login">
      <EntryForm
        header="Рады видеть!"
        buttonText="Войти"
        questionText="Еще не зарегистрированы?"
        linkText=" Регистрация"
        url="/signup"
      >
        <form className="login__form">
          <label>
            <h3 className="login__form-header">E-mail</h3>
            <input
              className="login__input"
              type="email"
              name="userEmail"
              required
            />
          </label>
          <label>
            <h3 className="login__form-header">Пароль</h3>
            <input
              className="login__input"
              type="password"
              name="userPassword"
              required
            />
          </label>
        </form>
      </EntryForm>
    </section>
  );
}
