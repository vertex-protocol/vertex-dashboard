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

export default function Perps({ interval, setInterval }: IntervalProps) {
  const [market, setMarket] = useState('all-perp');
  const data = useAppSelector((state) => state.data.data);
  const dates = queryTime(data);

  useEffect(() => {
    //TODO: if market = 'all', queryAllProduct(data, type)
    if (market == 'all-perp') {
      console.log('fetch all markets');
      // queryAllProduct(data, "cumulative_volumes")
      // queryAllProduct(data, "open_interests")
      // queryAllProduct(data, "cumulative_trades")

      // might want to create another function that handles all of this?
    } else if (market == 'btc-perp') {
      console.log('fetch btc perp');
      // queryProduct(data, "cumulative_volumes", 3)
      // queryProduct(data, "cumulative_users", 3)
      // queryProduct(data, "cumulative_trades", 3)
      // function to calculate all funding rates
    } else {
      console.log('fetch eth perp');
      // queryProduct(data, "cumulative_volumes", 5)
      // queryProduct(data, "cumulative_users", 5)
      // queryProduct(data, "cumulative_trades", 5)
      // function to calculate all funding rates
    }
    // else, queryProduct(data, type, product)
  }, [market, interval]);

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
          <LineBarChart dates={dates} />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Total Open Interest"
            text="The daily vs cumulative open interest on Vertex."
          ></ChartHeader>
          <LineBarChart dates={dates} />
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
            title="# of Perp Trades"
            text="The number of perp trades over the set period."
          ></ChartHeader>
          <LineBarChart dates={dates} />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Funding Rate (1h)"
            text="The hourly funding rate over the set period."
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
      </ChartsLayout>
    </>
  );
}
