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
import { useAppSelector } from '@/app/redux/store';
import { queryTime } from '@/app/hooks/queryTime';
import { queryAllProduct } from '@/app/hooks/queryAllProduct';
import { queryUsers } from '@/app/hooks/queryUsers';
import { queryDaily } from '@/app/hooks/queryDaily';
import { queryDAU } from '@/app/hooks/queryDAU';
import IntervalProps from '../../types/IntervalProps';
import { useViewportWidth } from '../../hooks/useViewportWidth';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';

export default function Overview({ interval, setInterval }: IntervalProps) {
  const { isMobile } = useViewportWidth();
  const data = useAppSelector((state) => state.data);

  const products = useAppSelector((state) => state.product.products);
  const filterdProducts = useFilterProducts(products);

  const dates = queryTime(data.snapshots);

  // Trading Vol
  const cumulativeVol = queryAllProduct(
    data.snapshots,
    'cumulative_volumes',
    filterdProducts?.AllProducts,
  );
  const dailyVol = queryDaily(cumulativeVol);
  cumulativeVol.shift();

  // Fees
  const cumulativeFees = queryAllProduct(
    data.snapshots,
    'cumulative_taker_fees',
    filterdProducts?.AllProducts,
  );
  const dailyFees = queryDaily(cumulativeFees);
  cumulativeFees.shift();

  // Liquidation
  const cumulativeLiq = queryAllProduct(
    data.snapshots,
    'cumulative_liquidation_amounts',
    filterdProducts?.AllProducts,
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
          stat={DAU[DAU.length - 1]}
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
            title="Daily Active Users"
            text="The daily active users on Vertex."
          ></ChartHeader>
          <LineChart
            dates={dates}
            data={DAU}
            data_1="DAU"
            format={'0.a'}
            loading={data.loading}
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
            title="Liquidations"
            text="The daily vs cumulative liquidations on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={cumulativeLiq}
            daily={dailyLiq}
            data_1="Daily Liquidations"
            data_2="Cumulative Liquidations"
            loading={data.loading}
            currency={true}
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
