import { Tabs, TabsList, TabsTrigger } from '../../components/ui/IntervalTabs';
import IntervalProps from '../../types/IntervalProps';

// Values are increased by 1 to calculate daily diff
export default function IntervalTab({ interval, setInterval }: IntervalProps) {
  return (
    <Tabs value={interval} onValueChange={(value) => setInterval(value)}>
      <TabsList>
        <TabsTrigger value="8">7D</TabsTrigger>
        <TabsTrigger value="31">30D</TabsTrigger>
        <TabsTrigger value="91">90D</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
