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
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  function clearAlerts() {
    setError(null);
    setAlert(null);
  }

  function setTimedAlert(alertType, msg, time = 3000) {
    setIsLoading(false);
    if (alertType === "error") {
      console.log("timedAlert Err output", msg);
      setError(JSON.stringify(msg.message));
    } else if (alertType === "alert") {
      console.log("timedAlert Alert output", msg);
      setAlert(msg);
    } else {
      setAlert(
        "First parameter of of setTimedAlert must be 'error' or 'alert' as a string"
      );
    }

    setTimeout(() => {
      clearAlerts();
    }, time);
  }

  return {
    isFetching,
    setIsFetching,
    isLoading,
    setIsLoading,
    error,
    alert,
    clearAlerts,
    setTimedAlert,
  };
}
