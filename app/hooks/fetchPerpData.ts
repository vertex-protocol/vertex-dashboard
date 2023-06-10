import { queryProduct } from './queryProduct';
import { queryDaily } from './queryDaily';
import { queryFundingRates } from './queryFundingRates';
import { PerpDataProps } from '../types/PerpDataProps';

export const fetchPerpData = ({
  data,
  market,
  setPerpVol,
  setDailyPerpVol,
  setOpenInt,
  setDailyOpenInt,
  setPerpTrades,
  setDailyPerpTrades,
  setHourlyFunding,
  setDailyFunding,
  setAnnualFunding,
}: PerpDataProps) => {
  if (!data) return; // Return early if data is not available

  switch (market) {
    case 'all-perp':
      // Perp Trading Vol
      const allPerpVol = queryProduct(data, 'cumulative_volumes', [2, 4]);
      const allDailyPerpVol = queryDaily(allPerpVol);
      setPerpVol(allPerpVol);
      setDailyPerpVol(allDailyPerpVol);

      // Open Interest
      const allOpenInt = queryProduct(data, 'open_interests', [2, 4]);
      const allDailyOpenInt = queryDaily(allOpenInt);
      setOpenInt(allOpenInt);
      setDailyOpenInt(allDailyOpenInt);

      // # of Perp Trades
      const allPerpTrades = queryProduct(data, 'cumulative_trades', [2, 4]);
      const allDailyPerpTrades = queryDaily(allPerpTrades);
      setPerpTrades(allPerpTrades);
      setDailyPerpTrades(allDailyPerpTrades);

      break;

    case 'btc-perp':
      // BTC-Perp Tarding Vol
      const BTCPerpVol = queryProduct(data, 'cumulative_volumes', [2]);
      const DailyBTCPerpVol = queryDaily(BTCPerpVol);
      setPerpVol(BTCPerpVol);
      setDailyPerpVol(DailyBTCPerpVol);

      // BTC-Perp Open Interest
      const BTCOpenInt = queryProduct(data, 'open_interests', [2]);
      const DailyBTCOpenInt = queryDaily(BTCOpenInt);
      setOpenInt(BTCOpenInt);
      setDailyOpenInt(DailyBTCOpenInt);

      // # of BTC Perp Trades
      const BTCPerpTrades = queryProduct(data, 'cumulative_trades', [2]);
      const DailyBTCPerpTrades = queryDaily(BTCPerpTrades);
      setPerpTrades(BTCPerpTrades);
      setDailyPerpTrades(DailyBTCPerpTrades);

      // BTC fundingRates
      const BTChourlyFunding = queryFundingRates(data, 'hourly', [2]);
      const BTCdailyFunding = queryFundingRates(data, 'daily', [2]);
      const BTCannualFunding = queryFundingRates(data, 'annual', [2]);
      setHourlyFunding(BTChourlyFunding);
      setDailyFunding(BTCdailyFunding);
      setAnnualFunding(BTCannualFunding);

      break;

    case 'eth-perp':
      // ETH-Perp Trading Vol
      const ETHPerpVol = queryProduct(data, 'cumulative_volumes', [4]);
      const DailyETHPerpVol = queryDaily(ETHPerpVol);
      setPerpVol(ETHPerpVol);
      setDailyPerpVol(DailyETHPerpVol);

      // ETH-Perp Open Interest
      const ETHOpenInt = queryProduct(data, 'open_interests', [4]);
      const DailyETHOpenInt = queryDaily(ETHOpenInt);
      setOpenInt(ETHOpenInt);
      setDailyOpenInt(DailyETHOpenInt);

      // # of ETH Perp Trades
      const ETHPerpTrades = queryProduct(data, 'cumulative_trades', [4]);
      const DailyETHPerpTrades = queryDaily(ETHPerpTrades);
      setPerpTrades(ETHPerpTrades);
      setDailyPerpTrades(DailyETHPerpTrades);

      // ETH fundingRates
      const ETHhourlyFunding = queryFundingRates(data, 'hourly', [4]);
      const ETHdailyFunding = queryFundingRates(data, 'daily', [4]);
      const ETHannualFunding = queryFundingRates(data, 'annual', [4]);
      setHourlyFunding(ETHhourlyFunding);
      setDailyFunding(ETHdailyFunding);
      setAnnualFunding(ETHannualFunding);

      break;

    default:
      break;
  }
};
