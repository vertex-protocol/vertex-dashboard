export function queryAllTrades(data: any, type: string, products: any) {
  const result: number[] = [];

  const productIds = products.map((product: any) => product.product_id);

  data?.snapshots.forEach((obj: any) => {
    const keys = Object.keys(obj[type]).map(Number);
    let sum = 0;

    keys.forEach((key: number) => {
      if (productIds.includes(key)) {
        const value = parseInt(obj[type][key]);
        sum += value;
      }
    });

    result.push(sum as number);
  });

  return result.reverse();
}
