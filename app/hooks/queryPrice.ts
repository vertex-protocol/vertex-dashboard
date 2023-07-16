export function queryPrice(
  values: any,
  prices: any,
  productId: number | string,
) {
  const price = prices[productId];

  return values.map((deposit: number) => deposit * price);
}
