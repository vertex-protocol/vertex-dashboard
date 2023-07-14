'use client';

import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import FourGridLayout from '../../components/layout/FourGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import ChartsLayout from '../../components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import { IntervalProps } from '@/app/types/IntervalProps';
import { useAppSelector } from '@/app/redux/store';
import { queryTime } from '@/app/hooks/queryTime';
import { queryTotal } from '@/app/hooks/queryTotal';
import { queryUsers } from '@/app/hooks/queryUsers';
import { queryDaily } from '@/app/hooks/queryDaily';
import { queryDAU } from '@/app/hooks/queryDAU';

export default function Overview({ interval, setInterval }: IntervalProps) {
  const data = useAppSelector((state) => state.data);

  const dates = queryTime(data.snapshots);

  // Trading Vol
  const cumulativeVol = queryTotal(data.snapshots, 'cumulative_volumes');
  const dailyVol = queryDaily(cumulativeVol);
  cumulativeVol.shift();

  // Fees
  const cumulativeFees = queryTotal(data.snapshots, 'cumulative_taker_fees');
  const dailyFees = queryDaily(cumulativeFees);
  cumulativeFees.shift();

  // Liquidation
  const cumulativeLiq = queryTotal(
    data.snapshots,
    'cumulative_liquidation_amount',
  );
  const dailyLiq = queryDaily(cumulativeLiq);
  cumulativeLiq.shift();

  // Users
  const cumulativeUsers = queryUsers(data.snapshots);
  const dailyUsers = queryDaily(cumulativeUsers);
  cumulativeUsers.shift();

  // DAU
  const DAU = queryDAU(data.snapshots);

  return (
    <>
      <FourGridLayout>
        <Card
          title="Total Trading Volume"
          stat={cumulativeVol[cumulativeVol.length - 1]}
          daily={14.08}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Trading Volume (24h)"
          stat={dailyVol[dailyVol.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Daily Active Users"
          stat={DAU}
          currency={false}
          loading={data.loading}
        />
        <Card
          title="Fees (24h)"
          stat={dailyFees[dailyFees.length - 1]}
          currency={true}
          loading={data.loading}
        />
      </FourGridLayout>
      <ControlsLayout justify="end">
        <IntervalTab interval={interval} setInterval={setInterval} />
      </ControlsLayout>
      <ChartsLayout>
        <ChartContainer>
          <ChartHeader
            title="Trading Volume"
            text="The daily vs cumulative trading volume on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeVol}
            daily={dailyVol}
            data_1="Daily Volume"
            data_2="Cumulative Volume"
            loading={data.loading}
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
            data_2="Cumulative Users"
            loading={data.loading}
            currency={false}
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
            data_2="Cumulative Fees"
            loading={data.loading}
            currency={true}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Liquadations"
            text="The daily vs cumulative liquidations on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeLiq}
            daily={dailyLiq}
            data_1="Daily Liquadations"
            data_2="Cumulative Liquadations"
            loading={data.loading}
            currency={true}
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
