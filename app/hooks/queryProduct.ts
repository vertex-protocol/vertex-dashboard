export function queryProduct(data: any, type: string, productId: number[]) {
  const result: number[] = [];

  data.forEach((obj: any) => {
    if (obj[type]) {
      if (productId.length > 1) {
        const sum = obj[type][productId[0]] + obj[type][productId[1]];
        result.push(sum);
      } else {
        const value = obj[type][productId[0]];
        result.push(value);
      }
    }
  });

  return result;
}
