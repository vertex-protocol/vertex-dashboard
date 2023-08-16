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
import LineChart from '@/app/components/main/chart/LineChart';
import { useAppSelector } from '@/app/redux/store';
import { queryTime } from '@/app/hooks/queryTime';
import { fetchMMData } from '@/app/hooks/fetchMMData';
import { useFilterProducts } from '@/app/hooks/useFilterProducts';
import IntervalProps from '../../types/IntervalProps';
import { useViewportWidth } from '@/app/hooks/useViewportWidth';

export default function MoneyMarket({ interval, setInterval }: IntervalProps) {
  const { isMobile } = useViewportWidth();
  const [market, setMarket] = useState('all');

  // All TVL
  const [AllTVL, setAllTVL] = useState<number[]>([]);

  // All Deposits
  const [AllDailyDeposits, setAllDailyDeposits] = useState<number[]>([]);

  // All Withdrawals
  const [AllDailyWithdraws, setAllDailyWithdraws] = useState<number[]>([]);

  // TVL & Net Flow
  const [TVL, setTVL] = useState<number[]>([]);
  const [netFlows, setNetFlows] = useState<number[]>([]);

  // Deposits
  const [Deposits, setDeposits] = useState<number[]>([]);
  const [DailyDeposits, setDailyDeposits] = useState<number[]>([]);

  // Borrows
  const [Withdraws, setWithdraws] = useState<number[]>([]);
  const [DailyWithdraws, setDailyWithdraws] = useState<number[]>([]);

  // Deposit Rate
  const [DepositRate, setDepositRate] = useState<number[]>([]);

  // Borrow Rate
  const [BorrowRate, setBorrowRate] = useState<number[]>([]);

  const products = useAppSelector((state) => state.product.products);
  const filterdProducts = useFilterProducts(products);

  const data = useAppSelector((state) => state.data);
  const snapshotData = data.snapshots;
  const dates = queryTime(snapshotData);

  const prices = useAppSelector((state) => state.prices.prices);

  useEffect(() => {
    fetchMMData({
      snapshotData,
      market,
      setAllTVL,
      setAllDailyDeposits,
      setAllDailyWithdraws,
      setTVL,
      setNetFlows,
      setDeposits,
      setDailyDeposits,
      setWithdraws,
      setDailyWithdraws,
      setDepositRate,
      setBorrowRate,
      filterdProducts,
      prices,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market, interval, data]);

  return (
    <>
      <ThreeGridLayout>
        <Card
          title="Total TVL"
          stat={AllTVL[AllTVL.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Deposits (24h)"
          stat={AllDailyDeposits[AllDailyDeposits.length - 1]}
          currency={true}
          loading={data.loading}
        />
        <Card
          title="Withdrawals (24h)"
          stat={AllDailyWithdraws[AllDailyWithdraws.length - 1]}
          currency={true}
          loading={data.loading}
        />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown
          market={market}
          setMarket={setMarket}
          values={filterdProducts?.MMProducts}
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
            title="TVL & Net Inflows/Outflows"
            text="The TVL and Net Inflows/Outflows of the selected market."
          />
          <LineBarChart
            dates={dates}
            cumulative={TVL}
            daily={netFlows}
            data_1="Net Flows"
            data_2="TVL"
            currency={true}
            loading={data.loading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Deposits"
            text="The daily vs cumulative deposits on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={Deposits}
            daily={DailyDeposits}
            data_1="Daily Deposits"
            data_2="Cum. Deposits"
            currency={true}
            loading={data.loading}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeader
            title="Withdraws"
            text="The daily vs cumulative withdrawals on Vertex."
          />
          <LineBarChart
            dates={dates}
            cumulative={Withdraws}
            daily={DailyWithdraws}
            data_1="Daily Withdrawals"
            data_2="Cum. Withdrawals"
            currency={true}
            loading={data.loading}
          />
        </ChartContainer>
        {market !== 'all' && (
          <>
            <ChartContainer>
              <ChartHeader
                title="Deposit Rate"
                text="The deposit rate over the set period."
              />
              <LineChart
                dates={dates}
                data={DepositRate}
                data_1="Deposit Rate"
                format={'0.[00000]%'}
                loading={data.loading}
              />
            </ChartContainer>
            <ChartContainer>
              <ChartHeader
                title="Borrow Rate"
                text="The borrow rate over the set period."
              />
              <LineChart
                dates={dates}
                data={BorrowRate}
                data_1="Borrow Rate"
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
