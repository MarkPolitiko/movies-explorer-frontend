import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/components/App/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ErrorBoundary> */}
        <App />
      {/* </ErrorBoundary> */}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
