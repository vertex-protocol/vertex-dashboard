export function queryTrades(
  data: any,
  type: string,
  productId: number | string,
) {
  const result: number[] = [];
  data?.snapshots.forEach((obj: any) => {
    if (obj[type][productId]) {
      const num = obj[type][productId];
      result.push(num);
    } else {
      result.push(0); // Push 0 if the property doesn't exist
    }
  });
  return result.reverse();
}
