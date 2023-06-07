'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';
import { SpotValues } from './SpotValues';
import { IntervalProps } from '@/app/types/IntervalProps';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';

export default function Spot({ interval, setInterval }: IntervalProps) {
  const [market, setMarket] = useState('all-spot');

  return (
    <>
      <ThreeGridLayout>
        <Card
          title="Total Spot Volume"
          stat={2.21}
          daily={14.08}
          format={true}
        />
        <Card
          title="Spot Volume (24h)"
          stat={2.21}
          daily={14.08}
          format={true}
        />
        <Card
          title="Spot Trades (24h)"
          stat={1023}
          daily={14.08}
          format={false}
        />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={SpotValues}
        />
        <IntervalTab interval={interval} setInterval={setInterval} />
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="Spot Trading Volume"
            text="The daily vs cumulative spot trading volume on Vertex."
          />
          <LineBarChart />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="# of Spot Trades"
            text="The number of spot trades over the set period."
          />
          <LineBarChart />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
