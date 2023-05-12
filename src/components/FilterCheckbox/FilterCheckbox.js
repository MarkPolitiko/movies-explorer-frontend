// import React from "react";
// import { useLocation } from "react-router-dom";

// import "./FilterCheckbox.css";

// export default function FilterCheckbox(props) {
//   const location = useLocation();

//   return (
//     <div className="checkbox">
//       <label className="checkbox__container" >
//         <input
//           className="checkbox__input"
//           type="checkbox"
//           onChange={props.onChange}
//           checked={location.pathname === '/movies' ? (props.isChecked ? true : false) : (props.savedIsChecked ? true : false)}/* {props.isChecked} */
//           id="short-films"
//         />
//         <span className="checkbox__span" />
//       </label>
//       <p className="checkbox__name">{props.checkboxName}</p>
//     </div>
//   );
// }
