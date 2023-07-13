export function queryTVL(
  deposits: any,
  prices: any,
  productId: number | string,
) {
  const price = prices[productId];

  return deposits.map((deposit: number) => deposit * price);
}
