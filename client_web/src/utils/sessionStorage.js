export const getValueFromSessionStorage = (key, defaultValue) => {
  const setToDefaultValue = () => {
    const JSONDefaultValue = JSON.stringify(defaultValue);
    sessionStorage.setItem(key, JSON.stringify(defaultValue));
    return JSONDefaultValue;
  };

  if (typeof sessionStorage === undefined) setToDefaultValue();

  let storedValue = sessionStorage.getItem(key);
  if (storedValue === null && !defaultValue) return null;
  if (storedValue === null) storedValue = setToDefaultValue();

  try {
    return JSON.parse(storedValue);
  } catch (err) {
    console.error(
      `error in sessionStorage.js
      key: ${key}
      defaultValue: ${defaultValue}`,
      err
    );
  }

  return storedValue;
};

export const saveValueToSessionStorage = (key, valueToSet) => {
  if (typeof sessionStorage === undefined) return null;

  sessionStorage.setItem(key, JSON.stringify(valueToSet));
};

export const removeKeyFromSessionStorage = (keyName) => {
  sessionStorage.removeItem(keyName);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};
