import { queryProduct } from './queryProduct';
import { queryAllProduct } from './queryAllProduct';
import { queryDaily } from './queryDaily';
import { queryFundingRates } from './queryFundingRates';
import { PerpDataProps } from '../types/PerpDataProps';
import { queryTrades } from './queryTrades';
import { queryAllTrades } from './queryAllTrades';

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
  filterdProducts,
}: PerpDataProps) => {
  if (!data) return; // Return early if data is not available

  if (market === 'all') {
    // Perp Trading Vol
    const PerpVol = queryAllProduct(
      data.snapshots,
      'cumulative_volumes',
      filterdProducts,
    );
    const DailyPerpVol = queryDaily(PerpVol);

    setPerpVol(PerpVol);
    setDailyPerpVol(DailyPerpVol);

    // Open Interest
    const OpenInt = queryAllProduct(
      data.snapshots,
      'open_interest',
      filterdProducts,
    );
    const DailyOpenInt = queryDaily(OpenInt);

    setOpenInt(OpenInt);
    setDailyOpenInt(DailyOpenInt);

    // Perp Trades
    const PerpTrades = queryAllTrades(
      data.snapshots,
      'cumulative_trades',
      filterdProducts,
    );
    const DailyPerpTrades = queryDaily(PerpTrades);

    setPerpTrades(PerpTrades);
    setDailyPerpTrades(DailyPerpTrades);
  } else {
    // Perp Trading Vol
    const PerpVol = queryProduct(data.snapshots, 'cumulative_volumes', market);
    const DailyPerpVol = queryDaily(PerpVol);

    setPerpVol(PerpVol);
    setDailyPerpVol(DailyPerpVol);

    // Open Interest
    const OpenInt = queryProduct(data.snapshots, 'open_interest', market);
    const DailyOpenInt = queryDaily(OpenInt);

    setOpenInt(OpenInt);
    setDailyOpenInt(DailyOpenInt);

    // Perp Trades
    const PerpTrades = queryTrades(data.snapshots, 'cumulative_trades', market);
    const DailyPerpTrades = queryDaily(PerpTrades);

    setPerpTrades(PerpTrades);
    setDailyPerpTrades(DailyPerpTrades);

    // Hourly Funding
    const HourlyFunding = queryFundingRates(data.snapshots, 'hourly', market);
    setHourlyFunding(HourlyFunding);

    // Daily Funding
    const DailyFunding = queryFundingRates(data.snapshots, 'daily', market);
    setDailyFunding(DailyFunding);

    // Annualized Funding
    const AnnualFunding = queryFundingRates(data.snapshots, 'annual', market);
    setAnnualFunding(AnnualFunding);
  }
};
