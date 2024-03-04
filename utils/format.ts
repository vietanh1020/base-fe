export function formatNumber(number = 0) {
  return number
    .toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    })
    .replace(/,/g, ".");
}
