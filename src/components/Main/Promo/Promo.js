import React from "react";

import "./Promo.css";
import PromoImage from "../../../images/promo-image.svg";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <div className="promo__text-container">
          <h1 className="promo__description">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button
            type="button"
            className="promo__button"
            aria-label="Узнать больше"
          >
            <a className="promo__about" href="#about-project">
              Узнать больше
            </a>
          </button>
        </div>
        <img className="promo__image" src={PromoImage} alt="Картинка планеты" />
      </div>
    </section>
  );
}
