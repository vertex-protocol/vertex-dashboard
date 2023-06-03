import { Tabs, TabsList, TabsTrigger } from '../../components/ui/IntervalTabs';

// TODO: Check if API request for interval is a string or num
// TODO: Check if values need to be increased by 1 to calculate daily diff

interface IntervalProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export default function Card({ active, setActive }: IntervalProps) {
  return (
    <Tabs value={active} onValueChange={(value) => setActive(value)}>
      <TabsList>
        <TabsTrigger value="7">7D</TabsTrigger>
        <TabsTrigger value="30">30D</TabsTrigger>
        <TabsTrigger value="90">90D</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
