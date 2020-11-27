import React from "react";
import { Switch, Route } from "react-router-dom";

import AlertState from "context/alert/AlertState";
import AuthState from "context/auth/AuthState";

import AddFoods from "./components/AddFoods";
import Diary from "./components/Diary";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import Alert from "./components/layout/Alert";
import NoMatch404 from "./components/layout/NoMatch404";
import { ProvideAuth } from "hooks/useAuth";

export default function App() {
  return (
    <AlertState>
      <AuthState>
        <ProvideAuth>
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
              <Route path="/diary">
                <Diary />
              </Route>
              <Route path="/addFoods">
                <AddFoods />
              </Route>
              <Route path="*">
                <NoMatch404 />
              </Route>
            </Switch>
          </div>
        </ProvideAuth>
      </AuthState>
    </AlertState>
  );
}
