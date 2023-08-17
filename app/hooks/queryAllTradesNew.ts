import StartData from '../data/StartData.json';

interface StartDataInterface {
  [key: string]: any;
}

export function queryAllTradesNew(data: any, type: string, products: any) {
  const result: number[] = [];

  const productIds = products.map((product: any) => product.product_id);

  data?.forEach((obj: any) => {
    const keys = Object.keys(obj[type]).map(Number);
    let sum = 0;

    keys.forEach((key: number) => {
      const startValue =
        parseInt((StartData as StartDataInterface)[type][key.toString()]) || 0;

      if (productIds.includes(key)) {
        const value = parseInt(obj[type][key]);
        sum += value - startValue;

        if (sum < 0) {
          sum = 0;
        }
      }
    });

    result.push(sum as number);
  });

  return result.reverse();
}
