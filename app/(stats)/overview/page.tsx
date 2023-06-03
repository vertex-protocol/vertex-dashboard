import Card from '@/app/components/main/Card';

export default function Overview() {
  return (
    <main className="py-6 grid md:grid-cols-4 grid-cols-1 gap-4">
      <Card title="Total Trading Volume" stat={2.21} daily={14.08} />
      <Card title="Trading Volume (24h)" stat={2.21} daily={14.08} />
      <Card title="Users (24h)" stat={1023} daily={14.08} />
      <Card title="Fees (24h)" stat={2.21} daily={14.08} />
    </main>
  );
}
