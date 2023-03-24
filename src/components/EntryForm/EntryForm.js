import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./EntryForm.css";
import logo from "../../images/logo.svg";

export default function EntryForm({
  header,
  children,
  buttonText,
  questionText,
  url,
  linkText,
}) {
  return (
    <section className="entry-form">
      <div className="entry-form__logo">
        <Link to="/">
          <img src={logo} alt="Movie Explorer logo" />
        </Link>
      </div>
      <h1 className="entry-form__header">{header}</h1>
      <div className="entry-form__container">{children}</div>
      <div className="entry-form__confirm-container">
        <button className="entry-form__button" type="submit">
          {buttonText}
        </button>
        <NavLink to={url} className="entry-form__caption-container">
          <p className="entry-form__question">{questionText}</p>
          <span className="entry-form__text">{linkText}</span>
        </NavLink>
      </div>
    </section>
  );
}
