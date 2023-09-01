import BigNumber from 'bignumber.js';
import StartData from '../data/StartData.json';

interface StartDataInterface {
  [key: string]: any;
}

export function queryAllFlows(
  data: any,
  type: string,
  products: any,
  prices: any,
) {
  const result: number[] = [];

  const productIds = products.map((product: any) => product.product_id);

  data?.forEach((obj: any) => {
    const keys = Object.keys(obj[type]).map(Number);
    let sum = 0;

    keys.forEach((key: number) => {
      const startValue =
        parseInt((StartData as StartDataInterface)[type][key.toString()]) || 0;

      if (productIds.includes(key)) {
        const price = prices[key];
        const value = Math.abs(parseInt(obj[type][key])) - Math.abs(startValue);
        const formattedVal = new BigNumber(value as number)
          .dividedBy(1e18)
          .toNumber();

        const DollarValue = formattedVal * price;
        sum += DollarValue;

        if (sum < 0) {
          sum = 0;
        }
      }
    });
    result.push(sum as number);
  });

  return result.reverse();
}
