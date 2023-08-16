import { useAppSelector } from '@/app/redux/store';

export function useOverviewData() {
  const snapshotData = useAppSelector((state) => state.data);
  //const data = snapshotData?.snapshots?.snapshots;
  const isLoading = snapshotData.loading;

  return {
    /*
    totalTradingVol,
    pastDayTradingVol,
    totalUsers,
    pastDayFees,
    tradingVol,
    dailyTradingVol,
    users,
    dailyUsers,
    dailyActiveUsers,
    protocolFees,
    dailyProtocolFees,
    liquidations,
    dailyLiquidations
    */
  };
}
