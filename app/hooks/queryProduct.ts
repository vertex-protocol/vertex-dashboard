export function queryProduct(data: any, type: string, productId: number[]) {
  const result: number[] = [];

  data.forEach((obj: any) => {
    if (obj[type]) {
      let sum = 0;

      productId.forEach((id: number) => {
        sum += obj[type][id];
      });

      result.push(sum);
    }
  });

  return result;
}
