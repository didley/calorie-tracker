import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import AddFoods from "./components/addFoods";
import Diary from "./components/diary";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const errorsDisplay = (
    <div className="flex flex-row bg-red-600 pl-5">
      <div>
        <h3 className="text-white">Error</h3>
      </div>
      <div className="py-1">
        <p className="text-white text-xs pl-2">
          {errors[0]} <br />
          {errors[1]}
        </p>
      </div>
    </div>
  );

  const loadingSpinner = (
    <div className="bg-white">
      <h1 className="text-center">Loading...</h1>
    </div>
  );

  function setError(error) {
    const newState = [error, ...errors];
    setErrors(newState);

    setTimeout(() => {
      setErrors([]);
    }, 5000);
  }

  return (
    <div className="bg-orange-100 min-h-screen">
      <NavBar setIsLoading={setIsLoading} setError={setError} />
      {isLoading && loadingSpinner}
      {errors.length > 0 && errorsDisplay}
      <Switch>
        <Route path="/login">
          <Login setIsLoading={setIsLoading} setError={setError} />
        </Route>
        <Route path="/register">
          <Register setIsLoading={setIsLoading} setError={setError} />
        </Route>
        <Route path="/diary">
          <Diary setIsLoading={setIsLoading} setError={setError} />
        </Route>
        <Route path="/addFoods">
          <AddFoods setIsLoading={setIsLoading} setError={setError} />
        </Route>
        <Route path="/">
          <Home setIsLoading={setIsLoading} setError={setError} />
        </Route>
      </Switch>
    </div>
  );
}
