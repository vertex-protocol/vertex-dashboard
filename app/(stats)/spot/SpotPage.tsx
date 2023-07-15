'use client';

import { useState, useEffect } from 'react';
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
import { useAppSelector } from '@/app/redux/store';
import { queryTime } from '@/app/hooks/queryTime';
import { fetchSpotData } from '@/app/hooks/fetchSpotData';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';
import IntervalProps from '../../types/IntervalProps';
import { useViewportWidth } from '@/app/hooks/useViewportWidth';

export default function Spot({ interval, setInterval }: IntervalProps) {
  const { isMobile } = useViewportWidth();
  const [market, setMarket] = useState('all');

  // Spot Trading Vol
  const [SpotVol, setSpotVol] = useState<number[]>([]);
  const [DailySpotVol, setDailySpotVol] = useState<number[]>([]);

  // # of Spot Trades
  const [SpotTrades, setSpotTrades] = useState<number[]>([]);
  const [DailySpotTrades, setDailySpotTrades] = useState<number[]>([]);

  const products = useAppSelector((state) => state.product.products);
  const filterdProducts = useFilterProducts(products);

  const data = useAppSelector((state) => state.data);
  const snapshotData = data.snapshots;
  const dates = queryTime(snapshotData);

  useEffect(() => {
    fetchSpotData({
      snapshotData,
      market,
      setSpotVol,
      setDailySpotVol,
      setSpotTrades,
      setDailySpotTrades,
      filterdProducts,
    });
  }, [market, interval, data]);

  return (
    <>
      <ThreeGridLayout>
        <Card
          title="Total Spot Volume"
          stat={SpotVol[SpotVol.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Spot Volume (24h)"
          stat={DailySpotVol[DailySpotVol.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Spot Trades (24h)"
          stat={DailySpotTrades[DailySpotTrades.length - 1]}
          currency={false}
          loading={data.loading}
        />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={filterdProducts?.SpotProducts}
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
            cumulative={SpotVol}
            daily={DailySpotVol}
            data_1="Daily Spot Vol"
            data_2="Cumulative Spot Vol"
            currency={true}
            loading={data.loading}
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
            cumulative={SpotTrades}
            daily={DailySpotTrades}
            data_1="Daily Spot Trades"
            data_2="Cumulative Spot Trades"
            currency={false}
            loading={data.loading}
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
