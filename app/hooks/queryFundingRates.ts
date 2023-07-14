import BigNumber from 'bignumber.js';

export function queryFundingRates(data: any, type: string, productId: any) {
  const result: number[] = [];

  data?.snapshots.forEach((obj: any) => {
    if (type === 'hourly') {
      if (obj['funding_rates'][productId]) {
        const value = obj['funding_rates'][productId];
        const formattedValue = new BigNumber(value).dividedBy(1e18).toNumber();
        result.push(formattedValue);
      } else {
        result.push(0);
      }
    } else if (type === 'daily') {
      if (obj['funding_rates'][productId]) {
        const value = obj['funding_rates'][productId];
        const formattedValue =
          new BigNumber(value).dividedBy(1e18).toNumber() * 24;
        result.push(formattedValue);
      } else {
        result.push(0);
      }
    } else if (type === 'annual') {
      if (obj['funding_rates'][productId]) {
        const value = obj['funding_rates'][productId];
        const formattedValue =
          new BigNumber(value).dividedBy(1e18).toNumber() * 24 * 365;
        result.push(formattedValue);
      } else {
        result.push(0);
      }
    }
  });
  result.pop(); // delete first element to line up w/ dates
  return result.reverse();
}
