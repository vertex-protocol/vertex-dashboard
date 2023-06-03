'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';

export default function Spot() {
  const [active, setActive] = useState('7');

  return (
    <>
      <ThreeGridLayout>
        <Card title="Total Spot Volume" stat={2.21} daily={14.08} />
        <Card title="Spot Volume (24h)" stat={2.21} daily={14.08} />
        <Card title="Spot Trades (24h)" stat={1023} daily={14.08} />
      </ThreeGridLayout>
      <div className="flex justify-end">
        <IntervalTab active={active} setActive={setActive} />
      </div>
    </>
  );
}
