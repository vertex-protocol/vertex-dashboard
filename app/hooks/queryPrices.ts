import BigNumber from 'bignumber.js';

export function queryPrices(products: any | null) {
  if (!products) {
    return null;
  }
  const result: { [key: string]: number } = {};

  products.forEach((product: any) => {
    const { product_id, oracle_price_x18 } = product;
    result[product_id] = new BigNumber(oracle_price_x18)
      .dividedBy(1e18)
      .toNumber();
  });

  return result;
}
