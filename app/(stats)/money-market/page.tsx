'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';
import { MarketValues } from './MarketValues';
import { IntervalProps } from '@/app/types/IntervalProps';

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
    </>
  );
}
