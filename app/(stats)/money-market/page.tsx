'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';
import { MarketValues } from './MarketValues';
import { IntervalProps } from '@/app/types/IntervalProps';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import LineChart from '@/app/components/main/chart/LineChart';
import { useAppSelector } from '@/app/redux/store';
import { queryTime } from '@/app/hooks/queryTime';
import { queryProduct } from '@/app/hooks/queryProduct';
import { queryDaily } from '@/app/hooks/queryDaily';

export default function MoneyMarket({ interval, setInterval }: IntervalProps) {
  const [market, setMarket] = useState('all-mkt');

  // Deposits
  const [Deposits, setDeposits] = useState<number[]>([]);
  const [dailyDeposits, setDailyDeposits] = useState<number[]>([]);

  // Borrows
  const [Borrows, setBorrows] = useState<number[]>([]);
  const [DailyBorrows, setDailyBorrows] = useState<number[]>([]);

  // Deposit Rate
  const [DepositRate, setDepositRate] = useState<number[]>([]);

  // Borrow Rate
  const [BorrowRate, setBorrowRate] = useState<number[]>([]);

  const data = useAppSelector((state) => state.data.data);
  const dates = queryTime(data);

  useEffect(() => {
    const fetchMMData = () => {
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

    fetchMMData();
  }, [market, interval, data]);

  return (
    <>
      <ThreeGridLayout>
        <Card title="Total TVL" stat={2.21} daily={14.08} format={true} />
        <Card title="Deposited (24h)" stat={2.21} daily={14.08} format={true} />
        <Card title="Borrowed (24h)" stat={1.23} daily={14.08} format={true} />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={MarketValues}
        />
        <IntervalTab interval={interval} setInterval={setInterval} />
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="Deposits"
            text="The daily vs cumulative deposits on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={Deposits}
            daily={dailyDeposits}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Borrows"
            text="The daily vs cumulative borrows on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={Borrows}
            daily={DailyBorrows}
          />
        </ChartContainer>
        {market !== 'all-mkt' && (
          <>
            <ChartContainer>
              <ChartHeader
                title="Deposit Rate"
                text="The deposit rate over the set period."
              />
              <LineChart dates={dates} data={DepositRate} />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Borrow Rate"
                text="The borrow rate over the set period."
              />
              <LineChart dates={dates} data={BorrowRate} />
            </ChartContainer>
          </>
        )}
      </ChartsLayout>
    </>
  );
}
