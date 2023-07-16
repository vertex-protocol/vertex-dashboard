import BigNumber from 'bignumber.js';

export function queryAllFlows(
  data: any,
  type: string,
  products: any,
  prices: any,
) {
  const result: number[] = [];

  const productIds = products.map((product: any) => product.product_id);

  data?.snapshots.forEach((obj: any) => {
    const keys = Object.keys(obj[type]).map(Number);
    let sum = 0;

    keys.forEach((key: number) => {
      if (productIds.includes(key)) {
        const price = prices[key];
        const value = Math.abs(parseInt(obj[type][key]));
        const formattedVal = new BigNumber(value as number)
          .dividedBy(1e18)
          .toNumber();

        const DollarValue = formattedVal * price;
        sum += DollarValue;
      }
    });
    result.push(sum as number);
  });

  return result.reverse();
}
