/**
 * Returns passed Calorie value as Kilojoule value
 * @param {number} calValue
 * @param {number=} decimals - optional decimal place amount
 * @returns {number}
 */
export const toKJ = (calValue, decimals) => {
  const kjVal = calValue * 4.184;
  return parseFloat(kjVal.toFixed(decimals));
};

/**
 * Returns passed Kilojoule value as Calorie value
 * @param {number} kJValue
 * @param {number=} decimals - optional decimal place amount
 * @returns {number}
 */
export const toCal = (kJValue, decimals) => {
  const calVal = kJValue / 4.184;
  return parseFloat(calVal.toFixed(decimals));
};
