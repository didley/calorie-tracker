import React from "react";
import { Switch, Route } from "react-router-dom";

import AddFoods from "./components/addFoods";
import Diary from "./components/diary";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";

export default function App() {
  return (
    <div className="bg-orange-100 min-h-screen">
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/diary" component={Diary} />
        <Route path="/addFoods" component={AddFoods} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
