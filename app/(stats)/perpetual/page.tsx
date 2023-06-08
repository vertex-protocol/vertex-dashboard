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
import { queryTime } from '@/app/hooks/queryTime';
import { queryProduct } from '@/app/hooks/queryProduct';
import { queryDaily } from '@/app/hooks/queryDaily';
import { queryFundingRates } from '@/app/hooks/queryFundingRates';

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

  // TODO: extract fetchPerpData() into a hook

  useEffect(() => {
    const fetchPerpData = () => {
      if (!data) return; // Return early if data is not available

      switch (market) {
        case 'all-perp':
          // Perp Trading Vol
          const allPerpVol = queryProduct(data, 'cumulative_volumes', [2, 4]);
          const allDailyPerpVol = queryDaily(allPerpVol);
          setPerpVol(allPerpVol);
          setDailyPerpVol(allDailyPerpVol);

          // Open Interest
          const allOpenInt = queryProduct(data, 'open_interests', [2, 4]);
          const allDailyOpenInt = queryDaily(allOpenInt);
          setOpenInt(allOpenInt);
          setDailyOpenInt(allDailyOpenInt);

          // # of Perp Trades
          const allPerpTrades = queryProduct(data, 'cumulative_trades', [2, 4]);
          const allDailyPerpTrades = queryDaily(allPerpTrades);
          setPerpTrades(allPerpTrades);
          setDailyPerpTrades(allDailyPerpTrades);

          break;

        case 'btc-perp':
          console.log('fetch btc perp');
          // BTC-Perp Tarding Vol
          const BTCPerpVol = queryProduct(data, 'cumulative_volumes', [2]);
          const DailyBTCPerpVol = queryDaily(BTCPerpVol);
          setPerpVol(BTCPerpVol);
          setDailyPerpVol(DailyBTCPerpVol);

          // BTC-Perp Open Interest
          const BTCOpenInt = queryProduct(data, 'open_interests', [2]);
          const DailyBTCOpenInt = queryDaily(BTCOpenInt);
          setOpenInt(BTCOpenInt);
          setDailyOpenInt(DailyBTCOpenInt);

          // # of BTC Perp Trades
          const BTCPerpTrades = queryProduct(data, 'cumulative_trades', [2]);
          const DailyBTCPerpTrades = queryDaily(BTCPerpTrades);
          setPerpTrades(BTCPerpTrades);
          setDailyPerpTrades(DailyBTCPerpTrades);

          // TODO: Fetch fundingRates
          const BTChourlyFunding = queryFundingRates(data, 'hourly', [2]);
          const BTCdailyFunding = queryFundingRates(data, 'daily', [2]);
          const BTCannualFunding = queryFundingRates(data, 'annual', [2]);
          setHourlyFunding(BTChourlyFunding);
          setDailyFunding(BTCdailyFunding);
          setAnnualFunding(BTCannualFunding);

          break;

        case 'eth-perp':
          console.log('fetch eth perp');
          // TODO: Fetch and update data specific to the 'eth-perp' market
          // ETH-Perp Trading Vol
          const ETHPerpVol = queryProduct(data, 'cumulative_volumes', [4]);
          const DailyETHPerpVol = queryDaily(ETHPerpVol);
          setPerpVol(ETHPerpVol);
          setDailyPerpVol(DailyETHPerpVol);

          // ETH-Perp Open Interest
          const ETHOpenInt = queryProduct(data, 'open_interests', [4]);
          const DailyETHOpenInt = queryDaily(ETHOpenInt);
          setOpenInt(ETHOpenInt);
          setDailyOpenInt(DailyETHOpenInt);

          // # of ETH Perp Trades
          const ETHPerpTrades = queryProduct(data, 'cumulative_trades', [4]);
          const DailyETHPerpTrades = queryDaily(ETHPerpTrades);
          setPerpTrades(ETHPerpTrades);
          setDailyPerpTrades(DailyETHPerpTrades);

          // TODO: Fetch fundingRates
          const ETHhourlyFunding = queryFundingRates(data, 'hourly', [4]);
          const ETHdailyFunding = queryFundingRates(data, 'daily', [4]);
          const ETHannualFunding = queryFundingRates(data, 'annual', [4]);
          setHourlyFunding(ETHhourlyFunding);
          setDailyFunding(ETHdailyFunding);
          setAnnualFunding(ETHannualFunding);

          break;

        default:
          break;
      }
    };

    fetchPerpData();
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
            text="The daily vs cumulative of perp trading volume on Vertex."
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
            text="The number of perp trades over the set period."
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
              <LineBarChart dates={dates} cumulative={hourlyFunding} />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Funding Rate (Annualized)"
                text="The annualized funding rate over the set period."
              ></ChartHeader>
              <LineBarChart dates={dates} />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Funding Rate (24h)"
                text="The daily funding rate over the set period."
              ></ChartHeader>
              <LineBarChart dates={dates} />
            </ChartContainer>
          </>
        )}
      </ChartsLayout>
    </>
  );
}
