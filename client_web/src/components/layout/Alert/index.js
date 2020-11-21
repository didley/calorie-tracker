import React, { useState } from "react";

import LoadingSpinner from "./LoadingSpinner";
import AlertDisplay from "./AlertDisplay";
import ErrorsDisplay from "./ErrorsDisplay";

export default function Alert() {
  const [alert, setAlert] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div>
      {isLoading && <LoadingSpinner />}
      {alert && <AlertDisplay />}
      {errors.length > 0 && <ErrorsDisplay errors={errors} />}
    </div>
  );
}
