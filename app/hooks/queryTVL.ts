import BigNumber from 'bignumber.js';

export function queryTVL(data: any) {
  const TvlData: any = [];

  data?.forEach((obj: any) => {
    if (obj?.hasOwnProperty('tvl')) {
      let TVL = new BigNumber(obj.tvl).dividedBy(1e18).toNumber();

      if (TVL < 0) {
        TVL = 0;
      }
      TvlData.push(TVL);
    }
  });

  return TvlData.reverse();
}
