import BigNumber from 'bignumber.js';
import StartData from '../data/StartData.json';

interface StartDataInterface {
  [key: string]: any;
}

export function queryProductNew(
  data: any,
  type: string,
  productId: number | string,
) {
  const result: number[] = [];
  data?.forEach((obj: any) => {
    const startValue =
      parseInt((StartData as StartDataInterface)[type][productId]) || 0;

    if (obj[type][productId]) {
      const num = Math.abs(parseInt(obj[type][productId])) - startValue;
      let formattedNum = new BigNumber(num).dividedBy(1e18).toNumber();
      if (formattedNum < 0) {
        formattedNum = 0;
      }
      result.push(formattedNum);
    } else {
      result.push(0); // Push 0 if the property doesn't exist
    }
  });
  return result.reverse();
}
