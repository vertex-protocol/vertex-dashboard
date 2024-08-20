import Image from 'next/image';
import vertexLogo from '../../public/vertex-logo.svg';
import { ChainDropdown } from '@/app/components/main/ChainDropdown';
import { ChainType, NetworkType } from '@/app/types/types';
import { NetworkDropdown } from '@/app/components/main/NetworkDropdown';

interface NavBarProps {
  chain: ChainType;
  setChain: (chain: ChainType) => void;
  network: NetworkType;
  setNetwork: (chain: NetworkType) => void;
}

export default function NavBar({
  chain,
  setChain,
  network,
  setNetwork,
}: NavBarProps) {
  return (
    <nav className="flex justify-between py-4 px-4 md:px-10 bg-gray-3 border-b border-gray-2 text-white items-center">
      <div className="flex gap-x-2 items-center">
        <a href="https://vertexprotocol.com" target="_blank">
          <Image src={vertexLogo} alt="vertex-logo" width={100} />
        </a>
        <span>on</span>
        <ChainDropdown chain={chain} setChain={setChain} />
      </div>
      <div className="flex gap-4 items-center">
        <NetworkDropdown network={network} setNetwork={setNetwork} />
        <a href="https://app.vertexprotocol.com/markets" target="_blank">
          App
        </a>
        <a
          href="https://vertex-protocol.gitbook.io/docs/getting-started/overview"
          target="_blank"
        >
          Docs
        </a>
      </div>
    </nav>
  );
}
