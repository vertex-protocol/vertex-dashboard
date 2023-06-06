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

export default function Overview({ interval, setInterval }: IntervalProps) {
  const data = useAppSelector((state) => state.data.data);
  const dates = queryTime(data);
  const cumulativeVol = queryTotal(data, 'cumulative_volumes');
  const cumulativeFees = queryTotal(data, 'cumulative_fees');
  const cumulativeLiq = queryTotal(data, 'cumulative_liquidations');
  const cumulativeUsers = queryUsers(data);

  const dailyVol = queryDaily(cumulativeVol);
  const dailyFees = queryDaily(cumulativeFees);
  const dailyLiq = queryDaily(cumulativeLiq);
  const dailyUsers = queryDaily(cumulativeUsers);

  return (
    <>
      <FourGridLayout>
        <Card title="Total Trading Volume" stat={2.21} daily={14.08} />
        <Card title="Trading Volume (24h)" stat={2.21} daily={14.08} />
        <Card title="Users (24h)" stat={1023} daily={14.08} />
        <Card title="Fees (24h)" stat={2.21} daily={14.08} />
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
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Users"
            text="The daily vs cumulative users on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeUsers}
            daily={dailyUsers}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Fees"
            text="The daily vs cumulative fees on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeFees}
            daily={dailyFees}
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
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
