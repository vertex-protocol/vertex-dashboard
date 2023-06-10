'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import FourGridLayout from '../../components/layout/FourGridLayout';
import MktDropdown from '../../components/main/MktDropdown';
import ControlsLayout from '../../components/layout/ControlsLayout';
import { PerpValues } from './PerpValues';
import { IntervalProps } from '@/app/types/IntervalProps';
import { useAppSelector } from '@/app/redux/store';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import LineChart from '@/app/components/main/chart/LineChart';
import { queryTime } from '@/app/hooks/queryTime';
import { fetchPerpData } from '@/app/hooks/fetchPerpData';

export default function Perps({ interval, setInterval }: IntervalProps) {
  const [market, setMarket] = useState('all-perp');

  // Perp Trading Vol
  const [PerpVol, setPerpVol] = useState<number[]>([]);
  const [DailyPerpVol, setDailyPerpVol] = useState<number[]>([]);

  // Open Interest
  const [OpenInt, setOpenInt] = useState<number[]>([]);
  const [DailyOpenInt, setDailyOpenInt] = useState<number[]>([]);

  // # of Perp Trades
  const [PerpTrades, setPerpTrades] = useState<number[]>([]);
  const [DailyPerpTrades, setDailyPerpTrades] = useState<number[]>([]);

  // Hourly Funding Rate
  const [hourlyFunding, setHourlyFunding] = useState<number[]>([]);

  // Hourly Funding Rate
  const [dailyFunding, setDailyFunding] = useState<number[]>([]);

  // Hourly Funding Rate
  const [annualFunding, setAnnualFunding] = useState<number[]>([]);

  const data = useAppSelector((state) => state.data.data);
  const dates = queryTime(data);

  useEffect(() => {
    fetchPerpData({
      data,
      market,
      setPerpVol,
      setDailyPerpVol,
      setOpenInt,
      setDailyOpenInt,
      setPerpTrades,
      setDailyPerpTrades,
      setHourlyFunding,
      setDailyFunding,
      setAnnualFunding,
    });
  }, [market, interval, data]);

  return (
    <>
      <FourGridLayout>
        <Card
          title="Total Perpetual Volume"
          stat={2.21}
          daily={14.08}
          format={true}
        />
        <Card
          title="Perpetual Volume (24h)"
          stat={2.21}
          daily={14.08}
          format={true}
        />
        <Card
          title="Total Open Interest"
          stat={1023}
          daily={14.08}
          format={true}
        />
        <Card
          title="Perpetual Trades (24h)"
          stat={202}
          daily={14}
          format={false}
        />
      </FourGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={PerpValues}
        />
        <IntervalTab interval={interval} setInterval={setInterval} />
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
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Total Open Interest"
            text="The daily vs cumulative open interest on Vertex."
          ></ChartHeader>
          <LineBarChart
            dates={dates}
            cumulative={OpenInt}
            daily={DailyOpenInt}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="# of Perp Trades"
            text="The daily vs cumulative perp trades over the set period.
            "
          ></ChartHeader>
          <LineBarChart
            dates={dates}
            cumulative={PerpTrades}
            daily={DailyPerpTrades}
          />
        </ChartContainer>
        {market !== 'all-perp' && (
          <>
            <ChartContainer>
              <ChartHeader
                title="Funding Rate (1h)"
                text="The hourly funding rate over the set period."
              ></ChartHeader>
              <LineChart dates={dates} data={hourlyFunding} />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Funding Rate (Annualized)"
                text="The annualized funding rate over the set period."
              ></ChartHeader>
              <LineChart dates={dates} data={annualFunding} />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Funding Rate (24h)"
                text="The daily funding rate over the set period."
              ></ChartHeader>
              <LineChart dates={dates} data={dailyFunding} />
            </ChartContainer>
          </>
        )}
      </ChartsLayout>
    </>
  );
}
