'use client';

import { useRouter } from 'next/navigation';
import Nav from '../components/layout/NavBar';
import Header from '../components/layout/Header';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(`/${value}`);
  };

  return (
    <section>
      <Nav />
      <div className="px-10">
        <Header text="Vertex Stats" />
        <Tabs defaultValue="overview" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="perpetual">Perpetual</TabsTrigger>
            <TabsTrigger value="spot">Spot</TabsTrigger>
            <TabsTrigger value="money-market">Market</TabsTrigger>
          </TabsList>
        </Tabs>
        {children}
      </div>
    </section>
  );
}
