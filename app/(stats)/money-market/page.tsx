'use client';

import { useState } from 'react';
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

export default function MoneyMarket({ interval, setInterval }: IntervalProps) {
  const [market, setMarket] = useState('all-mkt');

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
            title="Deposit Rate"
            text="The deposit rate over the set period."
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Borrow Rate"
            text="The borrow rate over the set period."
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Deposits"
            text="The daily vs cumulative deposits on Vertex."
          />
          <LineBarChart />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Borrows"
            text="The daily vs cumulative borrows on Vertex."
          />
          <LineBarChart />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
