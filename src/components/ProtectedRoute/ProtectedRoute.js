import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Routes>
      <Route>
        {() =>
          props.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      </Route>
    </Routes>
  );
}
