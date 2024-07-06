export function fixed(amount, decimals = 2) {
  return amount ? amount.toFixed(decimals) : 0;
}
