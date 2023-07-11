'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';
import { IntervalProps } from '@/app/types/IntervalProps';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import { useAppSelector } from '@/app/redux/store';
import { queryTime } from '@/app/hooks/queryTime';
import { fetchSpotData } from '@/app/hooks/fetchSpotData';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';

export default function Spot({ interval, setInterval }: IntervalProps) {
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
  const dates = queryTime(data.snapshots);

  useEffect(() => {
    fetchSpotData({
      data,
      market,
      setSpotVol,
      setDailySpotVol,
      setSpotTrades,
      setDailySpotTrades,
    });
  }, [market, interval, data]);

  return (
    <>
      <ThreeGridLayout>
        <Card
          title="Total Spot Volume"
          stat={2.21}
          daily={14.08}
          format={true}
        />
        <Card
          title="Spot Volume (24h)"
          stat={2.21}
          daily={14.08}
          format={true}
        />
        <Card
          title="Spot Trades (24h)"
          stat={1023}
          daily={14.08}
          format={false}
        />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={filterdProducts?.SpotProducts}
        />
        <IntervalTab interval={interval} setInterval={setInterval} />
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
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="# of Spot Trades"
            text="The daily vs cumulative spot trades over the set period.
            "
          />
          <LineBarChart
            dates={dates}
            cumulative={SpotTrades}
            daily={DailySpotTrades}
          />
        </ChartContainer>
      </ChartsLayout>
    </>
  );
}
