'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import IntervalDropdown from '@/app/components/main/IntervalDropdown';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import IntervalProps from '../../types/IntervalProps';
import { useViewportWidth } from '@/app/hooks/useViewportWidth';
import { useSpotData } from './hooks/useSpotData';

export default function Spot({ interval, setInterval }: IntervalProps) {
  const { isMobile } = useViewportWidth();
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
          title="Spot Volume (24h)"
          stat={lastDaySpotTradingVolume}
          currency={true}
          loading={isLoading}
        />
        <Card
          title="Spot Trades (24h)"
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
        {isMobile ? (
          <IntervalDropdown interval={interval} setInterval={setInterval} />
        ) : (
          <IntervalTab interval={interval} setInterval={setInterval} />
        )}
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="Spot Trading Volume"
            text="The daily vs cumulative spot trading volume on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeSpotTradingVolume}
            daily={dailySpotTradingVolume}
            data_1="Daily Spot Vol."
            data_2="Cum. Spot Vol."
            currency={true}
            loading={isLoading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="# of Spot Trades"
            text="The daily vs cumulative spot trades on Vertex.
            "
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeSpotTrades}
            daily={dailySpotTrades}
            data_1="Daily Spot Trades"
            data_2="Cum. Spot Trades"
            currency={false}
            loading={isLoading}
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
