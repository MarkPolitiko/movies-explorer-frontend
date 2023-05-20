import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) { 
  return (
    <Switch>
      <Route>
        {() =>
          props.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      </Route>
    </Switch>
  );
}
export default ProtectedRoute;