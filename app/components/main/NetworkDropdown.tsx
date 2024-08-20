import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/Select';
import { NetworkType } from '@/app/types/types';

interface NetworkDropdownProps {
  network: NetworkType;
  setNetwork: (chain: NetworkType) => void;
}

export function NetworkDropdown({ network, setNetwork }: NetworkDropdownProps) {
  return (
    <Select
      defaultValue={network}
      onValueChange={(value: NetworkType) => setNetwork(value)}
    >
      <SelectTrigger className="flex h-10 w-28 items-center bg-gray-3 border border-gray-2 rounded text-gray-1 text-sm focus:outline-none justify-between px-3">
        <div className="flex items-center">
          <SelectValue />
          <ChevronDownIcon className="h-4 w-4 ml-3" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-gray-3 border border-gray-2 rounded text-gray-1 text-sm focus:outline-none w-28 mt-2 cursor-pointer">
        <SelectItem value="mainnet">Mainnet</SelectItem>
        <SelectItem value="testnet">Testnet</SelectItem>
      </SelectContent>
    </Select>
  );
}
