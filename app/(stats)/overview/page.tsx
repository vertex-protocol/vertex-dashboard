'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import FourGridLayout from '../../components/layout/FourGridLayout';

export default function Overview() {
  const [active, setActive] = useState('7');

  return (
    <>
      <FourGridLayout>
        <Card title="Total Trading Volume" stat={2.21} daily={14.08} />
        <Card title="Trading Volume (24h)" stat={2.21} daily={14.08} />
        <Card title="Users (24h)" stat={1023} daily={14.08} />
        <Card title="Fees (24h)" stat={2.21} daily={14.08} />
      </FourGridLayout>
      <div className="flex justify-end">
        <IntervalTab active={active} setActive={setActive} />
      </div>
    </>
  );
}
