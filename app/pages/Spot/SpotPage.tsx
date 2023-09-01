'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalDropdown from '@/app/components/main/IntervalDropdown';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import { useSpotData } from './hooks/useSpotData';
import { PageProps } from '@/app/types/types';
const _ = require('lodash');

export default function Spot({
  interval,
  setInterval,
  intervalText,
  intervalSubText,
}: PageProps) {
  const [market, setMarket] = useState('all');
  const {
    isLoading,
    spotProducts,
    dates,
    cumulativeSpotTradingVolume,
    dailySpotTradingVolume,
    cumulativeSpotTrades,
    dailySpotTrades,
    totalSpotVol,
    lastDaySpotTradingVolume,
    lastDaySpotTrades,
  } = useSpotData(market);

  return (
    <>
      <ThreeGridLayout>
        <Card
          title="Total Spot Volume"
          stat={totalSpotVol}
          currency={true}
          loading={isLoading}
        />
        <Card
          title={`Spot Volume ${intervalSubText}`}
          stat={lastDaySpotTradingVolume}
          currency={true}
          loading={isLoading}
        />
        <Card
          title={`Spot Trades ${intervalSubText}`}
          stat={lastDaySpotTrades}
          currency={false}
          loading={isLoading}
        />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={spotProducts}
        />
        <IntervalDropdown interval={interval} setInterval={setInterval} />
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="Spot Trading Volume"
            text={`The ${intervalText} vs cumulative spot trading volume on Vertex.`}
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeSpotTradingVolume}
            daily={dailySpotTradingVolume}
            data_1={`${_.capitalize(intervalText)} Spot Vol`}
            data_2="Cum. Spot Vol."
            currency={true}
            loading={isLoading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="# of Spot Trades"
            text={`The ${intervalText} vs cumulative spot trades on Vertex.`}
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeSpotTrades}
            daily={dailySpotTrades}
            data_1={`${_.capitalize(intervalText)} Spot Trades`}
            data_2="Cum. Spot Trades"
            currency={false}
            loading={isLoading}
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
