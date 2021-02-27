/**
 * Returns a parsed query sting object
 * @example
 * parseQuery("?date=2020-11-06&task=Collect%20mail&location=post+office")
 * returns { date: '2020-11-06', task: 'Collect mail', location: 'post office' }
 *
 * @param {string} queryString - Query sting to be parsed
 * @returns {object} - Parsed query sting object
 */
export const parseQuery = (queryString) => {
  return Object.fromEntries(
    queryString
      .substring(1)
      .split("&")
      .map((q) => {
        const [key, value] = q.split("=");
        const parsedSpaces = value?.split("%20").join(" ").split("+").join(" ");
        return [key, parsedSpaces];
      })
  );
};
