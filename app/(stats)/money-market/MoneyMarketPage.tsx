'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import LineChart from '@/app/components/main/chart/LineChart';
import { useAppSelector } from '@/app/redux/store';
import { queryTime } from '@/app/hooks/queryTime';
import { fetchMMData } from '@/app/hooks/fetchMMData';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';
import IntervalProps from '../../types/IntervalProps';

export default function MoneyMarket({ interval, setInterval }: IntervalProps) {
  const [market, setMarket] = useState('all');

  // TODO: add Cummulative & Daily Deposits

  // TVL & Net Flow
  const [TVL, setTVL] = useState<number[]>([]);
  const [netFlows, setNetFlows] = useState<number[]>([]);

  // Borrows
  const [Borrows, setBorrows] = useState<number[]>([]);
  const [DailyBorrows, setDailyBorrows] = useState<number[]>([]);

  // Deposit Rate
  const [DepositRate, setDepositRate] = useState<number[]>([]);

  // Borrow Rate
  const [BorrowRate, setBorrowRate] = useState<number[]>([]);

  const products = useAppSelector((state) => state.product.products);
  const filterdProducts = useFilterProducts(products);

  const data = useAppSelector((state) => state.data);
  const snapshotData = data.snapshots;
  const dates = queryTime(snapshotData);

  const prices = useAppSelector((state) => state.prices.prices);

  useEffect(() => {
    fetchMMData({
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
    });
  }, [market, interval, data]);

  return (
    <>
      <ThreeGridLayout>
        <Card
          title="Total TVL"
          stat={TVL[TVL.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Deposits (24h)"
          stat={0}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Borrows (24h)"
          stat={0}
          currency={true}
          loading={data.loading}
        />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={filterdProducts?.MMProducts}
        />
        <IntervalTab interval={interval} setInterval={setInterval} />
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="TVL & Net Inflows/Outflows"
            text="The TVL and Net Inflows/Outflows of the selected market."
          />
          <LineBarChart
            dates={dates}
            cumulative={TVL}
            daily={netFlows}
            data_1="Net Flows"
            data_2="TVL"
            currency={true}
            loading={data.loading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Deposits"
            text="The daily vs cumulative deposits on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={Borrows}
            daily={DailyBorrows}
            data_1="Daily Deposits"
            data_2="Cummulative Deposits"
            currency={true}
            loading={data.loading}
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
            data_1="Daily Borrows"
            data_2="Cummulative Borrows"
            currency={true}
            loading={data.loading}
          />
        </ChartContainer>
        {market !== 'all' && (
          <>
            <ChartContainer>
              <ChartHeader
                title="Deposit Rate"
                text="The deposit rate over the set period."
              />
              <LineChart
                dates={dates}
                data={DepositRate}
                data_1="Deposit Rate"
                format={'0.[00000]%'}
                loading={data.loading}
              />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Borrow Rate"
                text="The borrow rate over the set period."
              />
              <LineChart
                dates={dates}
                data={BorrowRate}
                data_1="Borrow Rate"
                format={'0.[00000]%'}
                loading={data.loading}
              />
            </ChartContainer>
          </>
        )}
      </ChartsLayout>
    </>
  );
}
