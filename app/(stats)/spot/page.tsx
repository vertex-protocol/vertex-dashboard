'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';
import { SpotValues } from './SpotValues';
import { IntervalProps } from '@/app/types/IntervalProps';
import ChartsLayout from '@/app/components/layout/ChartsLayout';
import ChartContainer from '@/app/components/main/chart/ChartContainer';
import ChartHeader from '@/app/components/main/chart/ChartHeader';
import LineBarChart from '@/app/components/main/chart/LineBar_Chart';
import { useAppSelector } from '@/app/redux/store';
import { queryTime } from '@/app/hooks/queryTime';
import { queryProduct } from '@/app/hooks/queryProduct';
import { queryDaily } from '@/app/hooks/queryDaily';

export default function Spot({ interval, setInterval }: IntervalProps) {
  const [market, setMarket] = useState('all-spot');

  // Spot Trading Vol
  const [SpotVol, setSpotVol] = useState<number[]>([]);
  const [DailySpotVol, setDailySpotVol] = useState<number[]>([]);

  // # of Spot Trades
  const [SpotTrades, setSpotTrades] = useState<number[]>([]);
  const [DailySpotTrades, setDailySpotTrades] = useState<number[]>([]);

  const data = useAppSelector((state) => state.data.data);
  const dates = queryTime(data);

  useEffect(() => {
    const fetchSpotData = () => {
      if (!data) return; // Return early if data is not available

      switch (market) {
        case 'all-spot':
          // Spot Trading Vol
          const allSpotVol = queryProduct(data, 'cumulative_volumes', [1, 3]);
          const allDailySpotVol = queryDaily(allSpotVol);
          setSpotVol(allSpotVol);
          setDailySpotVol(allDailySpotVol);

          // # of Spot Trades
          const allSpotTrades = queryProduct(data, 'cumulative_trades', [1, 3]);
          const allDailySpotTrades = queryDaily(allSpotTrades);
          setSpotTrades(allSpotTrades);
          setDailySpotTrades(allDailySpotTrades);

          break;

        case 'btc-spot':
          // BTC-Spot Tarding Vol
          const BTCSpotVol = queryProduct(data, 'cumulative_volumes', [1]);
          const DailyBTCSpotVol = queryDaily(BTCSpotVol);
          setSpotVol(BTCSpotVol);
          setDailySpotVol(DailyBTCSpotVol);

          // # of BTC Spot Trades
          const BTCSpotTrades = queryProduct(data, 'cumulative_trades', [1]);
          const DailyBTCSpotTrades = queryDaily(BTCSpotTrades);
          setSpotTrades(BTCSpotTrades);
          setDailySpotTrades(DailyBTCSpotTrades);

          break;

        case 'eth-spot':
          // ETH-Spot Trading Vol
          const ETHSpotVol = queryProduct(data, 'cumulative_volumes', [3]);
          const DailyETHSpotVol = queryDaily(ETHSpotVol);
          setSpotVol(ETHSpotVol);
          setDailySpotVol(DailyETHSpotVol);

          // # of ETH Spot Trades
          const ETHSpotTrades = queryProduct(data, 'cumulative_trades', [3]);
          const DailyETHSpotTrades = queryDaily(ETHSpotTrades);
          setSpotTrades(ETHSpotTrades);
          setDailySpotTrades(DailyETHSpotTrades);

          break;

        default:
          break;
      }
    };

    fetchSpotData();
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
          values={SpotValues}
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
            text="The number of spot trades over the set period."
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
