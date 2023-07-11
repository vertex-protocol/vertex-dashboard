import { queryProduct } from './queryProduct';
import { queryAllProduct } from './queryAllProduct';
import { queryDaily } from './queryDaily';
import { queryFundingRates } from './queryFundingRates';
import { PerpDataProps } from '../types/PerpDataProps';
import { queryTrades } from './queryTrades';
import { queryAllTrades } from './queryAllTrades';

export const fetchPerpData = ({
  snapshotData,
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
  if (!snapshotData) return; // Return early if data is not available

  if (market === 'all') {
    // Perp Trading Vol
    const PerpVol = queryAllProduct(
      snapshotData,
      'cumulative_volumes',
      filterdProducts.PerpProducts,
    );
    const DailyPerpVol = queryDaily(PerpVol);

    setPerpVol(PerpVol);
    setDailyPerpVol(DailyPerpVol);

    // Open Interest
    const OpenInt = queryAllProduct(
      snapshotData,
      'open_interest',
      filterdProducts.PerpProducts,
    );
    const DailyOpenInt = queryDaily(OpenInt);

    setOpenInt(OpenInt);
    setDailyOpenInt(DailyOpenInt);

    // Perp Trades
    const PerpTrades = queryAllTrades(
      snapshotData,
      'cumulative_trades',
      filterdProducts.PerpProducts,
    );
    const DailyPerpTrades = queryDaily(PerpTrades);

    setPerpTrades(PerpTrades);
    setDailyPerpTrades(DailyPerpTrades);
  } else {
    // Perp Trading Vol
    const PerpVol = queryProduct(snapshotData, 'cumulative_volumes', market);
    const DailyPerpVol = queryDaily(PerpVol);

    setPerpVol(PerpVol);
    setDailyPerpVol(DailyPerpVol);

    // Open Interest
    const OpenInt = queryProduct(snapshotData, 'open_interest', market);
    const DailyOpenInt = queryDaily(OpenInt);

    setOpenInt(OpenInt);
    setDailyOpenInt(DailyOpenInt);

    // Perp Trades
    const PerpTrades = queryTrades(snapshotData, 'cumulative_trades', market);
    const DailyPerpTrades = queryDaily(PerpTrades);

    setPerpTrades(PerpTrades);
    setDailyPerpTrades(DailyPerpTrades);

    // Hourly Funding
    const HourlyFunding = queryFundingRates(snapshotData, 'hourly', market);
    setHourlyFunding(HourlyFunding);

    // Daily Funding
    const DailyFunding = queryFundingRates(snapshotData, 'daily', market);
    setDailyFunding(DailyFunding);

    // Annualized Funding
    const AnnualFunding = queryFundingRates(snapshotData, 'annual', market);
    setAnnualFunding(AnnualFunding);
  }
};
