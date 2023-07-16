import BigNumber from 'bignumber.js';

export function queryProduct(
  data: any,
  type: string,
  productId: number | string,
) {
  const result: number[] = [];
  data?.snapshots.forEach((obj: any) => {
    if (obj[type][productId]) {
      const num = Math.abs(parseInt(obj[type][productId]));
      const formattedNum = new BigNumber(num).dividedBy(1e18).toNumber();
      result.push(formattedNum);
    } else {
      result.push(0); // Push 0 if the property doesn't exist
    }
  });
  return result.reverse();
}
