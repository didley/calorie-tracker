import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "hooks/useAuth";

export default function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  if (auth.checkingLoggedIn) return <div>Loading...</div>;

  return (
    <Route
      {...rest}
      render={() =>
        auth.user ? children : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
}
