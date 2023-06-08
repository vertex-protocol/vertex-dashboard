export function queryFundingRates(
  data: any,
  type: string,
  productId: number[],
) {
  const result: number[] = [];

  data.forEach((obj: any) => {
    if (obj['funding_rates']) {
      if (type == 'hourly') {
        // search element based on productId
        const arr = obj['funding_rates'][productId[0]];

        // sum up the element
        const sum = arr.reduce((acc: number, val: number) => acc + val, 0);

        // divide by 24
        const value = sum / 24;

        result.push(value);
      } else if (type == 'daily') {
        // search element based on productId
        const arr = obj['funding_rates'][productId[0]];

        // formating to daily funding rate
        const dailyArr = arr.map((element: number) => element * 24);

        // sum up the element
        const sum = dailyArr.reduce((acc: number, val: number) => acc + val, 0);

        // divide by 24
        const value = sum / 24;

        result.push(value);
      } else if (type == 'annual') {
        // search element based on productId
        const arr = obj['funding_rates'][productId[0]];

        // formating to daily funding rate
        const dailyArr = arr.map((element: number) => element * 24 * 365);

        // sum up the element
        const sum = dailyArr.reduce((acc: number, val: number) => acc + val, 0);

        // divide by 24
        const value = sum / 24;

        result.push(value);
      }
    }
  });

  return result;
}
