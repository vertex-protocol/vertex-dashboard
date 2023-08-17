import { useAppSelector } from '@/app/redux/store';
import { queryDates } from '@/app/hooks/queryDates';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';
import { queryDaily } from '@/app/hooks/queryDaily';
import { queryAllProductNew } from '@/app/hooks/queryAllProductNew';
import { queryAllTradesNew } from '@/app/hooks/queryAllTradesNew';
import { queryProductNew } from '@/app/hooks/queryProductNew';
import { queryTradesNew } from '@/app/hooks/queryTradesNew';
import { queryFundingRatesNew } from '@/app/hooks/queryFundingRatesNew';

export function usePerpetualData(market: string | number) {
  const snapshotData = useAppSelector((state) => state.data);
  const products = useAppSelector((state) => state.product.products);

  const data = snapshotData?.snapshots?.snapshots;
  const isLoading = snapshotData.loading;
  const dates = queryDates(data);
  const filterdProducts = useFilterProducts(products);
  const perpProducts = filterdProducts?.PerpProducts;

  let cumulativePerpTradingVolume;
  let dailyPerpTradingVolume;
  let openInterest;
  let cumulativePerpTrades;
  let dailyPerpTrades;
  let hourlyFunding;
  let dailyFunding;
  let annualFunding;
  let totalPerpVolume;
  let lastDayPerpVolume;
  let totalOpenInterest;
  let lastDayPerpTrades;

  cumulativePerpTradingVolume = queryAllProductNew(
    data,
    'cumulative_volumes',
    filterdProducts?.PerpProducts,
  );
  dailyPerpTradingVolume = queryDaily(cumulativePerpTradingVolume);
  cumulativePerpTradingVolume.shift();

  openInterest = queryAllProductNew(
    data,
    'open_interests',
    filterdProducts?.PerpProducts,
  );
  openInterest.shift();

  cumulativePerpTrades = queryAllTradesNew(
    data,
    'cumulative_trades',
    filterdProducts?.PerpProducts,
  );
  dailyPerpTrades = queryDaily(cumulativePerpTrades);
  cumulativePerpTrades.shift();

  //Total Perp Vol Stat
  totalPerpVolume =
    cumulativePerpTradingVolume[cumulativePerpTradingVolume.length - 1];

  //Past Day Perp Vol Stat
  lastDayPerpVolume = dailyPerpTradingVolume[dailyPerpTradingVolume.length - 1];

  //Total Open Interest Stat
  totalOpenInterest = openInterest[openInterest.length - 1];

  //Past Day Perp Trades Stat
  lastDayPerpTrades = dailyPerpTrades[dailyPerpTrades.length - 1];

  if (market === 'all') {
    //Perp Trading Vol
    cumulativePerpTradingVolume = queryAllProductNew(
      data,
      'cumulative_volumes',
      filterdProducts?.PerpProducts,
    );
    dailyPerpTradingVolume = queryDaily(cumulativePerpTradingVolume);
    cumulativePerpTradingVolume.shift();

    //Open Interest
    openInterest = queryAllProductNew(
      data,
      'open_interests',
      filterdProducts?.PerpProducts,
    );
    openInterest.shift();

    //# of Perp Trades
    cumulativePerpTrades = queryAllTradesNew(
      data,
      'cumulative_trades',
      filterdProducts?.PerpProducts,
    );
    dailyPerpTrades = queryDaily(cumulativePerpTrades);
    cumulativePerpTrades.shift();
  } else {
    //Perp Trading Vol
    cumulativePerpTradingVolume = queryProductNew(
      data,
      'cumulative_volumes',
      market,
    );
    dailyPerpTradingVolume = queryDaily(cumulativePerpTradingVolume);
    cumulativePerpTradingVolume.shift();

    //Open Interest
    openInterest = queryProductNew(data, 'open_interests', market);
    openInterest.shift();

    //# of Perp Trades
    cumulativePerpTrades = queryTradesNew(data, 'cumulative_trades', market);
    dailyPerpTrades = queryDaily(cumulativePerpTrades);
    cumulativePerpTrades.shift();

    // Hourly Funding
    hourlyFunding = queryFundingRatesNew(data, 'hourly', market);

    // Daily Funding
    dailyFunding = queryFundingRatesNew(data, 'daily', market);

    // Annualized Funding
    annualFunding = queryFundingRatesNew(data, 'annual', market);
  }

  return {
    isLoading,
    perpProducts,
    dates,
    cumulativePerpTradingVolume,
    dailyPerpTradingVolume,
    openInterest,
    cumulativePerpTrades,
    dailyPerpTrades,
    hourlyFunding,
    dailyFunding,
    annualFunding,
    totalPerpVolume,
    lastDayPerpVolume,
    totalOpenInterest,
    lastDayPerpTrades,
  };
}
