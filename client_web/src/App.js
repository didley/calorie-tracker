import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  AlertProvider,
  useAlertState,
  useAlertDispatch,
} from "./utils/alertContext";

import AddFoods from "./components/AddFoods";
import Diary from "./components/Diary";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import Alert from "./components/layout/Alert";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AlertProvider>
      <div className="bg-orange-100 min-h-screen">
        <NavBar />
        <Alert />
        <Switch>
          <Route path="/login">
            <Login setUser={setUser} setLoggedIn={setLoggedIn} />
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </AlertProvider>
  );
}
