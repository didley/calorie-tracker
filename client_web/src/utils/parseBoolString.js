/**
 * Parses 'true' or 'false' strings to boolean values
 * @param {string} boolString - pass 'true' or 'false' strings
 * @param {boolean=} fallbackBool - Optional fallback boolean, if not supplied will return undefined
 * @returns {boolean}
 */
export const parseBoolString = (boolString, fallbackBool) => {
  if (boolString === true || false) return boolString;

  if (boolString === "true") {
    return true;
  } else if (boolString === "false") {
    return false;
  } else {
    console.error(
      `parseBoolString error, string not 'true' or 'false',
      boolString: ${boolString}`
    );
    if (fallbackBool === true) {
      return true;
    } else if (fallbackBool === false) {
      return false;
    } else {
      return;
    }
  }
};
