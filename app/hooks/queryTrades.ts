import StartData from '../data/StartData.json';

interface StartDataInterface {
  [key: string]: any;
}

export function queryTrades(
  data: any,
  type: string,
  productId: number | string,
) {
  const result: number[] = [];
  const startValue =
    parseInt((StartData as StartDataInterface)[type][productId]) || 0;

  data?.snapshots.forEach((obj: any) => {
    if (obj[type][productId]) {
      let num = obj[type][productId] - startValue;
      if (num < 0) {
        num = 0;
      }
      result.push(num);
    } else {
      result.push(0);
    }
  });
  return result.reverse();
}
