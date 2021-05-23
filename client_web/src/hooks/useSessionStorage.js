import React, { useState, useEffect, useCallback } from "react";

// export const useSessionStorage = (key, defaultValue) => {
//   const [stateValue, setStateValue] = useState(() => {
//     const sessionValue = window.sessionStorage.getItem(key);
//     return sessionValue ? JSON.parse(sessionValue) : defaultValue;
//   });

//   useEffect(() => {
//     const sessionValue = window.sessionStorage.getItem(key);

//     if (sessionValue !== null) {
//       setStateValue(JSON.parse(sessionValue));
//     } else {
//       window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
//       setStateValue(defaultValue);
//     }
//   }, [key, stateValue]);

//   const setSessionValue = (newValue) => {
//     window.sessionStorage.setItem(key, JSON.stringify(newValue));
//     setStateValue(newValue);
//   };

//   const sessionStorageClear = () => {
//     window.sessionStorage.clear();
//   };

//   return [stateValue, setSessionValue, sessionStorageClear];
// };

const getValueFromSessionStorage = (key, defaultValue) => {
  if (typeof sessionStorage === undefined) return defaultValue;

  const storedValue = sessionStorage.getItem(key) || defaultValue;

  try {
    return JSON.parse(storedValue);
  } catch (err) {
    console.error(err);
  }

  return storedValue;
};

const saveValueToSessionStorage = (key, valueToSet) => {
  if (typeof sessionStorage === undefined) return null;

  sessionStorage.setItem(key, JSON.stringify(valueToSet));
};

export const useSessionStorage = (key, defaultValue = null) => {
  const storedValue = getValueFromSessionStorage(key, defaultValue);

  const set = (newValue) => saveValueToSessionStorage(key, newValue);

  const clearSessionStorage = () => sessionStorage.clear();

  return [storedValue, set, clearSessionStorage];
};
