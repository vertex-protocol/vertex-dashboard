import { queryProduct } from './queryProduct';
import { queryAllProduct } from './queryAllProduct';
import { queryAllTrades } from './queryAllTrades';
import { queryTrades } from './queryTrades';
import { queryDaily } from './queryDaily';
import { SpotDataProps } from '../types/SpotDataProps';

export const fetchSpotData = ({
  snapshotData,
  market,
  setAllSpotVol,
  setAllDailySpotVol,
  setAllDailySpotTrades,
  setSpotVol,
  setDailySpotVol,
  setSpotTrades,
  setDailySpotTrades,
  filterdProducts,
}: SpotDataProps) => {
  if (!snapshotData) return;

  if (market === 'all') {
    // Spot Trading Vol
    const SpotVol = queryAllProduct(
      snapshotData,
      'cumulative_volumes',
      filterdProducts.SpotProducts,
    );
    const DailySpotVol = queryDaily(SpotVol);
    SpotVol.shift();
    setAllSpotVol(SpotVol);
    setSpotVol(SpotVol);
    setAllDailySpotVol(DailySpotVol);
    setDailySpotVol(DailySpotVol);

    // Spot Trades
    const SpotTrades = queryAllTrades(
      snapshotData,
      'cumulative_trades',
      filterdProducts.SpotProducts,
    );
    const DailySpotTrades = queryDaily(SpotTrades);
    SpotTrades.shift();
    setSpotTrades(SpotTrades);
    setAllDailySpotTrades(DailySpotTrades);
    setDailySpotTrades(DailySpotTrades);
  } else {
    // All Spot Trading Vol
    const AllSpotVol = queryAllProduct(
      snapshotData,
      'cumulative_volumes',
      filterdProducts.SpotProducts,
    );
    const AllDailySpotVol = queryDaily(AllSpotVol);
    AllSpotVol.shift();
    setAllSpotVol(AllSpotVol);
    setAllDailySpotVol(AllDailySpotVol);

    // All Spot Trades
    const AllSpotTrades = queryAllTrades(
      snapshotData,
      'cumulative_trades',
      filterdProducts.SpotProducts,
    );
    const AllDailySpotTrades = queryDaily(AllSpotTrades);
    AllSpotTrades.shift();
    setAllDailySpotTrades(AllDailySpotTrades);

    /* --------------------------------------- */
    // Spot Trading Vol
    const SpotVol = queryProduct(snapshotData, 'cumulative_volumes', market);
    const DailySpotVol = queryDaily(SpotVol);
    SpotVol.shift();
    setSpotVol(SpotVol);
    setDailySpotVol(DailySpotVol);

    // Spot Trades
    const SpotTrades = queryTrades(snapshotData, 'cumulative_trades', market);
    const DailySpotTrades = queryDaily(SpotTrades);
    SpotTrades.shift();
    setSpotTrades(SpotTrades);
    setDailySpotTrades(DailySpotTrades);
  }
};
