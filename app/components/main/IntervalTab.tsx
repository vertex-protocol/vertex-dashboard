import { Tabs, TabsList, TabsTrigger } from '../../components/ui/IntervalTabs';
import { IntervalProps } from '@/app/types/IntervalProps';

// TODO: Check if API request for interval is a string or num
// TODO: Check if values need to be increased by 1 to calculate daily diff

export default function IntervalTab({ interval, setInterval }: IntervalProps) {
  return (
    <Tabs value={interval} onValueChange={(value) => setInterval(value)}>
      <TabsList>
        <TabsTrigger value="7">7D</TabsTrigger>
        <TabsTrigger value="30">30D</TabsTrigger>
        <TabsTrigger value="90">90D</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
