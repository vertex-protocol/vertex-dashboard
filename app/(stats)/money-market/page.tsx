'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';

export default function MoneyMarket() {
  const [active, setActive] = useState('7');

  return (
    <>
      <ThreeGridLayout>
        <Card title="Total TVL" stat={2.21} daily={14.08} />
        <Card title="Deposited (24h)" stat={2.21} daily={14.08} />
        <Card title="Borrowed (24h)" stat={1.23} daily={14.08} />
      </ThreeGridLayout>
      <div className="flex justify-end">
        <IntervalTab active={active} setActive={setActive} />
      </div>
    </>
  );
}
