'use client';

import { useState } from 'react';
import Card from '@/app/components/main/Card';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/IntervalTabs';

export default function Overview() {
  const [active, setActive] = useState('7');

  return (
    <>
      <div className="py-6 grid md:grid-cols-4 grid-cols-1 gap-4">
        <Card title="Total Trading Volume" stat={2.21} daily={14.08} />
        <Card title="Trading Volume (24h)" stat={2.21} daily={14.08} />
        <Card title="Users (24h)" stat={1023} daily={14.08} />
        <Card title="Fees (24h)" stat={2.21} daily={14.08} />
      </div>
      <div className="flex justify-end">
        <Tabs value={active} onValueChange={(value) => setActive(value)}>
          <TabsList>
            <TabsTrigger value="7">7D</TabsTrigger>
            <TabsTrigger value="30">30D</TabsTrigger>
            <TabsTrigger value="90">90D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}
