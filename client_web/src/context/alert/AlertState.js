import React, { useState, useEffect } from "react";

import AlertContext from "./alertContext";

const AlertState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  function setTimedAlert(setFnName, msg, time = 3000) {
    if (setFnName === "setError") {
      setError(msg);
    } else if (setFnName === "setAlert") {
      setAlert(msg);
    } else {
      setAlert(
        "First parameter of of setTimedAlert must be 'setError' or 'setAlert' as a string"
      );
    }

    setTimeout(() => {
      setError(null);
      setAlert(null);
    }, time);
  }

  return (
    <AlertContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        alert,
        setTimedAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
