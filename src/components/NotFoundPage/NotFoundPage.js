import React from "react";

import "./NotFoundPage.css";

export default function NotFoundPage() {

  return(
    <section className="not-found-page">
      <div className="not-found-page__container">
        <h1 className="not-found-page__header">404</h1>
        <p className="not-found-page__text">Страница не найдена</p>
      </div>
      <button className="not-found-page__button" onClick={() => window.history.go(-1)}>Назад</button>
    </section>
  )
}