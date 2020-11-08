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
  const [alert, setAlert] = useState("");
  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const loadingSpinner = (
    <div className="bg-white">
      <h1 className="text-center text-gray-900">
        <i className="animate-spin fas fa-circle-notch fa-sm m-1" />
      </h1>
    </div>
  );

  const alertDisplay = (
    <div className="flex flex-row bg-blue-500 pl-5">
      <div className="py-1">
        <p className="text-white text-sm pl-2">{alert}</p>
      </div>
    </div>
  );

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

  function setError(error) {
    console.log(error);
    if (error.message) {
      error = error.message;
    }
    const errString = JSON.stringify(error);
    const newState = [errString, ...errors];
    setErrors(newState);
    setTimeout(() => {
      setErrors([]);
    }, 5000);
  }

  function setTimedAlert(alert) {
    setAlert(alert);

    setTimeout(() => {
      setAlert("");
    }, 3000);
  }

  return (
    <div className="bg-orange-100 min-h-screen">
      <NavBar setIsLoading={setIsLoading} setError={setError} />
      {isLoading && loadingSpinner}
      {alert && alertDisplay}
      {errors.length > 0 && errorsDisplay}
      <Switch>
        <Route path="/login">
          <Login
            setIsLoading={setIsLoading}
            setError={setError}
            setUser={setUser}
            setLoggedIn={setLoggedIn}
            setTimedAlert={setTimedAlert}
          />
        </Route>
        <Route path="/register">
          <Register setIsLoading={setIsLoading} setError={setError} />
        </Route>
        <Route path="/diary">
          <Diary setIsLoading={setIsLoading} setError={setError} />
        </Route>
        <Route path="/addFoods">
          <AddFoods
            setTimedAlert={setTimedAlert}
            setIsLoading={setIsLoading}
            setError={setError}
          />
        </Route>
        <Route path="/">
          <Home setIsLoading={setIsLoading} setError={setError} />
        </Route>
      </Switch>
    </div>
  );
}
