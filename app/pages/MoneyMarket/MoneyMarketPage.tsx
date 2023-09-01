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
import LineChart from '@/app/components/main/chart/LineChart';
import IntervalProps from '../../types/IntervalProps';
import { useViewportWidth } from '@/app/hooks/useViewportWidth';
import { useMoneyMarketData } from './hooks/useMoneyMarketData';

export default function MoneyMarket({ interval, setInterval }: IntervalProps) {
  const { isMobile } = useViewportWidth();
  const [market, setMarket] = useState('all');
  const {
    isLoading,
    dates,
    mmProducts,
    totalTvl,
    pastDayDeposits,
    pastDayWithdrawals,
    cumulativeTvl,
    netFlows,
    cumulativeDeposits,
    dailyDeposits,
    cumulativeWithdrawals,
    dailyWithdrawals,
    depositRate,
    borrowRate,
  } = useMoneyMarketData(market);

  return (
    <>
      <ThreeGridLayout>
        <Card
          title="Total TVL"
          stat={totalTvl}
          currency={true}
          loading={isLoading}
        />
        <Card
          title="Deposits (24h)"
          stat={pastDayDeposits}
          currency={true}
          loading={isLoading}
        />
        <Card
          title="Withdrawals (24h)"
          stat={pastDayWithdrawals}
          currency={true}
          loading={isLoading}
        />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={mmProducts}
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
            title="TVL & Net Inflows/Outflows"
            text="The TVL and Net Inflows/Outflows of the selected market."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeTvl}
            daily={netFlows}
            data_1="Net Flows"
            data_2="TVL"
            currency={true}
            loading={isLoading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Deposits"
            text="The daily vs cumulative deposits on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeDeposits}
            daily={dailyDeposits}
            data_1="Daily Deposits"
            data_2="Cum. Deposits"
            currency={true}
            loading={isLoading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Withdraws"
            text="The daily vs cumulative withdrawals on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeWithdrawals}
            daily={dailyWithdrawals}
            data_1="Daily Withdrawals"
            data_2="Cum. Withdrawals"
            currency={true}
            loading={isLoading}
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
                data={depositRate}
                data_1="Deposit Rate"
                format={'0.[00000]%'}
                loading={isLoading}
              />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Borrow Rate"
                text="The borrow rate over the set period."
              />
              <LineChart
                dates={dates}
                data={borrowRate}
                data_1="Borrow Rate"
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
