import React from "react";
import { Switch, Route } from "react-router-dom";

import AddFoods from "./components/addFoods";
import Diary from "./components/diary";
import NavBar from "./components/layout/NavBar";

export default function App() {
  return (
    <div className="bg-orange-100 min-h-screen">
      <NavBar />
      <div>
        <Switch>
          <Route path="/diary">
            <Diary />
          </Route>
          <Route path="/addFoods">
            <AddFoods />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
