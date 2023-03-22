import React, { useState } from "react";

import "./MoviesCard.css";

export default function MoviesCard({
  isMovieSaved,
  nameRU,
  duration,
  img,
  block,
}) {
  const [isSaved, setIsSaved] = useState(isMovieSaved);

  const handleSaveMovie = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{duration}</p>
        </div>
        {block === "general" ? (
          <button
            className={`movies-card__save-button ${
              isSaved ? "movies-card__save-button_saved" : ""
            }`}
            type="button"
            onClick={handleSaveMovie}
          />
        ) : (
          <button className={"movies-card__delete-button"} type="button" />
        )}
      </div>
      <img className="movies-card__image" src={img} alt="Кадр из фильма" />
    </div>
  );
}
