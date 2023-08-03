import { queryProduct } from './queryProduct';
import { queryDaily } from './queryDaily';
import { MMDataProps } from '../types/MMDataProps';
import { queryRates } from './queryRates';
import { queryPrice } from './queryPrice';
import { queryTVL } from './queryTVL';
import { queryAllFlows } from './queryAllFlows';
import { queryDeposit } from './queryDeposits';

export const fetchMMData = ({
  snapshotData,
  market,
  setAllTVL,
  setAllDailyDeposits,
  setAllDailyWithdraws,
  setTVL,
  setNetFlows,
  setDeposits,
  setDailyDeposits,
  setWithdraws,
  setDailyWithdraws,
  setDepositRate,
  setBorrowRate,
  filterdProducts,
  prices,
}: MMDataProps) => {
  if (!snapshotData) return;

  if (market === 'all') {
    // TVL & Net Inflows/ Outflows
    const allTVL = queryTVL(snapshotData);
    const NetFlows = queryDaily(allTVL);
    allTVL.shift();
    setAllTVL(allTVL);
    setTVL(allTVL);
    setNetFlows(NetFlows);

    // Deposits
    const Deposits = queryAllFlows(
      snapshotData,
      'cumulative_inflows',
      filterdProducts.MMProducts,
      prices,
    );
    const DailyDeposits = queryDaily(Deposits);
    Deposits.shift();
    setDeposits(Deposits);
    setAllDailyDeposits(DailyDeposits);
    setDailyDeposits(DailyDeposits);

    // Borrows
    const Borrows = queryAllFlows(
      snapshotData,
      'cumulative_outflows',
      filterdProducts.MMProducts,
      prices,
    );
    const DailyBorrows = queryDaily(Borrows);
    Borrows.shift();
    setWithdraws(Borrows);
    setAllDailyWithdraws(DailyBorrows);
    setDailyWithdraws(DailyBorrows);
  } else {
    // Total TVL
    const allTVL = queryTVL(snapshotData);
    allTVL.shift();
    setAllTVL(allTVL);

    // Deposits
    const AllDeposits = queryAllFlows(
      snapshotData,
      'cumulative_inflows',
      filterdProducts.MMProducts,
      prices,
    );
    const AllDailyDeposits = queryDaily(AllDeposits);
    AllDeposits.shift();
    setAllDailyDeposits(AllDailyDeposits);

    // Borrows
    const AllBorrows = queryAllFlows(
      snapshotData,
      'cumulative_outflows',
      filterdProducts.MMProducts,
      prices,
    );
    const AllDailyBorrows = queryDaily(AllBorrows);
    AllBorrows.shift();
    setAllDailyWithdraws(AllDailyBorrows);

    /* --------------------------------------- */
    // TVL & Net Inflows/Outflows
    const TotalDeposits = queryDeposit(snapshotData, 'total_deposits', market);
    const TVL = queryPrice(TotalDeposits, prices, market);
    const NetFlows = queryDaily(TVL);
    TVL.shift();
    setTVL(TVL);
    setNetFlows(NetFlows);

    // Deposits
    const Deposits = queryProduct(snapshotData, 'cumulative_inflows', market);
    const DollarDeposits = queryPrice(Deposits, prices, market);
    const DailyDeposits = queryDaily(DollarDeposits);
    DollarDeposits.shift();
    setDeposits(DollarDeposits);
    setDailyDeposits(DailyDeposits);

    // Borrows
    const Borrows = queryProduct(snapshotData, 'cumulative_outflows', market);
    const DollarBorrows = queryPrice(Borrows, prices, market);
    const DailyBorrows = queryDaily(DollarBorrows);
    DollarBorrows.shift();
    setWithdraws(DollarBorrows);
    setDailyWithdraws(DailyBorrows);

    // Deposit Rates
    const DepositRates = queryRates(snapshotData, 'deposit_rates', market);
    setDepositRate(DepositRates);

    // Borrow Rates
    const BorrowRates = queryRates(snapshotData, 'borrow_rates', market);
    setBorrowRate(BorrowRates);
  }
};
