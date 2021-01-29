import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { useAuth } from "hooks/useAuth";

import AddFoods from "./components/AddFoods";
import Diary from "./components/Diary";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import Alert from "./components/layout/Alert";
import NoMatch404 from "./components/layout/NoMatch404";
import Account from "./components/Account";
import Weight from "./components/Weight";
import ErrorBoundary from "./components/shared/ErrorBoundary";

import PrivateRoute from "components/routing/PrivateRoute";

export default function App() {
  const auth = useAuth();

  useEffect(() => {
    auth.isUserLoggedIn();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-orange-100 min-h-screen">
      <NavBar />
      <Alert />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/diary">
            <Diary />
          </PrivateRoute>
          <PrivateRoute path="/addFoods">
            <AddFoods />
          </PrivateRoute>
          <PrivateRoute path="/weight">
            <Weight />
          </PrivateRoute>
          <PrivateRoute path="/account">
            <Account />
          </PrivateRoute>
          <Route path="*">
            <NoMatch404 />
          </Route>
        </Switch>
      </ErrorBoundary>
    </div>
  );
}
