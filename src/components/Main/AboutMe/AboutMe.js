import React from "react";
import { Link } from "react-router-dom";

import "./AboutMe.css";
import BlockHeader from "../BlockHeader/BlockHeader";
import photo from "../../../images/user-photo.jpg";

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <BlockHeader titleName="Студент" />
        <div className="about-me__info-container">
          <div className="about-me__info-container-data">
            <h3 className="about-me__name">Марк</h3>
            <h4 className="about-me__subtitle">Фронтенд-разработчик, 27 лет</h4>
            <p className="about-me__info">
              Я родился и живу в Москве, закончил юридический факультет НИУ ВШЭ.
              Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал
              кодить. С 2017 года работал в сфере правового консалтинга и
              внутренним юрисконсультом. После того, как прошёл курс по
              веб-разработке, мечтаю найти своё место в сфере IT.
            </p>

            <ul className="about-me__contact">
              <li>
                <a
                  className="about-me__contact-source"
                  href="https://github.com/MarkPolitiko"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <img
            className="about-me__photo"
            src={photo}
            alt="Фотография разработчика"
          />
        </div>
      </div>
      <div className="about-me__portfolio">
        <h4 className="about-me__subtitle about-me__subtitle_portfolio">
          Портфолио
        </h4>
        <ul className="about-me__sources">
          <li className="about-me__sources-element">
            <Link
              className="about-me__source"
              to={"https://github.com/MarkPolitiko/how-to-learn"}
              target="_blank"
            >
              <p className="about-me__source-text">Статичный сайт</p>
              <div className="about-me__source-arrow" />
            </Link>
          </li>
          <li className="about-me__sources-element">
            <Link
              className="about-me__source"
              to={"https://github.com/MarkPolitiko/russian-travel"}
              target="_blank"
            >
              <p className="about-me__source-text">Адаптивный сайт</p>
              <div className="about-me__source-arrow" />
            </Link>
          </li>
          <li className="about-me__sources-element">
            <Link
              className="about-me__source"
              to={"https://github.com/MarkPolitiko/react-mesto-api-full"}
              target="_blank"
            >
              <p className="about-me__source-text">Одностраничное приложение</p>
              <div className="about-me__source-arrow" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
