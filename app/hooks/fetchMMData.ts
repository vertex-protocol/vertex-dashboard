import { queryProduct } from './queryProduct';
import { queryDaily } from './queryDaily';
import { MMDataProps } from '../types/MMDataProps';

export const fetchMMData = ({
  data,
  market,
  setDeposits,
  setDailyDeposits,
  setBorrows,
  setDailyBorrows,
  setDepositRate,
  setBorrowRate,
}: MMDataProps) => {
  if (!data) return; // Return early if data is not available

  switch (market) {
    case 'all-mkt':
      // Deposits
      const allDeposit = queryProduct(data, 'total_deposits', [0, 1, 3]);
      const allDailyDeposits = queryDaily(allDeposit);
      setDeposits(allDeposit);
      setDailyDeposits(allDailyDeposits);

      // Borrows
      const allBorrows = queryProduct(data, 'total_borrows', [0, 1, 3]);
      const allDailyBorrows = queryDaily(allBorrows);
      setBorrows(allBorrows);
      setDailyBorrows(allDailyBorrows);

      break;

    case 'usdc':
      // USDC Deposits
      const USDCdeposit = queryProduct(data, 'total_deposits', [0]);
      const DailyUSDCdeposit = queryDaily(USDCdeposit);
      setDeposits(USDCdeposit);
      setDailyDeposits(DailyUSDCdeposit);

      // USDC Borrows
      const USDCborrow = queryProduct(data, 'total_borrows', [0]);
      const DailyUSDCborrow = queryDaily(USDCborrow);
      setBorrows(USDCborrow);
      setDailyBorrows(DailyUSDCborrow);

      // USDC Deposit Rates
      const USDCdepositRate = queryProduct(data, 'deposit_rates', [0]);
      setDepositRate(USDCdepositRate);

      // USDC Borrow Rates
      const USDCborrowRate = queryProduct(data, 'borrow_rates', [0]);
      setBorrowRate(USDCborrowRate);

      break;

    case 'btc':
      // BTC Deposits
      const BTCdeposit = queryProduct(data, 'total_deposits', [1]);
      const DailyBTCdeposit = queryDaily(BTCdeposit);
      setDeposits(BTCdeposit);
      setDailyDeposits(DailyBTCdeposit);

      // BTC Borrows
      const BTCborrow = queryProduct(data, 'total_borrows', [1]);
      const DailyBTCborrow = queryDaily(BTCborrow);
      setBorrows(BTCborrow);
      setDailyBorrows(DailyBTCborrow);

      // BTC Deposit Rates
      const BTCdepositRate = queryProduct(data, 'deposit_rates', [1]);
      setDepositRate(BTCdepositRate);

      // BTC Borrow Rates
      const BTCborrowRate = queryProduct(data, 'borrow_rates', [1]);
      setBorrowRate(BTCborrowRate);

    case 'eth':
      // ETH Deposits
      const ETHdeposit = queryProduct(data, 'total_deposits', [3]);
      const DailyETHdeposit = queryDaily(ETHdeposit);
      setDeposits(ETHdeposit);
      setDailyDeposits(DailyETHdeposit);

      // ETH Borrows
      const ETHborrow = queryProduct(data, 'total_borrows', [3]);
      const DailyETHborrow = queryDaily(ETHborrow);
      setBorrows(ETHborrow);
      setDailyBorrows(DailyETHborrow);

      // ETH Deposit Rates
      const ETHdepositRate = queryProduct(data, 'deposit_rates', [3]);
      setDepositRate(ETHdepositRate);

      // ETH Borrow Rates
      const ETHborrowRate = queryProduct(data, 'borrow_rates', [3]);
      setBorrowRate(ETHborrowRate);

      break;

    default:
      break;
  }
};
