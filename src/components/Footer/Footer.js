import React from "react";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__text-container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
      </div>
      <div className="footer__copyrightAndSources">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__sources-container">
          <li className="footer__source">
            <a
              href="https://practicum.yandex.ru/"
              rel="noreferrer"
              className="footer__link"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__source">
            <a
              href="https://github.com/MarkPolitiko"
              rel="noreferrer"
              className="footer__link"
              target="_blank"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
