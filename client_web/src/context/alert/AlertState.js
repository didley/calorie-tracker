import React, { useState } from "react";

import AlertContext from "./alertContext";

const AlertState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  function setTimedAlert(alertType, msg, time = 3000) {
    setIsLoading(false);
    if (alertType === "error") {
      console.log("timedAlert Err output", msg);
      setError(JSON.stringify(msg.message));
    } else if (alertType === "alert") {
      setAlert(msg);
    } else {
      setAlert(
        "First parameter of of setTimedAlert must be 'error' or 'alert' as a string"
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
