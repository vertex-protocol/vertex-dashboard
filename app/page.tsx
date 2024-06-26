'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { fetchData } from './redux/statsSlice';

import Nav from './components/main/NavBar';
import { Tabs, TabsList, TabsTrigger } from './components/ui/Tabs';
import Overview from './pages/Overview/OverviewPage';
import Perpetual from './pages/Perpetuals/PerpetualPage';
import Spot from './pages/Spot/SpotPage';
import MoneyMarket from './pages/MoneyMarket/MoneyMarketPage';
import Restricted from './components/main/Restricted';
import { fetchProducts } from './redux/productsSlice';
import { fetchPrices } from './redux/pricesSlice';
import { useAppSelector } from './redux/store';
import { useViewportWidth } from './hooks/useViewportWidth';
import { ChainType } from '@/app/types/types';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [interval, setInterval] = useState('31');
  const [chain, setChain] = useState<ChainType>('arbitrum');
  const error = useAppSelector((state) => state.data.error);
  const { isMobile } = useViewportWidth();
  const isAllTimeInterval = interval === 'all';
  const intervalText = isAllTimeInterval ? 'weekly' : 'daily';
  const intervalSubText = isAllTimeInterval ? '(past week)' : '(24h)';

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchData({ interval, chain }));
  }, [dispatch, interval, chain]);

  // fetch products from symbol endpoint
  useEffect(() => {
    dispatch(fetchProducts({ chain }));
  }, [dispatch, chain]);

  // fetch prices
  useEffect(() => {
    dispatch(fetchPrices({ chain }));
  }, [dispatch, chain]);

  const handleTabClick = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <section>
      {error ? (
        <Restricted />
      ) : (
        <>
          <Nav chain={chain} setChain={setChain} />
          <div className="px-4 md:px-10 mt-4">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger
                  value="overview"
                  onClick={() => handleTabClick('overview')}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="perpetual"
                  onClick={() => handleTabClick('perpetual')}
                >
                  Perps
                </TabsTrigger>
                <TabsTrigger
                  value="spot"
                  onClick={() => handleTabClick('spot')}
                >
                  Spot
                </TabsTrigger>
                <TabsTrigger
                  value="money-market"
                  onClick={() => handleTabClick('money-market')}
                >
                  {isMobile ? 'MMs' : 'Money Markets'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {selectedTab === 'overview' && (
              <Overview
                interval={interval}
                setInterval={setInterval}
                intervalText={intervalText}
                intervalSubText={intervalSubText}
              />
            )}
            {selectedTab === 'perpetual' && (
              <Perpetual
                interval={interval}
                setInterval={setInterval}
                intervalText={intervalText}
                intervalSubText={intervalSubText}
              />
            )}
            {selectedTab === 'spot' && (
              <Spot
                interval={interval}
                setInterval={setInterval}
                intervalText={intervalText}
                intervalSubText={intervalSubText}
              />
            )}
            {selectedTab === 'money-market' && (
              <MoneyMarket
                interval={interval}
                setInterval={setInterval}
                intervalText={intervalText}
                intervalSubText={intervalSubText}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
}
