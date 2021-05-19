import React, { useState, useEffect } from "react";

export const useSessionStorage = (key, defaultValue) => {
  const [stateValue, setStateValue] = useState(() => {
    const sessionValue = window.sessionStorage.getItem(key);
    return sessionValue ? JSON.parse(sessionValue) : defaultValue;
  });

  useEffect(() => {
    const sessionValue = window.sessionStorage.getItem(key);

    if (sessionValue !== null) {
      setStateValue(JSON.parse(sessionValue));
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
      setStateValue(defaultValue);
    }
  }, [key, setStateValue]);

  const setSessionValue = (newValue) => {
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
    setStateValue(newValue);
  };

  const sessionStorageClear = () => {
    window.sessionStorage.clear();
  };

  return [stateValue, setSessionValue, sessionStorageClear];
};
