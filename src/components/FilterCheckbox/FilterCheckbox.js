import React from "react";

import "./FilterCheckbox.css";

export default function FilterCheckbox(props) {
  return (
    <div className="checkbox">
      <label className="checkbox__container" >
        <input
          className="checkbox__input"
          type="checkbox"
          onChange={props.onChange}
          checked={props.isChecked}
          id="short-films"
        />
        <span className="checkbox__span" />
      </label>
      <p className="checkbox__name">{props.checkboxName}</p>
    </div>
  );
}
