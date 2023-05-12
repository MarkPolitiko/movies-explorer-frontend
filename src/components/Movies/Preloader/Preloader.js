import React from "react";

import "./Preloader.css";

export default function Preloader(props) {
  return (
    <>
      <span
        className={`preloader__notFound
        ${props.isNotFound ? "preloader__notFound_active" : /* null */ ""}`}
      >
        По запросу ничего не найдено
      </span>
      <div className={`preloader ${props.isLoading ? "preloader_active" : /* null */ ""}`}>
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
    </>
  );
}
