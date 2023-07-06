import BigNumber from 'bignumber.js';

export function queryTotal(data: any, type: string) {
  if (data === null || data === undefined) {
    return []; // or handle the null case appropriately
  }

  const result: string[] = [];

  for (const key in data) {
    const obj = data[key];
    obj.forEach((obj: any) => {
      const sum = Object.values(obj[type] || {}).reduce(
        (acc: number, val: unknown) => acc + parseInt(val as string),
        0,
      );
      const formattedSum = new BigNumber(sum).dividedBy(1e18).toFixed(0);
      result.push(formattedSum);
    });
  }

  return result.reverse();
}
