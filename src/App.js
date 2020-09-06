import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddFoods from "./components/AddFoods";
import Diary from "./components/Diary";
import NavBar from "./components/layout/NavBar";

// style={{ background: "#faf7f4", height: "100vh" }}

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
