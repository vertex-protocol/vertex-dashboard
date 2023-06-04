import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/Select';

interface IntervalProps {
  market: string;
  setMarket: React.Dispatch<React.SetStateAction<string>>;
  values: { value: string; label: string }[];
}

export default function MarketDropdown({
  market,
  setMarket,
  values,
}: IntervalProps) {
  return (
    <Select defaultValue={market} onValueChange={(value) => setMarket(value)}>
      <SelectTrigger>
        <p className="text-white font-semibold mr-4">Market: </p>
        <div className="flex items-center">
          <SelectValue />
          <ChevronDownIcon className="h-4 w-4 ml-3" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {values.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
