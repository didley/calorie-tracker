export const toKJ = (calValue) => {
  const kjVal = calValue * 4.184;
  return parseFloat(kjVal.toFixed(1));
};
export const toCal = (kJValue) => {
  const calVal = kJValue / 4.184;
  return parseFloat(calVal.toFixed(1));
};
