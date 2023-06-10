import { queryProduct } from './queryProduct';
import { queryDaily } from './queryDaily';
import { SpotDataProps } from '../types/SpotDataProps';

export const fetchSpotData = ({
  data,
  market,
  setSpotVol,
  setDailySpotVol,
  setSpotTrades,
  setDailySpotTrades,
}: SpotDataProps) => {
  if (!data) return; // Return early if data is not available

  switch (market) {
    case 'all-spot':
      // Spot Trading Vol
      const allSpotVol = queryProduct(data, 'cumulative_volumes', [1, 3]);
      const allDailySpotVol = queryDaily(allSpotVol);
      setSpotVol(allSpotVol);
      setDailySpotVol(allDailySpotVol);

      // # of Spot Trades
      const allSpotTrades = queryProduct(data, 'cumulative_trades', [1, 3]);
      const allDailySpotTrades = queryDaily(allSpotTrades);
      setSpotTrades(allSpotTrades);
      setDailySpotTrades(allDailySpotTrades);

      break;

    case 'btc-spot':
      // BTC-Spot Tarding Vol
      const BTCSpotVol = queryProduct(data, 'cumulative_volumes', [1]);
      const DailyBTCSpotVol = queryDaily(BTCSpotVol);
      setSpotVol(BTCSpotVol);
      setDailySpotVol(DailyBTCSpotVol);

      // # of BTC Spot Trades
      const BTCSpotTrades = queryProduct(data, 'cumulative_trades', [1]);
      const DailyBTCSpotTrades = queryDaily(BTCSpotTrades);
      setSpotTrades(BTCSpotTrades);
      setDailySpotTrades(DailyBTCSpotTrades);

      break;

    case 'eth-spot':
      // ETH-Spot Trading Vol
      const ETHSpotVol = queryProduct(data, 'cumulative_volumes', [3]);
      const DailyETHSpotVol = queryDaily(ETHSpotVol);
      setSpotVol(ETHSpotVol);
      setDailySpotVol(DailyETHSpotVol);

      // # of ETH Spot Trades
      const ETHSpotTrades = queryProduct(data, 'cumulative_trades', [3]);
      const DailyETHSpotTrades = queryDaily(ETHSpotTrades);
      setSpotTrades(ETHSpotTrades);
      setDailySpotTrades(DailyETHSpotTrades);

      break;

    default:
      break;
  }
};
