'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { fetchData } from './redux/statsSlice';

import Nav from './components/main/NavBar';
import { Tabs, TabsList, TabsTrigger } from './components/ui/Tabs';
import Overview from './pages/OverviewPage';
import Perpetual from './pages/PerpetualPage';
import Spot from './pages/SpotPage';
import MoneyMarket from './pages/MoneyMarketPage';
import Restricted from './components/main/Restricted';
import { fetchProducts } from './redux/productsSlice';
import { fetchPrices } from './redux/pricesSlice';
import { useAppSelector } from './redux/store';
import { useViewportWidth } from './hooks/useViewportWidth';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [interval, setInterval] = useState('31');
  const error = useAppSelector((state) => state.data.error);
  const { isMobile } = useViewportWidth();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchData({ interval }));
  }, [dispatch, interval]);

  // fetch products from symbol endpoint
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // fetch prices
  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch]);

  const handleTabClick = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <section>
      {error ? (
        <Restricted />
      ) : (
        <>
          <Nav />
          <div className={`px-${isMobile ? '4' : '10'} mt-4`}>
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
                  Perpetual
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
                  {isMobile ? 'MM' : 'Money Market'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {selectedTab === 'overview' && (
              <Overview interval={interval} setInterval={setInterval} />
            )}
            {selectedTab === 'perpetual' && (
              <Perpetual interval={interval} setInterval={setInterval} />
            )}
            {selectedTab === 'spot' && (
              <Spot interval={interval} setInterval={setInterval} />
            )}
            {selectedTab === 'money-market' && (
              <MoneyMarket interval={interval} setInterval={setInterval} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
