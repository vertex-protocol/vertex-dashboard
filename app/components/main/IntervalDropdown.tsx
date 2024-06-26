import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/Select';

interface IntervalDropdownProps {
  interval: string;
  setInterval: (interval: string) => void;
}

// Values are increased by 1 to calculate daily diff
export default function IntervalDropdown({
  interval,
  setInterval,
}: IntervalDropdownProps) {
  return (
    <Select
      defaultValue={interval}
      onValueChange={(value) => setInterval(value)}
    >
      <SelectTrigger className="flex h-10 w-20 items-center bg-gray-3 border border-gray-2 rounded text-gray-1 text-sm focus:outline-none justify-between px-3">
        <div className="flex items-center">
          <SelectValue />
          <ChevronDownIcon className="h-4 w-4 ml-3" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-gray-3 border border-gray-2 rounded text-gray-1 text-sm focus:outline-none w-20 mt-2 cursor-pointer">
        <SelectItem value="8">7D</SelectItem>
        <SelectItem value="31">30D</SelectItem>
        {/* Temporarily removing 90D & ALL interval so max count limits can be revert, will add back when dashboard is migrated to monorepo */}
        {/* <SelectItem value="91">90D</SelectItem>
        <SelectItem value="all">ALL</SelectItem> */}
      </SelectContent>
    </Select>
  );
}
