'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import IntervalDropdown from '@/app/components/main/IntervalDropdown';
import FourGridLayout from '../../components/layout/FourGridLayout';
import MktDropdown from '../../components/main/MktDropdown';
import ControlsLayout from '../../components/layout/ControlsLayout';
import { useAppSelector } from '@/app/redux/store';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import LineChart from '@/app/components/main/chart/LineChart';
import { queryTime } from '@/app/hooks/queryTime';
import { fetchPerpData } from '@/app/hooks/fetchPerpData';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';
import IntervalProps from '../../types/IntervalProps';
import { useViewportWidth } from '../../hooks/useViewportWidth';

export default function Perpetual({ interval, setInterval }: IntervalProps) {
  const { isMobile } = useViewportWidth();
  const [market, setMarket] = useState('all');

  // Perp Trading Vol
  const [PerpVol, setPerpVol] = useState<number[]>([]);
  const [DailyPerpVol, setDailyPerpVol] = useState<number[]>([]);

  // Open Interest
  const [OpenInt, setOpenInt] = useState<number[]>([]);

  // # of Perp Trades
  const [PerpTrades, setPerpTrades] = useState<number[]>([]);
  const [DailyPerpTrades, setDailyPerpTrades] = useState<number[]>([]);

  // Hourly Funding Rate
  const [hourlyFunding, setHourlyFunding] = useState<number[]>([]);

  // Hourly Funding Rate
  const [dailyFunding, setDailyFunding] = useState<number[]>([]);

  // Hourly Funding Rate
  const [annualFunding, setAnnualFunding] = useState<number[]>([]);

  const products = useAppSelector((state) => state.product.products);
  const filterdProducts = useFilterProducts(products);

  const data = useAppSelector((state) => state.data);
  const snapshotData = data.snapshots;
  const dates = queryTime(snapshotData);

  useEffect(() => {
    fetchPerpData({
      snapshotData,
      market,
      setPerpVol,
      setDailyPerpVol,
      setOpenInt,
      setPerpTrades,
      setDailyPerpTrades,
      setHourlyFunding,
      setDailyFunding,
      setAnnualFunding,
      filterdProducts,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market, interval, data]);

  return (
    <>
      <FourGridLayout>
        <Card
          title="Total Perpetual Volume"
          stat={PerpVol[PerpVol.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Perpetual Volume (24h)"
          stat={DailyPerpVol[DailyPerpVol.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Open Interest"
          stat={OpenInt[OpenInt.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Perpetual Trades (24h)"
          stat={DailyPerpTrades[DailyPerpTrades.length - 1]}
          currency={false}
          loading={data.loading}
        />
      </FourGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={filterdProducts?.PerpProducts}
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
            title="Perpetual Trading Volume"
            text="The daily vs cumulative perp trading volume on Vertex."
          ></ChartHeader>
          <LineBarChart
            dates={dates}
            cumulative={PerpVol}
            daily={DailyPerpVol}
            data_1="Daily Perp Vol"
            data_2="Cumulative Perp Vol"
            currency={true}
            loading={data.loading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Open Interest"
            text="The open interest on Vertex."
          ></ChartHeader>
          <LineChart
            dates={dates}
            data={OpenInt}
            data_1="Open Interest"
            format={'$0.[00]a'}
            loading={data.loading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="# of Perp Trades"
            text="The daily vs cumulative perp trades on Vertex.
            "
          ></ChartHeader>
          <LineBarChart
            dates={dates}
            cumulative={PerpTrades}
            daily={DailyPerpTrades}
            data_1="Daily Perp Trades"
            data_2="Cumulative Perp Trades"
            currency={false}
            loading={data.loading}
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
                loading={data.loading}
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
                loading={data.loading}
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
                loading={data.loading}
              />
            </ChartContainer>
          </>
        )}
      </ChartsLayout>
    </>
  );
}
