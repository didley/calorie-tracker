export default function dateOnly(date) {
  return new Date(date).toISOString().substr(0, 10);
}
