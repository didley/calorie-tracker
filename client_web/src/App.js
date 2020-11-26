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

export default function App() {
  return (
    <AlertState>
      <AuthState>
        <div className="bg-orange-100 min-h-screen">
          <NavBar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/diary" component={Diary} />
            <Route path="/addFoods" component={AddFoods} />
            <Route path="*" component={NoMatch404} />
          </Switch>
        </div>
      </AuthState>
    </AlertState>
  );
}
