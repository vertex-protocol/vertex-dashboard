import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/Select';
import { ChainType } from '@/app/types/types';

interface ChainDropdownProps {
  chain: ChainType;
  setChain: (chain: ChainType) => void;
}

export function ChainDropdown({ chain, setChain }: ChainDropdownProps) {
  return (
    <Select
      defaultValue={chain}
      onValueChange={(value: ChainType) => setChain(value)}
    >
      <SelectTrigger className="flex h-10 w-28 items-center bg-gray-3 border border-gray-2 rounded text-gray-1 text-sm focus:outline-none justify-between px-3">
        <div className="flex items-center">
          <SelectValue />
          <ChevronDownIcon className="h-4 w-4 ml-3" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-gray-3 border border-gray-2 rounded text-gray-1 text-sm focus:outline-none w-28 mt-2 cursor-pointer">
        <SelectItem value="arbitrum">Arbitrum</SelectItem>
        <SelectItem value="mantle">Mantle</SelectItem>
        <SelectItem value="sei">Sei</SelectItem>
      </SelectContent>
    </Select>
  );
}
