/**
 * Replaces all values of passed object that are null or undefined with replaceValue
 * @param {object} objectToReplace
 * @param {*=} replaceValue - Optional value to replace with, defaults to an empty string
 * @returns {object}
 */
export const replaceNull = (objectToReplace, replaceValue = "") => {
  const replacer = (_key, value) =>
    value === null || value === undefined ? replaceValue : value;

  return JSON.parse(JSON.stringify(objectToReplace, replacer));
};
