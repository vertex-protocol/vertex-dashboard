'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchData } from '../redux/statsSlice';

import Nav from '../components/main/NavBar';
import Header from '../components/main/Header';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';
import Overview from './overview/page';
import Perpetual from './perpetual/page';
import Spot from './spot/page';
import MoneyMarket from './money-market/page';

export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [interval, setInterval] = useState('7');
  const [path, setPath] = useState(pathname);

  const handleTabChange = (value: string) => {
    setPath(value);
    router.push(`${value}`);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchData({ interval }));
  }, [dispatch, interval]);

  return (
    <section>
      <Nav />
      <div className="px-10">
        <Header text="Vertex Stats" />
        <Tabs value={path} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="/overview">Overview</TabsTrigger>
            <TabsTrigger value="/perpetual">Perpetual</TabsTrigger>
            <TabsTrigger value="/spot">Spot</TabsTrigger>
            <TabsTrigger value="/money-market">Money Market</TabsTrigger>
          </TabsList>
        </Tabs>
        {path === '/overview' && (
          <Overview interval={interval} setInterval={setInterval} />
        )}
        {path === '/perpetual' && (
          <Perpetual interval={interval} setInterval={setInterval} />
        )}
        {path === '/spot' && (
          <Spot interval={interval} setInterval={setInterval} />
        )}
        {path === '/money-market' && (
          <MoneyMarket interval={interval} setInterval={setInterval} />
        )}
      </div>
    </section>
  );
}
