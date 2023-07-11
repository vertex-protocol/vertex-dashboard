import { queryProduct } from './queryProduct';
import { queryAllProduct } from './queryAllProduct';
import { queryAllTrades } from './queryAllTrades';
import { queryTrades } from './queryTrades';
import { queryDaily } from './queryDaily';
import { SpotDataProps } from '../types/SpotDataProps';

export const fetchSpotData = ({
  snapshotData,
  market,
  setSpotVol,
  setDailySpotVol,
  setSpotTrades,
  setDailySpotTrades,
  filterdProducts,
}: SpotDataProps) => {
  if (!snapshotData) return; // Return early if data is not available

  if (market === 'all') {
    // Spot Trading Vol
    const SpotVol = queryAllProduct(
      snapshotData,
      'cumulative_volumes',
      filterdProducts.SpotProducts,
    );
    const DailySpotVol = queryDaily(SpotVol);

    setSpotVol(SpotVol);
    setDailySpotVol(DailySpotVol);

    // Spot Trades
    const SpotTrades = queryAllTrades(
      snapshotData,
      'cumulative_trades',
      filterdProducts.SpotProducts,
    );
    const DailySpotTrades = queryDaily(SpotTrades);

    setSpotTrades(SpotTrades);
    setDailySpotTrades(DailySpotTrades);
  } else {
    // Spot Trading Vol
    const SpotVol = queryProduct(snapshotData, 'cumulative_volumes', market);
    const DailySpotVol = queryDaily(SpotVol);

    setSpotVol(SpotVol);
    setDailySpotVol(DailySpotVol);

    // Spot Trades
    const SpotTrades = queryTrades(snapshotData, 'cumulative_trades', market);
    const DailySpotTrades = queryDaily(SpotTrades);

    setSpotTrades(SpotTrades);
    setDailySpotTrades(DailySpotTrades);
  }
};
