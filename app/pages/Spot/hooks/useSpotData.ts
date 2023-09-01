import { useAppSelector } from '@/app/redux/store';
import { queryDates } from '@/app/hooks/queryDates';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';
import { queryAllProductNew } from '@/app/hooks/queryAllProductNew';
import { queryDaily } from '@/app/hooks/queryDaily';
import { queryAllTradesNew } from '@/app/hooks/queryAllTradesNew';
import { queryProductNew } from '@/app/hooks/queryProductNew';
import { queryTradesNew } from '@/app/hooks/queryTradesNew';

export function useSpotData(market: string | number) {
  const snapshotData = useAppSelector((state) => state.data);
  const products = useAppSelector((state) => state.product.products);

  const data = snapshotData.snapshots?.snapshots;
  const isLoading = snapshotData.loading;
  const dates = queryDates(data);
  const filterdProducts = useFilterProducts(products);
  const spotProducts = filterdProducts?.SpotProducts;

  let cumulativeSpotTradingVolume;
  let dailySpotTradingVolume;
  let cumulativeSpotTrades;
  let dailySpotTrades;
  let totalSpotVol;
  let lastDaySpotTradingVolume;
  let lastDaySpotTrades;

  cumulativeSpotTradingVolume = queryAllProductNew(
    data,
    'cumulative_volumes',
    spotProducts,
  );
  dailySpotTradingVolume = queryDaily(cumulativeSpotTradingVolume);
  cumulativeSpotTradingVolume.shift();

  cumulativeSpotTrades = queryAllTradesNew(
    data,
    'cumulative_trades',
    spotProducts,
  );
  dailySpotTrades = queryDaily(cumulativeSpotTrades);
  cumulativeSpotTrades.shift();

  //Total Spot Vol Stat
  totalSpotVol =
    cumulativeSpotTradingVolume[cumulativeSpotTradingVolume.length - 1];

  //Past Day Spot Vol Stat
  lastDaySpotTradingVolume =
    dailySpotTradingVolume[dailySpotTradingVolume.length - 1];

  //Past Day Spot Trades Stat
  lastDaySpotTrades = dailySpotTrades[dailySpotTrades.length - 1];

  if (market === 'all') {
    //Spot Trading Vol
    cumulativeSpotTradingVolume = queryAllProductNew(
      data,
      'cumulative_volumes',
      spotProducts,
    );
    dailySpotTradingVolume = queryDaily(cumulativeSpotTradingVolume);
    cumulativeSpotTradingVolume.shift();

    //# of Spot Trades
    cumulativeSpotTrades = queryAllTradesNew(
      data,
      'cumulative_trades',
      spotProducts,
    );
    dailySpotTrades = queryDaily(cumulativeSpotTrades);
    cumulativeSpotTrades.shift();
  } else {
    //Spot Trading Vol
    cumulativeSpotTradingVolume = queryProductNew(
      data,
      'cumulative_volumes',
      market,
    );
    dailySpotTradingVolume = queryDaily(cumulativeSpotTradingVolume);
    cumulativeSpotTradingVolume.shift();

    //# of Spot Trades
    cumulativeSpotTrades = queryTradesNew(data, 'cumulative_trades', market);
    dailySpotTrades = queryDaily(cumulativeSpotTrades);
    cumulativeSpotTrades.shift();
  }

  return {
    isLoading,
    spotProducts,
    dates,
    cumulativeSpotTradingVolume,
    dailySpotTradingVolume,
    cumulativeSpotTrades,
    dailySpotTrades,
    totalSpotVol,
    lastDaySpotTradingVolume,
    lastDaySpotTrades,
  };
}
