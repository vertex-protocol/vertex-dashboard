import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/Select';

//TODO: Make it compatible w/ spot and mm

interface IntervalProps {
  market: string;
  setMarket: React.Dispatch<React.SetStateAction<string>>;
}

export default function MarketDropdown({ market, setMarket }: IntervalProps) {
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
        <SelectItem value="all-perp">All Perp Markets</SelectItem>
        <SelectItem value="btc-perp">BTC-Perp</SelectItem>
        <SelectItem value="eth-perp">ETH-Perp</SelectItem>
      </SelectContent>
    </Select>
  );
}
