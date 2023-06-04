'use client';

import { useState } from 'react';
import Card from '../../components/main/Card';
import IntervalTab from '../../components/main/IntervalTab';
import ThreeGridLayout from '../../components/layout/ThreeGridLayout';
import ControlsLayout from '../../components/layout/ControlsLayout';
import MktDropdown from '../../components/main/MktDropdown';

export default function MoneyMarket() {
  const [active, setActive] = useState('7');
  const [market, setMarket] = useState('all-perp');

  return (
    <>
      <ThreeGridLayout>
        <Card title="Total TVL" stat={2.21} daily={14.08} />
        <Card title="Deposited (24h)" stat={2.21} daily={14.08} />
        <Card title="Borrowed (24h)" stat={1.23} daily={14.08} />
      </ThreeGridLayout>
      <ControlsLayout justify="between">
        <MktDropdown market={market} setMarket={setMarket} />
        <IntervalTab active={active} setActive={setActive} />
      </ControlsLayout>
    </>
  );
}
