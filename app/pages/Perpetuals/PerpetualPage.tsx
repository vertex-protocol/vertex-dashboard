'use client';

import Card from '../../components/main/Card';
import IntervalDropdown from '@/app/components/main/IntervalDropdown';
import FourGridLayout from '../../components/layout/FourGridLayout';
import MktDropdown from '../../components/main/MktDropdown';
import ControlsLayout from '../../components/layout/ControlsLayout';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import LineChart from '@/app/components/main/chart/LineChart';
import { usePerpetualData } from './hooks/usePerpetualData';
import { useState } from 'react';
import { PageProps } from '@/app/types/types';
const _ = require('lodash');

export default function Perpetual({
  interval,
  setInterval,
  intervalText,
  intervalSubText,
}: PageProps) {
  const [market, setMarket] = useState('all');

  const {
    isLoading,
    perpProducts,
    dates,
    cumulativePerpTradingVolume,
    dailyPerpTradingVolume,
    openInterest,
    cumulativePerpTrades,
    dailyPerpTrades,
    hourlyFunding,
    dailyFunding,
    annualFunding,
    totalPerpVolume,
    lastDayPerpVolume,
    totalOpenInterest,
    lastDayPerpTrades,
  } = usePerpetualData(market);

  return (
    <>
      <FourGridLayout>
        <Card
          title="Total Perp Volume"
          stat={totalPerpVolume}
          currency={true}
          loading={isLoading}
        />
        <Card
          title={`Perp Volume ${intervalSubText}`}
          stat={lastDayPerpVolume}
          currency={true}
          loading={isLoading}
        />
        <Card
          title="Open Interest"
          stat={totalOpenInterest}
          currency={true}
          loading={isLoading}
        />
        <Card
          title={`Perp Trades ${intervalSubText}`}
          stat={lastDayPerpTrades}
          currency={false}
          loading={isLoading}
        />
      </FourGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={perpProducts}
        />
        <IntervalDropdown interval={interval} setInterval={setInterval} />
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="Perp Trading Volume"
            text={`The ${intervalText} vs cumulative perp trading volume on Vertex.`}
          ></ChartHeader>
          <LineBarChart
            dates={dates}
            cumulative={cumulativePerpTradingVolume}
            daily={dailyPerpTradingVolume}
            data_1={`${_.capitalize(intervalText)} Perp Vol`}
            data_2="Cum. Perp Vol."
            currency={true}
            loading={isLoading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Open Interest"
            text="The open interest on Vertex."
          ></ChartHeader>
          <LineChart
            dates={dates}
            data={openInterest}
            data_1="Open Interest"
            format={'$0.[00]a'}
            loading={isLoading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="# of Perp Trades"
            text={`The ${intervalText} vs cumulative perp trades on Vertex.`}
          ></ChartHeader>
          <LineBarChart
            dates={dates}
            cumulative={cumulativePerpTrades}
            daily={dailyPerpTrades}
            data_1={`${_.capitalize(intervalText)} Perp Trades`}
            data_2="Cum. Perp Trades"
            currency={false}
            loading={isLoading}
          />
        </ChartContainer>
        {market !== 'all' && (
          <>
            <ChartContainer>
              <ChartHeader
                title="Funding Rate (1h)"
                text="The hourly funding rate over the set period."
              ></ChartHeader>
              <LineChart
                dates={dates}
                data={hourlyFunding}
                data_1="Hourly Funding"
                format={'0.[00000]%'}
                loading={isLoading}
              />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Funding Rate (Annualized)"
                text="The annualized funding rate over the set period."
              ></ChartHeader>
              <LineChart
                dates={dates}
                data={annualFunding}
                data_1="Annualized Funding"
                format={'0.[00000]%'}
                loading={isLoading}
              />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Funding Rate (24h)"
                text="The daily funding rate over the set period."
              ></ChartHeader>
              <LineChart
                dates={dates}
                data={dailyFunding}
                data_1="Daily Funding"
                format={'0.[00000]%'}
                loading={isLoading}
              />
            </ChartContainer>
          </>
        )}
      </ChartsLayout>
    </>
  );
}
