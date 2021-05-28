import { useState, useEffect } from "react";

export const getValueFromSessionStorage = (key, defaultValue) => {
  if (typeof sessionStorage === undefined) return defaultValue;

  const storedValue = sessionStorage.getItem(key) || defaultValue;

  try {
    return JSON.parse(storedValue);
  } catch (err) {
    console.error(err);
  }

  return storedValue;
};

export const saveValueToSessionStorage = (key, valueToSet) => {
  if (typeof sessionStorage === undefined) return null;

  sessionStorage.setItem(key, JSON.stringify(valueToSet));
};

export const useSessionStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(
    getValueFromSessionStorage(key, defaultValue)
  );

  console.log({ value });

  useEffect(() => {
    setValue(getValueFromSessionStorage(key, defaultValue));
  }, [key]);

  const set = (valueToSet) => {
    console.log({ valueToSet });
    setValue(valueToSet);
    saveValueToSessionStorage(key, valueToSet);
  };

  const clearSessionStorage = () => sessionStorage.clear();

  return [value, set, clearSessionStorage];
};
