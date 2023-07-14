import { queryProduct } from './queryProduct';
import { queryAllProduct } from './queryAllProduct';
import { queryDaily } from './queryDaily';
import { MMDataProps } from '../types/MMDataProps';
import { queryRates } from './queryRates';
import { queryTVL } from './queryTVL';
import { queryAllTVL } from './queryAllTVL';

export const fetchMMData = ({
  snapshotData,
  market,
  setTVL,
  setNetFlows,
  setBorrows,
  setDailyBorrows,
  setDepositRate,
  setBorrowRate,
  filterdProducts,
  prices,
}: MMDataProps) => {
  if (!snapshotData) return; // Return early if data is not available

  if (market === 'all') {
    // TVL & Net Inflows/ Outflows
    const allTVL = queryAllTVL(
      snapshotData,
      prices,
      filterdProducts.MMProducts,
    );
    const NetFlows = queryDaily(allTVL);
    allTVL.shift();
    setTVL(allTVL);
    setNetFlows(NetFlows);

    // Borrows
    const Borrows = queryAllProduct(
      snapshotData,
      'total_borrows',
      filterdProducts.MMProducts,
    );
    const DailyBorrows = queryDaily(Borrows);
    setBorrows(Borrows);
    setDailyBorrows(DailyBorrows);
  } else {
    // TVL & Net Inflows/Outflows
    const Deposits = queryProduct(snapshotData, 'total_deposits', market);
    const TVL = queryTVL(Deposits, prices, market);
    const NetFlows = queryDaily(Deposits);
    const NetFlowsIn$ = NetFlows.map((obj: number) => obj * prices[market]);
    TVL.shift();
    setTVL(TVL);
    setNetFlows(NetFlowsIn$);

    // Borrows
    const Borrows = queryProduct(snapshotData, 'total_borrows', market);
    const DailyBorrows = queryDaily(Borrows);
    setBorrows(Borrows);
    setDailyBorrows(DailyBorrows);

    // Deposit Rates
    const DepositRates = queryRates(snapshotData, 'deposit_rates', market);
    setDepositRate(DepositRates);

    // Borrow Rates
    const BorrowRates = queryRates(snapshotData, 'borrow_rates', market);
    setBorrowRate(BorrowRates);
  }
};
