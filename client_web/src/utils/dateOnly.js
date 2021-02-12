/**
 * Parses a date/time string to return an ISO date with time removed
 * @param {Date=} date - Optional date sting, today returned if not supplied
 * @returns {string} - Parsed date from date/time string
 */

export default function dateOnly(date) {
  if (date) {
    date = Date.parse(date);
    isNaN(date) ? (date = new Date()) : (date = new Date(date));
  } else {
    date = new Date();
  }
  return date.toISOString().substr(0, 10);
}
