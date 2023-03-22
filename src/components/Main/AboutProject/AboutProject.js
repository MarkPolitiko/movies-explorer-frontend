import React from "react";

import "./AboutProject.css";
import BlockHeader from "../BlockHeader/BlockHeader";

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <BlockHeader titleName="О проекте" />
      <ul className="about-project__info">
        <li className="about-project__info-element">
          <h3 className="about-project__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__info-element">
          <h3 className="about-project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__schedule">
        <p className="about-project__schedule_cell about-project__schedule_cell_black">1 неделя</p>
        <p className="about-project__schedule_cell about-project__schedule_cell_grey">4 недели</p>
        <p className="about-project__schedule_cell about-project__schedule_cell_tech">Back-end</p>
        <p className="about-project__schedule_cell about-project__schedule_cell_tech">Front-end</p>
      </div>
    </section>
  );
}
