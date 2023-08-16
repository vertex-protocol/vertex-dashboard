import { useAppSelector } from '@/app/redux/store';
import { queryDates } from '@/app/hooks/queryDates';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';
import { queryAllProductNew } from '@/app/hooks/queryAllProductNew';
import { queryDaily } from '@/app/hooks/queryDaily';
import { queryUsers } from './queryUsers';
import { queryDau } from './queryDau';
import { queryFees } from './queryFees';

export function useOverviewData() {
  const snapshotData = useAppSelector((state) => state.data);
  const products = useAppSelector((state) => state.product.products);

  const data = snapshotData?.snapshots?.snapshots;
  const isLoading = snapshotData.loading;
  const dates = queryDates(data);
  const filterdProducts = useFilterProducts(products);

  //Trading Vol
  const cumulativeTradingVolume = queryAllProductNew(
    data,
    'cumulative_volumes',
    filterdProducts?.AllProducts,
  );
  const dailyTradingVolume = queryDaily(cumulativeTradingVolume);
  cumulativeTradingVolume.shift();

  //Users
  const cumulativeUsers = queryUsers(data);
  const dailyUsers = queryDaily(cumulativeUsers);
  cumulativeUsers.shift();

  //DAU
  const dailyActiveUsers = queryDau(data);

  //Protocol Fees
  const cumulativeFees = queryFees(data, filterdProducts?.AllProducts);
  const dailyFees = queryDaily(cumulativeFees);
  cumulativeFees.shift();

  //Liquidations
  const cumulativeLiquidations = queryAllProductNew(
    data,
    'cumulative_liquidation_amounts',
    filterdProducts?.AllProducts,
  );
  const dailyLiquidations = queryDaily(cumulativeLiquidations);
  cumulativeLiquidations.shift();

  //Total Trading Vol Stat
  const totalTradingVolume =
    cumulativeTradingVolume[cumulativeTradingVolume.length - 1];

  //Past Day Trading Vol Stat
  const pastDayTradingVolume =
    dailyTradingVolume[dailyTradingVolume.length - 1];

  //Total Users Stat
  const totalUsers = cumulativeUsers[cumulativeUsers.length - 1];

  //Past Day Fees Stat
  const pastDayFees = dailyFees[dailyFees.length - 1];

  return {
    isLoading,
    dates,
    cumulativeTradingVolume,
    dailyTradingVolume,
    cumulativeUsers,
    dailyUsers,
    dailyActiveUsers,
    cumulativeFees,
    dailyFees,
    cumulativeLiquidations,
    dailyLiquidations,
    totalTradingVolume,
    pastDayTradingVolume,
    totalUsers,
    pastDayFees,
  };
}
