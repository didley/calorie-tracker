import React from "react";
import { Switch, Route } from "react-router-dom";

import AddFoods from "./components/addFoods";
import Diary from "./components/diary";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Login from "./components/layout/Login";

export default function App() {
  return (
    <div className="bg-orange-100 min-h-screen">
      <NavBar />
      <div>
        <Switch>
          <Route path="/login">
            <Login />
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
    </div>
  );
}
