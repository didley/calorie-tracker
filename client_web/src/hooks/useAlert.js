import React, { useState, useContext, createContext } from "react";

const alertContext = createContext();

export function ProvideAlert({ children }) {
  const alert = useProvideAlert();
  return (
    <alertContext.Provider value={alert}>{children}</alertContext.Provider>
  );
}

export const useAlert = () => {
  return useContext(alertContext);
};

function useProvideAlert() {
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

  return {
    isLoading,
    setIsLoading,
    error,
    alert,
    setTimedAlert,
  };
}
