import { useAppSelector } from '@/app/redux/store';
import { queryDates } from '@/app/hooks/queryDates';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';
import { queryDaily } from '@/app/hooks/queryDaily';
import { queryTVL } from '@/app/hooks/queryTVL';
import { queryAllFlows } from '@/app/hooks/queryAllFlows';
import { queryDeposit } from '@/app/hooks/queryDeposits';
import { queryPrice } from '@/app/hooks/queryPrice';
import { queryProductNew } from '@/app/hooks/queryProductNew';
import { queryRates } from '@/app/hooks/queryRates';

export function useMoneyMarketData(market: string | number) {
  const snapshotData = useAppSelector((state) => state.data);
  const products = useAppSelector((state) => state.product.products);

  const data = snapshotData?.snapshots?.snapshots;
  const isLoading = snapshotData.loading;
  const dates = queryDates(data);
  const filterdProducts = useFilterProducts(products);
  const mmProducts = filterdProducts?.MMProducts;
  const prices = useAppSelector((state) => state.prices.prices);

  let totalTvl;
  let pastDayDeposits;
  let pastDayWithdrawals;
  let cumulativeTvl;
  let netFlows;
  let cumulativeDeposits;
  let dailyDeposits;
  let cumulativeWithdrawals;
  let dailyWithdrawals;
  let depositRate;
  let borrowRate;

  cumulativeTvl = queryTVL(data);
  netFlows = queryDaily(cumulativeTvl);
  cumulativeTvl.shift();

  cumulativeDeposits = queryAllFlows(
    data,
    'cumulative_inflows',
    mmProducts,
    prices,
  );
  dailyDeposits = queryDaily(cumulativeDeposits);
  cumulativeDeposits.shift();

  cumulativeWithdrawals = queryAllFlows(
    data,
    'cumulative_outflows',
    mmProducts,
    prices,
  );
  dailyWithdrawals = queryDaily(cumulativeWithdrawals);
  cumulativeWithdrawals.shift();

  //Total TVL Stat
  totalTvl = cumulativeTvl[cumulativeTvl.length - 1];

  //Past Day Deposits Stat
  pastDayDeposits = dailyDeposits[dailyDeposits.length - 1];

  //Past Day Withdrawals Stat
  pastDayWithdrawals = dailyWithdrawals[dailyWithdrawals.length - 1];

  if (market === 'all') {
    //TVL & Net Flows
    cumulativeTvl = queryTVL(data);
    netFlows = queryDaily(cumulativeTvl);
    cumulativeTvl.shift();

    //Deposits
    cumulativeDeposits = queryAllFlows(
      data,
      'cumulative_inflows',
      mmProducts,
      prices,
    );
    dailyDeposits = queryDaily(cumulativeDeposits);
    cumulativeDeposits.shift();

    //Withdrawals
    cumulativeWithdrawals = queryAllFlows(
      data,
      'cumulative_outflows',
      mmProducts,
      prices,
    );
    dailyWithdrawals = queryDaily(cumulativeWithdrawals);
    cumulativeWithdrawals.shift();
  } else {
    //TVL & Net Flows
    const deposit = queryDeposit(data, 'total_deposits', market);
    cumulativeTvl = queryPrice(deposit, prices, market);
    netFlows = queryDaily(cumulativeTvl);
    cumulativeTvl.shift();

    //Deposits
    const inflow = queryProductNew(data, 'cumulative_inflows', market);
    cumulativeDeposits = queryPrice(inflow, prices, market);
    dailyDeposits = queryDaily(cumulativeDeposits);
    cumulativeDeposits.shift();

    //Withdrawals
    const outflow = queryProductNew(data, 'cumulative_outflows', market);
    cumulativeWithdrawals = queryPrice(outflow, prices, market);
    dailyWithdrawals = queryDaily(cumulativeWithdrawals);
    cumulativeWithdrawals.shift();

    //Deposit Rates
    depositRate = queryRates(data, 'deposit_rates', market);

    //Borrow Rates
    borrowRate = queryRates(data, 'borrow_rates', market);
  }

  return {
    isLoading,
    dates,
    mmProducts,
    totalTvl,
    pastDayDeposits,
    pastDayWithdrawals,
    cumulativeTvl,
    netFlows,
    cumulativeDeposits,
    dailyDeposits,
    cumulativeWithdrawals,
    dailyWithdrawals,
    depositRate,
    borrowRate,
  };
}
