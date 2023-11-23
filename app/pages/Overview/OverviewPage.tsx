'use client';

import Card from '../../components/main/Card';
import IntervalDropdown from '@/app/components/main/IntervalDropdown';
import FourGridLayout from '../../components/layout/FourGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import ChartsLayout from '../../components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import LineChart from '@/app/components/main/chart/LineChart';
import { useOverviewData } from './hooks/useOverviewData';
import { PageProps } from '@/app/types/types';
const _ = require('lodash');

export default function Overview({
  interval,
  setInterval,
  intervalText,
  intervalSubText,
}: PageProps) {
  const {
    isLoading,
    dates,
    cumulativeTradingVolume,
    dailyTradingVolume,
    cumulativeUsers,
    dailyUsers,
    dailyActiveUsers,
    cumulativeFees,
    dailyFees,
    cumulativeLiquidations,
    dailyLiquidations,
    totalTradingVolume,
    pastDayTradingVolume,
    totalUsers,
    pastDayFees,
  } = useOverviewData();

  return (
    <>
      <FourGridLayout>
        <Card
          title="Total Trading Volume"
          stat={totalTradingVolume}
          currency={true}
          loading={isLoading}
        />
        <Card
          title={`Trading Volume ${intervalSubText}`}
          stat={pastDayTradingVolume}
          currency={true}
          loading={isLoading}
          tooltipContent="24h period starts at 0:00 UTC."
        />
        <Card
          title="Total Users"
          stat={totalUsers}
          currency={false}
          loading={isLoading}
        />
        <Card
          title={`Fees ${intervalSubText}`}
          stat={pastDayFees}
          currency={true}
          loading={isLoading}
          tooltipContent="24h period starts at 0:00 UTC."
        />
      </FourGridLayout>
      <ControlsLayout justify="end">
        <IntervalDropdown interval={interval} setInterval={setInterval} />
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="Trading Volume"
            text={`The ${intervalText} vs cumulative trading volume on Vertex. 24h period starts at 0:00 UTC.`}
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeTradingVolume}
            daily={dailyTradingVolume}
            data_1={`${_.capitalize(intervalText)} Vol.`}
            data_2="Cum. Vol."
            loading={isLoading}
            currency={true}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Users"
            text={`The ${intervalText} new users vs cumulative users on Vertex.`}
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeUsers}
            daily={dailyUsers}
            data_1="New Users"
            data_2="Cum. Users"
            loading={isLoading}
            currency={false}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title={`${_.capitalize(intervalText)} Active Users`}
            text={`The ${intervalText} active users on Vertex. Updated hourly on a daily interval at 14:00 UTC.`}
          ></ChartHeader>
          <LineChart
            dates={dates}
            data={dailyActiveUsers}
            data_1="Active Users"
            format={'0.a'}
            loading={isLoading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Protocol Fees"
            text="The daily trading fees vs cumulative trading fees paid by traders."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeFees}
            daily={dailyFees}
            data_1={`${_.capitalize(intervalText)} Fees`}
            data_2="Cum. Fees"
            loading={isLoading}
            currency={true}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Liquidations"
            text={`The ${intervalText} vs cumulative liquidations on Vertex.`}
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeLiquidations}
            daily={dailyLiquidations}
            data_1={`${_.capitalize(intervalText)} Liqs`}
            data_2="Cum. Liqs"
            loading={isLoading}
            currency={true}
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
