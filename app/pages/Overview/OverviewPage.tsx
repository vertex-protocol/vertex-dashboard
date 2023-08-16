'use client';

import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import IntervalDropdown from '@/app/components/main/IntervalDropdown';
import FourGridLayout from '../../components/layout/FourGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import ChartsLayout from '../../components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import LineChart from '@/app/components/main/chart/LineChart';
import IntervalProps from '../../types/IntervalProps';
import { useViewportWidth } from '../../hooks/useViewportWidth';
import { useOverviewData } from './hooks/useOverviewData';

export default function Overview({ interval, setInterval }: IntervalProps) {
  const { isMobile } = useViewportWidth();

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
          title="Trading Volume (24h)"
          stat={pastDayTradingVolume}
          currency={true}
          loading={isLoading}
        />
        <Card
          title="Total Users"
          stat={totalUsers}
          currency={false}
          loading={isLoading}
        />
        <Card
          title="Fees (24h)"
          stat={pastDayFees}
          currency={true}
          loading={isLoading}
        />
      </FourGridLayout>
      <ControlsLayout justify="end">
        {isMobile ? (
          <IntervalDropdown interval={interval} setInterval={setInterval} />
        ) : (
          <IntervalTab interval={interval} setInterval={setInterval} />
        )}
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="Trading Volume"
            text="The daily vs cumulative trading volume on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeTradingVolume}
            daily={dailyTradingVolume}
            data_1="Daily Vol."
            data_2="Cum. Vol."
            loading={isLoading}
            currency={true}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Users"
            text="The daily new users vs cumulative users on Vertex."
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
            title="Daily Active Users"
            text="The daily active users on Vertex. Updated hourly on a daily interval (9:00AM EST)."
          ></ChartHeader>
          <LineChart
            dates={dates}
            data={dailyActiveUsers}
            data_1="DAU"
            format={'0.a'}
            loading={isLoading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Protocol Fees"
            text="Cumulative trading fees paid by traders."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeFees}
            daily={dailyFees}
            data_1="Daily Fees"
            data_2="Cum. Fees"
            loading={isLoading}
            currency={true}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Liquidations"
            text="The daily vs cumulative liquidations on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeLiquidations}
            daily={dailyLiquidations}
            data_1="Daily Liqs"
            data_2="Cum. Liqs"
            loading={isLoading}
            currency={true}
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
