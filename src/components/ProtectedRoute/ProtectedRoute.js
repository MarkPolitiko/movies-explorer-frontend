import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Switch>
      <Route>
        {() =>
          props.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      </Route>
    </Switch>
  );
}
