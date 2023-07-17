import BigNumber from 'bignumber.js';
import StartData from '../data/StartData.json';

interface StartDataInterface {
  [key: string]: any;
}

export function queryFees(data: any, products: any) {
  if (data === null || data === undefined) {
    return [];
  }

  const result: number[] = [];

  const productIds = products.map((product: any) => product.product_id);

  data?.snapshots.forEach((obj: any) => {
    const keys = Object.keys(obj['cumulative_taker_fees']).map(Number);
    let sum = 0;

    keys.forEach((key: number) => {
      const startValue =
        parseInt(
          (StartData as StartDataInterface)['cumulative_taker_fees'][
            key.toString()
          ],
        ) || 0;

      if (productIds.includes(key)) {
        const takerFees = parseInt(obj['cumulative_taker_fees'][key]);
        const seqFees = parseInt(obj['cumulative_sequencer_fees'][key]);

        sum += takerFees - seqFees - startValue;

        if (sum < 0) {
          sum = 0;
        }
      }
    });
    const formattedSum = new BigNumber(sum as number)
      .dividedBy(1e18)
      .toNumber();
    result.push(formattedSum as number);
  });

  return result.reverse();
}
