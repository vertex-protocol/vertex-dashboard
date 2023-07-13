import BigNumber from 'bignumber.js';

export function queryAllTVL(data: any, prices: any, products: any) {
  const result: number[] = [];
  const datas = data.snapshots;

  const productIds = products.map((product: any) => product.product_id);

  datas.forEach((obj: any) => {
    let sum = 0;
    const keys = Object.keys(obj['total_deposits']).map(Number);
    keys.forEach((key: number) => {
      if (productIds.includes(key)) {
        const price = prices[key];

        const DepositValue =
          new BigNumber(obj['total_deposits'][key]).dividedBy(1e18).toNumber() *
          price;

        const BorrowValue =
          new BigNumber(obj['total_borrows'][key]).dividedBy(1e18).toNumber() *
          price;

        const productTVL = DepositValue - BorrowValue;

        sum += productTVL;
      }
    });
    result.push(sum as number);
  });
  return result.reverse();
}
