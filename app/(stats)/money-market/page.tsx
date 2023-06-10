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
import { fetchMMData } from '@/app/hooks/fetchMMData';

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
    fetchMMData({
      data,
      market,
      setDeposits,
      setDailyDeposits,
      setBorrows,
      setDailyBorrows,
      setDepositRate,
      setBorrowRate,
    });
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
