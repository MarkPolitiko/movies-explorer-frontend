import React from "react";

import "./Register.css";
import EntryForm from "../EntryForm/EntryForm";

export default function Register() {
  return (
    <section className="register">
      <EntryForm
        header="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        questionText="Уже зарегистрированы?"
        linkText=" Войти"
        url="/signin"
      >
        <form className="register__form">
          <label>
            <h3 className="register__form-header">Имя</h3>
            <input
              className="register__input"
              type="name"
              name="userName"
              required
            />
          </label>
          <label>
            <h3 className="register__form-header">E-mail</h3>
            <input
              className="register__input"
              type="email"
              name="userEmail"
              required
            />
          </label>
          <label>
            <h3 className="register__form-header">Пароль</h3>
            <input
              className="register__input"
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
