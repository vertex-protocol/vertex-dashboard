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
  setAllPerpVol,
  setAllDailyPerpVol,
  setAllOpenInt,
  setAllDailyPerpTrades,
  setPerpVol,
  setDailyPerpVol,
  setOpenInt,
  setPerpTrades,
  setDailyPerpTrades,
  setHourlyFunding,
  setDailyFunding,
  setAnnualFunding,
  filterdProducts,
}: PerpDataProps) => {
  if (!snapshotData) return;

  if (market === 'all') {
    // All Perp Trading Vol
    const PerpVol = queryAllProduct(
      snapshotData,
      'cumulative_volumes',
      filterdProducts.PerpProducts,
    );
    const DailyPerpVol = queryDaily(PerpVol);
    PerpVol.shift(); // remove first element to line it up w/ dates and daily
    setAllPerpVol(PerpVol);
    setPerpVol(PerpVol);
    setAllDailyPerpVol(DailyPerpVol);
    setDailyPerpVol(DailyPerpVol);

    // All Open Interest
    const OpenInt = queryAllProduct(
      snapshotData,
      'open_interests',
      filterdProducts.PerpProducts,
    );
    OpenInt.shift();
    setAllOpenInt(OpenInt);
    setOpenInt(OpenInt);

    // All Perp Trades
    const PerpTrades = queryAllTrades(
      snapshotData,
      'cumulative_trades',
      filterdProducts.PerpProducts,
    );
    const DailyPerpTrades = queryDaily(PerpTrades);
    PerpTrades.shift();
    setPerpTrades(PerpTrades);
    setAllDailyPerpTrades(DailyPerpTrades);
    setDailyPerpTrades(DailyPerpTrades);
  } else {
    // All Perp Trading Vol
    const AllPerpVol = queryAllProduct(
      snapshotData,
      'cumulative_volumes',
      filterdProducts.PerpProducts,
    );
    const AllDailyPerpVol = queryDaily(AllPerpVol);
    AllPerpVol.shift(); // remove first element to line it up w/ dates and daily
    setAllPerpVol(AllPerpVol);
    setAllDailyPerpVol(AllDailyPerpVol);

    // All Open Interest
    const AllOpenInt = queryAllProduct(
      snapshotData,
      'open_interests',
      filterdProducts.PerpProducts,
    );
    AllOpenInt.shift();
    setAllOpenInt(AllOpenInt);

    // All Perp Trades
    const AllPerpTrades = queryAllTrades(
      snapshotData,
      'cumulative_trades',
      filterdProducts.PerpProducts,
    );
    const AllDailyPerpTrades = queryDaily(AllPerpTrades);
    AllPerpTrades.shift();
    setAllDailyPerpTrades(AllDailyPerpTrades);
    /* --------------------------------------- */
    // Perp Trading Vol
    const PerpVol = queryProduct(snapshotData, 'cumulative_volumes', market);
    const DailyPerpVol = queryDaily(PerpVol);
    PerpVol.shift();
    setPerpVol(PerpVol);
    setDailyPerpVol(DailyPerpVol);

    // Open Interest
    const OpenInt = queryProduct(snapshotData, 'open_interests', market);
    OpenInt.shift();
    setOpenInt(OpenInt);

    // Perp Trades
    const PerpTrades = queryTrades(snapshotData, 'cumulative_trades', market);
    const DailyPerpTrades = queryDaily(PerpTrades);
    PerpTrades.shift();
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
