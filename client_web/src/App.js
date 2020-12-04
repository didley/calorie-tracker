import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";

import AddFoods from "./components/AddFoods";
import Diary from "./components/Diary";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import Alert from "./components/layout/Alert";
import NoMatch404 from "./components/layout/NoMatch404";

import PrivateRoute from "components/routing/PrivateRoute";

import { useAuth } from "hooks/useAuth";

export default function App() {
  const auth = useAuth();

  useEffect(() => {
    // checks if user is logged in on App mount
    (async () => {
      await auth.isUserLoggedIn();
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-orange-100 min-h-screen">
      <NavBar />
      <Alert />
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
        <Route path="*">
          <NoMatch404 />
        </Route>
      </Switch>
      <ReactQueryDevtools />
    </div>
  );
}
