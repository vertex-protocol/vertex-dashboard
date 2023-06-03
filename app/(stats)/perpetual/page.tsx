'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import FourGridLayout from '../../components/layout/FourGridLayout';

export default function Perps() {
  const [active, setActive] = useState('7');

  return (
    <>
      <FourGridLayout>
        <Card title="Total Perpetual Volume" stat={2.21} daily={14.08} />
        <Card title="Perpetual Volume (24h)" stat={2.21} daily={14.08} />
        <Card title="Total Open Interest" stat={1023} daily={14.08} />
        <Card title="Perpetual Trades (24h)" stat={2.21} daily={14.08} />
      </FourGridLayout>
      <div className="flex justify-end">
        <IntervalTab active={active} setActive={setActive} />
      </div>
    </>
  );
}
