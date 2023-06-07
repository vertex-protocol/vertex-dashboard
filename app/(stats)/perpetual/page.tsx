'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import FourGridLayout from '../../components/layout/FourGridLayout';
import MktDropdown from '../../components/main/MktDropdown';
import ControlsLayout from '../../components/layout/ControlsLayout';
import { PerpValues } from './PerpValues';
import { IntervalProps } from '@/app/types/IntervalProps';

export default function Perps({ interval, setInterval }: IntervalProps) {
  const [market, setMarket] = useState('all-perp');

  return (
    <>
      <FourGridLayout>
        <Card
          title="Total Perpetual Volume"
          stat={2.21}
          daily={14.08}
          format={true}
        />
        <Card
          title="Perpetual Volume (24h)"
          stat={2.21}
          daily={14.08}
          format={true}
        />
        <Card
          title="Total Open Interest"
          stat={1023}
          daily={14.08}
          format={true}
        />
        <Card
          title="Perpetual Trades (24h)"
          stat={202}
          daily={14}
          format={false}
        />
      </FourGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={PerpValues}
        />
        <IntervalTab interval={interval} setInterval={setInterval} />
      </ControlsLayout>
    </>
  );
}
