import React from "react";

import "./Preloader.css";

export default function Preloader(props) {
  return (
    <div className="preloader">
      <div className="preloader-container">
        <span className="preloader__picture"></span>
      </div>
    </div>
  );
}
