'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import Nav from '../components/main/NavBar';
import Header from '../components/main/Header';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);

  const handleTabChange = (value: string) => {
    setActive(value);
    router.push(`${value}`);
  };

  return (
    <section>
      <Nav />
      <div className="px-10">
        <Header text="Vertex Stats" />
        <Tabs value={active} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="/overview">Overview</TabsTrigger>
            <TabsTrigger value="/perpetual">Perpetual</TabsTrigger>
            <TabsTrigger value="/spot">Spot</TabsTrigger>
            <TabsTrigger value="/money-market">Money Market</TabsTrigger>
          </TabsList>
        </Tabs>
        {children}
      </div>
    </section>
  );
}
